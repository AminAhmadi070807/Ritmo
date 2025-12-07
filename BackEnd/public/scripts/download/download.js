"use strict";

import { Footer } from "../../../../component/footer.js";
import { Index_Navbar } from "../../../../component/index_navbar/index_navbar.js";

window.customElements.define('custom-footer', Footer)
window.customElements.define("custom-navbar", Index_Navbar);

const $ = document;
const main = $.querySelector("main");
const isNotDownload = $.getElementById("is-not-download");
const downloadContainer = $.getElementById("download-container");

const formatTime = (seconds) => {
  let minutes = Math.floor(seconds / 60)
  let remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
} 

let mainClass = "main-site px-5 lg:px-8 ms-auto max-w-[1600px]";
let isNotDownloadClass =
  "flex flex-col items-center justify-center size-full max-w-150 mx-auto";

let downloadInfo = [];
let newObj;
window.addEventListener("load", async () => {
  let downloads = JSON.parse(localStorage.getItem("download"));
  if (downloads) {
    main.className = `${mainClass} h-auto lg:mt-40 mt-24 min-h-[252px]`;
    isNotDownload.className = "hidden size-full max-w-150 mx-auto";
    downloadContainer.classList.remove("hidden");
    downloads.forEach((download) => {
      newObj = {
        id: downloadInfo.length + 1,
        title: download.title,
        subtitle: download.subtitle,
        src: download.src,
        audio_src: download.audio_src,
      };
      downloadInfo.push(newObj);

    });

    downloadInfo.forEach((download) => {
      $.getElementById("download").insertAdjacentHTML(
        "beforeend",
        `
        
      <div id="lest-heard-music" class="flex items-center w-full h-20 justify-between border-b-2 border-b-Neutral-800 py-2 px-6 md:px-8">
        <div class="flex gap-x-4 min-w-50 md:min-w-100 items-center">
          <data value="${download.id}" class="font-FA_Pelak_Regular text-xl">${
          download.id
        }</data>
          <img src="${
            download.src
          }" class="size-16 max-w-16 min-w-16 max-h-16 min-h-16 rounded-lg object-cover" alt="${
          download.title + download.subtitle
        }"/>
          <div class="h-14 w-50">
            <h4 class="font-Pelak_Bold text-sm sm:text-base md:text-lg">${
              download.title
            }</h4>
            <cite class="font-Pelak_Regular text-xs sm:text-sm md:text-base text-Neutral-300 mt-1">${
              download.subtitle
            }</cite>
          </div>
        </div>
        <div class="hidden lg:flex items-center w-100 justify-between">
          <div class="flex gap-x-4 items-center">
            <a href="#"><svg class="size-6 text-Neutral-300" onclick="download_liked(event)"><use href="#heart"></use></svg></a>
            <a href="#"><svg class="size-6 text-Neutral-300"><use href="#trash"></use></svg></a>
            <a href="#"><svg class="size-6 text-Neutral-300"><use href="#add-circle"></use></svg></a>
            <a href="#"><svg class="size-6 text-Neutral-300"><use href="#menu-queue"></use></svg></a>
          </div>
            <div class="ps-10">
              <time datetime="01:42" class="font-FA_Pelak_Medium text-base">${formatTime(Math.random() * 500)}</time>
            </div>
          </div>
          <div id="download-menu" class="absolute hidden opacity-0 transition-all duration-300 left-25 size-50 min-w-50 h-auto bg-transparent-2 rounded-lg lg:hidden ms-auto mt-25">
            <div class="flex flex-col gap-y-4 justify-center items-between p-5 text-white">
              <a href="../LikedSongs/LikedSongs.html" class="flex items-center gap-x-3 font-Pelak_Regular text-sm">
                <svg class="size-6"><use href="#heart"></use></svg>
                علاقه مندی ها
              </a>
              <a href="#" class="flex items-center gap-x-3 font-Pelak_Regular text-sm">
                <svg class="size-6"><use href="#trash"></use></svg>
                حذف از دانلود ها
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

window.download_liked = (e) => {
  let heartIcon;
  let heartIcon_2;
  if (e.target.tagName === "use") {
    heartIcon = e.target.parentElement;
    heartIcon_2 = heartIcon.innerHTML.trim();
  } else {
    heartIcon = e.target;
    heartIcon_2 = heartIcon.innerHTML.trim();
  }
  if (heartIcon_2 === '<use href="#heart"></use>') {
    heartIcon.classList.add('text-Primary-500')
    heartIcon.classList.remove('text-Neutral-300')
    heartIcon.innerHTML = '<use href="#heart-solid"></use>';
  } else {
    heartIcon.classList.remove('text-Primary-500')
    heartIcon.classList.add('text-Neutral-300')
    heartIcon.innerHTML = '<use href="#heart"></use>';
  }
};
// show modal in size mobile
window.toggleIconsMenu = function (event) {
  let musicList;
  let musciList_2;
  if (event.target.tagName === "use") {
    musicList = event.target.parentElement.parentElement.parentElement;
    musciList_2 = musicList.parentElement.querySelector(
      "#download-menu.opacity-100"
    );
  } else {
    musicList = event.target.parentElement.parentElement;
    musciList_2 = musicList.parentElement.querySelector(
      "#download-menu.opacity-100"
    );
  }

  let musicListMenu = musicList.querySelector("#download-menu");
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


