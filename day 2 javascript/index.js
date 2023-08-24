//Rock Paper Scissors Game Project//
console.log("Rock Paper Scissors Game");

// Function to get a random computer choice
function getComputerChoice() {
  var rock = 1;
  var paper = 2;
  var scissors = 3;
  const choices = [rock, paper, scissors];
  const choice = Math.floor(Math.random() * choices.length);
  return choices[choice];
}

// Function to determine the winner of a round
function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "Tie";
  } else if (
    (playerSelection === 1 && computerSelection === 3) ||
    (playerSelection === 2 && computerSelection === 1) ||
    (playerSelection === 3 && computerSelection === 2)
  ) {
    return "Player";
  } else {
    return "Computer";
  }
}

// Function to map numeric choice to choice name
function getChoiceName(choice) {
  switch (choice) {
    case 1:
      return "Rock";
    case 2:
      return "Paper";
    case 3:
      return "Scissors";
    default:
      return "Invalid Choice";
  }
}

// Function to play the game
function game() {
  let playerScore = 0;
  let computerScore = 0;

  const prompt = require('prompt-sync')();

  // Round 1
  const playerChoice1 = Number(prompt("Round 1: Choose: 1 for Rock, 2 for Paper, 3 for Scissors"));
  const playerChoiceName1 = getChoiceName(playerChoice1);
  const computerChoice1 = getComputerChoice();
  const roundResult1 = playRound(playerChoice1, computerChoice1);

  console.log(`Round 1: You choose ${playerChoiceName1}, Computer choose ${getChoiceName(computerChoice1)}`);
  if (roundResult1 === "Player") {
    playerScore++;
    console.log("You win this round!");
  } else if (roundResult1 === "Computer") {
    computerScore++;
    console.log("Computer wins this round!");
  } else {
    console.log("It's a tie!");
  }
}

game();