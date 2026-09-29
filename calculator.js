const display = document.getElementById("display");
const previousOperandDisplay = document.getElementById("previous-operand");
const buttons = document.querySelectorAll(".btn");

let currentInput = "0";
let previousInput = "";
let shouldResetDisplay = false;

// Updates the screen displays
function updateDisplay() {
    display.value = currentInput;
    previousOperandDisplay.textContent = previousInput;
}

// Appends numbers or decimals
function appendValue(value) {
    if (currentInput === "0" || shouldResetDisplay) {
        if (value === ".") {
            currentInput = "0.";
        } else {
            currentInput = value;
        }
        shouldResetDisplay = false;
    } else {
        if (value === "." && currentInput.includes(".")) return;
        currentInput += value;
    }
    updateDisplay();
}

// Handles mathematical operator clicks
function handleOperator(operator) {
    if (shouldResetDisplay) {
        shouldResetDisplay = false;
    }

    if (previousInput !== "" && !shouldResetDisplay) {
        calculateResult();
    }

    previousInput = `${currentInput} ${operator}`;
    shouldResetDisplay = true;
    updateDisplay();
}

// Calculates the arithmetic expression
function calculateResult() {
    if (!previousInput || shouldResetDisplay) return;

    let expression = previousInput + " " + currentInput;
    
    // Convert visually friendly operators to JavaScript executable operators
    let formattedExpression = expression
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/−/g, "-");

    try {
        let result = eval(formattedExpression);

        if (!isFinite(result)) {
            currentInput = "Error";
        } else {
            // Fix standard floating point precision bugs (e.g., 0.1 + 0.2)
            currentInput = String(Math.round(result * 1e10) / 1e10);
        }
        previousInput = `${expression} =`;
        shouldResetDisplay = true;
    } catch (error) {
        currentInput = "Error";
        previousInput = "";
        shouldResetDisplay = true;
    }
    updateDisplay();
}

// Resets everything
function clearAll() {
    currentInput = "0";
    previousInput = "";
    shouldResetDisplay = false;
    updateDisplay();
}

// Removes the last typed character
function deleteLast() {
    if (shouldResetDisplay) return;
    if (currentInput.length === 1 || currentInput === "Error") {
        currentInput = "0";
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

// Button Click Event Listeners
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const action = button.dataset.action;
        const value = button.dataset.value || button.textContent;

        if (action === "clear") {
            clearAll();
        } else if (action === "delete") {
            deleteLast();
        } else if (action === "calculate") {
            calculateResult();
        } else if (button.classList.contains("btn-operator")) {
            handleOperator(value);
        } else {
            appendValue(value);
        }
    });
});

// Full Physical Keyboard Support
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key) || key === ".") {
        appendValue(key);
    } else if (["+", "-", "*", "/", "%"].includes(key)) {
        handleOperator(key === "*" ? "×" : key === "/" ? "÷" : key);
    } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculateResult();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearAll();
    }
});