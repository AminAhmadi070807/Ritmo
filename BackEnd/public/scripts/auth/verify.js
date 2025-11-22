"use strict"

import { modal } from '/scripts/modules/modal.js'


const codeInputElem = document.getElementById("code-input");
const verifyCodeBtn = document.getElementById("verify-btn");

codeInputElem.addEventListener("keyup", () => {
    verifyCodeBtn.disabled = codeInputElem.value.length !== 6;
    if (codeInputElem.value.length === 6) verifyCodeBtn.className = "flex items-center justify-center bg-Primary-500 mt-8 cursor-pointer w-full h-12 rounded-lg";
    else verifyCodeBtn.className = "flex items-center justify-center bg-Neutral-800 mt-8 cursor-not-allowed w-full h-12 rounded-lg";
});

const verify = async () => {
    try {
        const code = codeInputElem.value.trim();

        const response = await fetch(`/api/v1/auth/verify/${location.href.split('/').pop()}`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code })
        })
        const result = await response.json()

        switch (response.status) {
            case 500:
            case 409:
            case 403:
            case 400:
                modal("error", result.message)
                break
            case 200:
                modal("success", result.message)
                location.href = '/'
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

verifyCodeBtn.addEventListener('click', verify)