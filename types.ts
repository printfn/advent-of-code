export type Challenge = {
	year: number;
	day: number;
	solve: (input: string, part: 1 | 2) => string;
	answer: [string, string];
	samples: (
		| { sample: string; part: 1 | 2; answer: string }
		| { sample: string; answers: [string, string] }
	)[];
};
