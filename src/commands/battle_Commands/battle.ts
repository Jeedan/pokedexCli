import { showInitialHelp, State } from "../../state/state.js";
import { sleep } from "../../utils/utils.js";
import { BasePokemon } from "../../state/basePokemon.js";
import { DEBUG_FLAG } from "../../utils/debug_flag.js";

export function exitBattle(state: State) {
	state.battleState = undefined;
	state.mode = "menu";
	showInitialHelp(state);
}

export function renderBattleScreen(state: State): void {
	console.clear();
	// displays intro text
	displayPokemonInfo(state);

	// displays combat log after having calculated damage
	const battleLog = state.battleState?.battleLog;
	if (!battleLog) return;
	battleLog.map((line) => console.log(line));

	// displays battle options
	displayBattleOptions();
}

export async function decideBattleVictor(
	state: State,
	playerPokemon: BasePokemon,
	opponentPokemon: BasePokemon,
): Promise<void> {
	if (opponentPokemon.getCurrentHP() <= 0) {
		console.log(`\nWild ${opponentPokemon.getName()} has fainted!\n`);
		console.log(`Your pokemon has earned some xp!\n`);

		await sleep(500);
		exitBattle(state);
		return;
	} else if (playerPokemon.getCurrentHP() <= 0) {
		console.log(`\nYour pokemon fainted!\n`);
		await sleep(500);
		console.log(`You escape with your pokemon...\n`);
		await sleep(500);
		exitBattle(state);
		return;
	}
}

export function displayPokemonInfo(state: State): void {
	const opponentPokemon = state.battleState?.opponentPokemon;
	const playerPokemon = state.battleState?.playerPokemon;

	if (!opponentPokemon) return;
	if (!playerPokemon) return;

	const oppNameTxt = `Wild ${opponentPokemon.getName()}`;
	const playerNameTxt = `Your ${playerPokemon.getName()}`;

	const paddingDifference = oppNameTxt.length - playerNameTxt.length;

	if (DEBUG_FLAG) console.log(`padding diff: ${paddingDifference}\n`);
	renderNameAndHp(opponentPokemon, "Wild", paddingDifference);
	renderNameAndHp(playerPokemon, "", paddingDifference);
	console.log("\n");
}

export function renderNameAndHp(
	pokemon: BasePokemon,
	prefix: string = "",
	paddingDifference: number = 0,
): void {
	const HPValueText = `${pokemon.getCurrentHP()}/${pokemon.getMaxHP()}`;
	// attach prefix if there is any
	const nameTxt = `${prefix ? prefix + " " : ""}${pokemon.getName()}`;

	const padding = " ".repeat(
		Math.max(0, pokemon.getName().length + paddingDifference),
	);

	// TODO: Calculate how many bars to show based on the percentage of HP rounded up.
	console.log(`${nameTxt + padding}HP: [▓▓▓▓▓░] ${HPValueText}`);
}

export function displayBattleOptions(): void {
	const options = ["1. Fight", "2. Catch", "3. Run"];
	const padding = " ".repeat(4);
	console.log("=".repeat(40));
	console.log("What would you like to do?");
	console.log(`${options[0] + padding}${options[1] + padding}${options[2]}`);
	console.log("=".repeat(40));
}

export function displayBattleOptions_DEPRECATED(): void {
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

	if (DEBUG_FLAG) console.log(`padding: ${padding}`);

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
