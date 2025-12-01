"use strict"


// trending sung
new Swiper(".trending-sung-swiper", {
    slidesPerView: "auto",
    spaceBetween: 20,
    grabCursor: true,
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

// albums
new Swiper(".album-swiper", {
    slidesPerView: "auto",
    spaceBetween: 16,
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
    speed: 3000,
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

new Swiper(".trending-album-swiper", {
    slidesPerView: "auto",
    spaceBetween: 20,
    grabCursor: true,
    speed: 3000,
    centeredSlides : true,
    breakpoints : {
        500 : {
            centeredSlides : false,
        },
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".next-trending-album",
        prevEl: ".prev-trending-album",
        clickable: false,
    },
});

new Swiper(".new-album-swiper", {
    slidesPerView: "auto",
    spaceBetween: 20,
    grabCursor: true,
    speed: 3000,
    centeredSlides : true,
    breakpoints : {
        500 : {
            centeredSlides : false,
        },
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".next-Recently-Published-Album",
        prevEl: ".prev-Recently-Published-Album",
        clickable: false,
    },
});

// trending singer
new Swiper(".trending-singer-swiper", {
    slidesPerView: "auto",
    spaceBetween: 16,
    speed: 3000,
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
// pop news
new Swiper(".pop-news", {
    slidesPerView: "auto",
    spaceBetween: 16,
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
// trending sung
new Swiper(".category-trending-sung-swiper", {
    slidesPerView: "auto",
    spaceBetween: 16,
    speed: 3000,
    // auto play
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".next-trending-sung",
        prevEl: ".prev-trending-sung",
        clickable: true,
    },
});
// play list
new Swiper(".category-playlist-swiper", {
    slidesPerView: "auto",
    spaceBetween: 16,
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
// all artist of this style
new Swiper(".category-all-artist-swiper", {
    slidesPerView: "auto",
    spaceBetween: 16,
    speed: 3000,
    // auto play
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});