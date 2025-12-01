"use strict"

const trendingAlbumContainer = document.getElementById("trending-album-container");
const newAlbumContainer = document.getElementById("new-album-container");
const allAlbumContainer = document.getElementById("all-album-container");
const addAlbumBtn = document.getElementById("add-album-btn");

;(async () => {
    try {
        const response = await fetch('/api/v1/musics/albums/?page=1&limit=20&status=trending')
        const data = await response.json();

        data.data.albums.forEach(album => {
            trendingAlbumContainer.insertAdjacentHTML('beforeend', `
                <div class="swiper-slide">
                    <a href="./AlbumsDetail.html?title=${album.title}">
                      <div class="w-51">
                        <img src="${album.cover}" class="max-w-50 min-w-50 w-50 object-cover rounded-2xl" alt="trending album">
                        <h3 class="font-Pelak_Bold text-base my-2 text-center">${album.title}</h3>
                        <cite class="font-Pelak_Regular block not-italic text-Neutral-300 text-xs text-center">${album.artist}</cite>
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
        const response = await fetch('/api/v1/musics/albums/?page=1&limit=20&status=latest')
        const data = await response.json();

        data.data.albums.forEach(album => {
            newAlbumContainer.insertAdjacentHTML(
                "beforeend",
                `            
                        <div class="swiper-slide">
                          <a href="./AlbumsDetail.html?title=${album.title}">
                            <div class="w-51">
                              <img src="${album.cover}" class="max-w-50 min-w-50 w-50 object-cover rounded-2xl" alt="trending album">
                              <h3 class="font-Pelak_Bold text-base my-2 text-center">${album.title}</h3>
                              <cite class="font-Pelak_Regular block not-italic text-Neutral-300 text-xs text-center">${album.artist}</cite>
                            </div>
                          </a>
                        </div>
    `
            );
        })
    }
    catch (error) {
        console.log(error);
    }
})()

;(async () => {
    try {
        const response = await fetch('/api/v1/musics/albums?page=1&limit=5&status=All')
        const data = await response.json();

        let albums = data.data.albums

        albums.forEach(album => {
            allAlbumContainer.insertAdjacentHTML(
                "beforeend",
                `            
                        <a href="/musics/album/details/${album.title}">
                          <div class="w-50 min-w-50 max-w-50">
                            <img src="${album.cover}" class="max-w-50 min-w-50 w-50 min-h-51 max-h-51 object-cover rounded-2xl" alt="trending album">
                            <h3 class="font-Pelak_Bold text-base my-2 text-center">${album.title}</h3>
                            <cite class="font-Pelak_Regular block not-italic text-Neutral-300 text-xs text-center">${album.artist}</cite>
                          </div>
                        </a>`
            );
        })

        if (albums.length < 5) addAlbumBtn.classList.add('hidden')
    }
    catch (error) {
        console.log(error);
    }
})()

let page = 1
const albumsFunc = async () => {
    try {
        ++page

        const response = await fetch(`/api/v1/musics/albums?page=${page}&limit=20&status=All`)
        const data = await response.json();

        let albums = data.data.albums

        allAlbumContainer.innerHTML = ""
        albums.forEach(album => {
            allAlbumContainer.insertAdjacentHTML(
                "beforeend",
                `            
                        <a href="/musics/album/details/${album.title}">
                          <div class="w-50 min-w-50 max-w-50">
                            <img src="${album.cover}" class="max-w-50 min-w-50 w-50 min-h-51 max-h-51 object-cover rounded-2xl" alt="trending album">
                            <h3 class="font-Pelak_Bold text-base my-2 text-center">${album.title}</h3>
                            <cite class="font-Pelak_Regular block not-italic text-Neutral-300 text-xs text-center">${album.artist}</cite>
                          </div>
                        </a>`
            );
        })
    }
    catch (error) {
        console.log(error);
    }
}

addAlbumBtn.addEventListener('click', albumsFunc)