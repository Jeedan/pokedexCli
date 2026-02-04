import { startREPL } from "./repl/repl.js";
import { initState } from "./state/state.js";

function main() {
	const state = initState();
	startREPL(state);
}

main();
