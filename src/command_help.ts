import type { State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
	console.log("Welcome to the Pokedex!");
	console.log("Usage:\n");
	// iterate over my registry of commands
	// to keep help command up-to-date
	const commands = state.commands;
	for (const command of Object.values(state.commands)) {
		console.log(`${command.name}: ${command.description}`);
	}
}
