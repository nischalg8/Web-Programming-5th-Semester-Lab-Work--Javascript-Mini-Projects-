let score = 5;
let computerGenerated;

const inputField = document.getElementById("input");
const submit = document.querySelector(".submit");
const feedback = document.querySelector(".feedback p");

function generate() {
    computerGenerated = Math.floor(Math.random() * 100) + 1;
    score = 5;
  
    inputField.value = "";
}

document.addEventListener("DOMContentLoaded", generate);

submit.addEventListener("click", () => {
    const inputNumber = Number(inputField.value);

    if (!inputNumber || inputNumber < 1 || inputNumber > 100) {
        feedback.textContent = " Please enter a number between 1 and 100.";
        return;
    }

    if (inputNumber < computerGenerated) {
        score--;
        feedback.textContent = `Guess higher! Attempts left: ${score}`;
    } 
    else if (inputNumber > computerGenerated) {
        score--;
        feedback.textContent = `Guess lower! Attempts left: ${score}`;
    } 
    else {
        feedback.textContent = "🎉 Congrats! You guessed it right. New number generated!";
        generate();
        return;
    }

    if (score === 0) {
        feedback.textContent = `💀 Game Over! The number was ${computerGenerated}. Restarting...`;
        generate();
    }
});
