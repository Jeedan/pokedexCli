import type { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>): void {
	console.log("Welcome to the Pokedex!");
	console.log("Usage:\n");
	// iterate over my registry of commands
	// to keep help command up-to-date
	for (const command in commands) {
		const cmd = commands[command];
		console.log(`${cmd.name}: ${cmd.description}`);
	}
}
