import { type CLICommand, type State } from "../state/state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_mapBack.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";
import { commandBattle } from "./battle_Commands/command_battle.js";
import { commandRunAway } from "./battle_Commands/command_runAway.js";
import { commandFight } from "./battle_Commands/command_fight.js";

export function getCommands(): Record<string, CLICommand> {
	return {
		exit: {
			name: "exit",
			description: "Exits the pokedex",
			callback: commandExit,
		},
		help: {
			name: "help",
			description: "Displays the help message",
			callback: commandHelp,
		},
		map: {
			name: "map",
			description: "Displays 20 locations from the PokeAPI.",
			callback: commandMap,
		},
		mapb: {
			name: "mapb",
			description: "Displays the previous 20 locations from the PokeAPI.",
			callback: commandMapBack,
		},
		explore: {
			name: "explore",
			description:
				"Lists the Pokemon in the given location. Example: explore pastoria-city-area",
			callback: commandExplore,
		},
		catch: {
			name: "catch",
			description:
				"Attempt to catch the given Pokemon. Example: catch pikachu",
			callback: commandCatch,
		},
		inspect: {
			name: "inspect",
			description: "Display the stats of a Pokemon.",
			callback: commandInspect,
		},
		pokedex: {
			name: "pokedex",
			description: "Display all caught Pokemon.",
			callback: commandPokedex,
		},
		battle: {
			name: "battle",
			description: "Battle wild pokemon!",
			callback: commandBattle,
		},
		// more commands here
	};
}

export function getBattleCommands(): Record<string, CLICommand> {
	return {
		fight: {
			name: "fight",
			description: "Attacks the opponent opponent!",
			callback: commandFight, // change this probably
		},
		run: {
			name: "run away",
			description: "Run away from battle",
			callback: commandRunAway,
		},
	};
}

// loop over our commands to display them
export async function runCommands(
	state: State,
	cleanedInput: string[],
): Promise<void> {
	const [firstWord, ...args] = cleanedInput;

	if (!firstWord) return;

	if (state.mode === "battle") {
		const command = state.commands.battleCommands[firstWord];
		await runCallBack(command, state, args);
		return;
	} else if (state.mode === "exploration") {
		// Todo
		console.log("we exploring...");
		return;
	}

	const command = state.commands.menuCommands[firstWord];
	await runCallBack(command, state, args);
}

async function runCallBack(
	command: CLICommand,
	state: State,
	args: string[],
): Promise<void> {
	if (!command) {
		console.log("Unknown command");
		return;
	}

	try {
		//this way we see the shape of the array
		// alternatively use ${args.join(" ")}
		//console.log(`run string args:`, args);
		await command.callback(state, ...args);
	} catch (err) {
		if (err instanceof Error) {
			console.error("Error:", err);
		}
	}
}
