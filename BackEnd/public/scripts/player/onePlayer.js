"use strict";

const rangePlayerContainer = document.getElementById("range-player-container");
const rangePlayer = document.getElementById("range-player");
const nextMusicBtn = document.getElementById("next-music");
const prevMusicBtn = document.getElementById("prev-music");
const loopMusicBtn = document.getElementById("loop-music");
const shuffleMusicBtn = document.getElementById("random-music");
let shuffleMusicIcon = shuffleMusicBtn.querySelector("svg");
const audio = document.getElementById("audio-play");
const player = document.getElementById("player");
const playerIcon = document.getElementById("play-icon");
const timeStart = document.getElementById("time-music-start");
const timeEnd = document.getElementById("time-total-music");
let loopMusicIcon = loopMusicBtn.querySelector("svg");

console.log(musicPlayBtn);

// create random number
const random = (min = 0, max = 1, floating = false) => {
    if (max < min) [min, max] = [max, min];

    let rand = Math.random() * (max - min) + min;

    return floating ? rand : Math.floor(rand);
};

let playerCalculator;
let isDrag = false;
let isClicked = false;

// update music player bar
const updatePlayerProgress = async (e) => {
    if (e.target.id === "range-player" || e.target.id === "range-player-container") {
        playerCalculator = Math.floor((e.offsetX / rangePlayerContainer.offsetWidth) * 100);
        rangePlayer.style.width = playerCalculator + "%";
        localStorage.setItem("audio-time", (playerCalculator / 100) * audio.duration);
        audio.pause();
        playerIcon.setAttribute("href", "#play-music");
    }
};

// audio pauser
const audioPause = async () => {
    audio.currentTime = 0;
    playerIcon.setAttribute("href", "#pause");
    rangePlayer.style.width = "0%";
    timeStart.innerHTML = "00:00";
    timeEnd.innerHTML = `${formatTime(audio.duration)}`;
    localStorage.setItem("audio-time", audio.currentTime);

    const audioId = audio.getAttribute('audio-id')

    const response = await fetch(`/api/v1/musics/lastHeard/${audioId}`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            time: audio.currentTime,
            play: true
        })
    })

    switch (response.status) {
        case 401:
            const refresh = await fetch('/api/v1/auth/refresh')
            if (refresh.status === 404) return location.href = '/'
            await fetch(`/api/v1/musics/lastHeard/${audioId}`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    time: audio.currentTime,
                    play: true
                })
            })
    }
};

// audio player
const audioPlayer = async () => {
    if (playerIcon.getAttribute("href") === "#play-music") {
        audio.play();
        audio.currentTime = localStorage.getItem("audio-time") || 0;
        playerIcon.setAttribute("href", "#pause");
    }
    else {
        localStorage.setItem("audio-time", audio.currentTime);
        audio.pause();
        playerIcon.setAttribute("href", "#play-music");
    }
};

// forward & back music 10 seconds
const forwardTenMusic = async (e) => {
    if (e.key === "ArrowRight") {
        e.preventDefault()
        audio.currentTime += 10;
        localStorage.setItem("audio-time", audio.currentTime);
    }
    else if (e.key === "ArrowLeft") {
        e.preventDefault()
        audio.currentTime -= 10;
        localStorage.setItem("audio-time", audio.currentTime);
    }
    else if (e.key === "ArrowUp") {
        e.preventDefault()
        return await nextMusic();
    }
    else if (e.key === "ArrowDown") {
        e.preventDefault()
        return await prevMusic();
    }
    else if (e.code === 'Space') {
        e.preventDefault()
        return await audioPlayer()
    }
};

// next music
let musicID = 0;
let musicInfo = null;
let isShuffleMusic;
const nextMusic = async () => {
    isShuffleMusic = shuffleMusicIcon.classList.contains("text-Primary-500");
    if (!isShuffleMusic) {
        musicID++;
        if (musicID === musicArray.length) musicID = 0;
        await audioPause();
        musicInfo = musicArray[musicID];

        document.getElementById("music-box").setAttribute("src", `${musicInfo.poster}`);
        document.getElementById("music-title").innerHTML = `${musicInfo.title}`;
        document.getElementById("music-subtitle").innerHTML = `${musicInfo.artist}`;
        audio.setAttribute("src", musicInfo.music);
        audio.setAttribute('audio-id', musicInfo._id);
        audio.play();
    }
    else await shuffleMusic();
};
// prev music
const prevMusic = async () => {
    isShuffleMusic = shuffleMusicIcon.classList.contains("text-Primary-500");
    if (!isShuffleMusic) {
        musicID--;
        if (musicID === -1) musicID = musicArray.length - 1;
        await audioPause();
        musicInfo = musicArray[musicID];

        document.getElementById("music-box").setAttribute("src", `${musicInfo.poster}`);
        document.getElementById("music-title").innerHTML = `${musicInfo.title}`;
        document.getElementById("music-subtitle").innerHTML = `${musicInfo.artist}`;
        audio.setAttribute("src", musicInfo.music);
        audio.setAttribute('audio-id', musicInfo._id);
        audio.play();
    } else await shuffleMusic();
};

