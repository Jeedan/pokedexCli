import { getPokemon, State } from "../state/state.js";

export async function commandInspect(
	state: State,
	pokemonName: string,
): Promise<void> {
	const pokemon = getPokemon(state, pokemonName);
	if (!pokemon) {
		console.log(`You have not caught that pokemon yet`);
		return;
	}

	console.log(`Name: ${pokemon.name}`);
	console.log(`Height: ${pokemon.height}`);
	console.log(`Weight: ${pokemon.weight}`);

	console.log(`Stats:`);
	for (const stat of pokemon.stats) {
		console.log(`- ${stat.stat.name}: ${stat.base_stat}`);
	}

	console.log(`Types:`);
	for (const pokeType of pokemon.types) {
		console.log(`- ${pokeType.type.name}`);
	}
}
