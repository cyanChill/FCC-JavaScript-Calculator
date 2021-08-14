const numBtns = [...document.querySelectorAll(".num")];
const operatorBtns = [...document.querySelectorAll(".operator")];
const currentCalculation = document.getElementById("currCalc");
const prevCalculation = document.getElementById("prevCalc");
const clearBtn = document.getElementById("clear");
const deleteBtn = document.getElementById("delete");
const decimalBtn = document.getElementById("decimal");
const plusMinusBtn = document.getElementById("plusminus");
const equalsBtn = document.getElementById("equals");

let first = "";
let secondNum = "";
let currentOperator = null;

window.addEventListener("keydown", handleKeyboardInput);
clearBtn.addEventListener("click", clear);
deleteBtn.addEventListener("click", deleteEvent);
decimalBtn.addEventListener("click", addDecimal);
equalsBtn.addEventListener("click", evaluate);

plusMinusBtn.addEventListener("click", plusMinus);

numBtns.forEach((btn) => {
  btn.addEventListener("click", () => addDigit(btn.textContent));
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => setOperator(btn.textContent));
});

function setOperator(operator) {
  let failedEvaluate = false;
  if (currentOperator !== null) failedEvaluate = evaluate();
  if (failedEvaluate) {
    currentOperator = operator;
    prevCalculation.textContent = `${firstNum} ${currentOperator}`;
    return;
  }
  firstNum = currentCalculation.textContent;
  currentOperator = operator;
  prevCalculation.textContent = `${firstNum} ${currentOperator}`;
  currentCalculation.textContent = "";
}

function addDigit(num) {
  const currCalc = currentCalculation.textContent;
  if (currCalc === "-0") currentCalculation.textContent = `-${num}`;
  else if (currCalc === "0" || currCalc === "")
    currentCalculation.textContent = num;
  else if (!currCalc.includes("e"))
    currentCalculation.textContent = `${currCalc + num}`;
  else {
    let [val, exp] = currCalc.split("e");
    if (Number(exp) < 0) return;
    else currentCalculation.textContent = `${+currCalc * 10 + +num}`;
  }

  currentCalculation.textContent = roundNumber(currentCalculation.textContent);
}

function addDecimal() {
  const currCalc = currentCalculation.textContent;
  if (currCalc === "") currentCalculation.textContent = "0";
  if (!currCalc.includes(".")) currentCalculation.textContent += ".";
}

function evaluate() {
  const currCalc = currentCalculation.textContent;
  if (currentOperator === null || !currCalc) return true;
  if (currentOperator === "÷" && currentCalculation.textContent === "0") {
    alert("You can't divide by 0!");
    return true;
  }
  secondNum = currentCalculation.textContent;
  currentCalculation.textContent = roundNumber(
    operate(currentOperator, firstNum, secondNum)
  );
  prevCalculation.textContent = `${firstNum} ${currentOperator} ${secondNum} =`;
  currentOperator = null;
}

function roundNumber(num) {
  if (`${num}`.length > 14) return (+num).toExponential(4);
  return num;
}

function clear() {
  currentCalculation.textContent = "0";
  prevCalculation.textContent = "";
  firstNum = "";
  secondNum = "";
  currentOperator = null;
}

function deleteEvent() {
  currentCalculation.textContent = currentCalculation.textContent.slice(0, -1);
}

function plusMinus() {
  const currCalc = currentCalculation.textContent;
  if (currCalc[0] === "-") currentCalculation.textContent = currCalc.slice(1);
  else if (currCalc === "0") currentCalculation.textContent = "-";
  else currentCalculation.textContent = `-${currCalc}`;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "×";
  if (keyboardOperator === "-") return "-";
  if (keyboardOperator === "+") return "+";
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) addDigit(e.key);
  if (e.key === "Backspace") deleteEvent();
  if (e.key === ".") addDecimal();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    setOperator(convertOperator(e.key));
  findFocus(e.key);
}

function findFocus(innerText) {
  let btns = [...document.querySelectorAll("button")];
  for (let i = 0; i < btns.length; i++) {
    let btnVal = btns[i].innerHTML;
    if (btnVal === `<i class="fas fa-backspace"></i>`) btnVal = "Backspace";
    if (innerText === "*" || innerText === "/")
      innerText = convertOperator(innerText);
    if (innerText === "Enter") innerText = "=";
    if (btnVal === innerText) {
      btns[i].focus();
      break;
    }
  }
}
