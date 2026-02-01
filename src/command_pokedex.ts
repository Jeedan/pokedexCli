import { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
	const pokedex = state.pokedex;
	const size = Object.keys(pokedex).length;
	if (size === 0) {
		console.log("You have not caught any pokemon yet!");
		return;
	}

	console.log("Your Pokedex:");
	// loop over pokedex
	for (const pokemon of Object.values(pokedex)) {
		console.log(`- ${pokemon.name}`);
	}
}
