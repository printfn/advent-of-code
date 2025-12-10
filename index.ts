import { readFile } from 'fs/promises';
import y2023d23 from './2023/23.ts';
import y2023d24 from './2023/24.ts';
import y2023d25 from './2023/25.ts';
import y2025d01 from './2025/01.ts';
import y2025d02 from './2025/02.ts';
import y2025d03 from './2025/03.ts';
import type { Challenge } from './types.ts';

const y2023 = [y2023d23, y2023d24, y2023d25];
const y2025 = [y2025d01, y2025d02, y2025d03];
const all = [...y2023, ...y2025];

const testNames: string[] = [];
let allTests = false;

if (process.argv.length <= 2) {
	allTests = true;
} else {
	for (const testName of process.argv.slice(2)) {
		if (testName === 'all') {
			allTests = true;
		} else if (/^\d{4}\/\d{2}$/.test(testName)) {
			testNames.push(testName);
		} else {
			console.error(`Invalid test name: ${testName}`);
			console.error("Expected YYYY/DD or 'all'");
			process.exit(1);
		}
	}
}
const tests = allTests ? all : all.filter(ch => testNames.includes(`${ch.year}/${ch.day.toString().padStart(2, '0')}`));

async function runChallenge(challenge: Challenge) {
	type Run = { name?: string; input: string; part: 1 | 2; answer: string };
	const runs = challenge.samples.flatMap<Run>((s, i) => {
		const name = `Sample ${i + 1}`;
		if ('part' in s) {
			return [
				{
					name,
					input: s.sample,
					part: s.part,
					answer: s.answer,
				},
			];
		}
		return [
			{
				name,
				input: s.sample,
				part: 1,
				answer: s.answers[0],
			},
			{
				name,
				input: s.sample,
				part: 2,
				answer: s.answers[1],
			},
		];
	});
	const dayStr = challenge.day.toString().padStart(2, '0');
	const filePath = new URL(`./inputs/${challenge.year}/${dayStr}.txt`, import.meta.url);
	const input = (await readFile(filePath, { encoding: 'utf8' })).trim();
	runs.push({
		part: 1,
		input,
		answer: challenge.answer[0],
	});
	runs.push({
		part: 2,
		input,
		answer: challenge.answer[1],
	});
	runs.sort((a, b) => a.part - b.part);
	for (const run of runs) {
		process.stdout.write(`${challenge.year}/${dayStr} Part ${run.part}`);
		if (run.name) {
			process.stdout.write(` ${run.name}`);
		} else {
			process.stdout.write('         ');
		}
		const startTime = performance.now();
		const answerPadding = 15;
		const actual = challenge.solve(run.input, run.part).padStart(answerPadding);
		const expected = run.answer.padStart(answerPadding);
		const endTime = performance.now();
		const duration = `\x1b[2m${(endTime - startTime)
			.toFixed(3)
			.padStart(10)} ms\x1b[0m`;
		if (actual === expected) {
			console.log(`  ✅ Correct  ${actual} ${duration}`);
		} else {
			console.log(
				`  ❌ Incorrect  expected: ${expected} actual: ${actual} ${duration}`,
			);
		}
	}
}

for (const ch of tests) {
	await runChallenge(ch);
}
