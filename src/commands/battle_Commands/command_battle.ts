import { showInitialHelp, State } from "../../state/state.js";

// fetch a random pokemon from the api or cache

// render the battle UI

// when opponent or player reach 0 hp, return

// keep fighting until either reaches 0 hp.

export async function commandBattle(state: State): Promise<void> {
	state.mode = "battle";
	state.battleState = {
		opponentPokemon: await state.pokeAPI.fetchRandomPokemon(),
		playerPokemon: await state.pokeAPI.fetchPokemon("pikachu"), // hardcoded for now
		opponentHP: 30, // todo refactor into battleStats type?
		playerHP: 30,
	};

	const opponent = state.battleState.opponentPokemon;

	console.log(`A wild ${opponent.name} appeared!`);

	displayBattleOptions();
}

export async function commandFight(state: State): Promise<void> {
	if (!state.battleState) {
		console.log("No active battle. Use 'battle' to start one.");
		state.mode = "menu";
		return;
	}

	const opponentPokemon = state.battleState.opponentPokemon;
	if (!opponentPokemon) return;

	const playerPokemon = state.battleState.playerPokemon;

	let playerPokemonHP = state.battleState.playerHP;
	let opponentPokemonHP = state.battleState.opponentHP;

	const opponentRandomDmg = Math.floor(Math.random() * 10) + 1;
	const playerPokemonDmg = Math.floor(Math.random() * 10) + 1;

	if (opponentPokemonHP > 0 && playerPokemonHP > 0) {
		// enemy attacks
		await sleep(500);
		console.log(
			`${opponentPokemon.name} attacks and deals ${opponentRandomDmg} damage`,
		);
		playerPokemonHP = Math.max(0, playerPokemonHP - opponentRandomDmg);

		await sleep(500);
		console.log(
			`Your pokemon attacks and deals ${playerPokemonDmg} damage`,
		);
		opponentPokemonHP = Math.max(0, opponentPokemonHP - playerPokemonDmg);

		state.battleState.playerHP = playerPokemonHP;
		state.battleState.opponentHP = opponentPokemonHP;

		if (opponentPokemonHP <= 0) {
			console.log(`${opponentPokemon.name} has fainted!\n`);
			console.log(`Your pokemon has earned some xp!\n`);
			exitBattle(state);
			return;
		}

		if (playerPokemonHP <= 0) {
			console.log(`Your pokemon fainted!\n`);
			console.log(`You escape with your pokemon...\n`);
			exitBattle(state);
			return;
		}

		console.log(`\n${playerPokemon.name} HP: ${playerPokemonHP}`);
		console.log(`${opponentPokemon.name} HP: ${opponentPokemonHP}\n`);
		displayBattleOptions();
	}
}

export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function exitBattle(state: State) {
	state.battleState = undefined;
	state.mode = "menu";
	showInitialHelp(state);
}

export function displayBattleOptions(): void {
	console.log("\nWhat would you like to do?");
	console.log("1.Fight");
	console.log("2.Catch");
	console.log("3.Run\n");
}
