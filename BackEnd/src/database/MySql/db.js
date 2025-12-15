"use strict"

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('ritmo', 'root', '' , { dialect: 'mysql', logging: () => {}, })

;(async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ alter: false, logging: () => {} })
        console.log("Connected to mysql successfully")
    }
    catch (error) {
        console.log({ status: 500, database: "MySql", error: error.message || "OoOps unknown server error." })
    }
})()

module.exports = sequelize