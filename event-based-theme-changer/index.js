
const defaultTheme = {
    background: "#ffffff",
    text: "#333333",
    button: "#28a745"
};


let selectedTheme = { ...defaultTheme };


const bgInput = document.getElementById("bgColor");
const textInput = document.getElementById("textColor");
const buttonInput = document.getElementById("buttonColor");
const resetBtn = document.getElementById("resetBtn");
const demoText = document.querySelector(".demo-text");
const demoButton = document.querySelector(".demo-button");
const container = document.querySelector(".container");


function applyTheme(theme) {
    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.text;
    demoText.style.color = theme.text;
    demoButton.style.backgroundColor = theme.button;
}


bgInput.addEventListener("input", (e) => {
    selectedTheme.background = e.target.value;
    applyTheme(selectedTheme);
});

textInput.addEventListener("input", (e) => {
    selectedTheme.text = e.target.value;
    applyTheme(selectedTheme);
});

buttonInput.addEventListener("input", (e) => {
    selectedTheme.button = e.target.value;
    applyTheme(selectedTheme);
});


resetBtn.addEventListener("click", () => {
    selectedTheme = { ...defaultTheme };
    bgInput.value = defaultTheme.background;
    textInput.value = defaultTheme.text;
    buttonInput.value = defaultTheme.button;
    applyTheme(selectedTheme);
});

applyTheme(defaultTheme);