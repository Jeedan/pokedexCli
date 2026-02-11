import { State } from "src/state/state.js";
import { exitBattle } from "./battle.js";

export async function commandRunAway(state: State): Promise<void> {
	// do a run away chance check here before allowing to run away
	console.log("You ran away!\n");
	exitBattle(state);
}
