const readline = require("readline");

// Create the readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const answers = [];

// Prompt the user for their name
rl.question("Write your Name?\n", (name) => {
  rl.question("Write your Phone Number?\n", (phoneNumber) => {
    answers.push(name, phoneNumber);
    rl.question("Write your Friend Name?\n", (name) => {
      rl.question("Write your Friend Phone Number?\n", (phoneNumber) => {
        answers.push(name, phoneNumber);
        for (let i = 0; i < answers.length; i += 2) {
          console.log(answers[i], answers[i + 1]);
        }
        rl.question(
          "Write the name of the person you searching for ?\n",
          (searchName) => {
            const ivalue = answers.indexOf(searchName);
            if (ivalue > -1) {
              console.log("Found: " + answers[ivalue], answers[ivalue + 1]);
            } else {
              console.log("Not Found: " + searchName);
            }
            rl.close();
          }
        );
      });
    });
  });
});
