"use strict";

import { Footer } from "../../../../component/footer.js";
import { Index_Navbar } from "../../../../component/index_navbar/index_navbar.js";

window.customElements.define("custom-footer", Footer);
window.customElements.define("custom-navbar", Index_Navbar);

const $ = document
const playlistHeader = $.getElementById('header-playlist')
const playlist = $.getElementById('playlist')

const playlistInformation = [
  { id: 1, title: "آرامش بخش", src: "../../../image/playlist file/1.png" },
  { id: 2, title: "انگیزشی", src: "../../../image/playlist file/2.png" },
  { id: 3, title: "شاد و با انرژی", src: "../../../image/playlist file/3.png" },
  { id: 4, title: "صدای طبیعت", src: "../../../image/playlist file/4.png" },
  { id: 5, title: "صبحگاهی", src: "../../../image/playlist file/5.png" },
  { id: 6, title: "پارتی", src: "../../../image/playlist file/6.png" },
  { id: 7, title: "موسیقی متن", src: "../../../image/playlist file/7.png" },
  { id: 8, title: "عیدانه", src: "../../../image/playlist file/8.png" },
  { id: 9, title: "عاشقانه", src: "../../../image/playlist file/9.png" },
  { id: 10, title: "سفر", src: "../../../image/playlist file/10.png" },
  { id: 11, title: "دهه ۵۰", src: "../../../image/playlist file/11.png" },
  { id: 12, title: "مطالعه و کار", src: "../../../image/playlist file/12.png" },
  { id: 13, title: "رانندگی", src: "../../../image/playlist file/13.png" },
  { id: 14, title: "شبانه", src: "../../../image/playlist file/14.png" },
  { id: 15, title: "غمگین", src: "../../../image/playlist file/15.png" },
  { id: 16, title: "ورزش", src: "../../../image/playlist file/16.png" },
  { id: 17, title: "مدیتیشن", src: "../../../image/playlist file/17.png" },
  { id: 18, title: "بی کلام", src: "../../../image/playlist file/18.png" },
  { id: 19, title: "دورهمی", src: "../../../image/playlist file/19.png" },
  { id: 20, title: "دهه ۶۰", src: "../../../image/playlist file/20.png" },
  { id: 21, title: "رقص", src: "../../../image/playlist file/21.png" },
  { id: 22, title: "تولد", src: "../../../image/playlist file/22.png" },
  { id: 23, title: "دور آتش", src: "../../../image/playlist file/23.png" },
  { id: 24, title: "حماسی", src: "../../../image/playlist file/24.png" },
  { id: 25, title: "آشپزی", src: "../../../image/playlist file/25.png" },
  { id : 26, title: "آسمونی", src: "../../../image/Artist Datail/13.png" },
  { id : 27, title: "حس خوبیه", src: "../../../image/Artist Datail/14.png" },
  { id : 28, title: "باروون", src: "../../../image/Artist Datail/15.png" },
  { id : 29, title: "ریمیکس", src: "../../../image/Artist Datail/16.png" },
  { id : 30, title: "قلب ساعتی", src: "../../../image/Artist Datail/17.png" },
  { id : 31, title: "سیاره خالی", src: "../../../image/Artist Datail/18.png" },
  { id : 32, title: "آسمونی", src: "../../../image/Artist Datail/13.png" },
  { id : 33, title: "حس خوبیه", src: "../../../image/Artist Datail/14.png" },
  { id : 34, title: "باروون", src: "../../../image/Artist Datail/15.png" },
  { id : 35, title: "ریمیکس", src: "../../../image/Artist Datail/16.png" },
  { id : 36, title: "قلب ساعتی", src: "../../../image/Artist Datail/17.png" },
];

const params = new URLSearchParams(window.location.search).get("title");

const playlistParamsInfo = playlistInformation.filter(
  (el) => el.title === params
)[0];

let i = 1
if (playlistParamsInfo) {
    playlistHeader.innerHTML = `
              <img
                src="${playlistParamsInfo.src}"
                class="w-full h-full object-cover"
                alt="${playlistParamsInfo.title}"
              />
              <div class="absolute inset-0 m-auto size-full bg-[#0D0D0E]/75 pe-4 pt-10">
                <div class="flex flex-col md:flex-row items-center gap-x-8 ms-8">
                  <div class="size-[288px] rounded-lg min-w-[288px] min-h-[288px]">
                    <img
                      src="${playlistParamsInfo.src}"
                      class="size-[288px] rounded-lg min-w-[288px] min-h-[288px]"
                      alt=""
                    />
                  </div>
                  <div class="flex flex-col items-center justify-center md:items-start max-w-[624px] w-full">
                    <h3 class="font-Pelak_Bold text-2xl text-center text-Neutral-200 mb-2 md:text-right mt-5">پلی لیست</h3>
                    <h2 class="font-Pelak_Bold text-[40px] text-center md:text-right mb-6">${playlistParamsInfo.title}</h2>
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
                          <svg class="size-6"><use href="#add-circle"></use></svg>
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
      playlistInformation.forEach(el => {
        if (i < playlistInformation.length) {
          playlist.insertAdjacentHTML("beforeend",`
            <a href="./playlistDatail.html?title=${el.title}">
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
                    <div id="playlist-menu" class="absolute hidden opacity-0 transition-all duration-300 left-25 size-50 min-w-50 min-h-50 bg-transparent-2 rounded-lg md:hidden ms-auto mt-25">
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
            
          `)
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
        "#playlist-menu.opacity-100"
      );
    } else {
      musicList = event.target.parentElement.parentElement;
      musicList_2 = musicList.parentElement.querySelector(
        "#playlist-menu.opacity-100"
      );
    }
  
    let musicListMenu = musicList.querySelector("#playlist-menu");
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