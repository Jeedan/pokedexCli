import { createInterface, type Interface } from "readline";
import { getCommands, getBattleCommands } from "../commands/commands.js";
import { PokeAPI, type Pokemon } from "../services/pokeapi.js";
import { BasePokemon } from "../state/basePokemon.js";

export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State, ...args: string[]) => Promise<void>;
};

export type mode = "menu" | "battle" | "exploration";

export type State = {
	readline: Interface;
	commands: {
		menuCommands: Record<string, CLICommand>;
		battleCommands: Record<string, CLICommand>;
	};
	pokeAPI: PokeAPI;
	nextLocationsURL: string;
	prevLocationsURL: string;
	pokedex: Record<string, Pokemon>;
	mode: mode;
	battleState?: {
		opponentPokemon: BasePokemon;
		playerPokemon: BasePokemon;
		battleLog: string[];
	};
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
		commands: {
			menuCommands: getCommands(),
			battleCommands: getBattleCommands(),
		},
		pokeAPI: new PokeAPI(),
		nextLocationsURL: "",
		prevLocationsURL: "",
		pokedex: {},
		mode: "menu",
	};
}

export function addToPokedex(state: State, pokemon: Pokemon): void {
	const key = pokemon.name.toLowerCase();
	if (state.pokedex[key]) {
		console.log(`${pokemon.name} is already in your pokedex.`);
		return;
	}
	console.log(`${pokemon.name} added to the Pokedex.`);
	console.log(`You may now inspect it with the inspect command.`);
	state.pokedex[key] = pokemon;
}

export function getPokemon(
	state: State,
	pokemonName: string,
): Pokemon | undefined {
	if (!pokemonName) {
		console.log("Please enter a valid pokemon name!");
		return;
	}
	const pokemon = state.pokedex[pokemonName.toLowerCase()];
	return pokemon;
}

// display the help command on start
export function showInitialHelp(state: State): void {
	const helpCommand = state.commands.menuCommands.help;
	if (!helpCommand) return;
	helpCommand.callback(state);
}
