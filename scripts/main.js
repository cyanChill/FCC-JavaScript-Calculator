const calculator = document.querySelector("#calculator");
const display = document.querySelector("#display");
const clear = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const divide = document.querySelector("#divide");
const multiply = document.querySelector("#multiply");
const subtract = document.querySelector("#subtract");
const add = document.querySelector("#add");
const decimal = document.querySelector("#decimal");
const plusMinus = document.querySelector("#plusminus");
const equals = document.querySelector("#equals");

/* Insert the number buttons before the button with the name of the key */
const digitButtonMap = {
  multiply: [7, 8, 9],
  subtract: [4, 5, 6],
  add: [1, 2, 3],
  decimal: [0],
};

let prevComputed = "";
let preCalcVal = "";
let operator = "";
let currVal = "0";

function initialization() {
  createDigitBtns();
  updateDisplay();
}

function createDigitBtns() {
  for (key in digitButtonMap) {
    const referenceNode = document.querySelector(`#${key}`);
    digitButtonMap[key].forEach((val) => {
      const numBtn = document.createElement("button");
      numBtn.classList = "num btn";
      numBtn.innerText = val;
      /* 
        Add number button event listeners here
      */
      numBtn.addEventListener("click", addDigit);
      calculator.insertBefore(numBtn, referenceNode);
    });
  }
}

function updateDisplay() {
  const prevCalc = display.querySelector("#prevCalc");
  if (preCalcVal) prevCalc.innerText = preCalcVal + "=";
  else prevCalc.innerText = prevComputed + operator;
  display.querySelector("#currCalc").innerText = currVal;
}

function addDigit(e) {
  if (currVal === "0") currVal = e.target.innerText;
  else currVal = +currVal * 10 + +e.target.innerText;
  if (`${currVal}`.length > 14) currVal = currVal.toExponential(2);
  updateDisplay();
}

function calculate() {
  if (prevComputed === "") prevComputed = "0";
  if (operator === "÷") prevComputed = +prevComputed / +currVal;
  else if (operator === "×") prevComputed = +prevComputed * +currVal;
  else if (operator === "-") prevComputed = +prevComputed - +currVal;
  else prevComputed = +prevComputed + +currVal; // Default case (addition)
  if (`${prevComputed}`.length > 14)
    prevComputed = prevComputed.toExponential(5);
  currVal = "";
}

function continueCalculation() {
  if (preCalcVal) {
    prevComputed = currVal;
    operator = "+";
    preCalcVal = "";
    currVal = "";
  }
}

clear.addEventListener("click", () => {
  prevComputed = "";
  preCalcVal = "";
  operator = "";
  currVal = "0";
  updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  currVal = `${currVal}`;
  if (currVal.length === 1) currVal = "0";
  else currVal = currVal.slice(0, -1);
  if (preCalcVal) {
    preCalcVal = "";
    operator = "";
    prevComputed = "";
  }
  updateDisplay();
});

divide.addEventListener("click", () => {
  continueCalculation();
  calculate();
  operator = "÷";
  updateDisplay();
});

multiply.addEventListener("click", () => {
  continueCalculation();
  calculate();
  operator = "×";
  updateDisplay();
});

subtract.addEventListener("click", () => {
  continueCalculation();
  calculate();
  operator = "-";
  updateDisplay();
});

add.addEventListener("click", () => {
  continueCalculation();
  calculate();
  operator = "+";
  updateDisplay();
});

decimal.addEventListener("click", () => {
  // Do something
});

plusminus.addEventListener("click", () => {
  // Do something
});

equals.addEventListener("click", () => {
  if (prevComputed === "") return;
  preCalcVal = `${prevComputed} ${operator} ${currVal}`;
  calculate();
  currVal = prevComputed;
  prevComputed = "";
  updateDisplay();
});

/* 
    Keydown effects
*/

/* Initialization */
initialization();
