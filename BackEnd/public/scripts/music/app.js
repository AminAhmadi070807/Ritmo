"use strict";

const $ = document;

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

// trending music
;(async () => {
    try {
        const response = await fetch("/api/v1/musics/trending")
        const data = await response.json()

        data.data.forEach(music => {
              $.getElementById("trending-sung-container").insertAdjacentHTML("beforeend", `
                <div class="swiper-slide">
                  <a href="/musics/page/${music._id}">
                    <div class="w-88 h-104 max-w-88 max-h-104 cursor-pointer">
                    <img src="${music.poster}" class="w-88 h-92 min-w-88 min-h-92 max-w-88 max-h-92 object-cover object-center" alt="${music.title} from ${music.artist}"/>
    
                      <div class="flex items-center justify-between mt-4 px-4">
                        <h3 class="font-Pelak_Bold text-sm lg:text-lg text-nowrap">${music.title}</h3>
                        <div class="flex items-center justify-center gap-x-3">
                          <svg class="size-8 text-neutral-500"><use href="#heart"></use></svg>
                          <svg class="size-8 text-neutral-500"><use href="#add-circle"></use></svg>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
`);
        })}
    catch (error) {}
})()

// categories
;(async () => {
    try {
        const response = await fetch('/api/v1/musics/genres')
        const data = await response.json()

        data.data.forEach(category => {
            document.getElementById('category-container').insertAdjacentHTML("beforeend", `
                <div class="swiper-slide">
                    <a href="/categories/details/${category._id}">
                        <div class="relative w-[275px] h-50 cursor-pointer">
                            <img src="${category.cover}" class="w-[275px] h-50 min-w-[275px] max-w-[275px] min-h-50 max-h-50"
                                 alt="${category.title}"/>
                            <div class="absolute inset-0 m-auto h-10 w-20">
                                <h4 class="font-Pelak_Bold text-2xl text-nowrap">${category.title}</h4>
                            </div>
                        </div>
                    </a>
                </div>
            `)
        })
    } catch (error) {
    }
})()

// albums
;(async () => {
    try {
        const response = await fetch('/api/v1/musics/albums/')
        const data = await response.json()

        data.data.albums.forEach(album => {
            $.getElementById('album-container').insertAdjacentHTML('beforeend', `
            <div class="swiper-slide">
                <a href="/albums/details/${album._id}">
                  <div class="w-50 h-[276px] cursor-pointer">
                    <img class="rounded-xl" src="${album.cover}" alt="${album.title + "From" + album.artist }" />
                    <h3 class="font-Pelak_Bold text-center mt-2">${album.title}</h3>
                    <cite class="font-Pelak_Regular not-italic text-center mt-2 text-sm text-Neutral-300 block">${album.artist}</cite>
                  </div>
                </a>
            </div>
           
        `)
        })
    }
    catch (error) {
        console.log(error);
    }
})()

// playlists
;(async () => {
    try {
        const response = await fetch('/api/v1/musics/playlists')
        const data = await response.json()

        data.data.playlist.forEach(playlist => {
            $.getElementById('playlist-container').insertAdjacentHTML('beforeend', `
              <div class="swiper-slide">
                <a href="/playlists/details/${playlist._id}">
                    <div class="w-51 max-w-51">
                        <img src="${playlist.cover}" class="size-51 max-w-51 min-w-51 min-h-51 max-h-51" alt="playlist"/>
                        <div class="flex items-center justify-between my-4 px-2">
                            <h4 class="font-Pelak_Bold text-base">${playlist.title}</h4>
                            <div class="flex items-center gap-x-3 text-Neutral-300">
                                <svg class="size-6"><use href="#heart"></use></svg>
                                <svg class="size-6"><use href="#add-circle"></use></svg>
                            </div>
                        </div>
                    </div>
                </a>
              </div>         
        `)
        })
    }
    catch (error) {
        console.log(error);
    }
})()

;(async () => {
    try {
        const response = await fetch('/api/v1/musics/lastHeard')
        const data = await response.json()

        data.data.lastHeard.forEach((lastHeard, index) => {
            $.getElementById('lest-heard-music-container').insertAdjacentHTML('beforeend', `
            <div id="lest-heard-music" class="flex items-center w-full h-20 justify-between border-b-2 border-b-Neutral-800 py-2 px-6 md:px-8">
              <div class="flex gap-x-4 min-w-50 md:min-w-100 items-center">
                <data value="${index + 1}" class="font-FA_Pelak_Regular text-xl">${index + 1}</data>
                <img src="${lastHeard.music.poster}" class="size-16 max-w-16 min-w-16 max-h-16 min-h-16 rounded-lg object-cover" alt="${lastHeard.music.title}"/>
                <div class="h-14 w-50">
                  <h4 class="font-Pelak_Bold text-sm sm:text-base md:text-lg">${lastHeard.music.title}</h4>
                  <cite class="font-Pelak_Regular text-base text-Neutral-300 mt-1">${lastHeard.music.artist}</cite>  
                </div>
              </div>

              <div class="hidden md:flex gap-x-4 items-center">
                <a href="#">
                  <svg class="size-6 text-Neutral-300"><use href="#heart"></use></svg>
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

              <div class="hidden md:block">
                <div class="ps-10">
                  <time datetime="${lastHeard.music.time}" class="font-Pelak_Medium text-base">${formatTime(lastHeard.music.time)}</time>
                </div>
              </div>

              <div id="playlist-menu" class="absolute hidden opacity-0 transition-all duration-300 left-25 size-50 min-w-50 min-h-50 bg-transparent-2 rounded-lg md:hidden ms-auto mt-25">
                <div class="flex flex-col gap-y-4 justify-center items-between p-5 text-white">
                  <a
                    href="#" class="flex items-center gap-x-3 font-Pelak_Regular text-sm" >
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
        `)
        })
    }
    catch (error) {
        console.log(error);
    }
})()

$.getElementById("notification-mobile").addEventListener('click', () => {
  $.getElementById('notification-modal-mobile').classList.toggle('invisible')
  $.getElementById('notification-modal-mobile').classList.toggle('opacity-0')
  $.getElementById('notification-modal-mobile').classList.toggle('visible')
  $.getElementById('notification-modal-mobile').classList.toggle('opacity-100')
})