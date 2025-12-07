"use strict"

const questionRitmoPlus = document.querySelectorAll("#questions-ritmo-plus");

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
