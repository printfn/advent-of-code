import { Challenge } from "../types.ts";

const sample = `
#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#`.trim();

type Edge = [number, number, number];

function dfs(graph: Edge[][][], seen: boolean[][], x: number, y: number, dist: number, max_dist: number) {
    if (y == seen.length - 1) {
        return Math.max(max_dist, dist);
    }
    for (const entry of graph[y][x]) {
        if (!seen[entry[1]][entry[0]]) {
            seen[entry[1]][entry[0]] = true;
            max_dist = dfs(graph, seen, entry[0], entry[1], dist + entry[2], max_dist);
            seen[entry[1]][entry[0]] = false;
        }
    }
    return max_dist;
}

function solve(input: string, part: 1 | 2) {
    const grid = input.split('\n').map(l => l.split(''));
    const graph: Edge[][][] = [];
    for (let y = 0; y < grid.length; ++y) {
        let row: Edge[][] = [];
        for (let x = 0; x < grid[0].length; ++x) {
            row.push([]);
        }
        graph.push(row);
    }
    for (let y = 0; y < grid.length; ++y) {
        for (let x = 0; x < grid[0].length; ++x) {
            if (grid[y][x] === '#') continue;
            let adj: [number, number][] = [];
            switch (part === 1 ? grid[y][x] : '.') {
                case '.':
                    adj = [[x, y + 1], [x, y - 1], [x + 1, y], [x - 1, y]];
                    break;
                case 'v':
                    adj = [[x, y + 1]];
                    break;
                case '^':
                    adj = [[x, y - 1]];
                    break;
                case '>':
                    adj = [[x + 1, y]];
                    break;
                case '<':
                    adj = [[x - 1, y]];
                    break;
            }
            for (const [nx, ny] of adj) {
                if (nx < 0 || nx >= grid[0].length || ny < 0 || ny >= grid.length) continue;
                if (grid[ny][nx] === '#') continue;
                graph[y][x].push([nx, ny, 1]);
            }
        }
    }

    for (let y = 0; y < grid.length; ++y) {
        for (let x = 0; x < grid[0].length; ++x) {
            if (!graph[y][x] || graph[y][x].length !== 2) continue;
            const [x1, y1, d1] = graph[y][x][0];
            const [x2, y2, d2] = graph[y][x][1];
            let n1 = graph[y1][x1].findIndex(e => e[0] === x && e[1] === y);
            if (n1 !== -1) {
                graph[y1][x1][n1] = [x2, y2, d1 + d2];
            }
            let n2 = graph[y2][x2].findIndex(e => e[0] === x && e[1] === y);
            if (n2 !== -1) {
                graph[y2][x2][n2] = [x1, y1, d1 + d2];
            }
        }
    }
    let seen: boolean[][] = [];
    for (let y = 0; y < grid.length; ++y) {
        let row: boolean[] = [];
        for (let x = 0; x < grid[0].length; ++x) {
            row.push(false);
        }
        seen.push(row);
    }
    let answer = 0;
    answer = dfs(graph, seen, 1, 0, 0, answer);
    return answer.toString();
}

const challenge: Challenge = {
    solve,
    answer: ['2362', '6538'],
    samples: [{ sample, answers: ['94', '154'] }]
}
export default challenge;
