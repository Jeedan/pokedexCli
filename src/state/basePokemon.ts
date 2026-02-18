import { Pokemon, Stats } from "../services/pokeapi.js";

type PokemonStats = {
	hp: number;
	attack: number;
	defense: number;
	specialAttack: number;
	specialDefense: number;
	speed: number;
};

class BasePokemon {
	private apiData: Pokemon;
	private baseStats: Stats[];

	level: number;
	stats: PokemonStats;
	currentHP: number;
	catchRate: number;
	xp?: number;

	constructor(apiData: Pokemon, level: number) {
		this.apiData = apiData;
		this.level = level;
		this.baseStats = apiData.stats;

		this.stats = this.calculateStats();
		this.currentHP = this.stats.hp;
		this.catchRate = this.calculateCatchRate();
	}

	// used to translate the pokemon stats name from the api to our pokemon stats type.
	private STAT_NAME_MAP: Record<string, keyof PokemonStats> = {
		hp: "hp",
		attack: "attack",
		defense: "defense",
		"special-attack": "specialAttack",
		"special-defense": "specialDefense",
		speed: "speed",
	};

	private calculateStats(): PokemonStats {
		const result: PokemonStats = {
			hp: 0,
			attack: 0,
			defense: 0,
			specialAttack: 0,
			specialDefense: 0,
			speed: 0,
		};

		for (const statItem of this.baseStats) {
			const baseStat = statItem.base_stat;
			const statName = statItem.stat.name;
			const calculatedValue = this._calculateStat(baseStat, this.level);
			const mappedName = this.STAT_NAME_MAP[statName];
			if (!mappedName) {
				console.warn(`Unknown stat name: ${statName}`);
				continue;
			}

			result[mappedName] = calculatedValue;
		}

		return result;
	}

	private _calculateStat(baseStat: number, level: number) {
		return baseStat + level * 2;
	}

	private calculateCatchRate(): number {
		// TODO: change to a formula
		return this.apiData.base_experience;
	}

	getMaxHP() {
		return this.stats.hp;
	}

	getCurrentHP() {
		return this.currentHP;
	}
}
