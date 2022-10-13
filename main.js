let playerArray = ["p1", "p2"];
const winningSetArray = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];
const gameSquares = document.querySelectorAll(".game-square-content");
const gameSquareText = document.querySelectorAll(".game-square-text");
const resetButton = document.getElementById("reset");
const changePlayersButton = document.getElementById('change-players');
const modalContainer = document.querySelector('.modal-container');
const playerCreateButton = document.getElementById('player-create-button');
const turnKeeperDisplay = document.querySelector('.turn-dispay');
const playerOneNameDispaly = document.querySelector('.player-one-name-display');
const playerTwoNameDispaly = document.querySelector('.player-two-name-display');
let gameboardArray = ["", "", "", "", "", "", "", "", ""];
let winner = undefined;
let turn = 0;




/*Event Listeners*/
gameSquares.forEach(square => square.addEventListener('click', playRound))
resetButton.addEventListener('click', resetGame);
changePlayersButton.addEventListener('click', toggleModalHide);
playerCreateButton.addEventListener('click', createPlayers);
window.addEventListener('mousemove', checkForAiTurn);


/*Player Contructor*/
const Player = (name, isAI) => {
    const _name = name
    let _wincount = 0;
    let _isAI = isAI;
    return { _name, _wincount, _isAI }
}

/*Condition Check Functions*/
function checkForWin() {
    let winnerFound = false;
    for (let [a, b, c] of winningSetArray) {
        if (gameboardArray[a] == gameboardArray[b] && gameboardArray[a] == gameboardArray[c]) {
            winnerFound = true;
            switch (gameboardArray[a]) {
                case "X":
                    winner = playerArray[0];
                    playerArray[0]._wincount++;
                    return winnerFound;
                case "O":
                    winner = playerArray[1];
                    playerArray[1]._wincount++;
                    return winnerFound;
            }
        }
    }


}

function checkForTie() {
    let tieFound = true;
    for (let i = 0; i < gameboardArray.length; i++) {
        if (gameboardArray[i] == "") {
            tieFound = false;
        }
    }
    return tieFound;
}

/*Display Functions*/
function fillSquares() {
    for (let i = 0; i < gameSquareText.length; i++) {
        gameSquareText[i].innerText = gameboardArray[i];
    };

    if (checkForWin()) {
        fillScoreCard();
        alert(`The winner was recorded and the board is being reset.`);
        resetGame();
    }
}

function fillScoreCard() {
    const score1 = document.querySelector('.p1-score-display');
    const score2 = document.querySelector('.p2-score-display');
    score1.innerHTML = playerArray[0]._wincount;
    score2.innerHTML = playerArray[1]._wincount;
}

function fillTurnKeeper() {
    turnKeeperDisplay.innerText = turn + 1;
}

function fillNameDispaly() {
    if (playerArray[0]._name != "") {
        playerOneNameDispaly.innerHTML = playerArray[0]._name;
    }
    else {
        playerOneNameDispaly.innerHTML = "Player 1";

    }
    if (playerArray[1]._name != "") {
        playerTwoNameDispaly.innerHTML = playerArray[1]._name;
    }
    else {
        playerTwoNameDispaly.innerHTML = "Player 2";
    }
}

/*Button functions*/
function createPlayers() {
    const playerOneTextBox = document.getElementById('player-one-name');
    const playerTwoTextBox = document.getElementById('player-two-name');
    const playerOneAiCBox = document.getElementById('ai-checkbox-one');
    const playerTwoAiCBox = document.getElementById('ai-checkbox-two');

    let player1 = Player(playerOneTextBox.value, playerOneAiCBox.checked);
    let player2 = Player(playerTwoTextBox.value, playerTwoAiCBox.checked);

    playerArray[0] = player1;
    playerArray[1] = player2;

    toggleModalHide();
    resetGame();
    fillSquares();
    fillScoreCard();
    fillTurnKeeper();
    fillNameDispaly();
}

function toggleModalHide() {
    modalContainer.classList.toggle('hide');
}

function resetGame() {
    for (let i = 0; i < gameboardArray.length; i++) {
        gameboardArray[i] = "";
    }
    winner = undefined;
    fillSquares();

}

/*Game Logic Functions*/
function playRound(e) {
    if (!checkForWin()) {

        if (winner == undefined && !checkForTie()) {
            if(checkForValidMove(e)){

            switch (turn) {
                case 0:
                    turn++;
                    fillTurnKeeper();
                    break;
                case 1:
                    turn--;
                    fillTurnKeeper();
                    break;
            }
        }}
    }
}



function checkForValidMove(e) {
    let selected = parseInt(e.target.id);
    let isValid = true;
    if(gameboardArray[selected]!=""){
        alert("Invalid Move");
        isValid = false;
    }
    else if (isValid) {
        switch (turn) {
            case 0:
                gameboardArray[selected] = "X";
                break;
            case 1:
                gameboardArray[selected] = "O"
                break;
        }
    }
    fillSquares();
    return(isValid);
}



function checkForAiTurn() {
    if (playerArray[0]._isAI == true && turn == 0 || playerArray[1]._isAI && turn == 1) {
        makeAIMoveDumb();
    }

}


function makeAIMoveDumb() {
    const toFind = (element) => element == "";

    switch (turn) {
        case 0:
            gameboardArray[gameboardArray.findIndex(toFind)] = "X";
            turn++;
            fillSquares();
            fillTurnKeeper();
            break;
        case 1:
            gameboardArray[gameboardArray.findIndex(toFind)] = "O";
            turn--;
            fillSquares();
            fillTurnKeeper();
            break;
    }



}


/*Intialize Turn keeper while in testing*/
fillTurnKeeper();

