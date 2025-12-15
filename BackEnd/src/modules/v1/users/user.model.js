"use strict"

const { DataTypes } = require("sequelize");
const mysql = require('../../../database/MySql/db')

const options = {}

module.exports = mysql.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    profile: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '/uploads/profiles/profile.png'
    },
    bio: {
        type: DataTypes.TEXT('tiny'),
        allowNull: true,
        validate: {
            len: [0, 100]
        }
    },
    isNotification: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, options)