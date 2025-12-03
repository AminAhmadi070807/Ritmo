"use strict";

const $ = document;
const albumHeader = $.getElementById("header-album");
const albumPlaylist = $.getElementById("album-playlist");


const params = new URLSearchParams(window.location.search).get("title");


let i = 1
// album head
if (albumParamInfo) {
  albumHeader.innerHTML = `

`;
albumInfo.forEach(el => {
  if (i < albumInfo.length) {
    albumPlaylist.insertAdjacentHTML(
      "beforeend",
      `
    <a href="./AlbumsDetail.html?title=${el.title}">
      <div id="lest-heard-music" class="flex items-center w-full h-20 justify-between border-b-2 border-b-Neutral-800 py-2 px-6 md:px-8">
        <div class="flex gap-x-4 min-w-50 md:min-w-100 items-center">
          <data value="${i}" class="font-FA_Pelak_Regular text-xl">${i}</data>
          <img src="${el.src}" class="size-16 max-w-16 min-w-16 max-h-16 min-h-16 rounded-lg object-cover" alt="${el.title}"/>
          <div class="flex items-center h-14 w-50">
            <h4 class="font-Pelak_Bold text-sm sm:text-base md:text-lg">${el.title}</h4>
          </div>
        </div>
        <div class="hidden md:flex items-center w-100 justify-between">
          <div class="flex gap-x-4 items-center">
            <a href="#">
              <svg class="size-6 text-Neutral-300"><use href="#heart"></use> </svg>
            </a>
            <a href="#">
              <svg class="size-6 text-Neutral-300"><use href="#download-01"></use></svg>
            </a>
            <a href="#">
              <svg class="size-6 text-Neutral-300"><use href="#add-circle"></use></svg>
            </a>
            <a href="#">
              <svg class="size-6 text-Neutral-300"><use href="#menu-queue"></use></svg>
            </a>
          </div>
          <div class="ps-10">
            <time datetime="00:01:41" class="font-Pelak_Medium text-base">۰۱:۴۱</time>
          </div>
        </div>
        <div id="album-menu" class="absolute hidden opacity-0 transition-all duration-300 left-25 size-50 min-w-50 min-h-50 bg-transparent-2 rounded-lg md:hidden ms-auto mt-25">
          <div class="flex flex-col gap-y-4 justify-center items-between p-5 text-white">
            <a href="#" class="flex items-center gap-x-3 font-Pelak_Regular text-sm">
              <svg class="size-6"><use href="#heart"></use></svg>
              علاقه مندی ها
            </a>
            <a href="#" class="flex items-center gap-x-3 font-Pelak_Regular text-sm">
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
          <svg onclick="toggleIconsMenu(event)" class="size-7 transform rotate-90">
            <use href="#three-pin"></use>
          </svg>
        </div>
        </div>
      </a>
        `
    );
    i++
  }
})
  
} else {
  albumHeader.innerHTML = `
        <img
          src="${albumInfo[0].src}"
          class="w-full h-full object-cover"
          alt="${albumInfo[0].title}"
        />
        <div class="absolute inset-0 m-auto size-full bg-[#0D0D0E]/75 pe-4 pt-10">
          <div class="flex flex-col md:flex-row items-center gap-x-8 ms-8">
            <div class="size-[288px] rounded-lg min-w-[288px] min-h-[288px]">
              <img
                src="${albumInfo[0].src}"
                class="size-[288px] rounded-lg min-w-[288px] min-h-[288px]"
                alt=""
              />
            </div>
            <div class="flex flex-col items-center justify-center md:items-start max-w-[624px] w-full">
              <h3 class="font-Pelak_Bold text-2xl text-center text-Neutral-200 mb-2 md:text-right mt-5">آلبوم</h3>
              <h2 class="font-Pelak_Bold text-[40px] text-center md:text-right mb-6">${albumInfo[0].title}</h2>
              <cite class="font-Pelak_Bold text-center md:text-right">${albumInfo[0].subtitle}</cite>
              <div class="flex items-center gap-x-2 text-Neutral-200 mt-4 *:text-[15px] *:font-Pelak_Medium" >
                <span id="number-song">۱۸ آهنگ</span>
                <div class="size-1 rounded-full bg-white"></div>
                <span id="time-song">۱ ساعت و ۲۰ دقیقه</span>
                <div class="size-1 rounded-full bg-white"></div>
                <span id="data-song">۱۲ فروردین ۱۴۰۳</span>
              </div>
              <div class="flex items-center gap-x-10 mt-9">
                <div id="play-music" class="flex items-center justify-center h-12 w-40 bg-Primary-500 gap-x-2 text-white rounded-lg" >
                  <svg class="size-5"><use href="#play"></use></svg>
                  <span class="font-Pelak_Medium">پخش موزیک</span>
                </div>
                <div class="flex items-center gap-x-4">
                  <div>
                    <svg class="size-6"><use href="#shuffle"></use></svg>
                  </div>
                  <div>
                    <svg class="size-6"><use href="#share"></use></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
`;
albumInfo.forEach(el => {
  if (i < albumInfo.length) {
    albumPlaylist.insertAdjacentHTML(
      "beforeend",
      `
    <a href="./AlbumsDetail.html?title=${el.title}">
      <div id="lest-heard-music" class="flex items-center w-full h-20 justify-between border-b-2 border-b-Neutral-800 py-2 px-6 md:px-8">
        <div class="flex gap-x-4 min-w-50 md:min-w-100 items-center">
          <data value="${i}" class="font-FA_Pelak_Regular text-xl">${i}</data>
          <img src="${el.src}" class="size-16 max-w-16 min-w-16 max-h-16 min-h-16 rounded-lg object-cover" alt="${el.title}"/>
          <div class="flex items-center h-14 w-50">
            <h4 class="font-Pelak_Bold text-sm sm:text-base md:text-lg">${el.title}</h4>
          </div>
        </div>
        <div class="hidden md:flex items-center w-100 justify-between">
          <div class="flex gap-x-4 items-center">
            <a href="#">
              <svg class="size-6 text-Neutral-300"><use href="#heart"></use> </svg>
            </a>
            <a href="#">
              <svg class="size-6 text-Neutral-300"><use href="#download-01"></use></svg>
            </a>
            <a href="#">
              <svg class="size-6 text-Neutral-300"><use href="#add-circle"></use></svg>
            </a>
            <a href="#">
              <svg class="size-6 text-Neutral-300"><use href="#menu-queue"></use></svg>
            </a>
          </div>
          <div class="ps-10">
            <time datetime="00:01:41" class="font-Pelak_Medium text-base">۰۱:۴۱</time>
          </div>
        </div>
        <div id="album-menu" class="absolute hidden opacity-0 transition-all duration-300 left-25 size-50 min-w-50 min-h-50 bg-transparent-2 rounded-lg md:hidden ms-auto mt-25">
          <div class="flex flex-col gap-y-4 justify-center items-between p-5 text-white">
            <a href="#" class="flex items-center gap-x-3 font-Pelak_Regular text-sm">
              <svg class="size-6"><use href="#heart"></use></svg>
              علاقه مندی ها
            </a>
            <a href="#" class="flex items-center gap-x-3 font-Pelak_Regular text-sm">
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
          <svg onclick="toggleIconsMenu(event)" class="size-7 transform rotate-90">
            <use href="#three-pin"></use>
          </svg>
        </div>
        </div>
      </a>
        `
    );
    i++
  }
})
}

window.toggleIconsMenu = (event) => {
  let musicList;
  let musicList_2;
  if (event.target.tagName === "use") {
    musicList = event.target.parentElement.parentElement.parentElement;
    musicList_2 = musicList.parentElement.querySelector(
      "#album-menu.opacity-100"
    );
  } else {
    musicList = event.target.parentElement.parentElement;
    musicList_2 = musicList.parentElement.querySelector(
      "#album-menu.opacity-100"
    );
  }

  let musicListMenu = musicList.querySelector("#album-menu");
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
