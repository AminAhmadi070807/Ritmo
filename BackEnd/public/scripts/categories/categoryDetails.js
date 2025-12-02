"use strict"

const allPlaylistContainer = document.getElementById('all-playlist')

;(async () => {
    try {
        const response = await fetch(`/api/v1/musics/?page=1&limit=20&status=trending&genre=${location.href.split('/').pop()}`)
        const data = await response.json()

        data.data.forEach(music => {
            document.getElementById("category-trending-sung-container").insertAdjacentHTML(
                "beforeend",
                `
                        <div class="swiper-slide">
                          <a href="/musics/album/details/${music.title}">
                            <div class="w-50 h-auto cursor-pointer">
                              <img src="${music.poster}" alt="${music.title + "From" + music.artist}" class="h-[276px] object-center object-cover rounded-2xl"/>
                              <h3 class="font-Pelak_Bold text-center mt-2">${music.title}</h3>
                              <cite class="font-Pelak_Regular not-italic text-center mt-2 text-sm text-Neutral-300 block">${music.artist}</cite>
                            </div>
                            </a>
                        </div>`
            );
        })
    }
    catch (error) {
        console.error(error);
    }
})()
