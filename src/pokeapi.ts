export class PokeAPI {
	private static readonly baseURL = "https://pokeapi.co/api/v2";

	constructor() {}

	async fetchLocations(pageURL?: string): Promise<ShallowLocation> {
		// TODO
		const fullURL = `${pageURL ?? `${PokeAPI.baseURL}/location-area`}`;
		try {
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

			return await response.json();
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
		// fix later
		try {
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

			return await response.json();
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
