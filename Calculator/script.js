let display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const historyList = document.getElementById('history-list');

let expression = '';

function addToHistory(exp, result) {
  const li = document.createElement('li');
  li.textContent = `${exp} = ${result}`;

  historyList.prepend(li);

  if (historyList.children.length > 5) {
    historyList.removeChild(historyList.lastChild);
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    console.log(button.value);
    if (value === 'C') {
      expression = '';
      display.value = '';
      return;
    }

    if (value === '=') {
      try {
        const result = eval(expression);
        addToHistory(expression, result);
        expression = result.toString();
        display = expression;
      } catch {
        display.value = 'Error';
        expression = '';
      }
      return;
    }

    expression += value;
    display.value = expression;
  });
});
