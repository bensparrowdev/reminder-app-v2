// const yargs = require('yargs')
const chalk = require('chalk')
const figlet = require('figlet')
const inquirer = require('inquirer');
const { addNotes, listNotes, removeNote } = require("../utils/notes")

const topLevelQuestion = [
    {
        type: "list",
        name: "options",
        message: "what would you like to do?",
        choices: ["add", "remove", "list", "exit"],
    }
]

const addQuestion = [{ type: "input", name: "add", message: "what would you like to add?" }]

const removeQuestion = [
    { type: "input", name: "remove", message: "what would you like to remove? Please type a number" }
]

const main = () => {
    console.log(chalk.magenta(figlet.textSync("Reminders", { font: 'ANSI Shadow'})));
    console.log("Starting up the app...");
    app();
};

const app = async () => {
    const answers = await inquirer.prompt(topLevelQuestion)

    if (answers.options == "add") {
        const answer = await inquirer.prompt(addQuestion);
        addNotes(answer.add);
        app();
    } else if (answers.options == "list") {
        listNotes();
        app();
    } else if (answers.options == "remove") {
        try {
            listNotes();
            const answer = await inquirer.prompt(removeQuestion);
            removeNote(answer.remove);
            app();
        }
        catch (error) {
            console.log(error)
        }
    } else if (answers.options == "exit") {
        console.log("Goodbye.");
    }
}

main();