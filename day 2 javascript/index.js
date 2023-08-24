console.log("Rock Paper Scissor Game")

function getBotChoice() {
var rock = 1
var paper = 2
var scissors = 3
const choices = [rock, paper, scissors ];
const choice = Math.floor(Math.random() * choices.length);
return choices[choice];
}

function PlayRound(playerSelection, computerSelection) {
if(playerSelection === computerSelection) {
    return "Tie";

} else if
    ((playerSelection === 1 && computerSelection === 3)
 || (playerSelection === 2 && computerSelection === 1) 
 || (playerSelection === 3 && computerSelection === 2))
 {
    return "win"
} else {
    return "lost"
    }
}

function getChoice(choice) {
    switch(choice) {
        case 1:
            return "Rock"
        case 2: 
            return "Paper"
        case 3: 
            return "Scissors"
        default:
            return "Invalid Choice";
    }
}
function game(){
    const prompt = require('prompt-sync')();

    const playerchoice = Number(prompt
        ("Choose 1 for Rock, 2 for Paper and 3 for Scissors"))
    const playerChoicename = getChoice(playerchoice)
    const botChoice = getBotChoice();
    const result = PlayRound(playerchoice, botChoice)

    console.log(`you choose ${playerChoicename} , Computer choose ${getChoice(botChoice)}`) 
    if (result === "win") {
        console.log("you win")
    }
    else if (result === "lost") {
        console.log("you lose")
    } else {
        console.log("it's a tie!"); 
    } 
}

game();