import { Cache } from "./pokecache.js";

export class PokeAPI {
	private static readonly baseURL = "https://pokeapi.co/api/v2";
	#interval: number = 1000 * 60; //1 minute
	#cache = new Cache(this.#interval);

	constructor() {}
	async fetchLocations(pageURL?: string): Promise<ShallowLocation> {
		// TODO
		const fullURL = `${pageURL ?? `${PokeAPI.baseURL}/location-area`}`;
		const cachedResponse = this.#cache.get<ShallowLocation>(fullURL);
		try {
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
				console.log(`full url:`, fullURL);
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
		const cachedResponse = this.#cache.get<Location>(fullURL);

		try {
			if (cachedResponse) {
				console.log("Serving from cache:\n");
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
				console.log(`full url:`, fullURL);
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

	async fetchLocationsTest(pageURL?: string): Promise<ShallowLocation> {
		const fullURL = `${pageURL ?? `${PokeAPI.baseURL}/location-area`}`;

		return this.fetchWithCacheTEST<ShallowLocation>(fullURL);
	}

	async fetchLocationTEST(pageURL?: string): Promise<Location> {
		const fullURL = `${pageURL ?? `${PokeAPI.baseURL}/location-area`}`;

		return this.fetchWithCacheTEST<Location>(fullURL);
	}

	// generic fetch with cache function
	// we will use this to grab api endpoints
	// before we fetch we check if we cached it already
	private async fetchWithCacheTEST<T>(pageURL?: string): Promise<T> {
		const fullURL = `${pageURL ?? `${PokeAPI.baseURL}/location-area`}`;
		const cachedResponse = this.checkCachedResponse<T>(fullURL);

		if (cachedResponse) {
			return cachedResponse;
		}

		const data = await this.fetch<T>(fullURL);
		return data;
	}

	private async fetch<T>(fullURL: string): Promise<T> {
		try {
			const response = await fetch(fullURL, {
				method: "GET",
				mode: "cors",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				console.log(`full url:`, fullURL);
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

	private checkCachedResponse<T>(fullURL: string): T | undefined {
		const cachedResponse = this.#cache.get<T>(fullURL);
		if (!cachedResponse) {
			return undefined;
		}

		console.log("Serving from cache:\n");
		return cachedResponse;
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
	pokemon_encounters: EncountersWrapper[];
};

export type EncountersWrapper = {
	pokemon: Pokemon;
	version_details: any[];
};

export type Pokemon = {
	name: string;
	url: string;
};
