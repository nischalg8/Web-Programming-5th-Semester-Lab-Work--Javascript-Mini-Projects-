let display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
let historyList = document.getElementById("history-list");

let expression = "";
let history = [];

class Operation {
    constructor(expression, result) {
        this.expression = expression;
        this.result = result;
    }
}

function addToHistory(exp, result) {
    if (history.length == 5) history.splice(0, 1);
    const operation = new Operation(exp, result);
    history.push(operation);
    displayHistory();
}

function displayHistory() {
    historyList.innerHTML = "";
    history.forEach((operation, index) => {
        const li = document.createElement("li");
        li.textContent = `${operation.expression} = ${operation.result}`;

        historyList.appendChild(li);
    });
}

buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        const value = button.textContent;
        if (value === "C") {
            expression = "";
            display.value = "";
            return;
        }
        if (value === "=") {
            try {
                const result = eval(expression).toString();
                addToHistory(expression, result);
                expression = result;
                display.value = result;
            } catch (err) {
                display.value = "Error";
                expression = "";
                console.log(err);
            }
            return;
        }
        if (value === "Clear History") {
            history = [];
            displayHistory();

            display.value = "";
            expression = "";
            return;
        }
        expression += value;
        display.value = expression;
    });
});
