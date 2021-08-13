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
      calculator.insertBefore(numBtn, referenceNode);
    });
  }
}

function updateDisplay() {
  // Do something
}

clear.addEventListener("click", () => {
  // Do something
});

deleteBtn.addEventListener("click", () => {
  // Do something
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
createDigitBtns();
