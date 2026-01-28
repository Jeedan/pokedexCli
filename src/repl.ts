import { createInterface } from "node:readline";

export function cleanInput(input: string): string[] {
	// split string based on whitespace
	// lowercase input
	// trim leading or trailing whitespace
	// the regex gets rid of all white space (tabs and newline also)
	// unlike splitting on " "
	const cleanedWords = input
		.trim()
		.toLowerCase()
		.split(/\s+/)
		.filter((word) => word !== "");
	return cleanedWords;
}

export function startREPL(): void {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: "Pokedex > ",
	});

	rl.prompt();
	rl.on("line", (line) => {
		const cleanedInput = cleanInput(line);
		if (!cleanedInput) {
			rl.prompt();
		}
		console.log(`Your command was: ${cleanedInput[0]}`);
		rl.prompt();
	});
}
