import type { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
	// use PokeAPI to fetch locations
	// build the url based on nextlocation
	const fullURL =
		state.nextLocationsURL === "" ? undefined : state.nextLocationsURL;

	const locations = await state.pokeAPI.fetchLocationsTest(fullURL);

	// update next and previous URLS for the next calls
	state.nextLocationsURL = locations.next ?? "";
	state.prevLocationsURL = locations.previous ?? "";

	for (const location of locations.results) {
		console.log(`${location.name}`);
	}
}
