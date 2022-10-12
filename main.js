const winningSetArray = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[6, 4, 2]];
const gameSquares =document.querySelectorAll(".game-square-content");
let gameboardArray = ["0","1","X","3","X","5","X","7","8"];
let playerArray = ["P1","P2"];
let winner = undefined;
let turn = 0;



/*Event Listeners*/
gameSquares.forEach(square => square.addEventListener('click',playerSelectionWrite))



const Player = (name) => {
    const _name = name
    const _wincount = 0;
    const win = () => wincount++
    const resetWinCount = () => wincount = 0;
    const logWinCount = () => console.log(wincount);
    return {_name,_wincount,win,resetWinCount,logWinCount}
}

function checkForWin(){
    let winnerFound = false;
    for(let [a,b,c] of winningSetArray){
        if(gameboardArray[a]==gameboardArray[b]&&gameboardArray[a]==gameboardArray[c]){
            winnerFound = true;
            switch(gameboardArray[a]){
                case "X":
                    winner = playerArray[0];
                    console.log(winner);
                    return winnerFound;
                case "O":
                    winner = playerArray[1];
                    return winnerFound;
            }
        }
    }
}

function playerSelectionWrite(e){
    switch(turn){
        case 0: 
            console.log(e);
            turn++;
            break;
        case 1:
            e.innerText = "O"
            turn--;
            break;
    }
}


function playGame(){

}
