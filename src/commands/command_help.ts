import type { State } from "../state/state.js";

export async function commandHelp(state: State): Promise<void> {
	console.log("Welcome to the Pokedex!");
	console.log("Usage:\n");
	// iterate over my registry of commands
	// to keep help command up-to-date
	const commands = state.commands.menuCommands;
	for (const command of Object.values(commands)) {
		console.log(`${command.name}: ${command.description}`);
	}
}
