"use strict"

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.MYSQL_URI, { dialect: 'mysql', logging: () => {} })

;(async () => {
    try {
        await sequelize.sync({ alter: true, logging: () => {} })
        await sequelize.authenticate()
        console.log("Connected to mysql successfully")
    }
    catch (error) {
        console.log({ status: 500, database: "MySql", error: error.message || "OoOps unknown server error." })
    }
})()

module.exports = sequelize