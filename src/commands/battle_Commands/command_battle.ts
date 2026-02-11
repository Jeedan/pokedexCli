import { showInitialHelp, State } from "../../state/state.js";

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
	const width = 40;
	const gap = 10;
	const horizontalBorder = "=".repeat(width);
	const questionText = "What would you like to do?";
	const fightText = "1.Fight";
	const catchText = "2.Catch";
	const runText = "3.Run";

	const padding = centerLine(questionText, width, gap);
	const questionPadding = questionText.length / 2;
	const centerRun = centerLine(runText, width, gap);
	console.log(`padding: ${padding}`);
	console.log(`+${horizontalBorder}+`);
	console.log(
		`|${" ".repeat(padding)}${questionText}${" ".repeat(padding)}|`,
	);
	console.log(
		`|${" ".repeat(padding)}${fightText}${" ".repeat(questionPadding)}${catchText}${" ".repeat(padding - 1)}|`,
	);
	console.log(
		`|${" ".repeat(centerRun)}${runText}${" ".repeat(horizontalBorder.length / 2 - 2)}|`,
	);
	console.log(`+${horizontalBorder}+`);
}

function centerLine(line: string, width: number, gap: number): number {
	const totalContentWidth = line.length + gap;
	const padding = Math.floor((width - totalContentWidth) / 2);
	return padding + gap / 2;
}
