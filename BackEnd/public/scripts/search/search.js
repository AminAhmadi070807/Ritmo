"use strict"

const musicBtn = document.querySelectorAll('.music-btn')

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

musicBtn.forEach(music => {
    music.addEventListener('click', async () => {
        const refresh = await fetch('/api/v1/auth/refresh')
        if (refresh.status !== 200) return location.href = '/auth/send'

        const response = await fetch(`/api/v1/musics/${music.getAttribute('music-id')}`)
        const data = await response.json();

        document.getElementById('music-player-box').classList.remove("hidden")
        document.getElementById('music-player-box').classList.add("flex-center")

        document.getElementById('music-box').src = data.data.poster
        audio.src = data.data.music
        audio.currentTime = 0
        rangePlayer.style.width = 0 + "%"
        audio.setAttribute('audio-id', data.data._id)
    })
})