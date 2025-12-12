"use strict";

;(async () => {
    try {
        const response = await fetch("/api/v1/FAQ");
        const data = await response.json();

        data.data.forEach((faq, index) => {
            document.getElementById('Frequently-Asked-Questions-Container').insertAdjacentHTML('beforeend', `
            <div id="question-ritmo-plus" class="flex mt-6 flex-col py-4 w-full h-auto transition-all duration-500 bg-transparent-1/75 rounded-sm border-r-4 border-r-Primary-500 px-4 cursor-pointer">
              <div class="flex items-center justify-between w-full">
                <label class="font-Pelak_Medium text-xs sm:text-base">
                  <data value="${index + 1}"></data>
                  ${faq.title}
                </label>
                <svg id="arrowDown" class="size-5 transition-all duration-500 transform">
                  <use href="#chevron-down"></use>
                </svg>
              </div>
              <p class="hidden font-Pelak_Medium text-xs sm:text-base/[42px] mt-4 max-w-[90%]" id="answer">${faq.description}</p>
            </div>

            `)
        })

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
    }
    catch (error) {
        console.log(error)
    }
})()