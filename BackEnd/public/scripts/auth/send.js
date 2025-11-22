"use strict"

import modal from '/scripts/modules/modal.js'

const passwordInput = document.querySelector('input#password-input')
const emailInput = document.querySelector('input#email-input')
const submitButton = document.querySelector('button#submit-btn')

const authentication = async () => {
    try {
        const password = passwordInput.value;
        const email = emailInput.value;

        const response = await fetch('/auth/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            })
        })
        const result = await response.json()

        console.log(result, response)

        switch (result.status) {
            case 409:
                modal("error", result.message)
                break
            default:
                modal("error", result.message)
                break
        }
    }
    catch (error) {
        console.error(error)
    }
}

submitButton.addEventListener('click', authentication)