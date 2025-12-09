import type { Challenge } from "../types.ts";

const sample = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`;

function solve(input: string, part: 1 | 2) {
	const ranges = input.replaceAll('\n', '').split(',');
	let sum = 0;
	for (const range of ranges) {
		const [start, end] = range.split('-').map(s => parseInt(s));
		let id = start;
		while (id <= end) {
			const idStr = id.toString();
			const repeatCounts = [];
			for (let i = 2; i <= idStr.length; ++i) {
				if (idStr.length % i === 0) {
					if (part === 1 && i === 2 || part === 2) {
						repeatCounts.push(i);
					}
				}
			}
			const values = repeatCounts.flatMap(rc => [
				parseInt(idStr.substring(0, idStr.length / rc).repeat(rc)),
				...(!/^9+$/.test(idStr.substring(0, idStr.length / rc)) ?
					[parseInt((parseInt(idStr.substring(0, idStr.length / rc)) + 1).toString().repeat(rc))] :
					[])]).filter(v => v >= id).toSorted((a, b) => a - b);
			if (values.length === 0) {
				id = 10 ** Math.ceil(Math.log10(id + 1));
				continue;
			}
			if (values.includes(id)) {
				sum += id;
				++id;
			} else {
				id = values[0];
				continue;
			}
		}
	}
	return sum.toString();
}

const challenge: Challenge = {
	year: 2025,
	day: 2,
	answer: ['43952536386', '54486209192'],
	samples: [{ sample, answers: ['1227775554', '4174379265'] }],
	solve,
};

export default challenge;
