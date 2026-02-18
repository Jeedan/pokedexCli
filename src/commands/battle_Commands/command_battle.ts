import { sleep } from "../../utils/utils.js";
import { BasePokemon } from "../../state/basePokemon.js";
import { State } from "../../state/state.js";
import { renderBattleScreen } from "./battle.js";

// fetch a random pokemon from the api or cache

// render the battle UI

// when opponent or player reach 0 hp, return

// keep fighting until either reaches 0 hp.

export async function commandBattle(state: State): Promise<void> {
	console.clear();
	state.mode = "battle";

	const opponentAPIResponse = await state.pokeAPI.fetchRandomPokemon();
	const playerAPIResponse = await state.pokeAPI.fetchPokemon("pikachu");

	state.battleState = {
		opponentPokemon: new BasePokemon(opponentAPIResponse, 1),
		playerPokemon: new BasePokemon(playerAPIResponse, 1),
		battleLog: [],
	};

	const opponentPokemon = state.battleState.opponentPokemon;
	console.log(`\nA wild ${opponentPokemon.getName()} appeared!\n`);

	await sleep(2500);
	renderBattleScreen(state);
	// displayPokemonInfo(state);
	// displayBattleOptions();
}
