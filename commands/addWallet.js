"use strict";
const { 
    SlashCommandBuilder, 
    ModalBuilder, 
    TextInputBuilder, 
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");
const { User } = require("../models");


module.exports = {
    data: new SlashCommandBuilder()
          .setName("addwallet")
          .setDescription("adding new wallet"),

    async execute(interaction) {

        const user = await User.findOne({ where: { discord_id: interaction.user.id } });
        if (!user) {
            await interaction.reply(`${interaction.user.username} you are not registered`);
            return;
        }

        const modal = new ModalBuilder()
              .setCustomId("addwal")
              .setTitle("Add new wallet");

        const address = new TextInputBuilder()
              .setCustomId("addr")
              .setLabel("Wallet address")
              .setStyle(TextInputStyle.Short)
              .setRequired(true)
              .setMinLength(42)
              .setMaxLength(42);

        const privKey = new TextInputBuilder()
              .setCustomId("key")
              .setLabel("Private key")
              .setStyle(TextInputStyle.Short)
              .setRequired(true)
              .setMinLength(66)
              .setMaxLength(66);

        const actionRow1 = new ActionRowBuilder().addComponents(address);
        const actionRow2 = new ActionRowBuilder().addComponents(privKey);

        modal.addComponents(actionRow1, actionRow2);

        await interaction.showModal(modal);
    }
}