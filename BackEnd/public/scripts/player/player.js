"use strict";

import { Footer } from "../../../../component/footer.js";
import { Index_Navbar } from "../../../../component/index_navbar/index_navbar.js";

window.customElements.define('custom-footer', Footer)
window.customElements.define("custom-navbar", Index_Navbar);

const $ = document;
const menuApp = $.getElementById("menu-app");
const menuLine = $.getElementById("menu-line");
const closePlayer = $.getElementById("close-player");
const rangePlayerContainer = $.getElementById("range-player-container");
const rangePlayer = $.getElementById("range-player");
const volumeRangeContainer = $.getElementById("volume-range-container");
const volumeRange = $.getElementById("volume-range");
const nextMusicBtn = $.getElementById("next-music");
const prevMusicBtn = $.getElementById("prev-music");
const volumeIcon = $.getElementById("volume-icon");
const loopMusicBtn = $.getElementById("loop-music");
const shuffleMusicBtn = $.getElementById("random-music");
let shuffleMusicIcon = shuffleMusicBtn.querySelector("svg");
const audio = $.getElementById("audio-play");
const player = $.getElementById("player");
const playerIcon = $.getElementById("play-icon");
const timeStart = $.getElementById("time-music-start");
const timeEnd = $.getElementById("time-total-music");
const downloadIcon = $.getElementById("download-icon");
const playerHeartIcon = $.getElementById("player-heart");
let loopMusicIcon = loopMusicBtn.querySelector("svg");

// video music information
const trendingVideoMusicInfo = [
    {
        id: 1,
        title: "اگه میموندی",
        subtitle: "اشوان",
        src: "../../../image/Music Vide File/1.png",
        audio_src: "../../../mp4/Ashvan - Age Mimoondi (320).mp3",
    },
    {
        id: 2,
        title: "سوگند",
        subtitle: "گوگوش",
        src: "../../../image/Music Vide File/2.png",
        audio_src: "../../../mp4/Googoosh-Sogand-abanmusics.com-320.mp3",
    },
    {
        id: 3,
        title: "بشین تماشایت کنم",
        subtitle: "آرمان گرشاسبی",
        src: "../../../image/Music Vide File/3.png",
        audio_src:
            "../../../mp4/Arman Garshasbi - Benshin Tamashayat Konam (320).mp3",
    },
    {
        id: 4,
        title: "حق بده",
        subtitle: "شادمهر عقیلی",
        src: "../../../image/Music Vide File/4.png",
        audio_src: "../../../mp4/Shadmehr Aghili - Hagh Bedeh (128).mp3",
    },
    {
        id: 5,
        title: "کجایی",
        subtitle: "عرفان طهماسبی",
        src: "../../../image/Music Vide File/5.png",
        audio_src: "../../../mp4/Erfan Tahmasbi - Kojaei.mp3",
    },
    {
        id: 6,
        title: "خورد",
        subtitle: "ستین",
        src: "../../../image/Music Vide File/6.png",
        audio_src: "../../../mp4/Satin - Khoord (320).mp3",
    },
    {
        id: 7,
        title: "عاشق شدم",
        subtitle: "سوگند",
        src: "../../../image/Music Vide File/7.png",
        audio_src: "../../../mp4/Sogand - Ashegh Shodam.mp3",
    },
    {
        id: 8,
        title: "کی اشکاتو پاک میکنه",
        subtitle: "ابی",
        src: "../../../image/Music Vide File/8.png",
        audio_src: "../../../mp4/Ebi - Ki Ashkato Pak Mikone [320].mp3",
    },
    {
        id: 9,
        title: "انقضا",
        subtitle: "شروین حاجی پور",
        src: "../../../image/Music Vide File/9.png",
        audio_src: "../../../mp4/Shervin - Engheza.mp3",
    },
];

let playerCalculator;
let volumeCalculator;
let isDrag = false;
let isClicked = false;
let isVolumeDrag = false;
let isVolumeClicked = false;

