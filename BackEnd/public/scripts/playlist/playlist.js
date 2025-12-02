"use strict"

const playlistsContainer = document.getElementById("all-playlist");
const trendingPlaylistContainer = document.getElementById("trending-playlist-container");

;(async () => {
    try {
        const response = await fetch('/api/v1/musics/playlists/?page=1&limit=20&status=All')
        const data = await response.json();

        data.data.playlist.forEach(playlist => {
            playlistsContainer.insertAdjacentHTML('beforeend', `
                    <a href="/musics/playlist/datails/${playlist.title}">
                        <div class="w-51 max-w-51">
                            <img src="${playlist.cover}" class="size-51 max-w-51 min-w-51 min-h-51 max-h-51" alt="${playlist.title}">
                            <div class="flex items-center justify-between my-4 px-2">
                              <h4 class="font-Pelak_Bold text-base">${playlist.title}</h4>
                              <div class="flex items-center gap-x-3 text-Neutral-300">
                                <svg class="size-6"><use href="#heart"></use></svg>
                                <svg class="size-6"><use href="#add-circle"></use></svg>
                              </div>
                            </div>
                        </div>
                    </a>
            `)
        })
    }
    catch (error) {
        console.error(error);
    }
})()

;(async () => {
    try {
        const response = await fetch('/api/v1/musics/playlists/?page=1&limit=20&status=trending')
        const data = await response.json();

        data.data.playlist.forEach(playlist => {
            trendingPlaylistContainer.insertAdjacentHTML('beforeend', `
                <div class="swiper-slide">
                    <a href="./AlbumsDetail.html?title=${playlist.title}">
                      <div class="w-51">
                        <img src="${playlist.cover}" class="max-w-50 min-w-50 w-50 object-cover rounded-2xl" alt="trending album">
                        <h3 class="font-Pelak_Bold text-base my-2 text-center">${playlist.title}</h3>
                      </div>
                    </a>
                </div>
            `)
        })
    }
    catch (error) {
        console.error(error);
    }
})()
