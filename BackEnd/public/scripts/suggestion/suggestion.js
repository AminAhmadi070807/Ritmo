"use strict";

const main = document.querySelector("main");

let mainClass = "main-site px-5 lg:px-8 ms-auto max-w-[1600px]";

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

;(async () => {
    try {
        const refresh = await fetch('/api/v1/auth/refresh')

        if (refresh.status === 401) {
            main.className = `${mainClass} h-screen`;
            document.getElementById('suggestion-icon').classList.add('flex')
            document.getElementById('suggestion-icon').classList.remove('hidden')
            document.getElementById('suggestion-container').classList.add('hidden')
            return
        }

        const response = await fetch('/api/v1/suggestions')
        const data = await response.json()

        data.data.suggestions.forEach((suggestion, index) => {
            document.getElementById('suggestion-container').insertAdjacentHTML('beforeend', `
                  <div class="flex items-center w-full h-20 justify-between border-b-2 border-b-Neutral-800 py-2 px-6 md:px-8">
                    <div music-id="${suggestion._id}" class="music-btn flex gap-x-4 min-w-50 md:min-w-100 items-center">
                      <data value="${index + 1}" class="font-FA_Pelak_Regular text-xl">${index + 1}</data>
                      <img src="${suggestion.poster}" class="size-16 max-w-16 min-w-16 max-h-16 min-h-16 rounded-lg object-cover" alt="${suggestion.title + suggestion.artist}"/>
                      <div class="h-14 w-50">
                        <h4 class="font-Pelak_Bold text-sm sm:text-base md:text-lg">${suggestion.title}</h4>
                        <cite class="font-Pelak_Regular text-xs sm:text-sm md:text-base text-Neutral-300 mt-1">${suggestion.artist}</cite>
                      </div>
                    </div>
                    <div class="hidden lg:flex items-center w-100 justify-between">
                      <div class="flex gap-x-4 items-center">
                        <span id="like-song" music-id="${suggestion._id}"><svg class="size-6 ${suggestion.likeSong ? "text-Primary-600" : "text-Neutral-300"}"><use href="#${suggestion.likeSong ? "heart-solid" : "heart"}"></use></svg></span>
                        <button role="button" type="button" music-id="${suggestion._id}" id="download-music"><svg class="size-6 text-Neutral-300"><use href="#download-01"></use></svg></button>
                        <a href="#"><svg class="size-6 text-Neutral-300"><use href="#add-circle"></use></svg></a>
                        <a href="#"><svg class="size-6 text-Neutral-300"><use href="#menu-queue"></use></svg></a>
                      </div>
                      <div class="ps-10">
                        <time datetime="01:42" class="font-FA_Pelak_Medium text-base">${formatTime(suggestion.time)}</time>
                      </div>
                    </div>
                    <div id="download-menu" class="absolute hidden opacity-0 transition-all duration-300 left-25 size-50 min-w-50 h-auto bg-transparent-2 rounded-lg lg:hidden ms-auto mt-25">
                      <div class="flex flex-col gap-y-4 justify-center items-between p-5 text-white">
                        <span id="like-song" music-id="${suggestion._id}" class="flex items-center gap-x-3 font-Pelak_Regular text-sm">
                          <svg class="size-6"><use href="#heart"></use></svg>
                          علاقه مندی ها
                        </span>
                        <button role="button" type="button" id="download-music" music-id="${suggestion._id}" class="flex items-center gap-x-3 font-Pelak_Regular text-sm">
                          <svg class="size-6"><use href="#download-01"></use></svg>
                          دانلود
                        </button>
                        <a href="#" class="flex items-center gap-x-3 font-Pelak_Regular text-sm">
                          <svg class="size-6"><use href="#download-01"></use></svg>
                          افزردن به لیست
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
            `)
        })

        const likeSongBtn = document.querySelectorAll("#like-song")

        likeSongBtn.forEach(btn => {
            btn.addEventListener("click", async() => {
                const refresh = await fetch('/api/v1/auth/refresh')

                if (refresh.status === 401) return  modal('error', 'برای لایک کردن اهنگ ابتدا لطفا ثبت نام کنید')

                const response = await fetch(`/api/v1/musics/likeSongs/${btn.getAttribute('music-id')}`, { method: 'post' })

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
                console.log('AMIN')
                const refresh = await fetch('/api/v1/auth/refresh')

                if (refresh.status === 401)  return  modal('error', 'برای دانلود کردن اهنگ ابتدا لطفا ثبت نام کنید')

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
                if (refresh.status !== 200)  return  modal('error', 'برای پخش کردن اهنگ ابتدا لطفا ثبت نام کنید')

                const response = await fetch(`/api/v1/musics/${music.getAttribute('music-id')}`)
                const data = await response.json();

                document.getElementById('music-player-box').classList.remove("hidden")

                document.getElementById('music-box').src = data.data.poster
                audio.src = data.data.music
                audio.currentTime = 0
                rangePlayer.style.width = 0 + "%"
                audio.setAttribute('audio-id', data.data._id)
            })
        })

        if (data.data.count !== 0) {
            main.className = `${mainClass} h-auto lg:mt-40 mt-24 min-h-[252px]`;
            document.getElementById('suggestion-icon').classList.remove('flex')
            document.getElementById('suggestion-icon').classList.add('hidden')
            document.getElementById('suggestion-container').classList.remove('hidden')
        }
        else {
            main.className = `${mainClass} h-screen`;
            document.getElementById('suggestion-icon').classList.add('flex')
            document.getElementById('suggestion-icon').classList.remove('hidden')
            document.getElementById('suggestion-container').classList.add('hidden')
        }
    }
    catch (e) {
        console.error(e);
    }
})()
