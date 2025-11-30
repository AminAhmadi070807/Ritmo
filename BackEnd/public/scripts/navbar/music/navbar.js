"use strict"

const profileContainer = document.getElementById("profile_container_desktop")
const rightNavbar = document.getElementById("right-navbar");
const rightNavbarBtn = document.getElementById("arrow-right-navbar");
const rightNavbarImage = document.getElementById("right-navbar-image");
const socialIcon = document.getElementById("social-icon");
const categoryIconList = document.getElementById('category-list')

;(async () => {
    try {
        const response = await fetch('/api/v1/users/Me')
        const data = await response.json()

        switch (response.status) {
            case 401:
                const refresh = await fetch('/api/v1/auth/refresh')
                const response = await fetch('/api/v1/users/Me')
                const newData = await response.json()
                if (refresh.status === 200) profileContainer.innerHTML = `
                        <a href="/setting/profile"><img src="${newData.data.profile}" class="size-full object-cover rounded-full" alt="${newData.data.fullName}"/></a>
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
                else profileContainer.innerHTML = `<a href="/auth/send"><svg class="size-8"><use href="#lock-closed"></use></svg></a>`
                break;
            case 200:
                profileContainer.innerHTML = `
                        <a href="/setting/profile"><img src="${data.data.profile}" class="size-full object-cover rounded-full" alt="${data.data.fullName}"/></a>
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
                break;
            default:
                profileContainer.innerHTML = `<a href="/auth/send"><svg class="size-8"><use href="#lock-closed"></use></svg></a>`
                break
        }
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
                    <a href="${category.href === '/' ? '/': "/musics" + category.href }" class="flex items-center gap-x-3 py-4 ${path.split('/').pop() === category.href.toLowerCase().split('/').pop() ? "active-list-music-small-size" : "no-active-list-music-small-size"}">
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