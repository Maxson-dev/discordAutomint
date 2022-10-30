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
          .setName("auth")
          .setDescription("user registration"),

    async execute(interaction) {
        const modal = new ModalBuilder()
              .setCustomId("authsub")
              .setTitle("Registration");

        const contractAddress = new TextInputBuilder()
              .setCustomId("contrAddr")
              .setLabel("Contract address")
              .setStyle(TextInputStyle.Short)
              .setRequired(true)
              .setMinLength(42)
              .setMaxLength(42);

        const commonWallets = new TextInputBuilder()
              .setCustomId("wallets")
              .setLabel("Wallets")
              .setPlaceholder("address:privateKey\naddress:privateKey")
              .setStyle(TextInputStyle.Paragraph)
              .setRequired(true);

        const contractWallet = new TextInputBuilder()
              .setCustomId("contrWal")
              .setLabel("Contract wallet")
              .setPlaceholder("address:privateKey")
              .setStyle(TextInputStyle.Short)
              .setRequired(true);

        const actionRow1 = new ActionRowBuilder().addComponents(contractAddress);
        const actionRow2 = new ActionRowBuilder().addComponents(contractWallet);
        const actionRow3 = new ActionRowBuilder().addComponents(commonWallets);

        modal.addComponents(actionRow1, actionRow2, actionRow3);

        await interaction.showModal(modal);
    }
}

