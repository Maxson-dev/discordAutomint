"use strict";
require("dotenv").config();
const db = require("./models");
const { client } = require("./client");
const token = process.env.TOKEN;

const main = async () => {
    try {
        await db.sequelize.authenticate();
        await db.sequelize.sync();

        client.login(token);

    } catch(e) {
        console.error(`[ERROR] ${e}`);
        process.exit(1);
    }
}
main();