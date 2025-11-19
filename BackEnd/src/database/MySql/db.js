"use strict"

const configs = require('../../config/config.env')

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(configs.database.mysqlUri, { dialect: 'mysql', password: "", username: "root" })

;(async () => {
    try {
        await sequelize.sync({ alter: false, logging: false })
        await sequelize.authenticate()
        console.log("Connected to mysql successfully")
    }
    catch (error) {
        await sequelize.close()
        console.log({ status: 500, database: "MySql", error: error.message || "OoOps unknown server error." })
    }
})()

module.exports = sequelize