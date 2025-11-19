"use strict"

const { DataTypes } = require("sequelize");
const mysql = require('../../../database/MySql/db')

const options = {}

module.exports = mysql.define("User", {
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
        validate: {
            is: /^\w+$/
        }
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
        allowNull: false,
        validate: {
            len: [0, 100]
        }
    },
    isNotification: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, options)