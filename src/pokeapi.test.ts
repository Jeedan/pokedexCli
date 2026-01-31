import { test, expect, vi } from "vitest";
import { PokeAPI } from "./pokeapi.js";

const mockResponse = {
	count: 1,
	next: "example.com",
	previous: null,
	results: [
		{ name: "test", url: "https://example.com/test" },
		{ name: "example2", url: "https://example.com/example2" },
	],
};

test("fetches data from api and caches it", async () => {
	global.fetch = vi.fn(() =>
		Promise.resolve({
			ok: true,
			status: 200,
			json: () => Promise.resolve(mockResponse),
		} as any),
	);

	const api = new PokeAPI();

	const first = await api.fetchLocations();
	const second = await api.fetchLocations();

	// console.log(`first fetch result: ${first}`);
	// console.log(`second fetch result: ${second}`);
	expect(first).toEqual(second);

	expect(global.fetch).toHaveBeenCalledTimes(1);
});
