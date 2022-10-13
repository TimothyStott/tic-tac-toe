let playerArray = ["p1", "p2"];
const winningSetArray = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];
const gameSquares = document.querySelectorAll(".game-square-content");
const gameSquareText = document.querySelectorAll(".game-square-text");
const resetButton = document.getElementById("reset");
const changePlayersButton = document.getElementById('change-players');
const modalContainer = document.querySelector('.modal-container');
const playerCreateButton = document.getElementById('player-create-button');
let gameboardArray = ["", "", "", "", "", "", "", "", ""];
let winner = undefined;
let turn = 0;




/*Event Listeners*/
gameSquares.forEach(square => square.addEventListener('click', playerSelectionTurnKeeper))
resetButton.addEventListener('click',resetGame);
changePlayersButton.addEventListener('click',toggleModalHide);
playerCreateButton.addEventListener('click',createPlayers);



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
                    console.log(winner._name);
                    return winnerFound;
                case "O":
                    winner = playerArray[1];
                    console.log(winner._name);
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
    console.log(e);
    let selected = parseInt(e.target.id);
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
    const playerOneTextBox = document.getElementById('player-one-name');
    const playerTwoTextBox = document.getElementById('player-two-name');
    
    let player1 = Player(playerOneTextBox.value);
    let player2 = Player(playerTwoTextBox.value);

    playerArray[0]=player1;
    playerArray[1]=player2;

    console.log(playerArray);
    toggleModalHide();
    resetGame();
    fillSquares();

}

function toggleModalHide(){
    modalContainer.classList.toggle('hide');
}


