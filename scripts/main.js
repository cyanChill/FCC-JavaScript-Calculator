const calculator = document.querySelector("#calculator");
const display = document.querySelector("#display");
const clear = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
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

const opeartorMap = {
  multiply: "×",
  divide: "÷",
  subtract: "-",
  add: "+",
};

let prevNum = "";
let preCalcVal = "";
let operator = "";
let currNum = "0";

function initialization() {
  createDigitBtns();
  addOperatorEvents();
  operator = "";
  updateDisplay();
}

function createDigitBtns() {
  for (key in digitButtonMap) {
    const referenceNode = document.querySelector(`#${key}`);
    digitButtonMap[key].forEach((val) => {
      const numBtn = document.createElement("button");
      numBtn.classList = "num btn";
      numBtn.innerText = val;

      numBtn.addEventListener("click", (e) => {
        let digit = e.target.innerText;
        addDigit(digit);
      });

      calculator.insertBefore(numBtn, referenceNode);
    });
  }
}

function addOperatorEvents() {
  for (key in opeartorMap) {
    const referenceNode = document.querySelector(`#${key}`);
    referenceNode.addEventListener("click", (e) => {
      operand = e.target.innerText;
      operatorActionFunc(operand);
    });
  }
}

function operatorActionFunc(operand) {
  continueCalculation();
  operate(prevNum, operator, currNum);
  operator = operand;
  updateDisplay();
}

function updateDisplay() {
  const prevCalc = display.querySelector("#prevCalc");
  if (preCalcVal) prevCalc.innerText = preCalcVal + "=";
  else prevCalc.innerText = prevNum + operator;
  display.querySelector("#currCalc").innerText = currNum;
}

function addDigit(digit) {
  currNum = `${currNum}`;
  if (currNum === "-0") currNum = "-";
  if (currNum === "0") currNum = digit;
  else if (!currNum.includes("e")) currNum = `${currNum + digit}`;
  else {
    let [val, exp] = currNum.split("e");
    if (exp < 0)
      currNum = `${
        (+currNum * (10 ** (-exp + 1) + +digit)) / 10 ** (-exp + 1)
      }`;
    else currNum = `${+currNum * 10 + +digit}`;
  }

  if (currNum.length > 14) currNum = (+currNum).toExponential(2);
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
    return false;
  }
  return +num1 / +num2;
}

function operate(num1, operand, num2) {
  if (num2 === "") return false;
  let newPrevNum = 0;
  if (num1 === "") num1 = "0";
  if (operand === "÷") newPrevNum = divide(num1, num2);
  else if (operand === "×") newPrevNum = multiply(num1, num2);
  else if (operand === "-") newPrevNum = subtract(num1, num2);
  else newPrevNum = add(num1, num2); // Default case (addition)
  if (newPrevNum === false) return false;
  if (`${newPrevNum}`.length > 14) newPrevNum = newPrevNum.toExponential(5);
  prevNum = newPrevNum;
  currNum = "";
  return true;
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
  operator = "";
  preCalcVal = "";
  currNum = "0";
  updateDisplay();
});

deleteBtn.addEventListener("click", deleteEvent);

function deleteEvent() {
  currNum = `${currNum}`;
  if (currNum.length === 1) currNum = "";
  else currNum = currNum.slice(0, -1);
  if (preCalcVal) {
    preCalcVal = "";
    operator = "";
    prevNum = "";
  }
  updateDisplay();
}

decimal.addEventListener("click", decimalEvent);

function decimalEvent() {
  currNum = `${currNum}`;
  if (!currNum.includes(".")) currNum += ".";
  updateDisplay();
}

plusminus.addEventListener("click", () => {
  if (currNum[0] === "-") currNum = currNum.slice(1);
  else if (currNum === "0") currNum = "-";
  else currNum = "-" + currNum;
  updateDisplay();
});

equals.addEventListener("click", equalsEvent);

function equalsEvent() {
  if (prevNum === "" || currNum === "") return;
  let calculationDisplay = `${prevNum} ${operator} ${currNum}`;
  if (!operate(prevNum, operator, currNum)) return;
  preCalcVal = calculationDisplay;
  currNum = prevNum;
  prevNum = "";
  updateDisplay();
}

document.addEventListener("keydown", (e) => {
  if (+e.key >= 0 && +e.key <= 9) addDigit(e.key);
  if (e.key === "Backspace") deleteEvent();
  if (e.key === ".") decimalEvent();
  if (e.key === "=" || e.key === "Enter") equalsEvent();
  if (e.key === "+" || e.key === "-") operatorActionFunc(e.key);
  if (e.key === "*") operatorActionFunc("×");
  if (e.key === "/") operatorActionFunc("÷");
  findFocus(e.key);
});

function findFocus(innerText) {
  let btns = [...document.querySelectorAll("button")];
  for (let i = 0; i < btns.length; i++) {
    let btnVal = btns[i].innerHTML;
    if (btnVal === `<i class="fas fa-backspace"></i>`) btnVal = "Backspace";
    if (btnVal === "×") btnVal = "*";
    if (btnVal === "÷") btnVal = "/";
    if (innerText === "Enter") innerText = "=";
    if (btnVal === innerText) {
      btns[i].focus();
      break;
    }
  }
}

/* Initialization */
initialization();
