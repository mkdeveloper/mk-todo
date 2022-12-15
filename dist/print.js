import chalk from "chalk";
function printTodo(array) {
    if (array.length !== 0) {
        for (let obj of array) {
            const { Id, Title, Discription, Date, Status } = obj;
            const printmsg = chalk.greenBright(`

**************************************************************

 Id:           ${Id}

 Todo:         ${Title}

 Discription:  ${Discription}

 Date:         ${Date}

 Status:       ${Status}

**************************************************************`);
            console.log(printmsg);
        }
    }
    else {
        console.log(chalk.redBright("Todo List is Empty"));
    }
}
export default printTodo;
