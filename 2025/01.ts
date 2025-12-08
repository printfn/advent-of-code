import type { Challenge } from "../types.ts";

const sample = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

function solve(input: string, part: 1 | 2) {
	let pos = 50;
	let count = 0;
	for (const cmd of input.split('\n')) {
		const dir = cmd[0];
		let dist = parseInt(cmd.substring(1));
		if (part === 1) {
			pos += (dir === 'L' ? -1 : 1) * dist;
			pos = (pos % 100 + 100) % 100;
			if (pos === 0) {
				++count;
			}
		} else {
			while (dist !== 0) {
				pos += dir === 'L' ? -1 : 1;
				pos = (pos % 100 + 100) % 100;
				if (pos === 0) {
					++count;
				}
				--dist;
			}
		}
	}
	return count.toString();
}

const challenge: Challenge = {
	year: 2025,
	day: 1,
	answer: ['1165', '6496'],
	samples: [{ sample, answers: ['3', '6'] }],
	solve,
};

export default challenge;
