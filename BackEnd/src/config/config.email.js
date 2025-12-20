"use strict"

const nodemailer = require('nodemailer')

module.exports = async (email, message, type = "AUTH") => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "", // your email name
                pass: "" // your email password
            }
        })

        const mailOptions = {
            from: "",
            to: email,
            subject: type === "AUTH" ? `کد ورودی شما به ریتمو` : "پساخ به سوال شما از طرف پشتیبانی ریتمو",
            text: type === "AUTH" ? `این کد را در اختیار دیگران قرار ندهید ${message}` : message
        }

        await transporter.sendMail(mailOptions)

        return { status: 200, message: "Sending email successfully." }
    }
    catch (error) {
        return { status: 500, message: error.message || `Problem sending ${message} code to email` }
    }
}
