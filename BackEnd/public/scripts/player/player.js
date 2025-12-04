"use strict";

const closePlayer = document.getElementById("close-player");
const rangePlayerContainer = document.getElementById("range-player-container");
const rangePlayer = document.getElementById("range-player");
const volumeRangeContainer = document.getElementById("volume-range-container");
const volumeRange = document.getElementById("volume-range");
const nextMusicBtn = document.getElementById("next-music");
const prevMusicBtn = document.getElementById("prev-music");
const volumeIcon = document.getElementById("volume-icon");
const loopMusicBtn = document.getElementById("loop-music");
const shuffleMusicBtn = document.getElementById("random-music");
let shuffleMusicIcon = shuffleMusicBtn.querySelector("svg");
const audio = document.getElementById("audio-play");
const player = document.getElementById("player");
const playerIcon = document.getElementById("play-icon");
const timeStart = document.getElementById("time-music-start");
const timeEnd = document.getElementById("time-total-music");
const playerHeartIcon = document.getElementById("player-heart");
let loopMusicIcon = loopMusicBtn.querySelector("svg");

// create random number
const random = (min = 0, max = 1, floating = false) => {
    if (max < min) [min, max] = [max, min];

    let rand = Math.random() * (max - min) + min;

    return floating ? rand : Math.floor(rand);
};

// video music information
let musicArray = [];

;(async () => {
    try {
        const response = await fetch(`/api/v1/musics/albums/${location.href.split('/').pop()}`)
        const data = await response.json();
        musicArray = data.data.album.musics
    }
    catch (error) {
        console.log()
    }
})()

let playerCalculator;
let volumeCalculator;
let isDrag = false;
let isClicked = false;
let isVolumeDrag = false;
let isVolumeClicked = false;

// update music player bar
const updatePlayerProgress = (e) => {
    if (e.target.id === "range-player" || e.target.id === "range-player-container") {
        playerCalculator = Math.floor((e.offsetX / rangePlayerContainer.offsetWidth) * 100);
        rangePlayer.style.width = playerCalculator + "%";
        localStorage.setItem("audio-time", (playerCalculator / 100) * audio.duration);
        audio.pause();
        playerIcon.setAttribute("href", "#play");
    }
};
// update volume bar
const updateVolumePlayerProgress = (e) => {
    if (
        e.target.id === "volume-range-container" ||
        e.target.id === "volume-range"
    ) {
        volumeCalculator = Math.floor(
            (e.offsetX / volumeRangeContainer.offsetWidth) * 100
        );
        volumeRange.style.width = volumeCalculator + "%";
        if (volumeCalculator > 70) {
            volumeIcon.innerHTML = '<use href="#volume-high"></use>';
        } else if (volumeCalculator > 0 && volumeCalculator < 70) {
            volumeIcon.innerHTML = '<use href="#volume-low"></use>';
        } else {
            volumeIcon.innerHTML = '<use href="#volume-cross"></use>';
        }
        audio.volume = volumeCalculator / 100;
    }
};

// audio pauser
const audioPause = () => {
    localStorage.setItem("audio-time", 0);
    audio.currentTime = 0;
    playerIcon.setAttribute("href", "#pause");
    rangePlayer.style.width = "0%";
    timeStart.innerHTML = "00:00";
    timeEnd.innerHTML = `${formatTime(audio.duration)}`;
};

// audio player
const audioPlayer = () => {
    if (playerIcon.getAttribute("href") === "#play") {
        audio.play();
        audio.currentTime = localStorage.getItem("audio-time");
        playerIcon.setAttribute("href", "#pause");
    } else {
        localStorage.setItem("audio-time", audio.currentTime);
        audio.pause();
        playerIcon.setAttribute("href", "#play");
    }
};

// time player calculator
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};


// forward & back music 10 seconds
const forwardTenMusic = (e) => {
    e.preventDefault()
    if (e.key === "ArrowRight") {
        audio.currentTime += 10;
        localStorage.setItem("audio-time", audio.currentTime);
    } else if (e.key === "ArrowLeft") {
        audio.currentTime -= 10;
        localStorage.setItem("audio-time", audio.currentTime);
    } else if (e.key === "ArrowUp") nextMusic();
    else if (e.key === "ArrowDown") prevMusic();
    else if (e.code === 'Space')audioPlayer()
};

// next music
let musicID = 0;
let musicInfo = null;
let isShuffleMusic;
const nextMusic = () => {
    isShuffleMusic = shuffleMusicIcon.classList.contains("text-Primary-500");
    if (!isShuffleMusic) {
        musicID++;
        if (musicID === musicArray.length) musicID = 0;
        audioPause();
        musicInfo = musicArray[musicID];

        document.getElementById("music-box").setAttribute("src", `${musicInfo.src}`);
        document.getElementById("music-title").innerHTML = `${musicInfo.title}`;
        document.getElementById("music-subtitle").innerHTML = `${musicInfo.subtitle}`;
        audio.setAttribute("src", musicInfo.audio_src);
        audio.play();
    } else shuffleMusic();
};
// prev music
const prevMusic = () => {
    isShuffleMusic = shuffleMusicIcon.classList.contains("text-Primary-500");
    if (!isShuffleMusic) {
        musicID--;
        if (musicID === -1) musicID = musicArray.length - 1;
        audioPause();
        musicInfo = musicArray[musicID];

        document.getElementById("music-box").setAttribute("src", `${musicInfo.src}`);
        document.getElementById("music-title").innerHTML = `${musicInfo.title}`;
        document.getElementById("music-subtitle").innerHTML = `${musicInfo.subtitle}`;
        audio.setAttribute("src", musicInfo.audio_src);
        audio.play();
    } else shuffleMusic();
};

