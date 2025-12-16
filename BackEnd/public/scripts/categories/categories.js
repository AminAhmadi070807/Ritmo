"use strict";

const categoriesContainer = document.getElementById('categoriesContainer');

;(async () => {
    try {
        const response = await fetch('/api/v1/musics/genres')
        const data = await response.json();

        data.data.forEach(item => {
            categoriesContainer.insertAdjacentHTML('beforeend', `
                    <a href="/categories/details/${item._id}">
                      <div class="relative group min-w-80 h-50 w-full min-h-50">
                        <img src="${item.cover}" class="h-50 min-h-50 w-full object-cover rounded-lg" alt="${item.title}"/>

                        <h3 class="transform -translate-y-14 text-center font-FA_Pelak_Bold text-2xl">${item.title}</h3>
                      </div>
                    </a>
            `)
        })
    }
    catch (error) {
        console.log(error);
    }
})()