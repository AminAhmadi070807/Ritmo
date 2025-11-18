"use strict"

module.exports = {
    database:{
        mongodbUri: process.env.MONGO_URI,
        redisUri: process.env.REDIS_URI,
        mysqlUri: process.env.MYSQL_URI
    },
    auth: {
        accessSecretKey: process.env.ACCESS_TOKEN_SEKCET_KEY,
        accessExpiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
        refreshSecretKey: process.env.REFRESH_TOKEN_EXPIRE_IN,
        refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRE_IN
    }
}