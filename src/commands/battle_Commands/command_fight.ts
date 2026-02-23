import { sleep } from "../../utils/utils.js";
import { State } from "../../state/state.js";
import { decideBattleVictor, renderBattleScreen } from "./battle.js";
import { BasePokemon } from "src/state/basePokemon.js";

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

	// reset log
	state.battleState.battleLog = [];
	renderBattleScreen(state);

	const [first, second] = decideTurnOrder(playerPokemon, opponentPokemon);

	if (opponentPokemonHP > 0 && playerPokemonHP > 0) {
		await handleTurn(state, first, second);
		if (second.getCurrentHP() <= 0) {
			await decideBattleVictor(state, playerPokemon, opponentPokemon);
			return;
		}
		await handleTurn(state, second, first);

		if (first.getCurrentHP() <= 0) {
			await decideBattleVictor(state, playerPokemon, opponentPokemon);
			return;
		}
	}
}

async function battleLoop(): Promise<void> {}

function decideTurnOrder(
	player: BasePokemon,
	opponent: BasePokemon,
): BasePokemon[] {
	const combatants = [player, opponent];

	// faster goes first.
	// swap if we want slower to go first
	combatants.sort((a, b) => b.getSpeed() - a.getSpeed());

	return combatants;
}

async function handleTurn(
	state: State,
	attacker: BasePokemon,
	defender: BasePokemon,
): Promise<void> {
	await sleep(500);
	executeAttack(state, attacker, defender);
	renderBattleScreen(state);
	await sleep(500);
}

function executeAttack(
	state: State,
	attacker: BasePokemon,
	defender: BasePokemon,
): void {
	const damage = attacker.calculateDamage();
	const attackerMessage = `${attacker.getName()} attacks and deals ${damage} damage`;
	state.battleState?.battleLog.push(attackerMessage);
	defender.setCurrentHP(Math.max(0, defender.getCurrentHP() - damage));
}
