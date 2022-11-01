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
          .setName("withdraw")
          .setDescription("withdrawal request"),

    async execute(interaction) {
        const modal = new ModalBuilder()
              .setCustomId("withdraw")
              .setTitle("Withdrawal");

        const hash = new TextInputBuilder()
              .setCustomId("hash")
              .setLabel("Txn hash")
              .setStyle(TextInputStyle.Short)
              .setRequired(true)
              .setMinLength(66)
              .setMaxLength(66);

        const commonWallets = new TextInputBuilder()
              .setCustomId("addr")
              .setLabel("Withdrawal address")
              .setStyle(TextInputStyle.Short)
              .setRequired(true);

        const gasLim = new TextInputBuilder()
              .setCustomId("gaslim")
              .setLabel("Gas Limit")
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

        const actionRow1 = new ActionRowBuilder().addComponents(hash);
        const actionRow2 = new ActionRowBuilder().addComponents(commonWallets);
        const actionRow3 = new ActionRowBuilder().addComponents(maxGwei);
        const actionRow4 = new ActionRowBuilder().addComponents(minGwei);
        const actionRow5 = new ActionRowBuilder().addComponents(gasLim);

        modal.addComponents(actionRow1, actionRow2, actionRow3, actionRow4, actionRow5);

        await interaction.showModal(modal);
    }
}

