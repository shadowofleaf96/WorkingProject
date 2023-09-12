const { ChildProcess } = require("child_process");
const readline = require("readline");

// Create the readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const answers = [];

//Function to prompt the user for their name
function promptInfos() {
  rl.question("Write your Name?\n", (name) => {
    rl.question("Write your Phone Number?\n", (phoneNumber) => {
      answers.push(name, phoneNumber);
      rl.question("Write your Friend Name?\n", (name) => {
        rl.question("Write your Friend Phone Number?\n", (phoneNumber) => {
          answers.push(name, phoneNumber);
            menuToDisplay();
        });
      });
    });
  });
}

function displayAllContacts() {
  for (let i = 0; i < answers.length; i += 2) {
    console.log(answers[i], answers[i + 1]);
  }
  menuToDisplay();
}

function searchforContacts() {
  rl.question(
    "Write the name of the person you searching for ?\n",
    (searchName) => {
      const ivalue = answers.indexOf(searchName);
      if (ivalue > -1) {
        console.log("Found: " + answers[ivalue], answers[ivalue + 1]);
      } else {
        console.log("Not Found: " + searchName);
      }
      menuToDisplay();
    });
}

function ExitApp() {
  rl.close();
}

function menuToDisplay() {
  console.log("\nMenu:");
  console.log("1. Add Contacts");
  console.log("2. Display All Contacts");
  console.log("3. Search for a Contact");
  console.log("4. Exit Gracefully");
  rl.question("Please enter your choice\n", (choice) => {
    switch (choice) {
      case "1":
        promptInfos();
        break;
      case "2":
        displayAllContacts();
        break;
      case "3":
        searchforContacts();
        break;
      case "4":
        ExitApp();
        break;
      default:
        console.log("Invalid choice. Please enter a valid option.");
        displayMenu();
        break;
    }
  });
}

menuToDisplay();