// music loop
let isLoopMusic;
const musicLoop = () => {
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
const shuffleMusic = () => {
    let randomMusicID = random(0, musicArray.length - 1);
    // checks random music id
    if (randomMusicID === RandomID) randomMusicID++;
    else RandomID = randomMusicID;
    musicID = RandomID

    audioPause();
    // crate an object
    let OBJ = musicArray[randomMusicID];

    musicInfoContainer.querySelector("img").src = OBJ.src;
    musicInfoContainer.querySelector("#music-information h3").innerHTML = OBJ.title;
    musicInfoContainer.querySelector("#music-information cite").innerHTML = OBJ.subtitle;
    audio.setAttribute("src", OBJ.audio_src);
    // play new music
    audio.play();
};

// volume silent
const musicSilent = () => {
    if (volumeIcon.innerHTML !== '<use href="#volume-cross"></use>') {
        volumeIcon.innerHTML = '<use href="#volume-cross"></use>';
    } else {
        if (
            volumeRange.style.width < 70 + "%" &&
            volumeRange.style.width > 0 + "%"
        ) {
            volumeIcon.innerHTML = '<use href="#volume-low"></use>';
        } else {
            volumeIcon.innerHTML = '<use href="#volume-high"></use>';
        }
    }
    audio.muted = !audio.muted;
};


// close player bottom
closePlayer.addEventListener("click", () => {
    document.getElementById("audio-player").classList.toggle("translate-y-[130px]");
    closePlayer.querySelector("svg").classList.toggle("rotate-180");
});

player.addEventListener("click", audioPlayer);


rangePlayerContainer.addEventListener("mousedown", () => (isDrag = true));

rangePlayerContainer.addEventListener("mouseup", () => {
    isDrag = false;
    isClicked = false;
});
rangePlayerContainer.addEventListener("mousemove", (e) => {
    if (isDrag && isClicked) updatePlayerProgress(e);
});
rangePlayerContainer.addEventListener("click", (e) => {
    isClicked = true;
    if (isDrag) updatePlayerProgress(e);
});

volumeRangeContainer.addEventListener("mousedown", (e) => {
    isVolumeDrag = true;
    isVolumeClicked = true;
    updateVolumePlayerProgress(e);
});
volumeRangeContainer.addEventListener("mouseup", () => {
    isVolumeClicked = false;
    isVolumeDrag = false;
});
volumeRangeContainer.addEventListener("mousemove", (e) => {
    if (isVolumeClicked && isVolumeDrag) updateVolumePlayerProgress(e);
});
volumeRangeContainer.addEventListener("click", (e) => {
    if (isVolumeClicked && isVolumeDrag) updateVolumePlayerProgress(e);
});

let isLoop;
let isShuffle;
audio.addEventListener("timeupdate", () => {
    isLoop = loopMusicIcon.classList.contains("text-Neutral-300");
    isShuffle = shuffleMusicBtn
        .querySelector("svg")
        .classList.contains("text-Primary-500");

    let audioStart = audio.currentTime;
    let audioEnd = audio.duration;
    rangePlayer.style.width = `${(audioStart / audioEnd) * 100}%`;

    timeStart.innerHTML = `${formatTime(audioStart)}`;
    localStorage.setItem("audio-time", audio.currentTime);

    if (audio.ended && isLoop && !isShuffle) {
        nextMusic();
    } else if (audio.ended && isLoop && isShuffle) {
        // audio.loop = false;
        shuffleMusic();
    }
});

audio.addEventListener("loadedmetadata", () => {
    timeEnd.innerHTML = `${formatTime(audio.duration)}`;
    timeEnd.setAttribute("datetime", `${formatTime(audio.duration)}`);
});

playerHeartIcon.addEventListener("click", () => {
    let heart = playerHeartIcon.querySelector("use");
    let heartMode = heart.getAttribute("href");
    heartMode === "#heart"
        ? heart.setAttribute("href", "#heart-solid")
        : heart.setAttribute("href", "#heart");
});

nextMusicBtn.addEventListener("click", nextMusic);
prevMusicBtn.addEventListener("click", prevMusic);

loopMusicBtn.addEventListener("click", musicLoop);

volumeIcon.addEventListener("click", musicSilent);

window.addEventListener("keydown", forwardTenMusic);

shuffleMusicBtn.addEventListener("click", () => {
    shuffleMusicIcon.classList.toggle("text-Neutral-300");
    shuffleMusicIcon.classList.toggle("text-Primary-500");
    loopMusicIcon.classList.remove("text-Primary-500");
    loopMusicIcon.classList.add("text-Neutral-300");
    audio.loop = false;
});

// show modal in size mobile
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
