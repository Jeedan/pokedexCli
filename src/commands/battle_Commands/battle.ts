import { Pokemon } from "src/services/pokeapi.js";
import { showInitialHelp, State } from "../../state/state.js";
import { sleep } from "../../utils/utils.js";

export function exitBattle(state: State) {
	state.battleState = undefined;
	state.mode = "menu";
	showInitialHelp(state);
}

export function renderBattleScreen(state: State): void {
	console.clear();
	const opponentPokemon = state.battleState!.opponentPokemon;
	if (!opponentPokemon) return;

	const playerPokemon = state.battleState!.playerPokemon;

	displayPokemonInfo(state);

	// display combat log
	const battleLog = state.battleState?.battleLog;
	if (!battleLog) return;
	battleLog.map((line) => console.log(line));
	// for (const line of battleLog) {
	// 	console.log(line);
	// }
	displayBattleOptions();
}

export async function decideBattleVictor(
	state: State,
	opponentPokemon: Pokemon,
): Promise<void> {
	if (state.battleState!.opponentHP <= 0) {
		console.log(`\n${opponentPokemon.name} has fainted!\n`);
		console.log(`Your pokemon has earned some xp!\n`);

		await sleep(500);
		exitBattle(state);
		return;
	} else if (state.battleState!.playerHP <= 0) {
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

	let playerPokemonHP = state.battleState!.playerHP;
	let opponentPokemonHP = state.battleState!.opponentHP;
	const oppNameTxt = `Wild ${opponentPokemon.name}`;
	const playerNameTxt = `Your ${playerPokemon.name}`;
	const paddingDifference = oppNameTxt.length - playerNameTxt.length;

	console.log(`padding diff: ${paddingDifference}\n`);
	renderNameAndHp(oppNameTxt, opponentPokemonHP);
	renderNameAndHp(playerNameTxt, playerPokemonHP, paddingDifference);
	console.log("\n");
}

export function renderNameAndHp(
	name: string,
	hp: number,
	paddingDifference: number = 0,
): void {
	const HPValueText = `${hp}/${hp}`;
	const nameTxt = `${name}`;

	const padding = " ".repeat(Math.max(0, name.length + paddingDifference));

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
