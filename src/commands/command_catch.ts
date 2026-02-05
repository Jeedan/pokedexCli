import { State, addToPokedex } from "../state/state.js";

// use Math.random() to determine a chance catch rate
// determine catch rate based on pokemon's
// base experience
// the higher the base experience the harder to catch
// ****
// if caught add the pokemon to the Pokedex
// pokedex should be a Record<string, Pokemon>
// (map of pokemon by name stored in State)
export async function commandCatch(
	state: State,
	pokemonName: string,
): Promise<void> {
	if (!pokemonName) {
		console.log("Please enter a pokemon name!");
		return;
	}
	const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);

	console.log(`Throwing a Pokeball at ${pokemonName ?? "pikachu"}...`);

	const catchRate = Math.round(Math.random() * 650);
	if (catchRate < pokemon.base_experience) {
		console.log(
			`Your catch rate: ${catchRate} was not enough to beat ${pokemon.base_experience}\n`,
		);
		console.log(`${pokemon.name} escaped!`);
		return;
	}

	console.log(
		`Your catch rate: ${catchRate} beat ${pokemon.base_experience}!\n`,
	);

	console.log(`${pokemon.name} was caught!`);

	addToPokedex(state, pokemon);
}
