"use strict";

const $ = document;

;(async () => {
    try {
        const response = await fetch("/api/v1/musics/trending")
        const data = await response.json()

        console.log(data)

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
`
  );
        })
    }
    catch (error) {}
})()

// create trending sung element
// trendingSungInfo.forEach((el) => {
//   $.getElementById("trending-sung-container").insertAdjacentHTML(
//     "beforeend",
//     `
//             <div class="swiper-slide">
//               <a href="./Music/video-player/video-player.html">
//                 <div class="w-88 h-104 max-w-88 max-h-104 cursor-pointer">
//                   <div class="group relative w-88 h-92">
//                     <img src="${el.src}" class="w-88 h-92 min-w-88 min-h-92 object-cover" alt="${el.title}"/>
//                     <div class="absolute left-0 right-0 bottom-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 flex items-center justify-center w-full h-full border-b-4 border-b-Primary-500" style="background: linear-gradient(360deg,#ed265e56, transparent);">
//                       <div class="flex items-center justify-center size-14 border-2 rounded-full cursor-pointer" style="border-radius: 50%">
//                         <svg class="size-8"><use href="#play"></use></svg>
//                       </div>
//                     </div>
//                   </div>
//
//                   <div class="flex items-center justify-between mt-4 px-4">
//                     <h3 class="font-Pelak_Bold text-xl">${el.title}</h3>
//                     <div class="flex items-center justify-center gap-x-3">
//                       <svg class="size-8 text-neutral-500">
//                         <use href="#heart"></use>
//                       </svg>
//                       <svg class="size-8 text-neutral-500">
//                         <use href="#add-circle"></use>
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </a>
//             </div>
//     `
//   );
// });

// create lest heard element
// lestHeardInfo.forEach((el) => {
//   $.getElementById("lest-heard-music-container").insertAdjacentHTML(
//     "beforeend",
//     `
//
//     <div id="lest-heard-music" class="flex items-center w-full h-20 justify-between border-b-2 border-b-Neutral-800 py-2 px-6 md:px-8 cursor-pointer">
//       <div class="flex gap-x-4 min-w-50 md:min-w-100 items-center w-full">
//         <data value="${el.id}" class="font-FA_Pelak_Regular text-xl">${
//       el.id
//     }</data>
//         <img src="${
//           el.src
//         }" class="size-16 max-w-16 min-w-16 max-h-16 min-h-16 rounded-lg object-cover" alt="${
//       el.title + " From " + el.subtitle
//     }"/>
//         <div class="h-14 w-50">
//           <h4 class="font-Pelak_Bold text-sm sm:text-base md:text-lg">${
//             el.title
//           }</h4>
//           <cite class="font-Pelak_Regular text-base text-Neutral-300 mt-1">${
//             el.subtitle
//           }</cite>
//         </div>
//       </div>
//
//       <div class="hidden md:flex gap-x-4 justify-center items-center">
//         <a href="#"><svg class="size-6 text-Neutral-300"><use href="#heart"></use></svg></a>
//         <a href="#"><svg class="size-6 text-Neutral-300"><use href="#download-01"></use></svg></a>
//         <a href="#"><svg class="size-6 text-Neutral-300"><use href="#add-circle"></use></svg></a>
//         <a href="#"><svg class="size-6 text-Neutral-300"><use href="#menu-queue"></use></svg></a>
//       </div>
//
//       <div class="hidden md:block">
//         <div class="ps-10">
//           <time datetime="00:01:41" class="font-Pelak_Medium text-base">${
//             el.time
//           }</time>
//         </div>
//       </div>
//
//       <div id="playlist-menu" class="absolute hidden opacity-0 transition-all duration-300 left-25 size-50 min-w-50 min-h-50 bg-transparent-2 rounded-lg md:hidden ms-auto mt-25">
//         <div class="flex flex-col gap-y-4 justify-center items-between p-5 text-white" >
//           <a href="#" class="flex items-center gap-x-3 font-Pelak_Regular text-sm">
//             <svg class="size-6">
//               <use href="#heart"></use>
//             </svg>
//             علاقه مندی ها
//           </a>
//           <a href="#" class="flex items-center gap-x-3 font-Pelak_Regular text-sm">
//             <svg class="size-6">
//               <use href="#download-01"></use>
//             </svg>
//             دانلود
//           </a>
//           <a
//             href="#"
//             class="flex items-center gap-x-3 font-Pelak_Regular text-sm"
//           >
//             <svg class="size-6">
//               <use href="#add-circle"></use>
//             </svg>
//             افزودن به لیست
//           </a>
//           <a
//             href="#"
//             class="flex items-center gap-x-3 font-Pelak_Regular text-sm"
//           >
//             <svg class="size-6">
//               <use href="#menu-queue"></use>
//             </svg>
//             افزودن به پلی لیست
//           </a>
//         </div>
//       </div>
//
//       <div class="flex items-center justify-center md:hidden">
//         <svg onclick="toggleIconsMenu(event)" class="size-7 transform rotate-90"><use href="#three-pin"></use></svg>
//       </div>
//     </div>
//
//     `
//   );
// });

// create trending singer element
// trendingSingerInfo.forEach((el) => {
//   $.getElementById("trending-singer-container").insertAdjacentHTML(
//     "beforeend",
//     `
//
//     <div class="swiper-slide cursor-pointer">
//       <a href="./Music/Artist/artistDetail.html?title=${el.title}">
//         <div id="slider-trending-singer" class="w-50 h-60 cursor-pointer">
//           <div class="relative group size-50 rounded-full">
//             <img src="${el.src}" class="size-50 rounded-full object-cover" alt="${el.title}"/>
//             <div class="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 right-0 left-0 bottom-0 flex items-end justify-center size-full rounded-full border-b-4 border-b-Primary-500" style="background: linear-gradient(360deg, #c1093dcc, transparent);">
//               <div class="flex items-center justify-center gap-x-2 mb-6">
//                 <svg class="size-8"><use href="#shuffle"></use></svg>
//                 <svg class="size-8"><use href="#heart"></use></svg>
//               </div>
//             </div>
//           </div>
//           <h3 class="font-Pelak_Bold text-center mt-4 text-lg">${el.title}</h3>
//         </div>
//       </a>
//     </div>
//
//     `
//   );
// });

// create video musci element
// videoMusicInfo.forEach((el) => {
//   $.getElementById("video-music-container").insertAdjacentHTML(
//     "beforeend",
//     `
//
//     <div class="swiper-slide">
//       <a href="./Music/video-player/video-player.html">
//         <div class="w-[368px] h-75 cursor-pointer">
//           <img src="${el.src}" class="w-full h-52 min-w-[368px] max-w-[368px] min-h-52 max-h-52" alt="${el.title + "From" + el.subTitle}"/>
//           <div class="flex items-center justify-between mt-4 px-4">
//             <div>
//               <h4 class="font-Pelak_Bold text-base/[150%] mb-2">${el.title}</h4>
//               <cite class="font-Pelak_Regular not-italic text-Neutral-300">${el.subTitle}</cite>
//             </div>
//             <div class="flex items-center gap-x-3 text-Neutral-300">
//               <svg class="size-6"><use href="#heart"></use></svg>
//             </div>
//           </div>
//         </div>
//       </a>
//     </div>
//
//     `
//   );
// });

// create album element
// albumInfo.forEach((el) => {
//   $.getElementById("album-container").insertAdjacentHTML(
//     "beforeend",
//     `
//
//     <div class="swiper-slide">
//       <a href="./Music/Album/AlbumsDetail.html?title=${el.title}">
//         <div class="w-50 h-[276px] cursor-pointer">
//           <img src="${el.src}" alt="${el.title + "From" + el.subtitle}" />
//           <h3 class="font-Pelak_Bold text-center mt-2">${el.title}</h3>
//           <cite class="font-Pelak_Regular not-italic text-center mt-2 text-sm text-Neutral-300 block">${
//             el.subtitle
//           }</cite>
//         </div>
//       </a>
//     </div>
//
//     `
//   );
// });

// create playlist element
// playlistInfo.forEach((el) => {
//   $.getElementById("playlist-container").insertAdjacentHTML(
//     "beforeend",
//     `
//
//     <div class="swiper-slide">
//       <a href="./Music/playlist/playlistDatail.html?title=${el.title}">
//          <div class="w-51 max-w-51 cursor-pointer">
//            <img src="${el.src}" class="size-51 max-w-51 min-w-51 min-h-51 max-h-51" alt="${el.title}"/>
//            <div class="flex items-center justify-between my-4 px-2">
//              <h4 class="font-Pelak_Bold text-base">${el.title}</h4>
//              <div class="flex items-center gap-x-3 text-Neutral-300">
//                <svg class="size-6"><use href="#heart"></use></svg>
//                <svg class="size-6"><use href="#add-circle"></use></svg>
//              </div>
//            </div>
//          </div>
//       </a>
//     </div>
//
//     `
//   );
// });

// crate category element
// categoryInfo.forEach((el) => {
//   $.getElementById("category-container").insertAdjacentHTML(
//     "beforeend",
//     `
//
//     <div class="swiper-slide">
//       <a href="./Music/Categories/CategoryDetail.html?title=${el.title}">
//          <div class="relative w-[275px] h-50 cursor-pointer">
//            <img src="${el.src}" class="w-[275px] h-50 min-w-[275px] max-w-[275px] min-h-50 max-h-50" alt="${el.title}"/>
//            <div class="absolute inset-0 m-auto h-10 w-20">
//              <h4 class="font-Pelak_Bold text-2xl text-nowrap">${el.title}</h4>
//            </div>
//          </div>
//       </a>
//     </div>
//
//     `
//   );
// });

$.getElementById("notification-mobile").addEventListener('click', () => {
  $.getElementById('notification-modal-mobile').classList.toggle('invisible')
  $.getElementById('notification-modal-mobile').classList.toggle('opacity-0')
  $.getElementById('notification-modal-mobile').classList.toggle('visible')
  $.getElementById('notification-modal-mobile').classList.toggle('opacity-100')
})