import type { State } from "./state.js";
import { runCommands } from "./commands.js";

export function cleanInput(input: string): string[] {
	// split string based on whitespace
	// lowercase input
	// trim leading or trailing whitespace
	// the regex gets rid of all white space (tabs and newline also)
	// unlike splitting on " "
	const cleanedWords = input
		.trim()
		.toLowerCase()
		.split(/\s+/)
		.filter(Boolean);
	return cleanedWords;
}

export async function startREPL(state: State): Promise<void> {
	const rl = state.readline;
	showInitialHelp(state);
	rl.prompt();
	rl.on("line", async (line) => {
		const cleanedInput = cleanInput(line);
		if (cleanedInput.length === 0) {
			rl.prompt();
			return;
		}
		await runCommands(state, cleanedInput);
		rl.prompt();
	});
}

// display the help command on start
function showInitialHelp(state: State): void {
	const helpCommand = state.commands.help;
	if (!helpCommand) return;
	helpCommand.callback(state);
}
