"use strict"

const $ = document

const codeInputElem = $.getElementById("code-input");
const registerBtnCodeInput = $.getElementById("register-btn");

codeInputElem.addEventListener("keyup", () => {
    registerBtnCodeInput.disabled = codeInputElem.value.length === 5;
    if (codeInputElem.value.length === 5) registerBtnCodeInput.className = "flex items-center justify-center bg-Primary-500 mt-8 cursor-pointer w-full h-12 rounded-lg";
    else registerBtnCodeInput.className = "flex items-center justify-center bg-Neutral-800 mt-8 cursor-not-allowed w-full h-12 rounded-lg";
});

registerBtnCodeInput.addEventListener("click", () => {
    const now = new Date();
    now.setFullYear(now.getFullYear() + 1);
    if (!$.cookie) {
        $.cookie = `isRegister=true;expires=${now.toUTCString()};path=/`;
    }
    location.href = "landing-page.html";
});