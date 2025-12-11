"use strict";

;(async () => {
    try {
        const refresh = await fetch('/api/v1/auth/refresh')

        if (refresh.status !== 200) return location.href = '/auth/send'

        const response = await fetch('/api/v1/users/Me')
        const data = await response.json()

        document.getElementById('profile').src = data.data.profile
        document.getElementById('profile').alt = data.data.fullName

        document.getElementById('profile-title').innerText = data.data.fullName

        document.getElementById('profile-user-name').innerText = data.data.username + "@"
        document.getElementById('profile-email').innerText = data.data.email

        document.getElementById('profile-role').innerText = `${data.data.role[0] === "ADMIN" ? "ادمین" : data.data.role[0] === "ARTIST" ? "هنرمند" : "کاربر"}`
    }
    catch (error) {
        console.error(error)
    }
})()