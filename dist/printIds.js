import chalk from "chalk";
function printIds(array) {
    if (array.length !== 0) {
        let Ids = [];
        for (let obj of array) {
            const { Id } = obj;
            Ids.push(Id);
        }
        console.log(chalk.bgRedBright(`Todo List Id's`));
        console.log(Ids);
    }
}
export default printIds;
