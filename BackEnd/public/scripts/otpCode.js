"use strict"

const $ = document

const codeInputElem = $.getElementById("code-input");
const registerBtnCodeInput = $.getElementById("register-btn");

codeInputElem.addEventListener("keyup", () => {
    registerBtnCodeInput.disabled = codeInputElem.value.length !== 6;
    if (codeInputElem.value.length === 6) registerBtnCodeInput.className = "flex items-center justify-center bg-Primary-500 mt-8 cursor-pointer w-full h-12 rounded-lg";
    else registerBtnCodeInput.className = "flex items-center justify-center bg-Neutral-800 mt-8 cursor-not-allowed w-full h-12 rounded-lg";
});

window.addEventListener('load', () => document.querySelector('form').action = location.href)