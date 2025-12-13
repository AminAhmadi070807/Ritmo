"use strict";

;(async () => {
    try {
        const refresh = await fetch('/api/v1/auth/refresh')

        refresh.status !== 200 && (location.href = '/auth/send')
    }
    catch (error) {
        console.log(error)
    }
})()