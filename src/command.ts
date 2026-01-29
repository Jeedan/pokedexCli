export type CLICommand = {
	name: string;
	description: string;
	callback: (command: Record<string, CLICommand>) => void;
};
