import type { State } from "./state.js";

export function commandHelp(state: State): void {
	console.log("Welcome to the Pokedex!");
	console.log("Usage:\n");
	// iterate over my registry of commands
	// to keep help command up-to-date
	const commands = state.commands;
	for (const command in commands) {
		const cmd = commands[command];
		console.log(`${cmd.name}: ${cmd.description}`);
	}
}
