let playerArray = ["p1", "p2"];
const winningSetArray = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];
const gameSquares = document.querySelectorAll(".game-square-content");
const gameSquareText = document.querySelectorAll(".game-square-text");
const resetButton = document.getElementById("reset");
let gameboardArray = ["", "", "", "", "", "", "", "", ""];
let winner = undefined;
let turn = 0;




/*Event Listeners*/
gameSquares.forEach(square => square.addEventListener('click', playerSelectionTurnKeeper))
resetButton.addEventListener('click',resetGame);


const Player = (name) => {
    const _name = name
    const _wincount = 0;
    const win = () => wincount++
    const resetWinCount = () => wincount = 0;
    const logWinCount = () => console.log(wincount);
    return { _name, _wincount, win, resetWinCount, logWinCount }
}

function checkForWin() {
    let winnerFound = false;
    for (let [a, b, c] of winningSetArray) {
        if (gameboardArray[a] == gameboardArray[b] && gameboardArray[a] == gameboardArray[c]) {
            winnerFound = true;
            switch (gameboardArray[a]) {
                case "X":
                    winner = playerArray[0];
                    console.log(winner);
                    return winnerFound;
                case "O":
                    winner = playerArray[1];
                    console.log(winner);
                    return winnerFound;
            }
        }
    }
}

function checkForTie(){
    let tieFound = true;
    for(let i = 0; i<gameboardArray.length; i++)
    {
        if(gameboardArray[i] == ""){
             tieFound = false;
        }
    }
    return tieFound;
}

function playerSelectionTurnKeeper(e) {
    checkForWin();
    if(winner==undefined && !checkForTie()){
    checkForValidMove(e);
    switch (turn) {
        case 0:
            turn++;
            break;
        case 1:
            turn--;
            break;
        }
    }
    checkForWin();
    if(winner!=undefined){
        console.log(winner._name);
    }
}

function fillSquares() {
    for (let i = 0; i < gameSquareText.length; i++) {
        gameSquareText[i].innerText = gameboardArray[i];
    };
}

function checkForValidMove(e){
    let selected = parseInt(e.originalTarget.id);
    if(gameboardArray[selected]==""){
        switch(turn){
            case 0:
                gameboardArray[selected] = "X";
                break;
            case 1:
                gameboardArray[selected] = "O"
                break;
        }
    }
    else{
        alert("Invalid Move");
    }
    fillSquares();
}

function resetGame (){
    for(let i = 0; i < gameboardArray.length; i++){
        gameboardArray[i] = "";
    }
    winner = undefined;

    fillSquares();
    
}

function createPlayers(){
    let p1 = Player("");
    let p2 = Player("");
    playerArray[0] = p1;
    playerArray[1] = p2;
}