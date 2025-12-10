import type { Challenge } from "../types.ts";

const sample = `987654321111111
811111111111119
234234234234278
818181911112111`;

function largest(input: number[], omit: number): [number[], number, number[]] {
	let targetIdx = -1;
	let max = -1;
	for (let i = 0; i < input.length - omit; ++i) {
		if (input[i] > max) {
			max = input[i];
			targetIdx = i;
		}
	}
	if (targetIdx === -1) {
		throw new Error('could not find max digit');
	}
	return [input.slice(0, targetIdx), max, input.slice(targetIdx + 1)];
}

function solve(input: string, part: 1 | 2) {
	const count = part === 1 ? 2 : 12;
	return input.split('\n').map(l => {
		let bank = l.split('').map(i => parseInt(i));
		let result = 0;
		for (let r = 0; r < count; ++r) {
			const [, d1, rest] = largest(bank, count - 1 - r);
			result = result * 10 + d1;
			bank = rest;
		}
		return result;
	}).reduce((a, b) => a + b, 0).toString();
}

const challenge: Challenge = {
	year: 2025,
	day: 3,
	answer: ['16842', '167523425665348'],
	samples: [{ sample, answers: ['357', '3121910778619'] }],
	solve,
};

export default challenge;
