const calculator = document.querySelector("#calculator");
const display = document.querySelector("#display");
const clear = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const divideBtn = document.querySelector("#divide");
const multiplyBtn = document.querySelector("#multiply");
const subtractBtn = document.querySelector("#subtract");
const addBtn = document.querySelector("#add");
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

let prevNum = "";
let preCalcVal = "";
let operator = "";
let currNum = "0";

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
  else prevCalc.innerText = prevNum + operator;
  display.querySelector("#currCalc").innerText = currNum;
}

function addDigit(e) {
  if (currNum === "0") currNum = e.target.innerText;
  else currNum = +currNum * 10 + +e.target.innerText;
  if (`${currNum}`.length > 14) currNum = currNum.toExponential(2);
  updateDisplay();
}

function add(num1, num2) {
  return +num1 + +num2;
}

function subtract(num1, num2) {
  return +num1 - +num2;
}

function multiply(num1, num2) {
  return +num1 * +num2;
}

function divide(num1, num2) {
  if (+num2 === 0) {
    alert("Error: Can't divide by 0.");
    return NaN;
  }
  return +num1 / +num2;
}

function operate(num1, operand, num2) {
  let newPrevNum = 0;
  if (num1 === "") num1 = "0";
  if (operand === "÷") newPrevNum = divide(num1, num2);
  else if (operand === "×") newPrevNum = multiply(num1, num2);
  else if (operand === "-") newPrevNum = subtract(num1, num2);
  else newPrevNum = add(num1, num2); // Default case (addition)
  if (`${newPrevNum}`.length > 14) newPrevNum = newPrevNum.toExponential(5);
  prevNum = newPrevNum;
  currNum = "";
}

function continueCalculation() {
  if (preCalcVal) {
    prevNum = currNum;
    operator = "+"; // "reset" operator as prev operator will still be used
    preCalcVal = "";
    currNum = "";
  }
}

clear.addEventListener("click", () => {
  prevNum = "";
  preCalcVal = "";
  operator = "";
  currNum = "0";
  updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  currNum = `${currNum}`;
  if (currNum.length === 1) currNum = "0";
  else currNum = currNum.slice(0, -1);
  if (preCalcVal) {
    preCalcVal = "";
    operator = "";
    prevNum = "";
  }
  updateDisplay();
});

divideBtn.addEventListener("click", () => {
  continueCalculation();
  operate(prevNum, operator, currNum);
  operator = "÷";
  updateDisplay();
});

multiplyBtn.addEventListener("click", () => {
  continueCalculation();
  operate(prevNum, operator, currNum);
  operator = "×";
  updateDisplay();
});

subtractBtn.addEventListener("click", () => {
  continueCalculation();
  operate(prevNum, operator, currNum);
  operator = "-";
  updateDisplay();
});

addBtn.addEventListener("click", () => {
  continueCalculation();
  operate(prevNum, operator, currNum);
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
  if (prevNum === "") return;
  preCalcVal = `${prevNum} ${operator} ${currNum}`;
  operate(prevNum, operator, currNum);
  currNum = prevNum;
  prevNum = "";
  updateDisplay();
});

/* 
    Keydown effects
*/

/* Initialization */
initialization();
