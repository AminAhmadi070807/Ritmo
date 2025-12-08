"use strict"

const configs = require('../config/config.env');
const axios = require('axios');

module.exports.payment = async (price, description) => {
    try {
        if (!price || !description) return { status: 400, message: "price and description must be required." }

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
}