"use strict";

const checkNotification = document.getElementById('check-notification')
const clockProfile = document.getElementById('close-box');
const submitButton = document.getElementById('save-user-info');
const file = document.getElementById('profile-input');
const fullNameInput = document.getElementById('full-name-input');
const usernameInput = document.getElementById('user-name-input');
const emailInput = document.getElementById('email-input');
const bioInput = document.getElementById('bio-input');
const profileInput = document.getElementById('profile-file')

;(async () => {
    try {
        const refresh = await fetch('/api/v1/auth/refresh')

        if (refresh.status !== 200) return location.href = '/auth/send'

        const response = await fetch('/api/v1/users/Me')
        const data = await response.json()

        document.getElementById('profile').src = data.data.profile
        document.getElementById('profile').alt = data.data.fullName

        document.getElementById('full-name-input').value = data.data.fullName

        document.getElementById('user-name-input').value = data.data.username
        document.getElementById('email-input').value = data.data.email
        document.getElementById('bio-input').value = data.data.bio
    }
    catch (error) {
        console.error(error)
    }
})()

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
submitButton.addEventListener('click',  async() => {
    try {
        const formData = new FormData();

        formData.append('fullName', fullNameInput.value);
        formData.append('username', usernameInput.value);
        formData.append('email', emailInput.value);
        formData.append('bio', bioInput.value);
        formData.append('profile', profileInput.files[0]);

        await fetch('/api/v1/users/update', {
            method: 'patch',
            body: formData
        })
    }
    catch (error) {
        console.error(error)
        modal('error', error.message || "Please try load site")
    }
})