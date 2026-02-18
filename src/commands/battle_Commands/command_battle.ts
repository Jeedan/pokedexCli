import { State } from "../../state/state.js";
import { renderBattleScreen } from "./battle.js";

// fetch a random pokemon from the api or cache

// render the battle UI

// when opponent or player reach 0 hp, return

// keep fighting until either reaches 0 hp.

export async function commandBattle(state: State): Promise<void> {
	console.clear();
	state.mode = "battle";
	state.battleState = {
		opponentPokemon: await state.pokeAPI.fetchRandomPokemon(),
		playerPokemon: await state.pokeAPI.fetchPokemon("pikachu"), // hardcoded for now
		opponentHP: 30, // todo refactor into battleStats type?
		playerHP: 30,
		battleLog: [],
	};

	const opponent = state.battleState.opponentPokemon;
	console.log(`\nA wild ${opponent.name} appeared!\n`);

	renderBattleScreen(state);
	// displayPokemonInfo(state);
	// displayBattleOptions();
}
