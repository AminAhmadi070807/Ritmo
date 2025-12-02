"use strict";

const $ = document;

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
                <a href="/musics/albums/details/${album.title}">
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

        console.log(data)

        data.data.playlist.forEach(playlist => {
            $.getElementById('playlist-container').insertAdjacentHTML('beforeend', `
              <div class="swiper-slide">
                <div class="w-51 max-w-51">
                    <img src="${playlist.cover}" class="size-51 max-w-51 min-w-51 min-h-51 max-h-51" alt="playlist"/>
                    <div class="flex items-center justify-between my-4 px-2">
                        <h4 class="font-Pelak_Bold text-base">تولد</h4>
                        <div class="flex items-center gap-x-3 text-Neutral-300">
                            <svg class="size-6"><use href="#heart"></use></svg>
                            <svg class="size-6"><use href="#add-circle"></use></svg>
                        </div>
                    </div>
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