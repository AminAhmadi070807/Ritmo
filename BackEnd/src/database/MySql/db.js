"use strict"

const { Sequelize } = require('sequelize')

const configs = require('../../config/config.env')

const sequelize = new Sequelize(configs.database.mysqlUri , { dialect: 'mysql', logging: () => {}, })

;(async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ alter: true, logging: () => {} })
        console.log("Connected to mysql successfully")
    }
    catch (error) {
        console.log({ status: 500, database: "MySql", error: error.message || "OoOps unknown server error." })
    }
})()

module.exports = sequelize