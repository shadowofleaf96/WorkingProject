
//task1//
console.log('Task 1')
var age = 25
var isStudent
if (age > 30) {
    isStudent = false
                        }
    else{
        isStudent = true
    }
var colorArray = ['blue','white','red'];

//task2//
var quotes = "hello"+" "+'world'
console.log(quotes)

//task3//
var name = 'mohammed'
var studentStatus = isStudent ? 'a student' : 'not a student';
var result = `my name is ${name}, i have ${age} and ${studentStatus}.`;

console.log(result)

//task5 6 8//
var favoritec = "black"
var favoritea = "lion"
var checknumber = "21"


const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function askQuestions() {
  const colorAnswer = await askQuestion("Please enter your favorite color: ");
  const animalAnswer = await askQuestion("Please enter your favorite animal: ");
  

  if (colorAnswer === "black" && animalAnswer === "lion") {
    console.log("you are awesome");
  } else {
    console.log("you are not awesome");
  }

  const anumber = await askQuestion("Please enter a number of your choice: ");
  if (anumber > 0) {
    console.log("this number is positive");
  } else if (anumber < 0) {
    console.log("this number is negative");
  } else {
    console.log("this number is null");
  }

  const checknumber = await askQuestion("Please enter a number: ");
  if (checknumber === "21") {
    console.log("the answer is correct");
  } else {
    console.log("the answer is not correct");
  }

  rl.close();
}

function askQuestion(question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}

askQuestions();


