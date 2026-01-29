import type { CLICommand, State } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export function getCommands(): Record<string, CLICommand> {
	return {
		exit: {
			name: "exit",
			description: "Exits the pokedex",
			callback: commandExit,
		},
		help: {
			name: "help",
			description: "Displays the help message",
			callback: commandHelp,
		},
		// more commands here
	};
}

// loop over our commands to display them
export function runCommands(state: State, cleanedInput: string[]): void {
	const firstWord = cleanedInput[0];
	if (!firstWord) return;
	const command = state.commands[firstWord];
	if (!command) {
		console.log("Unknown command");
		return;
	}

	try {
		command.callback(state);
	} catch (err) {
		console.error("Error running command:", err);
	}
}
