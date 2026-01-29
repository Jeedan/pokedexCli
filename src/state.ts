import { type Interface } from "readline";
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

// this way we can pass test commands into initState
// helps when testing, if nothing is passed we just grab them from the getter
export function initState(
	readline: Interface,
	commands = getCommands(),
): State {
	return { commands, readline };
}
