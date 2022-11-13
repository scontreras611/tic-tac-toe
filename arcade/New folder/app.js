const space = document.querySelectorAll(".space");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restart");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = true;

initializeGame();


function initializeGame(){

    space.forEach(space => space.addEventListener("click", spaceClicked));
    statusText.textContent = `Ready to start when you are!`;
    running = true;
}
function spaceClicked(){
    const spaceIndex = this.getAttribute("spaceIndex");

    if(options[spaceIndex] != "" || !running){
        return;
    }

    updateSpace(this, spaceIndex);
    checkWinner();
}
function updateSpace(space, index){
    options[index] = currentPlayer;
    space.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    if(options === ["", "", "", "", "", "", "", "", ""]){
       // console.log("conditionWorking")
       statusText.textContent = `Ready to start when you are!`
       return;
    }
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const spaceA = options[condition[0]];
        const spaceB = options[condition[1]];
        const spaceC = options[condition[2]];

        if(spaceA == "" || spaceB == "" || spaceC == ""){
            continue;
        }
        if(spaceA == spaceB && spaceB == spaceC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `YAY! ${currentPlayer} WINS!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `It's a tie! You both win!... or lose, that depends on you.`;
        running = false;
    }
    else{
        changePlayer();
    }
}
  
 restart.addEventListener("click", ()=>{
    //console.log("restart")
    //currentPlayer = "";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Ready to start when you are!`
    document.querySelectorAll('.space')
    space.forEach(space => space.textContent = "");
    running = true;
}
 );
