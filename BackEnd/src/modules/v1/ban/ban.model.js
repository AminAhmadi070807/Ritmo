"use strict"

const { DataTypes } = require('sequelize')
const database = require('../../../database/MySql/db')

module.exports = database.define("Ban", {
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    expireAt: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true
        }
    }
}, {
    tableName: "Bans",
    timestamps: true
})