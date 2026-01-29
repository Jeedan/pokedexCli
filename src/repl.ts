import { createInterface } from "node:readline";
import { getCommands, runCommands } from "./commands.js";

export function cleanInput(input: string): string[] {
	// split string based on whitespace
	// lowercase input
	// trim leading or trailing whitespace
	// the regex gets rid of all white space (tabs and newline also)
	// unlike splitting on " "
	const cleanedWords = input
		.trim()
		.toLowerCase()
		.split(/\s+/)
		.filter(Boolean);
	return cleanedWords;
}

export function startREPL(): void {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: "Pokedex > ",
	});

	// get the commands
	const commands = getCommands();
	// display the help command on start
	commands.help.callback(commands);
	rl.prompt();
	rl.on("line", (line) => {
		const cleanedInput = cleanInput(line);
		if (cleanedInput.length === 0) {
			rl.prompt();
		}
		runCommands(commands, cleanedInput);
		rl.prompt();
	});
}
