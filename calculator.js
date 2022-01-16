const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const deleteBtn = document.querySelector('.delete');
const allClearBtn = document.querySelector('.all-clear');
const equalBtn = document.querySelector('.equal');
const previousOperationText = document.querySelector('.previous-operation');
const currentOperationText = document.querySelector('.current-operation');

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.allClear();
  }

  addNumber(number) {
    if (number === '.' && this.currentOperation.includes('.')) {
      return
    } else if (number === '0' && this.currentOperation === ''){
      return
    }
    this.currentOperation = this.currentOperation.toString() + number.toString();
  }

  selectOperator(operator) { 
    if (this.currentOperation === '') return;
    if (this.previousOperation != '') {
      this.calculate();
    }
    this.operation = operator;
    this.previousOperation = this.currentOperation;
    this.currentOperation = '';
  }

  calculate() {
    const previousOperation = parseFloat(this.previousOperation);
    const currentOperation = parseFloat(this.currentOperation);
    let result;
    if (isNaN(previousOperation) || isNaN(currentOperation)) return
    switch(this.operation) {
      case '+' :
        result = previousOperation + currentOperation;
        break;
      case '-' :
        result = previousOperation - currentOperation;
        break;
      case '×' :
        result = previousOperation * currentOperation;
        break;
      case '÷' :
        result = previousOperation / currentOperation;
        break;
      default:
        return
    }
    this.currentOperation = result;
    this.previousOperation = '';
    this.operation = undefined
  }

  allClear() {
    this.currentOperation = '';
    this.previousOperation = '';
    this.operation = undefined
  }

  delete() {
    this.currentOperation = this.currentOperation.toString().slice(0, -1);
  }

  updateOutput() {
    this.currentOperationText.innerText = this.currentOperation;
    if (this.operation != null) {
      this.previousOperationText.innerText = `${this.previousOperation} ${this.operation}`;
    } else {
      this.previousOperationText.innerText = '';
    }
  }
}

const calculator = new Calculator(previousOperationText, currentOperationText);

numberBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    calculator.addNumber(btn.innerText);
    calculator.updateOutput();
  })
});

operatorBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    calculator.selectOperator(btn.innerText);
    calculator.updateOutput();
  })
});

allClearBtn.addEventListener('click', () => {
  calculator.allClear();
  calculator.updateOutput();
});

equalBtn.addEventListener('click', () => {
  calculator.calculate();
  calculator.updateOutput();
});

deleteBtn.addEventListener('click', () => {
  calculator.delete();
  calculator.updateOutput();
});