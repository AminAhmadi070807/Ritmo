"use strict";

const { DataTypes } = require('sequelize')
const database = require('../../../../database/MySql/db')

module.exports = database.define("MusicCategory", {
    id: {
        type: DataTypes.NUMBER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    href: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { timestamps: true })