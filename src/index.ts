#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import welcome from "./welcome.js";

let msg = `
**********************************
*** Welcome to Mk's To-Do List ***
**********************************`;

await welcome(msg);

console.log(
  chalk.bgYellowBright(
    `Note: There are Two Todo Entries, for you to perform Different task on it`
  )
);
let idCount = 2;
let myTodoList: { Id: number; Title: string; Discription: string }[] = [
  {
    Id: 1,
    Title: "Meeting With VC",
    Discription: "Location: Peshawar University at 5:00 PM",
  },
  {
    Id: 2,
    Title: "Arranging Seminar",
    Discription: "Checking Preparation for Seminar",
  },
];

async function main() {
  interface TodoListType {
    Id: number;
    Title: string;
    Discription: string;
  }
  [];

  const differentChoices = await inquirer.prompt({
    name: "choosen",
    message: "Please select Desire Operation: ",
    type: "list",
    choices: ["See Todo List", "Add Todo", "Delete Todo"],
  });
  //Printing Todo List
  if (differentChoices.choosen === "See Todo List") {
    console.log(myTodoList);
    // Deleting an Object from ToDo List
  } else if (differentChoices.choosen === "Delete Todo") {
    let restartDelete: boolean;
    do {
      restartDelete = false;
      const deletePrompt = await inquirer.prompt({
        name: "deleteTodo",
        type: "input",
        message: "Please enter desire todo index number to delete: ",
      });

      let indexNum = myTodoList.findIndex(
        (list) => list.Id == deletePrompt.deleteTodo
      );

      if (indexNum !== -1) {
        myTodoList.splice(indexNum, 1);
      } else {
        console.log(chalk.redBright("Wrong Id Entered."));
        restartDelete = true;
      }
    } while (restartDelete);
    // Adding Todo to list
  } else {
    const userPrompt = await inquirer.prompt([
      {
        name: "todoTitle",
        message: `Please Enter a title: `,
        type: "input",
      },
      {
        name: "TodoDiscription",
        message:
          "Please enter discription, or just press enter, to leave it empty: ",
        type: "input",
        default: "N/A",
      },
    ]);

    let myTodoListObj: TodoListType = {
      Id: ++idCount,
      Title: userPrompt.todoTitle,
      Discription: userPrompt.TodoDiscription,
    };

    myTodoList.push(myTodoListObj);
  }
  const useAgainPrompt = await inquirer.prompt({
    name: "agian",
    type: "confirm",
    message: `Do you want to use it Again: `,
    default: false,
  });

  if (useAgainPrompt.agian === true) {
    main();
  } else {
    msg = `
***************************
*** Thank You For Using ***
***************************`;

    await welcome(msg);
  }
}

main();
