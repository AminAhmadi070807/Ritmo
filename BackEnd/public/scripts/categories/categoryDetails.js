"use strict"

const allPlaylistContainer = document.getElementById('all-playlist')


// trending singer information
const trendingSingerInfo = [
    { title: "ابی", src: "../../../image/TRENDING SINGERS/1.png" },
    { title: "داریوش", src: "../../../image/TRENDING SINGERS/2.png" },
    { title: "معین", src: "../../../image/TRENDING SINGERS/3.png" },
    { title: "گوگوش", src: "../../../image/TRENDING SINGERS/4.png" },
    { title: "شادمهر", src: "../../../image/TRENDING SINGERS/5.png" },
    { title: "سیاوش", src: "../../../image/TRENDING SINGERS/6.png" },
    { title: "لیلا", src: "../../../image/TRENDING SINGERS/7.png" },
    { title: "ابی", src: "../../../image/TRENDING SINGERS/1.png" },
    { title: "داریوش", src: "../../../image/TRENDING SINGERS/2.png" },
    { title: "معین", src: "../../../image/TRENDING SINGERS/3.png" },
    { title: "گوگوش", src: "../../../image/TRENDING SINGERS/4.png" },
    { title: "شادمهر", src: "../../../image/TRENDING SINGERS/5.png" },
    { title: "سیاوش", src: "../../../image/TRENDING SINGERS/6.png" },
    { title: "لیلا", src: "../../../image/TRENDING SINGERS/7.png" },
];

// information
const popNewsInfo = [
    { title: "من تنهام", subtitle: "د دان", src: " ../../../image/new_pop/1.png" },
    { title: "دوراهی", subtitle: "ماکان بند", src: " ../../../image/new_pop/2.png" },
    { title: "سقوط", subtitle: "ایهام", src: " ../../../image/new_pop/3.png" },
    { title: "برگای نارنجی", subtitle: "سیروان خسروی", src: " ../../../image/new_pop/4.png" },
    { title: "سرگردونم", subtitle: "معین زد", src: " ../../../image/new_pop/5.png" },
    { title: "غمگین ترین آهنگ", subtitle: "علی زندوکیلی", src: " ../../../image/new_pop/6.png" },
    { title: "من تنهام", subtitle: "د دان", src: " ../../../image/new_pop/8.png" },
    { title: "سرگردونم", subtitle: "معین زد", src: " ../../../image/new_pop/7.png" },
    { title: "دوراهی", subtitle: "ماکان بند", src: " ../../../image/new_pop/2.png" },
    { title: "سقوط", subtitle: "ایهام", src: " ../../../image/new_pop/3.png" },
    { title: "برگای نارنجی", subtitle: "سیروان خسروی", src: " ../../../image/new_pop/4.png" },
    { title: "من تنهام", subtitle: "د دان", src: " ../../../image/new_pop/1.png" },
    { title: "سرگردونم", subtitle: "معین زد", src: " ../../../image/new_pop/5.png" },
    { title: "غمگین ترین آهنگ", subtitle: "علی زندوکیلی", src: " ../../../image/new_pop/6.png" },
    { title: "سرگردونم", subtitle: "معین زد", src: " ../../../image/new_pop/7.png" },
    { title: "من تنهام", subtitle: "د دان", src: " ../../../image/new_pop/8.png" },
];

// trending information
const TrendingSungInfo = [
    { title: "یلدا", subtitle: "سینا شعبانخانی" , src: "../../../image/Category/trending-sungs/1.png" },
    { title: "رویایی", subtitle: "رضایا", src: "../../../image/Category/trending-sungs/2.png" },
    { title: "تو خوبی", subtitle: "محسن یگانه", src: "../../../image/Category/trending-sungs/3.png" },
    { title: "خداحافظ", subtitle: "شهاب منتظری", src:"../../../image/Category/trending-sungs/4.png" },
    { title: "راه", subtitle: "عرفان طهماسبی", src: "../../../image/Category/trending-sungs/5.png" },
    {  title: "هوار هوار", subtitle: "علیرضا طلیسچی", src: "../../../image/Category/trending-sungs/6.png" },
    { title: "یلدا", subtitle: "سینا شعبانخانی" , src: "../../../image/Category/trending-sungs/1.png" },
    { title: "رویایی", subtitle: "رضایا", src: "../../../image/Category/trending-sungs/2.png" },
    { title: "تو خوبی", subtitle: "محسن یگانه", src: "../../../image/Category/trending-sungs/3.png" },
    { title: "خداحافظ", subtitle: "شهاب منتظری", src:"../../../image/Category/trending-sungs/4.png" },
    { title: "راه", subtitle: "عرفان طهماسبی", src: "../../../image/Category/trending-sungs/5.png" },
    {  title: "هوار هوار", subtitle: "علیرضا طلیسچی", src: "../../../image/Category/trending-sungs/6.png" },
    { title: "راه", subtitle: "عرفان طهماسبی", src: "../../../image/Category/trending-sungs/5.png" },
    {  title: "هوار هوار", subtitle: "علیرضا طلیسچی", src: "../../../image/Category/trending-sungs/6.png" },
    { title: "یلدا", subtitle: "سینا شعبانخانی" , src: "../../../image/Category/trending-sungs/1.png" },
    { title: "رویایی", subtitle: "رضایا", src: "../../../image/Category/trending-sungs/2.png" },
    { title: "تو خوبی", subtitle: "محسن یگانه", src: "../../../image/Category/trending-sungs/3.png" },
    { title: "خداحافظ", subtitle: "شهاب منتظری", src:"../../../image/Category/trending-sungs/4.png" },
    { title: "راه", subtitle: "عرفان طهماسبی", src: "../../../image/Category/trending-sungs/5.png" },
    {  title: "هوار هوار", subtitle: "علیرضا طلیسچی", src: "../../../image/Category/trending-sungs/6.png" },
    { title: "یلدا", subtitle: "سینا شعبانخانی" , src: "../../../image/Category/trending-sungs/1.png" },
];

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
];


