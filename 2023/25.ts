import type { Challenge } from '../types.ts';
import { mincut } from '@graph-algorithm/minimum-cut';

const sample = `jqt: rhn xhk nvd
rsh: frs pzl lsr
xhk: hfx
cmg: qnr nvd lhk bvb
rhn: xhk bvb hfx
bvb: xhk hfx
pzl: lsr hfx nvd
qnr: nvd
ntq: jqt hfx bvb xhk
nvd: lhk
lsr: lhk
rzs: qnr cmg lsr rsh
frs: qnr lhk lsr`;

function solve(input: string, part: 1 | 2) {
	if (part === 2) return 'N/A';
	const graph: { [from: string]: string[] } = {};
	const vertices = new Set<string>();
	const edges: [string, string][] = [];
	const data = input.split('\n').map(l => {
		const [a, b] = l.split(': ');
		vertices.add(a);
		const c = b.split(' ');
		for (const d of c) {
			edges.push([a, d]);
			vertices.add(d);
			if (!graph[a]) graph[a] = [];
			graph[a].push(d);
			if (!graph[d]) graph[d] = [];
			graph[d].push(a);
		}
		return [a, c];
	});
	const calculateResult = (i: number, j: number, k: number): number | null => {
		const found = new Set<string>();
		const queue = [Object.keys(graph)[0]];
		while (queue.length) {
			const next = queue.shift()!;
			if (found.has(next)) continue;
			found.add(next);
			for (const n of graph[next]) {
				if (edges[i][0] === next && edges[i][1] === n || edges[i][1] === next && edges[i][0] === n) continue;
				if (edges[j][0] === next && edges[j][1] === n || edges[j][1] === next && edges[j][0] === n) continue;
				if (edges[k][0] === next && edges[k][1] === n || edges[k][1] === next && edges[k][0] === n) continue;
				queue.push(n);
			}
		}
		if (found.size === vertices.size) return null;
		return found.size * (vertices.size - found.size);
	};
	const cut: Generator<[string, string]> = mincut(edges);
	let indices = [];
	for (const [a, b] of cut) {
		for (let n = 0; n < edges.length; ++n) {
			if (edges[n][0] === a && edges[n][1] === b || edges[n][1] === a && edges[n][0] === b) {
				indices.push(n);
				break;
			}
		}
	}
	let result = calculateResult(indices[0], indices[1], indices[2]);
	if (result === null) throw Error('No solution found');
	return result.toString();
}

const challenge: Challenge = {
	year: 2023,
	day: 25,
	solve,
	answer: ['601310', 'N/A'],
	samples: [{ sample, answer: '54', part: 1 }],
};
export default challenge;
