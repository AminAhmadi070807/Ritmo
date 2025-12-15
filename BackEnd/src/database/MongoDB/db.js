"use strict";

const configs = require("../../config/config.env");

const mongoose = require("mongoose");

;(async () => {
    try {
        await mongoose.connect(configs.database.mongodbUri)
        console.log("Connected to mongodb successfully.")
    }
    catch (error) {
        await mongoose.disconnect()
        console.log({ status: 500, database: "MongoDB", error: error.message || "OoOps Unknown server error" })
    }
})()