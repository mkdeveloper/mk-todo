#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import welcome from "./welcome.js";
import printTodo from "./print.js";
import printIds from "./printIds.js";
let msg = `
**********************************
*** Welcome to Mk's To-Do List ***
**********************************`;
await welcome(msg);
console.log(chalk.bgYellowBright(`Note: There are Two Todo Entries, for you to perform Different task on it`));
let idCount = 2;
let myTodoList = [
    {
        Id: 1,
        Title: "Meeting With VC",
        Discription: "Location: Peshawar University at 5:00 PM",
        Date: "string",
        Status: "Incomplete",
    },
    {
        Id: 2,
        Title: "Arranging Seminar",
        Discription: "Checking Preparation for Seminar",
        Date: "string",
        Status: "Incomplete",
    },
];
async function main() {
    [];
    const differentChoices = await inquirer.prompt({
        name: "choosen",
        message: "Please select Desire Operation: ",
        type: "list",
        choices: [
            "Open Todo List",
            "Add Todo",
            "Delete Todo",
            "Marked Todo As Completed",
        ],
    });
    //Printing Todo List
    if (differentChoices.choosen === "Open Todo List") {
        printTodo(myTodoList);
        // Deleting an Object from ToDo List
    }
    else if (differentChoices.choosen === "Delete Todo") {
        if (myTodoList.length !== 0) {
            printIds(myTodoList);
            let restartDelete;
            do {
                restartDelete = false;
                const deletePrompt = await inquirer.prompt({
                    name: "deleteTodo",
                    type: "input",
                    message: "Please enter desire todo index number to delete: ",
                });
                let indexNum = myTodoList.findIndex((list) => list.Id == deletePrompt.deleteTodo);
                if (indexNum !== -1) {
                    myTodoList.splice(indexNum, 1);
                    console.log(chalk.yellowBright(`ToDo No. ${deletePrompt.deleteTodo} has been Successfully Deleted`));
                }
                else {
                    console.log(chalk.redBright("Wrong Id Entered."));
                    restartDelete = true;
                }
            } while (restartDelete);
        }
        else {
            console.log(chalk.redBright("ToDo list is Empty"));
        }
        // Adding Todo to list
    }
    else if (differentChoices.choosen === "Add Todo") {
        const userPrompt = await inquirer.prompt([
            {
                name: "todoTitle",
                message: `Please Enter a title: `,
                type: "input",
            },
            {
                name: "TodoDiscription",
                message: "Please enter discription, or just press enter to leave it Empty: ",
                type: "input",
                default: "N/A",
            },
            {
                name: "date",
                message: "Please enter date, or press enter to leave it Empty",
                default: "N/A",
            },
        ]);
        let myTodoListObj = {
            Id: ++idCount,
            Title: userPrompt.todoTitle,
            Discription: userPrompt.TodoDiscription,
            Date: userPrompt.date,
            Status: "Pending",
        };
        myTodoList.push(myTodoListObj);
    }
    else {
        if (myTodoList.length !== 0) {
            printIds(myTodoList);
            let restartMark;
            do {
                restartMark = false;
                const markComplete = await inquirer.prompt({
                    name: "task",
                    message: "Enter Todo Id number to mark it as Complete: ",
                    type: "number",
                });
                let indexNum = myTodoList.findIndex((list) => list.Id == markComplete.task);
                if (indexNum !== -1) {
                    myTodoList[indexNum].Status = "Completed";
                    console.log(chalk.yellowBright(`Todo No. ${markComplete.task} Status has been update`));
                }
                else {
                    console.log(chalk.redBright("Wrong Id Entered."));
                    restartMark = true;
                }
            } while (restartMark);
        }
        else {
            console.log(chalk.redBright("ToDo list is Empty"));
        }
    }
    const useAgainPrompt = await inquirer.prompt({
        name: "agian",
        type: "confirm",
        message: `Do you want to use it Again: `,
        default: false,
    });
    if (useAgainPrompt.agian === true) {
        main();
    }
    else {
        msg = `
***************************
*** Thank You For Using ***
***************************`;
        await welcome(msg);
    }
}
main();
