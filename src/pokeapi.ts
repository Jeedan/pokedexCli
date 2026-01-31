import { Cache } from "./pokecache.js";

export class PokeAPI {
	private static readonly baseURL = "https://pokeapi.co/api/v2";
	#interval: number = 1000 * 60; //1 minute
	#cache = new Cache(this.#interval);

	constructor() {}

	async fetchLocations(pageURL?: string): Promise<ShallowLocation> {
		// TODO
		const fullURL = `${pageURL ?? `${PokeAPI.baseURL}/location-area`}`;
		try {
			const cachedResponse = this.#cache.get<ShallowLocation>(fullURL);
			//console.log(`fullURL:`, fullURL);
			if (cachedResponse) {
				console.log("Serving from cache:\n");
				return cachedResponse;
			}

			const response = await fetch(fullURL, {
				method: "GET",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}
			const data = await response.json();
			this.#cache.add(fullURL, data);
			return data;
		} catch (err) {
			if (err instanceof Error) {
				console.error(err.message);
			}
			throw new Error(`Error: ${err}`);
		}
	}

	async fetchLocation(locationName: string): Promise<Location> {
		// TODO
		const fullURL = `${PokeAPI.baseURL}/location-area/${locationName ?? ""}`;

		try {
			const cachedResponse = this.#cache.get<Location>(fullURL);
			if (cachedResponse) {
				return cachedResponse;
			}

			const response = await fetch(fullURL, {
				method: "GET",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
					// maybe api key?
				},
			});

			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}
			const data = await response.json();
			this.#cache.add(fullURL, data);
			return data;
		} catch (err) {
			if (err instanceof Error) {
				console.error(err.message);
			}

			throw new Error(`Error: ${err}`);
		}
	}
}

export type ShallowLocation = {
	count: number;
	next: string | null;
	previous: string | null;
	results: Location[];
};

export type Location = {
	name: string;
	url: string;
};
