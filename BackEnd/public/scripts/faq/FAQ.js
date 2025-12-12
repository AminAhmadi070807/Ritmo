"use strict";

const questionRitmoPlus = document.querySelectorAll("#question-ritmo-plus");


questionRitmoPlus.forEach((question) => {
    question.addEventListener("click", () => {
        if (!question.querySelector("p.hidden")) {
            question.classList.add("bg-transparent-1/75");
            question.classList.remove("ritmo-questions");
            question.querySelector("#answer").classList.add("hidden");
            question.querySelector("#arrowDown").classList.remove("rotate-180");
        }
        else {
            question.classList.remove("bg-transparent-1/75");
            question.classList.add("ritmo-questions");
            question.querySelector("#answer").classList.remove("hidden");
            question.querySelector("#arrowDown").classList.add("rotate-180");
        }
  });
});