export function cleanInput(input: string): string[] {
	// split string based on whitespace
	// lowercase input
	// trim leading or trailing whitespace
	const cleanedWords = input
		.trim()
		.toLowerCase()
		.split(" ")
		.filter((word) => word !== "");
	return cleanedWords;
}
