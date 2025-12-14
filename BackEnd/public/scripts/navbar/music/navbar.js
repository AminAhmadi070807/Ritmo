"use strict"

const profileContainer = document.getElementById("profile_container_desktop")
const rightNavbar = document.getElementById("right-navbar");
const rightNavbarBtn = document.getElementById("arrow-right-navbar");
const rightNavbarImage = document.getElementById("right-navbar-image");
const socialIcon = document.getElementById("social-icon");
const categoryIconList = document.getElementById('category-list');
const categoryIconSubList = document.getElementById('music-sublist-desktop');
const searchInput = document.querySelector('input[type=search]#search-input')

;(async () => {
    try {
        const refresh = await fetch('/api/v1/auth/refresh')

        if (refresh.status !== 200) return location.href = '/auth/send'

        const response = await fetch('/api/v1/users/Me')
        const data = await response.json()

        profileContainer.innerHTML = `
                        <a href="/settings/profile">
                            <img src="${data.data.profile}" class="size-12 object-center object-cover rounded-full" alt="${data.data.fullName}"/>
                        </a>
                        <div class="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 delay-75 absolute top-20 left-0 w-[304px] h-auto rounded-2xl border-t-4 border-t-Primary-500 bg-Neutral-900 px-2">
                            <ul class="text-[#FCFCFD]">
                                <!-- add class profile-button-active remove class profile-button-no-active -->
                                <li class="py-2.5 profile-button-no-active">
                                    <a href="/settings/profile" class="ps-6">پروفایل</a>
                                </li>
                                <li class="py-2.5 profile-button-no-active">
                                    <a href="#" class="ps-6">تنظیمات</a>
                                </li>
                                <li class="py-2.5 profile-button-no-active">
                                    <a href="/settings/myAccount" class="ps-6">اکانت پریمویم</a>
                                </li>
                                <div class="border-t-2 border-t-Neutral-800 my-2"></div>
                                <li class="pt-2.5 pb-4 profile-button-no-active">
                                    <a href="/api/v1/users/logout" class="ps-6">خروج از اکانت</a>
                                </li>
                            </ul>
                        </div>
                    `
    }
    catch (error) {
        console.log(error)
    }
})()

;(async () => {
    try {
        const response = await fetch('/api/v1/categories/music/')
        const data = await response.json()
        const path = location.pathname
        data.data.categories.forEach((category) => {
            categoryIconList.insertAdjacentHTML('beforeend', `
                <div>
                    <a href="${category.href}" class="flex items-center gap-x-3 py-4 text-white ${path.split('/').pop() === category.href.toLowerCase().split('/').pop() ? "active-list-music-small-size" : "no-active-list-music-small-size"}">
                        <svg class="${path.split('/').pop() === category.href.toLowerCase().split('/').pop() ? "active-icon-in-music" : "no-active-icon-in-music"} ms-6"><use href="#${category.icon}"></use></svg>
                        <span id="right-navbar-text" class="hidden ${path.split('/').pop() === category.href.toLowerCase().split('/').pop() ? "navbar-list-active" : "navbar-list-no-active"}">${category.title}</span>
                    </a>
                </div>
            `)
        })
    }
    catch (error) {
        console.log(error)
    }
})()

;(async () => {
    try {
        const path = location.pathname


        categoryIconSubList.innerHTML = `
                    <div>
                        <a href="/lastHeard" class="py-4 flex items-center gap-x-3 text-white ${ path.split('/').pop() === "lastHeard" ? "active-list-music-small-size" : "no-active-list-music-small-size"}">
                            <svg class="active-icon-in-music ${ path.split('/').pop() === "lastHeard" ? "active-icon-in-music" : "no-active-icon-in-music"} ms-6"><use href="#headphone"></use></svg>
                            <span id="right-navbar-text" class="hidden ${ path.split('/').pop() === "lastHeard" ? "navbar-list-active" : "navbar-list-no-active"}">آخرین شنیده‌ها</span>
                        </a>
                    </div>

                    <div>
                        <a href="/likeSongs" class="text-white ${ path.split('/').pop() === "likeSongs" ? "active-list-music-small-size" : "no-active-list-music-small-size"} flex items-center gap-x-3 py-4">
                            <svg class="${ path.split('/').pop() === "likeSongs" ? "active-icon-in-music" : "no-active-icon-in-music"} ms-6"><use href="#heart"></use></svg>
                            <span id="right-navbar-text" class="hidden ${ path.split('/').pop() === "likeSongs" ? "navbar-list-active" : "navbar-list-no-active"}">مورد علاقه‌ها</span>
                        </a>
                    </div>

                    <div>
                        <a href="/suggestions" class="text-white ${ path.split('/').pop() === "suggestions" ? "active-list-music-small-size" : "no-active-list-music-small-size"} py-4 flex items-center gap-x-3">
                            <svg class="${ path.split('/').pop() === "suggestions" ? "active-icon-in-music" : "no-active-icon-in-music"} ms-6"><use href="#vynil"></use></svg>
                            <span id="right-navbar-text" class="hidden ${ path.split('/').pop() === "suggestions" ? "navbar-list-active" : "navbar-list-no-active"}">پیشنهادها</span>
                        </a>
                    </div>

                    <div>
                        <a href="/downloads" class="text-white ${ path.split('/').pop() === "downloads" ? "active-list-music-small-size" : "no-active-list-music-small-size"} py-4 text-white flex items-center gap-x-3">
                            <svg class="${ path.split('/').pop() === "downloads" ? "active-icon-in-music" : "no-active-icon-in-music"} ms-6"><use href="#download-01"></use></svg>
                            <span id="right-navbar-text" class="hidden ${ path.split('/').pop() === "downloads" ? "navbar-list-active" : "navbar-list-no-active"}">دانلودشده‌ها</span>
                        </a>
                    </div>
            `
    }
    catch (error) {
        console.log(error)
    }
})()

searchInput.addEventListener('keyup', async (event) => {
    try {
        if (event.keyCode === 13) {
            const refresh = await fetch('/api/v1/auth/refresh')

            if (refresh.status !== 200) return location.href = '/auth/send'

            location.href = `/search?search=${event.target.value}`
        }
    }
    catch (error) {
        console.log(error)
    }
})

rightNavbarBtn.addEventListener("click", function () {
    const userRightNavbarText = document.querySelectorAll("#right-navbar-text");
    rightNavbar.classList.toggle("w-60");
    rightNavbar.classList.toggle("w-22");
    rightNavbarBtn.querySelector("svg").classList.toggle("rotate-180");

    if (rightNavbarImage.getAttribute("src") === "../../../image/svg/logo-type.svg") {
        rightNavbarImage.setAttribute("src", "../../../image/Logo.png");
        rightNavbarImage.className = "w-[64x] h-11 mx-auto mt-2.5";
    }
    else {
        rightNavbarImage.setAttribute(
            "src",
            "../../../image/svg/logo-type.svg"
        );
        rightNavbarImage.className = "w-[167x] h-17 mx-auto";
    }

    userRightNavbarText.forEach((text) => text.classList.toggle("hidden"));
    socialIcon.classList.toggle("hidden");
    socialIcon.classList.toggle("flex");
})