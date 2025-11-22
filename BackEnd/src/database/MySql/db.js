"use strict"

const { Sequelize } = require('sequelize')


const sequelize = new Sequelize('ritmo', 'root', '', { dialect: 'mysql', logging: false })

;(async () => {
    try {
        await sequelize.sync({ alter: false, logging: false })
        await sequelize.authenticate()
        // console.log("Connected to mysql successfully")
    }
    catch (error) {
        await sequelize.close()
        console.log({ status: 500, database: "MySql", error: error.message || "OoOps unknown server error." })
    }
})()

module.exports = sequelize