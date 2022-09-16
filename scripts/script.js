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

// Event listeners
for (let i = 0; i < positions.length; i++) {
    positions[i].addEventListener("click", () => {
        if (flag == "yellow") {
            positions[i].src = yellow;
            yellowPositions.push(i);
            let yellowWon = checkIfWon(yellowPositions);
            if (yellowWon) {

            } else {
                flag = "red";
            }
        } else {
            positions[i].src = red;
            redPositions.push(i);
            let redWon = checkIfWon(redPositions);
            flag = "yellow";
        }
    });
}


// Hlper functions

const checkIfWon = (array) => {
    if (
        (array.includes(1) && array.includes(2) && array.includes(3)) ||
        (array.includes(1) && array.includes(4) && array.includes(7)) ||
        (array.includes(1) && array.includes(5) && array.includes(9)) ||
        (array.includes(2) && array.includes(5) && array.includes(8)) ||
        (array.includes(3) && array.includes(6) && array.includes(9)) ||
        (array.includes(3) && array.includes(5) && array.includes(7)) ||
        (array.includes(4) && array.includes(5) && array.includes(6)) ||
        (array.includes(7) && array.includes(8) && array.includes(9)))
        return true;
    else
        return false;
};