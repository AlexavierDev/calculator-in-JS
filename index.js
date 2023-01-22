let numAtual = '';
let numAnterior = '';
let operador = '';

const visorAnterior = document.querySelector(".visorAnterior")
const visorAtual = document.querySelector(".visorAtual")
const igual = document.querySelector(".teclaIgual")
const decimal = document.querySelector(".teclaDecimal")
const clean = document.querySelector(".clean")
const numButtons = document.querySelectorAll(".teclaNumero")
const operadores = document.querySelectorAll(".teclaOperador")


window.addEventListener("keydown", handleKeyPress);

igual.addEventListener("click", () => {
    if (numAtual != "" && numAnterior != "") {
        compute();
    }
});


decimal.addEventListener("click", () => {
    addDecimal();
});

operadores.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        handleoperador(e.target.textContent);
    });
});


clean.addEventListener("click", clearCalculator);


numButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        handleNumber(e.target.textContent);
    });
});

function handleNumber(number) {
    if (numAnterior !== "" && numAtual !== "" && operador === "") {
        numAnterior = "";
        visorAtual.textContent = numAtual;
    }
    if (numAtual.length <= 11) {
        numAtual += number;
        visorAtual.textContent = numAtual;
    }
}



function handleoperador(op) {
    if (numAnterior === "") {
        numAnterior = numAtual;
        operadorCheck(op);
    } else if (numAtual === "") {
        operadorCheck(op);
    } else {
        compute();
        operador = op;
        visorAtual.textContent = "0";
        visorAnterior.textContent = numAnterior + " " + operador;
    }
}

function operadorCheck(text) {
    operador = text;
    visorAnterior.textContent = numAnterior + " " + operador;
    visorAtual.textContent = "0";
    numAtual = "";
}

function compute() {
    numAnterior = Number(numAnterior);
    numAtual = Number(numAtual);

    if (operador === "+") {
        numAnterior += numAtual;
    } else if (operador === "-") {
        numAnterior -= numAtual;
    } else if (operador === "x") {
        numAnterior *= numAtual;
    } else if (operador === "/") {
        if (numAtual <= 0) {
            numAnterior = "Error";
            displayResults();
            return;
        }
        numAnterior /= numAtual;
    }
    numAnterior = roundNumber(numAnterior);
    numAnterior = numAnterior.toString();
    displayResults();
}

function roundNumber(num) {
    return Math.round(num * 100000) / 100000;
}

function displayResults() {
    if (numAnterior.length <= 11) {
        visorAtual.textContent = numAnterior;
    } else {
        visorAtual.textContent = numAnterior.slice(0, 11) + "...";
    }
    visorAnterior.textContent = "";
    operador = "";
    numAtual = "";
}

function clearCalculator() {
    numAtual = "";
    numAnterior = "";
    operador = "";
    visorAtual.textContent = "0";
    visorAnterior.textContent = "";
}

function addDecimal() {
    if (!numAtual.includes(".")) {
        numAtual += ".";
        visorAtual.textContent = numAtual;
    }
}

function handleKeyPress(e) {
    
    if (e.key >= 0 && e.key <= 9) {
        handleNumber(e.key);
    }
    if (
        e.key === "Enter" ||
        (e.key === "=" && numAtual != "" && numAnterior != "")
    ) {
        compute();
    }
    if (e.key === "+" || e.key === "-" || e.key === "/") {
        handleoperador(e.key);
    }
    if (e.key === "*") {
        handleoperador("x");
    }
    if (e.key === ".") {
        addDecimal();
    }
    if (e.key === "Backspace") {
        handleDelete();
    }
}

function handleDelete() {
    if (numAtual !== "") {
        numAtual = numAtual.slice(0, -1);
        visorAtual.textContent = numAtual;
        if (numAtual === "") {
            visorAtual.textContent = "0";
        }
    }
   
}
