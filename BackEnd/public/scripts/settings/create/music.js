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

window.addEventListener('click', async () => {
    try {
        const refresh = await fetch('/api/v1/auth/refresh')

        refresh.status !== 200 && (location.href = '/auth/send')
    }
    catch (error) {
        return model('error', error.message)
    }
})