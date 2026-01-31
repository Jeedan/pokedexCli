export type CacheEntry<T> = {
	createdAt: number;
	val: T;
};

export class Cache {
	// Map keeps track of insertion order
	#cache = new Map<string, CacheEntry<any>>();
	// timer for cleaning up the cache when it grows too big
	#reapIntervalId: NodeJS.Timeout | undefined = undefined;
	#interval: number;

	constructor(interval: number) {
		this.#interval = interval;
		this.#reap();
		this.#startReapLoop();
	}

	add<T>(key: string, val: T): void {
		this.#cache.set(key, { createdAt: Date.now(), val: val });
		console.log(`Added ${key} to the cache.`);
	}

	get<T>(key: string): T | undefined {
		const entry = this.#cache.get(key);
		if (!entry) return undefined;
		// return the val if it exists
		return entry.val as T;
	}

	#reap() {
		//loop through cache
		// delete older than
		// createdAt > Date.now() - this.#interval;
		for (const [key, value] of this.#cache) {
			if (value.createdAt <= Date.now() - this.#interval) {
				this.#cache.delete(key);
			}
		}
	}

	#startReapLoop() {
		// store the automatically generated
		//  interval id created by setInterval
		this.#reapIntervalId = setInterval(() => {
			this.#reap();
		}, this.#interval);
	}

	stopReapLoop() {
		if (!this.#reapIntervalId) return;
		clearInterval(this.#reapIntervalId);
		this.#reapIntervalId = undefined;
	}
}
