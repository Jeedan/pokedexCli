import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";

export type CLICommand = {
	name: string;
	description: string;
	callback: (state: State) => void;
};

export type State = {
	commands: Record<string, CLICommand>;
	readline: Interface;
};

export function initState(): State {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: "Pokedex > ",
	});

	const commands = getCommands();
	return { commands, readline: rl };
}