// music loop
let isLoopMusic;
const musicLoop = async () => {
    shuffleMusicIcon.classList.add("text-Neutral-300");
    shuffleMusicIcon.classList.remove("text-Primary-500");
    loopMusicIcon.classList.toggle("text-Primary-500");
    loopMusicIcon.classList.toggle("text-Neutral-300");

    isLoopMusic = loopMusicIcon.classList.contains("text-Primary-500");

    isLoopMusic ? (audio.loop = true) : (audio.loop = false);
};

// shuffle music
let musicInfoContainer = document.getElementById("music-information-container");
let RandomID = 0;
const shuffleMusic = async () => {
    let randomMusicID = random(0, musicArray.length);
    // checks random music id
    if (randomMusicID === RandomID) randomMusicID++;
    else RandomID = randomMusicID;
    musicID = RandomID

    await audioPause();
    // crate an object
    let OBJ = musicArray[randomMusicID];

    musicInfoContainer.querySelector("img").src = OBJ.poster;
    musicInfoContainer.querySelector("#music-information h3").innerHTML = OBJ.title;
    musicInfoContainer.querySelector("#music-information cite").innerHTML = OBJ.artist;
    audio.setAttribute("src", OBJ.music);
    // play new music
    audio.play();
};

player.addEventListener("click", audioPlayer);


rangePlayerContainer.addEventListener("mousedown", () => (isDrag = true));

rangePlayerContainer.addEventListener("mouseup", () => {
    isDrag = false;
    isClicked = false;
});
rangePlayerContainer.addEventListener("mousemove", async(e) => {
    if (isDrag && isClicked) await updatePlayerProgress(e);
});
rangePlayerContainer.addEventListener("click", async (e) => {
    isClicked = true;
    if (isDrag) await updatePlayerProgress(e);
});

let isLoop;
let isShuffle;
audio.addEventListener("timeupdate", () => {
    isLoop = loopMusicIcon.classList.contains("text-Neutral-300");
    isShuffle = shuffleMusicBtn.querySelector("svg").classList.contains("text-Primary-500");

    let audioStart = audio.currentTime;
    let audioEnd = audio.duration;
    rangePlayer.style.width = `${(audioStart / audioEnd) * 100}%`;

    timeStart.innerHTML = `${formatTime(audioStart)}`;

    if (audio.ended && isLoop && !isShuffle) nextMusic();
    else if (audio.ended && isLoop && isShuffle) shuffleMusic();
});

audio.addEventListener("loadedmetadata", () => {
    timeEnd.innerHTML = `${formatTime(audio.duration)}`;
    timeEnd.setAttribute("datetime", `${formatTime(audio.duration)}`);
});

nextMusicBtn.addEventListener("click", nextMusic);
prevMusicBtn.addEventListener("click", prevMusic);

loopMusicBtn.addEventListener("click", musicLoop);

window.addEventListener("keydown", forwardTenMusic);

shuffleMusicBtn.addEventListener("click", () => {
    shuffleMusicIcon.classList.toggle("text-Neutral-300");
    shuffleMusicIcon.classList.toggle("text-Primary-500");
    loopMusicIcon.classList.remove("text-Primary-500");
    loopMusicIcon.classList.add("text-Neutral-300");
    audio.loop = false;
});

window.toggleIconsMenu = function (event) {
    let musicList = event.currentTarget.parentElement.parentElement;
    let musicList_2 = musicList.parentElement.querySelector("#music-list-menu.opacity-100");

    let musicListMenu = musicList.querySelector("#music-list-menu");
    musicListMenu.classList.toggle("hidden");
    musicListMenu.classList.toggle("opacity-0");
    musicListMenu.classList.toggle("opacity-100");
    if (musicList_2) {
        musicList_2.classList.add("hidden");
        musicList_2.classList.add("opacity-0");
        musicList_2.classList.remove("opacity-100");
    } else {
        musicListMenu.classList.remove("hidden");
        musicListMenu.classList.remove("opacity-0");
        musicListMenu.classList.add("opacity-100");
    }
};
