"use strict";
const { 
    SlashCommandBuilder, 
    ModalBuilder, 
    TextInputBuilder, 
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
          .setName("mint")
          .setDescription("minting nft"),

    async execute(interaction) {
        const modal = new ModalBuilder()
              .setCustomId("mintconfig")
              .setTitle("Mint config");

        const txHash = new TextInputBuilder()
              .setCustomId("hash")
              .setLabel("Tx hash")
              .setStyle(TextInputStyle.Short)
              .setRequired(true)
              .setMinLength(66)
              .setMaxLength(66);

        const txCount = new TextInputBuilder()
              .setCustomId("numtx")
              .setLabel("Number of tx")
              .setStyle(TextInputStyle.Short)
              .setRequired(true);

        const maxGwei = new TextInputBuilder()
              .setCustomId("maxgwei")
              .setLabel("Max Gwei")
              .setStyle(TextInputStyle.Short)
              .setRequired(true);

        const minGwei = new TextInputBuilder()
              .setCustomId("mingwei")
              .setLabel("Min Gwei")
              .setStyle(TextInputStyle.Short)
              .setRequired(true);

        const actionRow1 = new ActionRowBuilder().addComponents(txHash);
        const actionRow2 = new ActionRowBuilder().addComponents(txCount);
        const actionRow3 = new ActionRowBuilder().addComponents(maxGwei);
        const actionRow4 = new ActionRowBuilder().addComponents(minGwei);

        modal.addComponents(actionRow1, actionRow2, actionRow3, actionRow4);

        await interaction.showModal(modal);
    }
}

