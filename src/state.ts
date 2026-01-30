import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State) => Promise<void>;
};

export type State = {
	readline: Interface;
	commands: Record<string, CLICommand>;
	pokeAPI: PokeAPI;
	nextLocationsURL: string;
	prevLocationsURL: string;
};

// this way we can pass test commands into initState
// helps when testing, if nothing is passed we just grab them from the getter
export function initState(): State {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: "Pokedex > ",
	});

	return {
		readline: rl,
		commands: getCommands(),
		pokeAPI: new PokeAPI(),
		nextLocationsURL: "",
		prevLocationsURL: "",
	};
}
