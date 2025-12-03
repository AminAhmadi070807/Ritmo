"use strict";

const playlist = document.getElementById('playlist')


const togglePlaylistMenu = document.getElementById("toggle-menu")

togglePlaylistMenu.addEventListener("click", (event) => {
    let musicList = event.currentTarget.parentElement.parentElement;
    let musicList_2 = musicList.parentElement.querySelector("#playlist-menu.opacity-100");;

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