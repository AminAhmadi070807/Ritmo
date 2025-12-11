"use strict"

;(async () => {
    try {
        const refresh = await fetch('/api/v1/auth/refresh')

        if (refresh.status !== 200) return location.href = '/auth/send'

        const response = await fetch('/api/v1/users/Me')
        const data = await response.json()

        document.getElementById('profile').src = data.data.profile
        document.getElementById('profile').alt = data.data.fullName

        document.getElementById('profile-title').innerText = data.data.fullName

        document.getElementById('profile-role').innerText = `${data.data.role[0] === "ADMIN" ? "ادمین" : data.data.role[0] === "ARTIST" ? "هنرمند" : "کاربر"}`

        const responseLikeSong = await fetch('/api/v1/musics/likeSongs')
        const dataLikeSong = await responseLikeSong.json()

        document.getElementById('profile-number-of-heart-music').innerText = dataLikeSong.data.numberOfUserLikeSong
        document.getElementById('profile-number-of-heart-music').value = dataLikeSong.data.numberOfUserLikeSong

        const responseDownload = await fetch('/api/v1/musics/downloads')
        const dataDownload = await responseDownload.json()

        document.getElementById('profile-number-of-download').innerText = dataDownload.data.count
        document.getElementById('profile-number-of-download').value = dataDownload.data.count
    }
    catch (error) {
        console.error(error);
    }
})()