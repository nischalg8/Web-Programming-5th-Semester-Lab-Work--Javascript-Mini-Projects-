import { questionSetArray } from "./data.js";

// shared state variables
let currentIndex;
let currentQuestion;
let randomArray;
let questionPara;
let answers = [];
let score, answeredCount;

const startQuizBtn = document.querySelector(".start-quiz");
const questionDiv = document.querySelector(".question");
const options_set = document.querySelector(".options_set");
const quizSection = document.querySelector(".quiz-section");
const answeredCountNumber = document.querySelector(".answered-count-no");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const submitBtn = document.querySelector(".submit-btn");

function displayQuestion(currentIndex) {
    currentQuestion = questionSetArray[randomArray[currentIndex]];

    questionPara.textContent = `${currentIndex + 1}. ${currentQuestion.question}`;

    options_set.innerHTML = `
                <fieldset>
                    <legend>Select the correct Answer</legend>
                
                    ${currentQuestion.options_set
                        .map((option, index) => {
                            const isChecked =
                                answers[index] === option ? "checked" : "";
                            return `
                                        <input 
                                            type='radio'
                                            id='option_${index}'
                                            name = 'answer'
                                            value = '${option}'
                                            ${isChecked}
                                        >
                                        <label for= 'option_${index}'>${option}</label>
                                            `;
                        })
                        .join("")}
                    
                </fieldset>

            
            `;
}
function registerAnswer() {
    const checkedRadioInput = options_set.querySelector(
        "input[type='radio']:checked",
    );

    if (!checkedRadioInput) {
        alert("Please select one option");
        return false;
    }

    answers[currentIndex] = checkedRadioInput.value;

    answeredCount = answers.filter((a) => a !== null).length;
    answeredCountNumber.innerHTML = `
    <p class='answered-number'>Answered ${answeredCount} out of ${questionSetArray.length}</p>
    `;
    return true;
}

startQuizBtn.addEventListener("click", () => {
    quizSection.classList.remove("hidden");
    startQuizBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");

    answers = new Array(questionSetArray.length).fill(null);

    const array = [0, 1, 2, 3, 4];
    // Fisher  - Yates shuffling
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    randomArray = array;
    answers = new Array(questionSetArray.length).fill(null);
    currentIndex = 0;
    score = 0;
    answeredCount = 0;

    questionPara = document.createElement("p");
    questionPara.classList.add("question-para");
    questionDiv.appendChild(questionPara);

    displayQuestion(currentIndex);
});

nextBtn.addEventListener("click", () => {
    if (registerAnswer()) {
        // Only move forward if an answer was registered
        currentIndex++;
        displayQuestion(currentIndex);

        if (currentIndex === questionSetArray.length - 1) {
            nextBtn.classList.add("hidden");
            submitBtn.classList.remove("hidden");
        }
       prevBtn.classList.remove("hidden");
    }
});

prevBtn.addEventListener("click", () => {
    const checkedInput = options_set.querySelector(
        "input[type='radio']:checked",
    );
    if (checkedInput) {
        answers[currentIndex] = checkedInput.value;
    }
    currentIndex--;
    displayQuestion(currentIndex);

    answeredCount = answers.filter((a) => a !== null).length;
    answeredCountNumber.innerHTML = `<p class='answered-number'>Answered ${answeredCount} out of ${questionSetArray.length}</p>`;

    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
    if (currentIndex == 0) {
        prevBtn.classList.add("hidden");
    }
});

submitBtn.addEventListener("click", () => {
    registerAnswer();

    nextBtn.classList.add("hidden");
    prevBtn.classList.add("hidden");
    submitBtn.classList.add("hidden");
    options_set.classList.add("hidden");

    randomArray.forEach((qIndex, i) => {
        if (answers[i] === questionSetArray[qIndex].answer) {
            score++;
        }
    });
    questionPara.innerHTML = `
        <h2>Quiz Completed</h2>
        <p>Your Score: <strong>${score}</strong> / ${questionSetArray.length}</p>
    `;

    let reviewHTML = "<h3>Answer Review</h3>";

    randomArray.forEach((qIndex, i) => {
        const q = questionSetArray[qIndex];

        reviewHTML += `
            <div class="review-question">
                <p><strong>Q${i + 1}:</strong> ${q.question}</p>
                <p>Your Answer: ${answers[i] ?? "Not answered"}</p>
                <p>Correct Answer: <strong>${q.answer}</strong></p>
                <hr>
            </div>
        `;
    });

    options_set.innerHTML = reviewHTML;
    options_set.classList.remove("hidden");

    currentIndex = 0;
    score = 0;
    answeredCount = 0;
    answers = [];

    startQuizBtn.textContent = "Start Quiz Again";
    startQuizBtn.classList.remove("hidden");
});
