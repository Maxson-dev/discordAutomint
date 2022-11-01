"use strict";
const path = require("path");
const fs = require("fs");
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const { mintController, web3, authController, addWalletController, withdrawalController } = require("./controllers");
const { User, Wallet } = require("./models");
const controllers = require("./controllers");


class TxMap extends Map {
    set(k, v) {
        super.set(k, v);
        setTimeout( () => this.delete(k), 120000);
    }
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.once(Events.ClientReady, c => console.info(`[INFO] CLIENT STARTED AS ${c.user.tag}`));

client.txMap = new TxMap();

client.commands = new Collection();

const commandPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandPath).filter( file => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.warn(`[WARN] COMMAND WITHOUT DATA OR EXECUTE FUNCTION: ${filePath}`);
    }
}

client.on(Events.MessageCreate, async message => {
    if (!message.reference || 
        !(message.mentions.repliedUser && message.mentions.repliedUser.bot)) return;

    const activeTxs = client.txMap.get(message.author.id);

    console.log(activeTxs);

    const hashes = await Promise.all(activeTxs);

    if (  !activeTxs 
        || activeTxs.message.id !== message.reference.messageId 
        || activeTxs.id !== message.author.id) return;

    const user = await User.findOne({ where: { discord_id: message.author.id } });
    const wallets = await Wallet.findAll({ where: { user_id: message.author.id } });

    let [ maxFeePerGas, maxPriorityFeePerGas ] = message.content.split(" ");
    maxFeePerGas = web3.utils.toWei(maxFeePerGas.trim(), "gwei");
    maxPriorityFeePerGas = web3.utils.toWei(maxPriorityFeePerGas.trim(), "gwei");

    const tasks = [];

    let first = true;
    for (const hash of hashes) {
        try {
            const speedUp = await web3.eth.getTransaction(hash);
            const tx = {
                from: speedUp.from,
                gasLimit: web3.utils.toHex(speedUp.gas),
                to: speedUp.to,
                value: web3.utils.toHex(speedUp.value),
                data: speedUp.input,
                maxFeePerGas: maxFeePerGas,
                maxPriorityFeePerGas: maxPriorityFeePerGas,
                nonce: speedUp.nonce,
                type: 2,
            }
            console.log(tx);
            const privKey = wallets.find( wal => wal["address"] === speedUp.from )["priv_key"];

            console.log(privKey);

            if (first) {
                const signTx = await web3.eth.accounts.signTransaction(tx, privKey);

                console.log(signTx)

                const task = web3.eth.sendSignedTransaction(signTx.rawTransaction)
                .then(signTx => web3.eth.sendSignedTransaction(signTx.rawTransaction))
                .then(hash =>  console.log(`[INFO] TX HASH: ${hash[["transactionHash"]]}`))
                .catch(e => console.error(`[ERROR] ${e}`));
                tasks.push(task);

                await message.reply(`Tx boosted: https://etherscan.io/tx/${signTx["transactionHash"]}`);

                first = false;
            } else {
                const task = web3.eth.accounts.signTransaction(tx, privKey)
                .then(signTx => web3.eth.sendSignedTransaction(signTx.rawTransaction))
                .then(hash =>  console.log(`[INFO] TX HASH: ${hash[["transactionHash"]]}`))
                .catch(e => console.error(`[ERROR] ${e}`));

                tasks.push(task);
            }

        } catch(e) {
            console.error(`[ERROR] ${e}`);
        }
    }
    await Promise.all(tasks);
    console.log("PROMISE RESOLED")
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    console.log(interaction.commandName);

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`[ERROR] no command matching ${interaction.commandName} was found`)
    }

    try {
        await command.execute(interaction);
    } catch (e) {
        console.error(`[ERROR] ${e}`);
        await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
    }
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isModalSubmit()) return;

    switch (interaction.customId) {
    case "mintconfig":
        try {
            console.log("START MINT");

            if (client.txMap.has(interaction.user.id)) 
                client.txMap.delete(interaction.user.id);

            await interaction.deferReply();
            const arrActivesTxs = await mintController.call(controllers, interaction);
            const text = arrActivesTxs.text;

            if (!text.length 
             || !arrActivesTxs.length) throw new Error("FAILED TX");

            const message = await interaction.editReply(text);

            arrActivesTxs.message = message;

            client.txMap.set(interaction.user.id, arrActivesTxs);
            console.log(arrActivesTxs);
        } catch(e) {
            console.error(`[ERROR] ${e}`);
            await interaction.editReply({ content: "There was an error while executing this command!", ephemeral: true });
        }
        break;
    case "authsub":
        try {
            const user = await User.findOne( { where: { discord_id: interaction.user.id } });
            if (user) {
                  await interaction.reply(`User ${interaction.user.id} already registered`);
                  return;
            }
            await authController(interaction);
            await interaction.reply(`User ${interaction.user.username} successfully registered`);
        } catch(e) {
            console.error(`[ERROR] ${e}`);
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
        break;
    case "addwal":
        try {
            const user = User.findOne( { where: { discord_id: interaction.user.id } });
            if (!user) {
                await interaction.reply({ content: `You are not authorized!`, ephemeral: true });
                return;
            }  
            await addWalletController(interaction);
            await interaction.reply(`Wallet succesfully added`);
        } catch(e) {
            console.error(`[ERROR] ${e}`);
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
        break;
    case "withdraw":
        try {
            const user = User.findOne( { where: { discord_id: interaction.user.id } });
            if (!user) {
                await interaction.reply({ content: `You are not authorized!`, ephemeral: true });
                return;
            }
            await interaction.deferReply();
            const hash = await withdrawalController.call(controllers, interaction);
            await interaction.editReply(`Sent: https://etherscan.io/tx/${hash}`);
        } catch(e) {
            console.error(`[ERROR] ${e}`);
            await interaction.editReply({ content: "There was an error while executing this command!", ephemeral: true });
        }
        break;
    }
});

module.exports = {
    client: client,
}

