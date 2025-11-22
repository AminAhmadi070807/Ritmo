"use strict"

const modalDev = document.querySelector('div#status-modal')

function modal (status, message) {
    modalDev.classList.remove('hidden')
    modalDev.classList.add('flex')
    if (status === "success") {
        modalDev.classList.add('border-Success-200')
        modalDev.classList.remove('border-Error-200')
        modalDev.innerHTML = `
            <h2 dir="ltr" class="text-gray-300 font-FA_Pelak_Regular text-base w-[80%]">${message}</h2>
            <svg class="size-10 text-Success-200"><use href="#success"></use></svg>`
    }
    else {
        modalDev.classList.add('border-Error-200')
        modalDev.classList.remove('border-Success-200')
        modalDev.innerHTML = `
            <h2 dir="ltr" class="text-gray-300 font-FA_Pelak_Regular text-base w-[80%]">${message}</h2>
            <svg class="size-10 text-Error-200"><use href="#error"></use></svg>
        `
    }

    setTimeout(() => {
         modalDev.classList.add('hidden')
         modalDev.classList.remove('flex')
    }, 2000)
}

export { modal }