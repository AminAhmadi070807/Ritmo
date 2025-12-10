"use strict"

import { modal } from '/scripts/modules/modal.js'

const passwordInput = document.querySelector('input#password-input')
const emailInput = document.querySelector('input#email-input')
const submitButton = document.querySelector('button#submit-btn')

const authentication = async () => {
    try {
        const password = passwordInput.value;
        const email = emailInput.value;

        const response = await fetch('/api/v1/auth/send', {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password, email })
        })
        const result = await response.json()

        console.log(result)

        switch (response.status) {
            case 200:
                modal("success", result.message)
                location.href = result.data.href
                break
            default:
                modal("error", result.message)
                break
        }
    }
    catch (error) {
        modal("error", error.message)
    }
}

submitButton.addEventListener('click', authentication)