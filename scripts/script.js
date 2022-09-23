// Variable
const turn = document.getElementById("turn");
const result = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");
const positions = document.getElementsByClassName("position");
const yellow = "./images/yellow.png";
const red = "./images/red.png";
const defaultSrc = "http://127.0.0.1:5500/tic-tac-toe-game/images/transparent.png";
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
                        positions[i].classList.add("disabled");
                        // AI plays
                        let bestPosition = findBestPosition(positions);
                        positions[bestPosition].src = red;
                        redPositions.push(bestPosition);
                        let redWon = checkIfWon(redPositions);
                        let gameTied = tieGame(redPositions);
                        if (redWon) {
                            gameEnded = true;
                            updateResultDisplay("red");
                        } else if (gameTied) {
                            gameEnded = true;
                            result.textContent = "Results: Tie!!";
                        }
                        positions[bestPosition].classList.add("disabled");
                    }
                }
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
}

const tieGame = (array) => {
    return array.length > 4 ? true : false;
}

const evaluation = () => {
    if (checkIfWon(redPositions))
        return 10;
    if (checkIfWon(yellowPositions))
        return -10;
    return 0;
}

const minmax = (board, depth, isMax) => {
    // let score = evaluation();
    if (checkIfWon(redPositions))
        return 10;
    if (checkIfWon(yellowPositions))
        return -10;
    if (tieGame(yellowPositions) || tieGame(redPositions))
        return 0;
    if (isMax) {
        let best = -1000;
        let index = 0;
        for (const position of board) {
            if (position.src == defaultSrc) {
                position.src = red;
                redPositions.push(index);
                best = Math.max(best, minmax(board, depth + 1, !isMax));
                position.src = defaultSrc;
                redPositions.pop();
            }
            index++;
        }
        return best;
    } else {
        let best = 1000;
        let index = 0;
        for (const position of board) {
            if (position.src == defaultSrc) {
                position.src = yellow;
                yellowPositions.push(index);
                best = Math.min(best, minmax(board, depth + 1, !isMax));
                position.src = defaultSrc;
                yellowPositions.pop();
            }
            index++;
        }
        return best;
    }
}

const findBestPosition = (board) => {
    let best = -1000;
    let bestMove = -1;
    let counter = 0;
    for (const position of board) {
        if (position.src == defaultSrc) {
            position.src = red;
            let val = minmax(board, 0, true);
            position.src = defaultSrc;
            if (val > best) {
                bestMove = counter;
                best = val;
            }
        }
        counter++;
    }
    return bestMove;
}

const updateResultDisplay = (who) => {
    result.style.color = who;
    result.textContent = "Result: " + who + " WON !!";
}

const changeTurnDisplay = () => {
    turn.textContent = "Turn: " + flag;
}

const alreadyClicked = (element) => {
    return element.classList.contains("disabled") ? true : false;
}