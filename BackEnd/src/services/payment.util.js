"use strict"

const configs = require('../config/config.env');
const axios = require('axios');

;(async (price = 100_000, description = "this description for testing") => {
    try {
        const response = await axios.post(configs.zarinPal.zarinPalRoute, {
            merchant_id: configs.zarinPal.zarinPalMerchantId,
            amount: +price,
            currency: "IRT",
            description,
            callback_url: configs.zarinPal.zarinPalCallbackRoute
        })
        const data = await response.data;

        if (data.data?.message !== 'Success') return { status: 500, message: data.errors[0].message };

        return { status: 200, authority: data.data.authority, redirect: configs.zarinPal.zarinPalAddress + data.data.authority }
    }
    catch (error) {
        return { status: 500, message: error.message || "OoOps unknown server error" };
    }
})()