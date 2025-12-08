"use strict"

const questionRitmoPlus = document.querySelectorAll("#questions-ritmo-plus");
const paymentPlanButtons = document.querySelectorAll('button.payment-plan-btn')

;(async () => {
    try {
        await fetch('/api/v1/auth/refresh')
    }
    catch (error) {
        console.error(error);
    }
})()

questionRitmoPlus.forEach((questionContainer) => {
    questionContainer.addEventListener("click", () => {
    if (!questionContainer.querySelector("p.hidden")) {
        questionContainer.classList.add("bg-transparent-1/75");
        questionContainer.classList.remove("ritmo-questions");
        questionContainer.querySelector("#answer").classList.add("hidden");
        questionContainer.querySelector("#arrowDown").classList.remove("rotate-180");
    } else {
        questionContainer.classList.remove("bg-transparent-1/75");
        questionContainer.classList.add("ritmo-questions");
        questionContainer.querySelector("#answer").classList.remove("hidden");
        questionContainer.querySelector("#arrowDown").classList.add("rotate-180");
    }
  });
});

paymentPlanButtons.forEach(btn => {
    btn.addEventListener('click',  async() => {
        await fetch('/api/v1/auth/refresh')

        const planId = btn.getAttribute('plan-id')

        const response = await fetch(`/api/v1/payment/plan/${planId}`, {method: 'post'})
        const data = await response.json()

        if (data.status !== 200) return location.href = '/plan'

        location.href = data.data.redirect
    })
})
