const $ = document
const checkNotification = $.getElementById('check-notification')
const clockProfile = $.getElementById('close-box')

let isNotification = true
checkNotification.addEventListener('click', () => {
    isNotification = !isNotification
    checkNotification.classList.toggle('justify-start')
    checkNotification.classList.toggle('justify-end')
    checkNotification.classList.toggle('custom-button-active')
    checkNotification.classList.toggle('bg-Neutral-700')
    checkNotification.dataset.check = isNotification
})

clockProfile.addEventListener('click', () => window.history.go(-1))