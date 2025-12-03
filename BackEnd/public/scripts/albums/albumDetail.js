"use strict";

const $ = document;

const toggleMenu = document.getElementById('toggle-menu')


toggleMenu.addEventListener('click', (event) => {
        let musicList = event.currentTarget.parentElement.parentElement;
        let musicList_2 = musicList.parentElement.querySelector("#album-menu.opacity-100");

    console.log(musicList_2);

        let musicListMenu = musicList.querySelector("#album-menu");
        musicListMenu.classList.toggle("hidden");
        musicListMenu.classList.toggle("opacity-0");
        musicListMenu.classList.toggle("opacity-100");
        if (musicList_2) {
            musicList_2.classList.add("hidden");
            musicList_2.classList.add("opacity-0");
            musicList_2.classList.remove("opacity-100");
        }
        else {
            musicListMenu.classList.remove("hidden");
            musicListMenu.classList.remove("opacity-0");
            musicListMenu.classList.add("opacity-100");
        }

    })
