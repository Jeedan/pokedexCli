import type { State } from "./state.js";

export async function commandMapBack(state: State): Promise<void> {
	// fetch previous locations
	// check if there are locations if not early return
	// use PokeAPI to fetch locations
	// build the url based on nextlocation

	if (state.prevLocationsURL === "") {
		console.log("you're on the first page");
		return;
	}
	const locations = await state.pokeAPI.fetchLocations(
		state.prevLocationsURL,
	);

	// update next and previous URLS for the next calls
	state.nextLocationsURL = locations.next ?? "";
	state.prevLocationsURL = locations.previous ?? "";

	for (const location of locations.results) {
		console.log(`${location.name}`);
	}
}
