import type { CLICommand, State } from "../state/state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_mapBack.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

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
		explore: {
			name: "explore",
			description:
				"Lists the Pokemon in the given location. Example: explore pastoria-city-area",
			callback: commandExplore,
		},
		catch: {
			name: "catch",
			description:
				"Attempt to catch the given Pokemon. Example: catch pikachu",
			callback: commandCatch,
		},
		inspect: {
			name: "inspect",
			description: "Display the stats of a Pokemon.",
			callback: commandInspect,
		},
		pokedex: {
			name: "pokedex",
			description: "Display all caught Pokemon.",
			callback: commandPokedex,
		},
		// more commands here
	};
}

// loop over our commands to display them
export async function runCommands(
	state: State,
	cleanedInput: string[],
): Promise<void> {
	const [firstWord, ...args] = cleanedInput;
	if (!firstWord) return;
	const command = state.commands[firstWord];
	if (!command) {
		console.log("Unknown command");
		return;
	}

	try {
		//this way we see the shape of the array
		// alternatively use ${args.join(" ")}
		//console.log(`run string args:`, args);
		await command.callback(state, ...args);
	} catch (err) {
		if (err instanceof Error) {
			console.error("Error:", err);
		}
	}
}
