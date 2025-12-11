import type { Challenge } from "../types.ts";

const sample = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

function solve(input: string, part: 1 | 2) {
	let count = 0;
	let grid = input.split('\n').map(l => l.split(''));
	let grid2: typeof grid;
	while (true) {
		grid2 = structuredClone(grid);
		for (let i = 0; i < grid.length; ++i) {
			for (let j = 0; j < grid[i].length; ++j) {
				if (grid[i][j] !== '@') continue;
				let s = 0;
				if (i > 0 && grid[i - 1][j] === '@') {
					++s;
				}
				if (i > 0 && j > 0 && grid[i - 1][j - 1] === '@') {
					++s;
				}
				if (j > 0 && grid[i][j - 1] === '@') {
					++s;
				}
				if (i < grid.length - 1 && j > 0 && grid[i + 1][j - 1] === '@') {
					++s;
				}
				if (i < grid.length - 1 && grid[i + 1][j] === '@') {
					++s;
				}
				if (i < grid.length - 1 && j < grid[i].length - 1 && grid[i + 1][j + 1] === '@') {
					++s;
				}
				if (j < grid[i].length - 1 && grid[i][j + 1] === '@') {
					++s;
				}
				if (i > 0 && j < grid[i].length - 1 && grid[i - 1][j + 1] === '@') {
					++s;
				}
				if (s < 4) {
					++count;
					grid2[i][j] = '.';
				}
			}
		}
		if (part === 1) {
			return count.toString();
		}
		if (grid.map(l => l.join('')).join('\n') === grid2.map(l => l.join('')).join('\n')) {
			break;
		}
		[grid, grid2] = [grid2, grid];
	}
	return count.toString();
}

const challenge: Challenge = {
	year: 2025,
	day: 4,
	answer: ['1397', '8758'],
	samples: [{ sample, answers: ['13', '43'] }],
	solve,
};

export default challenge;
