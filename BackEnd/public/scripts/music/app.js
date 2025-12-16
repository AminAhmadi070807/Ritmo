"use strict";

const $ = document;

const modalDev = document.querySelector('div#status-modal')

function modal (status, message) {
    modalDev.classList.remove('hidden')
    modalDev.classList.add('flex')
    if (status === "success") {
        modalDev.classList.add('border-Success-200')
        modalDev.classList.remove('border-Error-200')
        modalDev.innerHTML = `
            <h2 dir="ltr" class="text-gray-300 font-FA_Pelak_Regular text-base w-[80%]">${message}</h2>
            <svg class="size-10 text-Success-200"><use href="#success"></use></svg>`
    }
    else {
        modalDev.classList.add('border-Error-200')
        modalDev.classList.remove('border-Success-200')
        modalDev.innerHTML = `
            <h2 dir="ltr" class="text-gray-300 font-FA_Pelak_Regular text-base w-[80%]">${message}</h2>
            <svg class="size-10 text-Error-200"><use href="#error"></use></svg>
        `
    }

    setTimeout(() => {
        modalDev.classList.add('hidden')
        modalDev.classList.remove('flex')
    }, 5000)
}

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
                <div music-id="${music._id}" class="music-btn swiper-slide">
                  <div>
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
                  </div>
                </div>
              `);
        })

        const musicBtn = document.querySelectorAll('.music-btn')

        musicBtn.forEach(music => {
            music.addEventListener('click', async () => {
                const response = await fetch(`/api/v1/musics/${music.getAttribute('music-id')}`)
                const data = await response.json();

                document.getElementById('music-player-box').classList.remove("hidden")
                document.getElementById('music-player-box').classList.add("flex-center")

                document.getElementById('music-box').src = data.data.poster
                audio.src = data.data.music
                audio.currentTime = 0
                rangePlayer.style.width = 0 + "%"
                audio.setAttribute('audio-id', data.data._id)
            })
        })
    }
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
                    <img class="rounded-xl object-cover object-center h-50" src="${album.cover}" alt="${album.title + "From" + album.artist }" />
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

// last heard
;(async () => {
    try {
        const refresh = await fetch('/api/v1/auth/refresh')

        if (refresh.status === 401) return document.getElementById('last-heard').classList.add('hidden')

        const response = await fetch('/api/v1/musics/lastHeard/?limit=8&?page=1')
        let data = await response.json()

        data.data.lastHeard.forEach((lastHeard, index) => {
            $.getElementById('lest-heard-music-container').insertAdjacentHTML('beforeend', `
            <div id="lest-heard-music" class="flex items-center w-full h-20 justify-between border-b-2 border-b-Neutral-800 py-2 px-6 md:px-8">
              <div music-id="${lastHeard.music._id}" class="music-btn flex gap-x-4 min-w-50 md:min-w-100 items-center">
                <data value="${index + 1}" class="font-FA_Pelak_Regular text-xl">${index + 1}</data>
                <img src="${lastHeard.music.poster}" class="size-16 max-w-16 min-w-16 max-h-16 min-h-16 rounded-lg object-cover" alt="${lastHeard.music.title}"/>
                <div class="h-14 w-50">
                  <h4 class="font-Pelak_Bold text-sm sm:text-base md:text-lg">${lastHeard.music.title}</h4>
                  <cite class="font-Pelak_Regular text-base text-Neutral-300 mt-1">${lastHeard.music.artist}</cite>  
                </div>
              </div>

              <div class="hidden md:flex gap-x-4 items-center">
                <span id="like-song" music-id="${lastHeard.music._id}" class="cursor-pointer">
                  <svg class="size-6 ${lastHeard.likeMusic ? "text-Primary-600" : "text-Neutral-300"}"><use href="#${lastHeard.likeMusic ? "heart-solid" : "heart"}"></use></svg>
                </span>
                <button id="download-music" music-id="${lastHeard.music._id}" role="button" type="button" class="cursor-pointer">
                  <svg class="size-6 text-Neutral-300"><use href="#download-01"></use></svg>
                </button>
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
                  <a href="#" class="flex items-center gap-x-3 font-Pelak_Regular text-sm" >
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

              <div id="toggle-menu" class="flex items-center justify-center md:hidden">
                <svg class="size-7 transform rotate-90">
                  <use href="#three-pin"></use>
                </svg>
              </div>
            </div>
        `)
        })

        const togglePlaylistMenus = document.querySelectorAll("#toggle-menu")

        togglePlaylistMenus.forEach(btn => {
            btn.addEventListener("click", (event) => {
                let musicList = event.currentTarget.parentElement.parentElement;
                let musicList_2 = musicList.parentElement.querySelector("#playlist-menu.opacity-100");

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
            })
        })

        const likeSongBtn = document.querySelectorAll("#like-song")

        likeSongBtn.forEach(btn => {
            btn.addEventListener("click", async() => {
                const refresh = await fetch('/api/v1/auth/refresh')

                if (refresh.status === 401) return modal('error', 'برای علاقه مندی ابتدا ثبت نام کنید')

                const response = await fetch(`/api/v1/musics/likeSongs/${btn.getAttribute('music-id')}`, {method: 'post'})

                switch (response.status) {
                    case 201:
                        btn.innerHTML = '<svg class="size-6 text-Primary-600"><use href="#heart-solid"></use></svg>'
                        break;
                    case 200:
                        btn.innerHTML = '<svg class="size-6 text-Neutral-300"><use href="#heart"></use></svg>'
                        break;
                }
            })
        })

        const downloadMusicBtn = document.querySelectorAll("#download-music")

        downloadMusicBtn.forEach(btn => {
            btn.addEventListener("click", async() => {
                const refresh = await fetch('/api/v1/auth/refresh')

                if (refresh.status === 401) return modal('error', 'برای دانلود اهنگ ابتدا ثبت نام کنید')

                let response = await fetch(`/api/v1/musics/downloads/${btn.getAttribute('music-id')}`, { method: 'post' })
                const data = await response.json()

                switch (response.status) {
                    case 201:
                        modal('success', data.message)
                        break;
                    default:
                        modal('error', data.message)
                        break;
                }
            })
        })

        const musicBtn = document.querySelectorAll('.music-btn')

        musicBtn.forEach(music => {
            music.addEventListener('click', async () => {
                const refresh = await fetch('/api/v1/auth/refresh')
                if (refresh.status === 401) return modal('error', 'برای پخش اهنگ ابتدا ثبت نام کنید')

                const response = await fetch(`/api/v1/musics/${music.getAttribute('music-id')}`)
                const data = await response.json();

                document.getElementById('music-player-box').classList.remove("hidden")
                document.getElementById('music-player-box').classList.add("flex-center")

                document.getElementById('music-box').src = data.data.poster
                audio.src = data.data.music
                audio.currentTime = 0
                rangePlayer.style.width = 0 + "%"
                audio.setAttribute('audio-id', data.data._id)
            })
        })
    }
    catch (error) {
        console.log(error);
    }
})()

;(async () => {
    try {
        const refresh = await fetch('/api/v1/auth/refresh')

        if (refresh.status === 401) return

        const likeSongResponse = await fetch('/api/v1/musics/likeSongs')
        const data = await likeSongResponse.json()

        const downloadResponse = await fetch('/api/v1/musics/downloads')
        const downloadData = await downloadResponse.json()

        const responsePlaylist = await fetch('/api/v1/musics/playlists/Me')
        const dataPlaylist = await responsePlaylist.json()

        const responseStream = await fetch('/api/v1/musics/lastHeard/')
        const dataStream = await responseStream.json()

        document.getElementById('number-of-user-like-song').setAttribute('value', data.data.numberOfUserLikeSong)
        document.getElementById('number-of-user-like-song').innerText = data.data.numberOfUserLikeSong

        document.getElementById('number-of-download-music').setAttribute('value', downloadData.data.count)
        document.getElementById('number-of-download-music').innerText = downloadData.data.count

        document.getElementById('number-of-playlist').innerText = dataPlaylist.data.count
        document.getElementById('number-of-playlist').value = dataPlaylist.data.count

        document.getElementById('number-of-stream').innerText = dataStream.data.count
        document.getElementById('number-of-stream').value = dataStream.data.count
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