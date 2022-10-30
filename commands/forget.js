"use strict";
const {  
    SlashCommandBuilder,
} = require("discord.js");
const { deleteUserController } = require("../controllers");
const { User } = require("../models");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("forgetme")
        .setDescription("delete ALL user entries"),

    async execute(interaction) {
        const user = await User.findOne({ where: { discord_id: interaction.user.id } });
        if (!user) {
            await interaction.reply(`${interaction.user.username} you are not registered`);
            return;
        }
        await deleteUserController(interaction);
        console.log(`[INFO] USER ${interaction.user.id} SUCCESFULLY DELETED`);
        await interaction.reply(`User ${interaction.user.username} succesfully deleted`);
    }
}