// update music player bar
const updatePlayerProgress = (e) => {
    if (
        e.target.id === "range-player" ||
        e.target.id === "range-player-container"
    ) {
        playerCalculator = Math.floor(
            (e.offsetX / rangePlayerContainer.offsetWidth) * 100
        );
        rangePlayer.style.width = playerCalculator + "%";
        localStorage.setItem(
            "audio-time",
            (playerCalculator / 100) * audio.duration
        );
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

// crate video music element
const videoMusicCreate = (src, title, subtitle, id) => {
    $.getElementById(id).insertAdjacentHTML(
        "beforeend",
        `
          <div class="swiper-slide">
            <a href="../video-player/video-player.html">
              <div class="min-w-[368px] max-w-[368px] w-[368px]">
                <img src="${src}" class="object-cover min-w-[368px] max-w-[368px] w-[368px]" alt="${title} ${subtitle}">
                <div class="flex items-center justify-between mt-4 px-4">
                  <div>
                    <h3 class="font-Pelak_Bold">${title}</h3>
                    <cite class="block font-Pelak_Regular text-sm text-Neutral-300 mt-2">${subtitle}</cite>
                  </div>
                  <svg class="size-6 text-Neutral-300"><use href="#heart"></use></svg>
                </div>
              </div>
            </a>
          </div>
          `
    );
};

// create video music app mode element
const videoMusicAppMode = () => {
    $.getElementById("all-video-music-container").innerHTML = "";

    menuApp.classList.add("text-Primary-500");
    menuLine.classList.remove("text-Primary-500");

    localStorage.setItem("video-musci-mode", "app");

    $.getElementById("all-video-music-container").innerHTML = "";

    trendingVideoMusicInfo.forEach((info) => {
        $.getElementById("all-video-music-container").insertAdjacentHTML(
            "beforeend",
            `
      <a href="../video-player/video-player.html">
        <div class="min-w-[368px] max-w-[368px] w-[368px]">
          <img src="${info.src}" class="object-cover min-w-[368px] max-w-[368px] w-[368px]" alt="${info.title} ${info.subtitle}">
          <div class="flex items-center justify-between mt-4 px-4">
            <div>
              <h4 class="font-Pelak_Bold">${info.title}</h4>
              <cite class="block font-Pelak_Regular text-sm text-Neutral-300 mt-2">${info.subtitle}</cite>
            </div>
            <svg class="size-6 text-Neutral-300" onclick="likeItem(event, 'app')"><use href="#heart"></use></svg>
          </div>
        </div>
      </a>
            `
        );
    });
};

// create video music line mode element
const videoMusciLineMode = () => {
    $.getElementById("all-video-music-container").innerHTML = "";

    menuLine.classList.add("text-Primary-500");
    menuApp.classList.remove("text-Primary-500");

    localStorage.setItem("video-musci-mode", "line");

    trendingVideoMusicInfo.forEach((info) => {
        $.getElementById("all-video-music-container").insertAdjacentHTML(
            "beforeend",
            `  
      <div id="lest-heard-music" class="flex items-center w-full h-20 justify-between border-b-2 border-b-Neutral-800 py-2 px-6 md:px-8">
        <div class="flex gap-x-4 min-w-50 md:min-w-100 items-center">
          <data value="${info.id}" class="font-FA_Pelak_Regular text-xl">${
                info.id
            }</data>
          <img src="${
                info.src
            }" class="size-16 max-w-16 min-w-16 max-h-16 min-h-16 rounded-lg object-cover" alt="${
                info.title + info.subtitle
            }"/>
          <div id="music-information" class="h-14 w-50">
            <h4 class="font-Pelak_Bold text-sm sm:text-base md:text-lg">${
                info.title
            }</h4>
            <cite class="font-Pelak_Regular text-xs sm:text-sm md:text-base text-Neutral-300 mt-1">${
                info.subtitle
            }</cite>
          </div>
        </div>
        <div class="hidden md:flex items-center w-100 justify-between">
          <div class="flex gap-x-4 items-center">
            <a href="#"><svg class="size-6 text-Neutral-300" onclick="likeItem(event)"><use href="#heart"></use></svg></a>
            <a href="${
                info.audio_src
            }" download><svg class="size-6 text-Neutral-300"><use href="#download-01"></use></svg></a>
            <a href="#"><svg class="size-6 text-Neutral-300"><use href="#add-circle"></use></svg></a>
            <a href="#"><svg class="size-6 text-Neutral-300"><use href="#menu-queue"></use></svg></a>
          </div>
            <div class="ps-10">
              <time datetime="00:01:41" class="font-Pelak_Medium text-base">${formatTime(
                Math.random() * 500
            )}</time>
            </div>
          </div>
          <div id="music-list-menu" class="absolute hidden opacity-0 transition-all duration-300 left-25 size-50 min-w-50 min-h-50 bg-transparent-2 rounded-lg md:hidden ms-auto mt-25">
            <div class="flex flex-col gap-y-4 justify-center items-between p-5 text-white">
              <a href="../LikedSongs/LikedSongs.html" class="flex items-center gap-x-3 font-Pelak_Regular text-sm">
                <svg class="size-6"><use href="#heart"></use></svg>
                علاقه مندی ها
              </a>
              <a href="${
                info.audio_src
            }" download class="flex items-center gap-x-3 font-Pelak_Regular text-sm">
                <svg class="size-6"><use href="#download-01"></use></svg>
                دانلود
              </a>
              <a href="#" class="flex items-center gap-x-3 font-Pelak_Regular text-sm">
                <svg class="size-6"><use href="#add-circle"></use></svg>
                افزودن به لیست
              </a>
              <a href="#" class="flex items-center gap-x-3 font-Pelak_Regular text-sm">
                <svg class="size-6"><use href="#menu-queue"></use></svg>
                افزودن به پلی لیست
              </a>
            </div>
          </div>
          <div class="flex items-center justify-center md:hidden">
            <svg onclick="toggleIconsMenu(event)" class="size-7 transform rotate-90"><use href="#three-pin"></use></svg>
          </div>
      </div> 
        `
        );
    });
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
        if (musicID === trendingVideoMusicInfo.length) musicID = 0;
        audioPause();
        musicInfo = trendingVideoMusicInfo[musicID];

        $.getElementById("music-box").setAttribute("src", `${musicInfo.src}`);
        $.getElementById("music-title").innerHTML = `${musicInfo.title}`;
        $.getElementById("music-subtitle").innerHTML = `${musicInfo.subtitle}`;
        audio.setAttribute("src", musicInfo.audio_src);
        audio.play();
    } else shuffleMusic();
};
// prev music
const prevMusic = () => {
    isShuffleMusic = shuffleMusicIcon.classList.contains("text-Primary-500");
    if (!isShuffleMusic) {
        musicID--;
        if (musicID === -1) musicID = trendingVideoMusicInfo.length - 1;
        audioPause();
        musicInfo = trendingVideoMusicInfo[musicID];

        $.getElementById("music-box").setAttribute("src", `${musicInfo.src}`);
        $.getElementById("music-title").innerHTML = `${musicInfo.title}`;
        $.getElementById("music-subtitle").innerHTML = `${musicInfo.subtitle}`;
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
let musicInfoContainer = $.getElementById("music-information-container");
let RandomID = 0;
const shuffleMusic = () => {
    let randomMusicID = random(0, trendingVideoMusicInfo.length - 1);
    // checks random music id
    if (randomMusicID === RandomID) randomMusicID++;
    else RandomID = randomMusicID;
    musicID = RandomID

    audioPause();
    // crate an object
    let OBJ = trendingVideoMusicInfo[randomMusicID];

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

// download music
let downloadEvent;
let downloadData;
let musicDownloadInfo = [];
const downloadMusic = async (e) => {
    downloadEvent = e.target.parentElement.parentElement.parentElement;
    if (e.target.tagName === "use") {
        downloadData =
            await downloadEvent.parentElement.parentElement.querySelector(
                "#music-information"
            );
    } else if (e.target.tagName === "svg") {
        downloadData = await downloadEvent.parentElement.querySelector(
            "#music-information"
        );
    } else if (e.target.tagName === "a") {
        downloadData = await downloadEvent.querySelector("#music-information");
    }

    let title = downloadData.querySelector("h3").innerHTML.trim();
    let artist = downloadData.querySelector("cite").innerHTML.trim();

    let MusicData = trendingVideoMusicInfo.filter((info) => {
        return info.title === title && info.subtitle === artist;
    });

    let isDownloadMusic = musicDownloadInfo.some((music) => {
        return music.id === MusicData[0].id;
    });
    if (!isDownloadMusic) {
        musicDownloadInfo.push(MusicData[0]);
    }
    localStorage.setItem("download", JSON.stringify(musicDownloadInfo));
};

// create video musci for trending video music element
trendingVideoMusicInfo.forEach((info) => {
    $.getElementById("all-video-music-container").insertAdjacentHTML(
        "beforeend",
        `
      <a href="../video-player/video-player.html">
        <div class="min-w-[368px] max-w-[368px] w-[368px]">
          <img src="${info.src}" class="object-cover min-w-[368px] max-w-[368px] w-[368px]" alt="${info.title} ${info.subtitle}">
          <div class="flex items-center justify-between mt-4 px-4">
            <div>
              <h3 class="font-Pelak_Bold">${info.title}</h3>
              <cite class="block font-Pelak_Regular text-sm text-Neutral-300 mt-2">${info.subtitle}</cite>
            </div>
            <svg class="size-6 text-Neutral-300"><use href="#heart"></use></svg>
          </div>
        </div>
      </a>
          `
    );
});

// close player bottom
closePlayer.addEventListener("click", () => {
    $.getElementById("audio-player").classList.toggle("translate-y-[130px]");
    closePlayer.querySelector("svg").classList.toggle("rotate-180");
});

menuApp.addEventListener("click", videoMusicAppMode);

menuLine.addEventListener("click", videoMusciLineMode);

player.addEventListener("click", audioPlayer);

trendingVideoMusicInfo.forEach((el) => {
    videoMusicCreate(
        el.src,
        el.title,
        el.subtitle,
        "trending-video-music-container"
    );
    videoMusicCreate(
        el.src,
        el.title,
        el.subtitle,
        "RecentlyPublished-video-music-container"
    );
});

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

downloadIcon.addEventListener("click", downloadMusic);

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
    let musicList;
    let musciList_2;
    if (event.target.tagName === "use") {
        musicList = event.target.parentElement.parentElement.parentElement;
        musciList_2 = musicList.parentElement.querySelector(
            "#music-list-menu.opacity-100"
        );
    } else {
        musicList = event.target.parentElement.parentElement;
        musciList_2 = musicList.parentElement.querySelector(
            "#music-list-menu.opacity-100"
        );
    }

    let musicListMenu = musicList.querySelector("#music-list-menu");
    musicListMenu.classList.toggle("hidden");
    musicListMenu.classList.toggle("opacity-0");
    musicListMenu.classList.toggle("opacity-100");
    if (musciList_2) {
        musciList_2.classList.add("hidden");
        musciList_2.classList.add("opacity-0");
        musciList_2.classList.remove("opacity-100");
    } else {
        musicListMenu.classList.remove("hidden");
        musicListMenu.classList.remove("opacity-0");
        musicListMenu.classList.add("opacity-100");
    }
};

// change color heart icon & save to localstorage
let elementLikedData = [];
window.likeItem = (e) => {
    e.preventDefault();
    let heartIcon;
    let heartIcon_2;

    let musicInfo;
    let title;
    let artist;

    if (e.target.tagName === "use") {
        heartIcon = e.target.parentElement;
        heartIcon_2 = heartIcon.innerHTML.trim();
    } else {
        heartIcon = e.target;
        heartIcon_2 = heartIcon.innerHTML.trim();
    }
    if (heartIcon_2 === '<use href="#heart"></use>') {
        heartIcon.innerHTML = '<use href="#heart-solid"></use>';
        musicInfo =
            heartIcon.parentElement.parentElement.parentElement.parentElement.querySelector(
                "#music-information"
            );

        title = musicInfo.querySelector("h4").innerText; // music name
        artist = musicInfo.querySelector("cite").innerText; // artist name

        // trendingVideoMusicInfo filtered
        let musicData = trendingVideoMusicInfo.filter((data) => {
            return data.title === title && data.subtitle === artist;
        });

        // boolean input / output control
        let isMusicDate = elementLikedData.some((e) => e[0].id === musicData[0].id);

        // if isMusicDate === false musicData added elementLikeData
        if (!isMusicDate) elementLikedData.push(musicData);

        // save data in localStorage to name like_data
        localStorage.setItem("like_data", JSON.stringify(elementLikedData));
    } else {
        heartIcon.innerHTML = '<use href="#heart"></use>';
    }
};