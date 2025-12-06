"use strict";

const main = document.querySelector("main");
const isNotDownload = document.getElementById("is-not-like");
const downloadContainer = document.getElementById("download-container");

let likeInfo = [];
const downloadData = [];

const formatTime = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

// class list name
let mainClass = "main-site px-5 lg:px-8 ms-auto max-w-[1600px]";
let isNotDownloadClass =
  "flex flex-col items-center justify-center size-full max-w-150 mx-auto";

// show menu
window.toggleIconsMenu = (event) => {
  let musicList = event.target.parentElement.parentElement;
  let musicList_2 = musicList.parentElement.querySelector("#likeSong-menu.opacity-100");

  let musicListMenu = musicList.querySelector("#likeSong-menu");
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


// create music line && saveto localstorage
let newObj;
window.addEventListener("load", async () => {
  let downloadLocalData = JSON.parse(localStorage.getItem("download"));
  if (downloadLocalData) {
    downloadLocalData.forEach((data) => {
      let downloadObj = {
        id: downloadData.length + 1,
        title: data.title,
        subtitle: data.subtitle,
        src: data.src,
        audio_src: data.audio_src,
      };
      downloadData.push(downloadObj);
    });
  }

  let like = JSON.parse(localStorage.getItem("like_data"));
  if (like) {
    main.className = `${mainClass} h-auto lg:mt-40 mt-24 min-h-[252px]`;
    isNotDownload.className = "hidden size-full max-w-150 mx-auto";
    downloadContainer.classList.remove("hidden");
    like.forEach((like) => {
      newObj = {
        id: likeInfo.length + 1,
        title: like[0].title,
        subtitle: like[0].subtitle,
        src: like[0].src,
        audio_src: like[0].audio_src,
      };
      likeInfo.push(newObj);
    });

    likeInfo.forEach((like) => {
      document.getElementById("download").insertAdjacentHTML(
        "beforeend",
        `
        
      <div id="lest-heard-music" class="flex items-center w-full h-20 justify-between border-b-2 border-b-Neutral-800 py-2 px-6 md:px-8">
        <div class="flex gap-x-4 min-w-50 md:min-w-100 items-center">
          <data value="${like.id}" class="font-FA_Pelak_Regular text-xl">${
          like.id
        }</data>
          <img src="${
            like.src
          }" class="size-16 max-w-16 min-w-16 max-h-16 min-h-16 rounded-lg object-cover" alt="${
          like.title + like.subtitle
        }"/>
          <div id="music_information" class="h-14 w-50">
            <h4 class="font-Pelak_Bold text-sm sm:text-base md:text-lg">${
              like.title
            }</h4>
            <cite class="font-Pelak_Regular text-xs sm:text-sm md:text-base text-Neutral-300 mt-1">${
              like.subtitle
            }</cite>
          </div>
        </div>
        <div class="hidden lg:flex items-center w-100 justify-between">
          <div class="flex gap-x-4 items-center">
            <a href="#"><svg class="size-6 text-Primary-500"><use href="#heart-solid"></use></svg></a>
            <a href="${
              like.audio_src
            }" download onclick="download_Music(event)"><svg class="size-6 text-Neutral-300" ><use href="#download-01"></use></svg></a>
            <a href="#"><svg class="size-6 text-Neutral-300"><use href="#add-circle"></use></svg></a>
            <a href="#"><svg class="size-6 text-Neutral-300"><use href="#menu-queue"></use></svg></a>
          </div>
            <div class="ps-10">
              <time datetime="01:42" class="font-FA_Pelak_Medium text-base">${formatTime(
                Math.random() * 500
              )}</time>
            </div>
          </div>
          <div id="likeSong-menu" class="absolute hidden opacity-0 transition-all duration-300 left-25 size-50 min-w-50 h-auto bg-transparent-2 rounded-lg lg:hidden ms-auto mt-25">
            <div class="flex flex-col gap-y-4 justify-center items-between p-5 text-white">
              <a href="../LikedSongs/LikedSongs.html" class="flex items-center gap-x-3 font-Pelak_Regular text-sm">
                <svg class="size-6 text-Primary-500"><use href="#heart-solid"></use></svg>
                علاقه مندی ها
              </a>
              <a  href="${
                like.audio_src
              }" download class="flex items-center gap-x-3 font-Pelak_Regular text-sm" onclick="download_Music(event)">
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
          <div class="flex items-center justify-center lg:hidden">
            <svg onclick="toggleIconsMenu(event)" class="size-7 transform rotate-90"><use href="#three-pin"></use></svg>
          </div>

      </div>
        
      `
      );
    });
  } else {
    main.className = `${mainClass} h-screen`;
    downloadContainer.classList.add("hidden");
    isNotDownload.className = isNotDownloadClass;
  }
});
