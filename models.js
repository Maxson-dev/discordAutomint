"use strict";
const path = require("path");
const { Sequelize, Model, DataTypes } = require("sequelize");

const dbPath = path.join(__dirname, "db/db.sqlite");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: dbPath,
});

const User = sequelize.define("users", {
    discord_id: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
        primaryKey: true,
    },
    contract_address: {
        type: DataTypes.STRING(42),
        allowNull: false,
        validate: {
            is: /^0x[a-fA-F0-9]{40}$/
        },
    },
}, { timestamps: false });

const Wallet = sequelize.define("wallets", {
    priv_key: {
        type: DataTypes.STRING(66),
        allowNull: false,
        validate: {
            is: /^0x[a-fA-F0-9]{64}$/
        },
    },
    address: {
        type: DataTypes.STRING(42),
        allowNull: false,
        validate: {
            is: /^0x[a-fA-F0-9]{40}$/
        },
    },
    is_contract: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, { timestamps: false });

User.hasMany(Wallet, {
    foreignKey: "user_id",
});

module.exports = {
    sequelize: sequelize,
    Wallet: Wallet,
    User: User
}