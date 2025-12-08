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
    },
    zarinPal: {
        zarinPalRoute: process.env.ZARIN_PAL_PAYMENT_ROUTE,
        zarinPalRouteVerify: process.env.ZARIN_PAL_PAYMENT_ROUTE_VERIFY,
        zarinPalAddress: process.env.ZARIN_PAL_PAYMENT_ADDRESS,
        zarinPalCallbackRoute: process.env.ZARIN_PAL_PAYMENT_CALBACK_URL,
        zarinPalMerchantId: process.env.ZARIN_PAL_PAYMENT_MERCHANT_ID,
    }
}