// create trending singer element
trendingSingerInfo.forEach((el) => {
    document.getElementById("trending-singer-container").insertAdjacentHTML(
        "beforeend",
        `
      
      <div class="swiper-slide cursor-pointer">
        <a href="../Artist/artistDetail.html?title=${el.title}">
          <div id="slider-trending-singer" class="w-50 h-60 cursor-pointer">
            <div class="relative group size-50 rounded-full">
              <img src="${el.src}" class="size-50 rounded-full object-cover" alt="${el.title}"/>
              <div class="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 right-0 left-0 bottom-0 flex items-end justify-center size-full rounded-full border-b-4 border-b-Primary-500" style="background: linear-gradient(360deg, #c1093dcc, transparent);">
                <div class="flex items-center justify-center gap-x-2 mb-6">
                  <svg class="size-8"><use href="#shuffle"></use></svg>
                  <svg class="size-8"><use href="#heart"></use></svg>
                </div>
              </div>
            </div>
            <h3 class="font-Pelak_Bold text-center mt-4 text-lg">${el.title}</h3>
          </div>
        </a>
      </div>
      
      `
    );
});

// create pop news
popNewsInfo.forEach((el) => {
    document.getElementById("pop-news-container").insertAdjacentHTML(
        "beforeend",
        `
      
      <div class="swiper-slide">
        <a href="../Album/AlbumsDetail.html?title=${el.title}">
          <div class="w-50 h-[276px] cursor-pointer">
            <img src="${el.src}" alt="${el.title + "From" + el.subtitle}" />
            <h3 class="font-Pelak_Bold text-center mt-2">${el.title}</h3>
            <cite class="font-Pelak_Regular not-italic text-center mt-2 text-sm text-Neutral-300 block">${el.subtitle}</cite>
          </div>
        </a>
      </div>
      
      `
    );
});

// trending song
TrendingSungInfo.forEach((el) => {
    document.getElementById("category-trending-sung-container").insertAdjacentHTML(
        "beforeend",
        `
      <div class="swiper-slide">
        <a href="../Album/AlbumsDetail.html?title=${el.title}">
          <div class="w-50 h-[276px] cursor-pointer">
            <img src="${el.src}" alt="${el.title + "From" + el.subtitle}" />
            <h3 class="font-Pelak_Bold text-center mt-2">${el.title}</h3>
            <cite class="font-Pelak_Regular not-italic text-center mt-2 text-sm text-Neutral-300 block">${el.subtitle}</cite>
          </div>
          </a>
      </div>
      
      `
    );
});

// create playlist
playlistInformation.forEach((playlist) => {
    allPlaylistContainer.insertAdjacentHTML(
        "beforeend",
        `
    <div class="swiper-slide">
      <a href="../playlist/playlistDatail.html?title=${playlist.title}">
        <div class="w-51 max-w-51">
          <img src="${playlist.src}" class="size-51 max-w-51 min-w-51 min-h-51 max-h-51" alt="${playlist.title}">
          <h4 class="font-Pelak_Bold text-base text-center mt-4">${playlist.title}</h4>
        </div>
      </a>
    </div>
`
    );
});

// create trending singer element
trendingSingerInfo.forEach((el) => {
    document.getElementById("all-artist").insertAdjacentHTML(
        "beforeend",
        `
      <div class="swiper-slide cursor-pointer">
        <a href="../Artist/artistDetail.html?title=${el.title}">
          <div id="slider-trending-singer" class="w-50 h-60 cursor-pointer">
            <div class="relative group size-50 rounded-full">
              <img src="${el.src}" class="size-50 rounded-full object-cover" alt="${el.title}"/>
              <div class="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 right-0 left-0 bottom-0 flex items-end justify-center size-full rounded-full border-b-4 border-b-Primary-500" style="background: linear-gradient(360deg, #c1093dcc, transparent);">
                <div class="flex items-center justify-center gap-x-2 mb-6">
                  <svg class="size-8"><use href="#shuffle"></use></svg>
                  <svg class="size-8"><use href="#heart"></use></svg>
                </div>
              </div>
            </div>
            <h3 class="font-Pelak_Bold text-center mt-4 text-lg">${el.title}</h3>
          </div>
        </a>
      </div>
      
      `
    );
});