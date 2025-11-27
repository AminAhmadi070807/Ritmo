"use strict";

const $ = document;

;(async () => {
    try {
        const response = await fetch("/api/v1/musics/trending")
        const data = await response.json()

        data.data.forEach(music => {
              $.getElementById("trending-sung-container").insertAdjacentHTML("beforeend", `
                <div class="swiper-slide">
                  <a href="/musics/page/${music._id}">
                    <div class="w-88 h-104 max-w-88 max-h-104 cursor-pointer">
                      <div class="w-88 h-92">
                        <img src="${music.poster}" class="w-88 h-92 min-w-88 min-h-92 max-w-88 max-h-92 object-cover object-center" alt="${music.artist}"/>
                      </div>
    
                      <div class="flex items-center justify-between mt-4 px-4">
                        <h3 class="font-Pelak_Bold text-xl">${music.artist}</h3>
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

;(async () => {
    try {
        const response = await fetch('/api/v1/musics/genres')
        const data = await response.json()

        data.data.forEach(category => {
            document.getElementById('category-container').insertAdjacentHTML("beforeend", `
            <div class="swiper-slide">
                <a href="/categories/details/${category.href}">
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

// crate category element


$.getElementById("notification-mobile").addEventListener('click', () => {
  $.getElementById('notification-modal-mobile').classList.toggle('invisible')
  $.getElementById('notification-modal-mobile').classList.toggle('opacity-0')
  $.getElementById('notification-modal-mobile').classList.toggle('visible')
  $.getElementById('notification-modal-mobile').classList.toggle('opacity-100')
})