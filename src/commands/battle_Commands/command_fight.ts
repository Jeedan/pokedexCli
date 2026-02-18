import { sleep } from "../../utils/utils.js";
import { State } from "../../state/state.js";
import { decideBattleVictor, renderBattleScreen } from "./battle.js";

export async function commandFight(state: State): Promise<void> {
	if (!state.battleState) {
		console.log("No active battle. Use 'battle' to start one.");
		state.mode = "menu";
		return;
	}
	const opponentPokemon = state.battleState.opponentPokemon;
	if (!opponentPokemon) return;

	const playerPokemon = state.battleState.playerPokemon;
	if (!playerPokemon) return;

	let playerPokemonHP = playerPokemon.getCurrentHP();
	let opponentPokemonHP = opponentPokemon.getCurrentHP();

	// render screen
	// reset log
	state.battleState.battleLog = [];
	renderBattleScreen(state);
	const opponentRandomDmg = Math.floor(Math.random() * 10) + 1;
	const playerPokemonDmg = Math.floor(Math.random() * 10) + 1;

	//displayPokemonInfo(state);
	if (opponentPokemonHP > 0 && playerPokemonHP > 0) {
		// enemy attacks

		await sleep(500);
		// TODO: refactor into function
		const oppDmgMessage = `${opponentPokemon.getName()} attacks and deals ${opponentRandomDmg} damage`;
		state.battleState.battleLog.push(oppDmgMessage);
		playerPokemon.currentHP = Math.max(
			0,
			playerPokemonHP - opponentRandomDmg,
		);

		renderBattleScreen(state);
		//console.log(oppDmgMessage);
		await sleep(500);
		const pokemonDmgMessage = `Your ${playerPokemon.getName()} attacks and deals ${playerPokemonDmg} damage`;
		state.battleState.battleLog.push(pokemonDmgMessage);
		opponentPokemon.currentHP = Math.max(
			0,
			opponentPokemonHP - playerPokemonDmg,
		);
		renderBattleScreen(state);
		//console.log(pokemonDmgMessage);

		await sleep(500);

		//displayBattleOptions();
		await decideBattleVictor(state, playerPokemon, opponentPokemon);
	}
}
