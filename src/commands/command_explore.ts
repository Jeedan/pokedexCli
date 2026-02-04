import { State } from "../state/state.js";

export async function commandExplore(
	state: State,
	locationName: string,
): Promise<void> {
	// grab location
	console.log(`Exploring ${locationName}...`);
	const locationResponse = await state.pokeAPI.fetchLocation(locationName);
	const pokemonEncounters = locationResponse.pokemon_encounters;

	console.log("Found Pokemon:");
	for (const encounter of pokemonEncounters) {
		console.log(`- ${encounter.pokemon.name}`);
	}
}
