"use strict";
let isCompute = false;
class Calculator {
  constructor(currEl, prevEl) {
    this.currEl = currEl;
    this.prevEl = prevEl;
    this.clearAll();
  }

  clearAll() {
    this.currentOperand = "";
    this.prevOperand = "";
    this.operation = undefined;
    isCompute = false;
  }

  addNumber(number) {
    if (this.currentOperand === "0" && number === "0") return;
    if (isCompute && !this.prevOperand) this.clearAll();
    this.currentOperand = this.currentOperand + number;
    console.log(this.currentOperand);
  }

  desiredOperation(operation) {
    if (!this.currentOperand) return;
    if (this.prevOperand) {
      this.compute();
    }
    this.operation = operation;
    this.prevOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let result;
    let prev = +this.prevOperand;
    let curr = +this.currentOperand;
    if (!prev || !curr) return;
    switch (this.operation) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "x":
        result = prev * curr;
        break;
      case "/":
        result = prev / curr;
        break;
      default:
        return;
    }
    this.currentOperand = result;
    this.operation = undefined;
    this.prevOperand = "";
    isCompute = true;
  }

  updateScreen() {
    this.currEl.textContent = this.currentOperand;
    if (this.operation) {
      this.prevEl.textContent = `${this.prevOperand} ${this.operation}`;
    } else {
      this.prevEl.textContent = this.prevOperand;
    }
  }
}

// Select Elements
const auxScreen = document.getElementById("aux-screen");
const mainScreen = document.getElementById("main-screen");
const numKeys = document.querySelectorAll("[data-num]");
const operationKeys = document.querySelectorAll("[data-op]");
const clearAllBtn = document.querySelector("[data-ac]");
const equalBtn = document.querySelector("[data-equal]");
const keysContainer = document.querySelector("[data-keysContainer]");

// Functions
// const validInput = function (e) {
//   if (e.key !== "Backspace" && isNaN(e.key)) e.preventDefault();
// };

const clearScreen = function () {
  calc.clearAll();
  calc.updateScreen();
};

const calculateResult = function () {
  calc.compute();
  calc.updateScreen();
};

// Prevent user from input alphabet characters
// mainScreen.addEventListener("keydown", validInput);

// create calculator
const calc = new Calculator(mainScreen, auxScreen);

keysContainer.addEventListener("click", function (e) {
  // Match strategy
  if (e.target === e.currentTarget) return;
  if (isFinite(+e.target.textContent)) {
    console.log(+e.target.textContent);
    calc.addNumber(e.target.textContent);
    calc.updateScreen();
  } else if ("op" in e.target.dataset) {
    calc.desiredOperation(e.target.textContent);
    calc.updateScreen();
  }
});

clearAllBtn.addEventListener("click", clearScreen);

equalBtn.addEventListener("click", calculateResult);
