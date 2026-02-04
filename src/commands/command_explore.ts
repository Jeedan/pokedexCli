import { State } from "../state/state.js";

export async function commandExplore(
	state: State,
	locationName: string,
): Promise<void> {
	// grab location
	if (!locationName) {
		console.log(
			"Please enter a location name to explore!\nExample: explore viridian-forest-area",
		);
		console.log(`\nYou can use the 'map' command to explore locations!`);
		console.log(`\nOr type 'help' for more commands!`);
		return;
	}
	console.log(`Exploring ${locationName}...`);
	const locationResponse = await state.pokeAPI.fetchLocation(locationName);
	const pokemonEncounters = locationResponse.pokemon_encounters;

	console.log("Found Pokemon:");
	for (const encounter of pokemonEncounters) {
		console.log(`- ${encounter.pokemon.name}`);
	}
}
