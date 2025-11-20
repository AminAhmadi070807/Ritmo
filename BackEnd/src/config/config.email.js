"use strict"

const nodemailer = require('nodemailer')

module.exports = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "aminahmdi65@gmail.com",
                pass: "hnuxmjwpmuuswgdn"
            }
        })

        const mailOptions = {
            from: "aminahmdi65@gmail.com",
            to: email,
            subject: `کد ورودی شما به ریتمو`,
            text: `این کد را در اختیار دیگران قرار ندهید ${otp}`
        }

        await transporter.sendMail(mailOptions)

        return { status: 200, message: "Sending email successfully." }
    }
    catch (error) {
        return { status: 500, message: error.message || "Problem sending OTP code to email" }
    }
}