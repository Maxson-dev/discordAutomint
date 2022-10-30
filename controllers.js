"use strict";
const Web3 = require("web3");
const { Wallet, User } = require("./models");
const { ABI } = require("./abi");
const { parseWallets } = require("./utils");

module.exports = {

    web3: new Web3(process.env.NODE_URL),

    async mintController(interaction) {

        const txHash = interaction.fields.getTextInputValue("hash");
        const numTx = interaction.fields.getTextInputValue("numtx");
        const maxFeePerGas = this.web3.utils.toWei(interaction.fields.getTextInputValue("maxgwei").trim(), "gwei");
        const maxPriorityFeePerGas = this.web3.utils.toWei(interaction.fields.getTextInputValue("mingwei").trim(), "gwei");
    
        const user = await User.findOne({ where: { discord_id: interaction.user.id } });
        const wallets = await Wallet.findAll({ where: { user_id: interaction.user.id } });

        if (user === null || wallets === null) {
            console.log(`[WARN] UNKNOWN USER ${interaction.user.username}`);
            await interaction.reply({ content: "You must be autorized to run this command!", ephemeral: true });
            return;
        }

        const walletForContract = wallets.find( wal => wal["is_contract"] );

        const tokenContract = new this.web3.eth.Contract(ABI, user["contract_address"]);

        const txInfo = await this.web3.eth.getTransaction(txHash);

        console.log(numTx);

        const saleContract = txInfo.to;
        const nftPrice = txInfo.value;
        const amountPerTx = numTx;
        const txCount = 1;
        const mintPerCall = 1;
        const payableMint = String(txInfo.value === 0 ? false : true);
        const data = txInfo.input;

        const contractMethod = tokenContract.methods.mintWithLoop([
            saleContract, // Sale address
            nftPrice, // NFT Price
            amountPerTx, // Per Tx
            txCount, // TX Count
            mintPerCall,
            payableMint,
            data
        ]);

        console.log([
            saleContract, // Sale address
            nftPrice, // NFT Price
            amountPerTx, // Per Tx
            txCount, // TX Count
            mintPerCall,
            payableMint,
            data
        ]);

        const nonce = await this.web3.eth.getTransactionCount(walletForContract["address"]);

        const tx = {
            from: walletForContract["address"],
            gasLimit: this.web3.utils.toHex(txInfo.gas * numTx),
            to: user["contract_address"],
            value: this.web3.utils.toHex(nftPrice * numTx),
            data: contractMethod.encodeABI(),
            maxFeePerGas: maxFeePerGas,
            maxPriorityFeePerGas: maxPriorityFeePerGas,
            nonce: nonce,
            type: 2,
        }
        
        console.log(tx);

        const activeTransactions = [];
        activeTransactions.id = user["discord_id"];
        
        try {
            const gas = await contractMethod.estimateGas(tx);
            console.log(`[INFO] GAS LIMIT FOR TX ${gas}`);

            const signTx = await this.web3.eth.accounts.signTransaction(tx, walletForContract["priv_key"]);
            console.log(signTx);

            activeTransactions.push(signTx["transactionHash"]);

            try {
                //TODO ОТПРАВЛЯТЬ ХЭШ СРАЗУ ПОСЛЕ ПОДПИСАНИЯ А НЕ ЖДАТЬ
                const task = this.web3.eth.sendSignedTransaction(signTx.rawTransaction)
                .then( hash => {
                    console.log(`[INFO] TX HASH: ${hash["transactionHash"]}`);
                })
                .catch( e => {
                    console.log(`[ERROR] ${e}`);
                });
                const message = `Sent 1: https://etherscan.io/tx/${signTx["transactionHash"]}`;
                activeTransactions.text = message;

                console.log(`[INFO] TX HASH: ${signTx["transactionHash"]}`);
            } catch(e) {
                console.error(`[ERROR] error for wallet ${walletForContract["address"]}: ${e}`) 
            }

        } catch(e) {
            console.error(`[ERROR] ${e}`);

            try {
                const firstWal = wallets.find( wal => !wal["is_contract"] );

                const nonce = await this.web3.eth.getTransactionCount(firstWal["address"]);

                const testTx = {
                    from: firstWal["address"],
                    gasLimit: this.web3.utils.toHex(txInfo.gas),
                    to: txInfo.to,
                    value: this.web3.utils.toHex(nftPrice),
                    data: txInfo.input,
                    maxFeePerGas: maxFeePerGas,
                    maxPriorityFeePerGas: maxPriorityFeePerGas,
                    nonce: nonce,
                    type: 2,
                }

                const gas = await this.web3.eth.estimateGas(testTx);
                console.log(`[INFO] GAS LIMIT FOR ${firstWal["address"]}: ${gas}`);

                const range = wallets.length > numTx ? numTx : wallets.length;

                for (let i = 0; i < range; i++) {
                    
                    const wal = wallets[i];

                    if (wal["is_contract"]) continue;

                    const nonce = await this.web3.eth.getTransactionCount(wal["address"]);

                    const tx = {
                        from: wal["address"],
                        gasLimit: this.web3.utils.toHex(txInfo.gas),
                        to: txInfo.to,
                        value: this.web3.utils.toHex(nftPrice),
                        data: txInfo.input,
                        maxFeePerGas: maxFeePerGas,
                        maxPriorityFeePerGas: maxPriorityFeePerGas,
                        nonce: nonce,
                        type: 2,
                    }

                    if (i === 0) {
                        const signTx = await this.web3.eth.accounts.signTransaction(tx, wal["priv_key"]);
                        const hash = signTx["transactionHash"];
                        const message = `Sent 2: https://etherscan.io/tx/${hash}`;
                        activeTransactions.text = message;

                        activeTransactions.push(signTx["transactionHash"]);

                        const task = this.web3.eth.sendSignedTransaction(signTx.rawTransaction)
                        .then( hash => {
                            console.log(`[INFO] TX HASH: ${hash["transactionHash"]}`);
                            return hash["transactionHash"];
                        })
                        .catch( e => {
                            console.log(`[ERROR] ${e}`);
                        });

                    } else {
                        const signTx = await this.web3.eth.accounts.signTransaction(tx, wal["priv_key"])
                        .then( signTx => this.web3.eth.sendSignedTransaction(signTx.rawTransaction))
                        .then( hash => {
                            console.log(`[INFO] TX HASH: ${hash["transactionHash"]}`);
                        })
                        .catch( e => {
                            console.log(`[ERROR] ${e}`);
                        });
                        activeTransactions.push(signTx["transactionHash"]);
                    }
                }
            } catch(e) {
                await interaction.reply({ content: e.toString() });
            }
        }
        return activeTransactions;
    },

    async authController(interaction) {
        const userId = interaction.user.id;

        const contrAddr = interaction.fields.getTextInputValue("contrAddr");
        const commonWallets = interaction.fields.getTextInputValue("wallets");
        const contrWallet = interaction.fields.getTextInputValue("contrWal");

        const addrKeyPairs = parseWallets(commonWallets);
        const [ contrWalAddr, contrWalKey ] = parseWallets(contrWallet)[0];

        console.log(contrWalAddr);
        console.log(contrWalKey);

        await User.create({ discord_id: userId, contract_address: contrAddr });
        console.log(`[INFO] User ${userId} created`);
        await Wallet.create({ priv_key: contrWalKey, address: contrWalAddr, is_contract: true, user_id: userId });
        console.log(`[INFO] Contract wallet ${contrWalAddr} created for user ${userId}`);

        for (const [ addr, key ] of addrKeyPairs) {
            await Wallet.create({ priv_key: key, address: addr, is_contract: false, user_id: userId });
            console.log(`[INFO] Wallet ${addr} created for user ${userId}`);
        }
    },

    async addWalletController(interaction) {
        const addr = interaction.fields.getTextInputValue("addr").trim();
        const key = interaction.fields.getTextInputValue("key").trim();

        console.log(key);
        console.log(key.length);

        await Wallet.create({ priv_key: key, address: addr, is_contract: false, user_id: interaction.user_id });
    },

    async deleteUserController(interaction) {
        await User.destroy({ where: { discord_id: interaction.user.id } });
        await Wallet.destroy({ where: { user_id: interaction.user.id }});
    }
}
