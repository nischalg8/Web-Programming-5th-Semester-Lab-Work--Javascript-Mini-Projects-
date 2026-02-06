const clock = document.querySelector(".clock");
const timerForm = document.querySelector(".input-time");
const timerTime = document.querySelector(".timer-time");

const resetBtn = document.querySelector(".reset");
const pauseBtn = document.querySelector(".pause");
const resumeBtn = document.querySelector(".resume");

let timerInterval = null;
let seconds = 0,
    hours = 0,
    minutes = 0;
let isPaused = false;

/* ----- ghadi ---------- */
setInterval(function () {
    let time = new Date().toLocaleTimeString("en-US");
    clock.innerHTML = `<p class='time'>${time}</p>`;
}, 1000);

/* ----- timer -------------- */

function formatTime(h, m, s) {
    return `${String(h).padStart(2, "0")} : ${String(m).padStart(2, "0")} : ${String(s).padStart(2, "0")}`;
}

function updateDisplay() {
    timerTime.textContent = formatTime(hours, minutes, seconds);
}

function startTimer() {
    timerInterval = setInterval(function () {
        if (hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(timerInterval);
            new Audio("timer-sound.wav").play();
            return;
        }

        if (seconds === 0) {
            if (minutes === 0) {
                hours--;
                minutes = 59;
            } else {
                minutes--;
            }
            seconds = 59;
        } else {
            seconds--;
        }

        updateDisplay();
    }, 1000);
    resetBtn.addEventListener("click", () => {
        clearInterval(timerInterval);
        resetBtn.classList.add("hidden");
        time = "";
    });
}

timerForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const time = new FormData(timerForm);

    hours = Number(time.get("hours")) || 0;
    minutes = Number(time.get("minutes")) || 0;
    seconds = Number(time.get("seconds")) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) return;

    isPaused = false;
    updateDisplay();
    startTimer();
});

pauseBtn.addEventListener('click', ()=>{
    if(!timerInterval) return;

    clearInterval(timerInterval);
    timerInterval= null;
    isPaused = true;
})

resumeBtn.addEventListener("click", () => {
    if (!isPaused) return;
    isPaused = false;
    startTimer();
});

resetBtn.addEventListener('click', ()=>{
         clearInterval(timerInterval);
    timerInterval = null;

    hours = minutes = seconds = 0;
    isPaused = false;
    updateDisplay();
})
