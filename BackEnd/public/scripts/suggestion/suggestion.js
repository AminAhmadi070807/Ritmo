"use strict";

const main = document.querySelector("main");

let mainClass = "main-site px-5 lg:px-8 ms-auto max-w-[1600px]";

window.addEventListener("load", async () => {
  let downloads = JSON.parse(localStorage.getItem("lastHearing"));
  if (downloads) {
    main.className = `${mainClass} h-auto lg:mt-40 mt-24 min-h-[252px]`;
  } else {
    main.className = `${mainClass} h-screen`;

  }
});
