import type { CLICommand, State } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_mapBack.js";

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
		map: {
			name: "map",
			description: "Displays 20 locations from the PokeAPI.",
			callback: commandMap,
		},
		mapb: {
			name: "mapb",
			description: "Displays the previous 20 locations from the PokeAPI.",
			callback: commandMapBack,
		},
		// more commands here
	};
}

// loop over our commands to display them
export async function runCommands(
	state: State,
	cleanedInput: string[],
): Promise<void> {
	const firstWord = cleanedInput[0];
	if (!firstWord) return;
	const command = state.commands[firstWord];
	if (!command) {
		console.log("Unknown command");
		return;
	}

	try {
		await command.callback(state);
	} catch (err) {
		if (err instanceof Error) {
			console.error("Error:", err);
		}
	}
}
