import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";

export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
	readline: Interface;
	commands: Record<string, CLICommand>;
	pokeAPI: PokeAPI;
	nextLocationsURL: string;
	prevLocationsURL: string;
	pokedex: Record<string, Pokemon>;
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
		pokedex: {},
	};
}

export function addToPokedex(state: State, pokemon: Pokemon): void {
	const key = pokemon.name.toLowerCase();
	if (state.pokedex[key]) {
		console.log(`${pokemon.name} is already in your pokedex.`);
		return;
	}
	console.log(`${pokemon.name} added to the Pokedex.`);
	state.pokedex[key] = pokemon;
}
export function getPokemon(
	state: State,
	pokemonName: string,
): Pokemon | undefined {
	const pokemon = state.pokedex[pokemonName.toLowerCase()];
	return pokemon;
}
