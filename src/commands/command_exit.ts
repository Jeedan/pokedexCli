import { State } from "../state/state";

export async function commandExit(state: State): Promise<void> {
	console.log("Closing the Pokedex... Goodbye!");
	state.readline.close();
	process.exit(0);
}
