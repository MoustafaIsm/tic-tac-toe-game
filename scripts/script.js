// Variable
const turn = document.getElementById("turn");
const result = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");
const positions = document.getElementsByClassName("position");
const yellow = "./images/yellow.png";
const red = "./images/red.png";
const yellowPositions = [];
const redPositions = [];
let flag = "yellow";
let gameEnded = false;

// Event listeners functions
const restartGame = () => {
    window.location.href = "./index.html";
};

// Event listeners
for (let i = 0; i < positions.length; i++) {
    positions[i].addEventListener("click", () => {
        if (!gameEnded) {
            if (!alreadyClicked(positions[i])) {
                // If yellow played
                if (flag == "yellow") {
                    positions[i].src = yellow;
                    yellowPositions.push(i);
                    let yellowWon = checkIfWon(yellowPositions);
                    let gameTied = tieGame(yellowPositions);
                    if (yellowWon) {
                        gameEnded = true;
                        updateResultDisplay("yellow");
                    } else if (gameTied) {
                        gameEnded = true;
                        result.textContent = "Results: Tie!!";
                    } else {
                        flag = "red";
                    }
                }
                // If red played
                else {
                    positions[i].src = red;
                    redPositions.push(i);
                    let redWon = checkIfWon(redPositions);
                    let gameTied = tieGame(redPositions);
                    if (redWon) {
                        gameEnded = true;
                        updateResultDisplay("red");
                    } else if (gameTied) {
                        gameEnded = true;
                        result.textContent = "Results: Tie!!";
                    } else {
                        flag = "yellow";
                    }
                }
                positions[i].classList.add("disabled");
                changeTurnDisplay();
            }
        }
    });
}

restartBtn.addEventListener("click", restartGame);


// Hlper functions

const checkIfWon = (array) => {
    if (
        (array.includes(0) && array.includes(1) && array.includes(2)) ||
        (array.includes(0) && array.includes(3) && array.includes(6)) ||
        (array.includes(0) && array.includes(4) && array.includes(8)) ||
        (array.includes(1) && array.includes(4) && array.includes(7)) ||
        (array.includes(2) && array.includes(5) && array.includes(8)) ||
        (array.includes(2) && array.includes(4) && array.includes(6)) ||
        (array.includes(3) && array.includes(4) && array.includes(5)) ||
        (array.includes(6) && array.includes(7) && array.includes(8))
    )
        return true;
    else
        return false;
};

const tieGame = (array) => {
    return array.length > 4 ? true : false;
}

const updateResultDisplay = (who) => {
    result.style.color = who;
    result.textContent = "Result: " + who + " WON !!";
};

const changeTurnDisplay = () => {
    turn.textContent = "Turn: " + flag;
};

const alreadyClicked = (element) => {
    return element.classList.contains("disabled") ? true : false;
};