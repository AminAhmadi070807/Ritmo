"use strict"


// trending sung
new Swiper(".trending-sung-swiper", {
    slidesPerView: "auto",
    spaceBetween: 20,
    grabCursor: true,
    loop: true,
    speed: 3000,
    // auto play
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".next-trending-sung",
        prevEl: ".prev-trending-sung",
        clickable: false,
    },
});

// trending singer
new Swiper(".trending-singer-swiper", {
    slidesPerView: "auto",
    spaceBetween: 16,
    loop: true,
    speed: 3000,
    // auto play
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".next-trending-singer",
        prevEl: ".prev-trending-singer",
        clickable: true,
    },
});

// video musci
new Swiper(".music-video-swiper", {
    slidesPerView: "auto",
    spaceBetween: 16,
    loop: true,
    speed: 3000,
    // auto play
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".next-music-video",
        prevEl: ".prev-music-video",
        clickable: true,
    },
});

// album
new Swiper(".album-swiper", {
    slidesPerView: "auto",
    spaceBetween: 16,
    loop: true,
    speed: 3000,
    // auto play
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".next-album",
        prevEl: ".prev-album",
        clickable: true,
    },
});

// playlist
new Swiper(".playlist-swiper", {
    slidesPerView: "auto",
    spaceBetween: 16,
    loop: true,
    speed: 3000,
    // auto play
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".next-playlist",
        prevEl: ".prev-playlist",
        clickable: true,
    },
});

// category
new Swiper(".Category-swiper", {
    slidesPerView: "auto",
    spaceBetween: 16,
    loop: true,
    speed: 3000,
    // auto play
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".next-Category",
        prevEl: ".prev-Category",
        clickable: true,
    },
});