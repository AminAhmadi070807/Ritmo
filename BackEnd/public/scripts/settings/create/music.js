"use strict";


;(async () => {
    try {
        const refresh = await fetch('/api/v1/auth/refresh')

        refresh.status !== 200 && (location.href = '/auth/send')
    }
    catch (error) {
        return model('error', error.message)
    }
})()

let timeout = null;

window.addEventListener('click', async () => {
    try {

        clearTimeout(timeout);

        timeout = setTimeout( async() => {
            const refresh = await fetch('/api/v1/auth/refresh')

            refresh.status !== 200 && (location.href = '/auth/send')
        }, 500);
    }
    catch (error) {
        return model('error', error.message)
    }
})