"use strict"

const configs = require('../../config/config.env')

const Redis = require("ioredis");

const redis = new Redis(configs.database.mongodbUri);

redis.on('connect', () => console.log({ status: 200, database: "Redis", message: "Connected to Redis successfully." }))
redis.on('error', (err) => {
    redis.disconnect()
    console.log({ status: 500, database: "Redis", error: err.message || "OoOps unknown server error." })
})

module.exports = redis