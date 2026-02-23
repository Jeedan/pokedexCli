import { showInitialHelp, State } from "../../state/state.js";
import { sleep } from "../../utils/utils.js";
import { BasePokemon } from "../../state/basePokemon.js";

const HORIZONTAL_BORDER_LENGTH: number = 40;
const POKEMON_NAME_PADDING: number = 5;
const TOTAL_HP_BLOCKS: number = 6;
const BATTLE_OPTIONS_PADDING: number = 4;
const EMPTY_HP_BLOCK: string = "░";
const FULL_HP_BLOCK: string = "▓";

export function exitBattle(state: State) {
	state.battleState = undefined;
	state.mode = "menu";
	showInitialHelp(state);
}

export function renderBattleScreen(state: State): void {
	console.clear();

	renderPokemonBattleInfo(state);
	renderBattleLog(state);
	// displays battle options like "1. Fight/Catch/Run"
	renderBattleOptions();
}

// displays combat log after having calculated damage
function renderBattleLog(state: State): void {
	const battleLog = state.battleState?.battleLog;
	if (!battleLog) return;
	battleLog.map((line) => console.log(line));
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

// Displays Pokemon info such as Name, Level, HP
export function renderPokemonBattleInfo(state: State): void {
	const opponentPokemon = state.battleState?.opponentPokemon;
	const playerPokemon = state.battleState?.playerPokemon;

	if (!opponentPokemon) return;
	if (!playerPokemon) return;

	displayBorder(HORIZONTAL_BORDER_LENGTH);
	const oppNameTxt = `Wild ${opponentPokemon.getName()}`;
	const playerNameTxt = `Your ${playerPokemon.getName()}`;

	const longestNameLength = Math.max(oppNameTxt.length, playerNameTxt.length);

	renderNameAndHp(opponentPokemon, oppNameTxt, longestNameLength);
	renderNameAndHp(playerPokemon, playerNameTxt, longestNameLength);
	console.log("\n");
}

export function renderNameAndHp(
	pokemon: BasePokemon,
	displayName: string,
	columnWidth: number,
): void {
	const HPValueText = `${pokemon.getCurrentHP()}/${pokemon.getMaxHP()}`;
	const nameTxt = `${displayName}`;
	const paddedName = nameTxt.padEnd(columnWidth + POKEMON_NAME_PADDING);
	const hpBar = renderHPBar(pokemon);
	//HP: [▓▓▓▓▓░]
	console.log(`${paddedName}${hpBar} ${HPValueText}`);
}

function renderHPBar(pokemon: BasePokemon): string {
	const totalBlocks = TOTAL_HP_BLOCKS;
	const emptyBar = EMPTY_HP_BLOCK;
	const fullBar = FULL_HP_BLOCK;
	const hpRatio = pokemon.getCurrentHP() / pokemon.getMaxHP();
	const filled = Math.round(hpRatio * totalBlocks);
	const empty = totalBlocks - filled;

	const hpBar = fullBar.repeat(filled) + emptyBar.repeat(empty);
	return `HP: [${hpBar}]`;
}

export function renderBattleOptions(): void {
	const options = ["1. Fight", "2. Catch", "3. Run"];
	const padding = " ".repeat(BATTLE_OPTIONS_PADDING);
	displayBorder(HORIZONTAL_BORDER_LENGTH);
	console.log("What would you like to do?");
	console.log(`${options[0] + padding}${options[1] + padding}${options[2]}`);
	displayBorder(HORIZONTAL_BORDER_LENGTH);
}

function displayBorder(length: number = HORIZONTAL_BORDER_LENGTH): void {
	console.log("=".repeat(length));
}
