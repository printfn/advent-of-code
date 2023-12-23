import { readFile } from 'fs/promises';
import y2023d23 from './2023/23.ts';
import { Challenge } from './types.ts';

const y2023 = [y2023d23];

const tests: string[] = [];
let allTests = false;

if (process.argv.length <= 2) {
	allTests = true;
} else {
	for (const testName of process.argv.slice(2)) {
		if (testName === 'all') {
			allTests = true;
		} else if (/^\d{4}\/\d{2}$/.test(testName)) {
			tests.push(testName);
		} else {
			console.error(`Invalid test name: ${testName}`);
			console.error("Expected YYYY/DD or 'all'");
			process.exit(1);
		}
	}
}

async function runChallenge(challenge: Challenge, year: number, day: number) {
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
	const filePath = new URL(`./inputs/${year}/${day}.txt`, import.meta.url);
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
		process.stdout.write(`${year}/${day} Part ${run.part}`);
		if (run.name) {
			process.stdout.write(` ${run.name}`);
		} else {
			process.stdout.write('         ');
		}
		const startTime = performance.now();
		const answerPadding = 6;
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

for (const ch of y2023) {
	await runChallenge(ch, 2023, 23);
}
