class Calculator{
    constructor(lowerScreen, topScreen){
        this.topScreen = topScreen;
        this.lowerScreen = lowerScreen;
        this.clear()

    }

    clear(){
        this.topValue = ''
        this.lowerValue = ''
        this.operation = undefined
    }

    delete(){
        this.lowerValue = this.lowerValue.toString().slice(0, -1)
    }

    appendNumber(number){
        if (number === '.' && this.lowerValue.includes('.')) return
        this.lowerValue  = this.lowerValue .toString() + number.toString()
    }

    chooseOperation(operation){
        if (this.lowerValue === '') return
        if (this.topValue !== '') {
            this.compute()
        }
        this.operation = operation
        this.topValue = this.lowerValue
        this.lowerValue = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.topValue)
        const current = parseFloat(this.lowerValue)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '÷':
                computation = prev / current
                break
            case '×':
                computation = prev * current
                break
            default:
                return
        }
        this.lowerValue = computation
        this.operation = undefined
        this.topValue = ''
    }

    updateDisplay(){
        this.lowerScreen.innerText = this.lowerValue 
        if (this.operation != null){
            this.topScreen.innerText = 
                `${this.topValue} ${this.operation} `
        }
    }
}



const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')
const delButton = document.querySelector('[data-del]')
const resetButton = document.querySelector('[data-cancel]')
const topScreen = document.querySelector('[data-show-operation]')
const lowerScreen = document.querySelector('[data-solve-operation]')

const calculator = new Calculator(lowerScreen, topScreen)

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

resetButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

delButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})