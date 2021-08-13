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
  currVal = `${currVal}`;
  display.querySelector("#prevCalc").innerText = prevComputed;
  display.querySelector("#currCalc").innerText = currVal;
  // Do something
}

function addDigit(e) {
  if (currVal === "0") currVal = e.target.innerText;
  else currVal = +currVal * 10 + +e.target.innerText;
  if (`${currVal}`.length > 14) currVal = currVal.toExponential(2);
  updateDisplay();
}

clear.addEventListener("click", () => {
  prevComputed = "";
  currVal = "0";
  updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  if (currVal.length === 1) currVal = "0";
  else currVal = currVal.slice(0, -1);
  updateDisplay();
});

divide.addEventListener("click", () => {
  // Do something
});

multiply.addEventListener("click", () => {
  // Do something
});

subtract.addEventListener("click", () => {
  // Do something
});

add.addEventListener("click", () => {
  // Do something
});

decimal.addEventListener("click", () => {
  // Do something
});

plusminus.addEventListener("click", () => {
  // Do something
});

equals.addEventListener("click", () => {
  // Do something
});

/* 
    Keydown effects
*/

/* Initialization */
initialization();
