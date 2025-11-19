"use strict"

const configs = require('../../config/config.env')

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(configs.database.mysqlUri, { dialect: 'mysql' })

;(async () => {
    try {
        await sequelize.authenticate()
        console.log({ status: 200, database: "MySql", message: "Connected to MySql successfully.." })
    }
    catch (error) {
        await sequelize.close()
        console.log({ status: 500, database: "MySql", error: error.message || "OoOps unknown server error." })
    }
})()

module.exports = sequelize