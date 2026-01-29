import { createInterface } from "readline";
import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main() {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: "Pokedex > ",
	});

	const state = initState(rl);
	startREPL(state);
}

main();
