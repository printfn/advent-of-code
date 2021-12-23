function asserteq(a, b) {
    if (a != b) {
        throw new Error(`assertion failed, '${a}' != '${b}'`);
    }
}

// A* algorithm, adapted from Wikipedia:

// the path does not include the start or end nodes
function reconstruct_path(cameFrom, current, start) {
    let priority = current.priority;
    current = current.key;
    let total_path = [];
    while (typeof(cameFrom[current]) !== 'undefined') {
        current = cameFrom[current];
        if (current == start) {
            break;
        }
        total_path.push(current);
    }
    return {
        path: total_path.reverse(),
        priority: priority,
    };
}

// A* finds a path from start to goal.
// h is the heuristic function. h(n) estimates the cost to reach goal from node n.
function A_Star(graphFn, start, goal, h, savePath) {
    // The set of discovered nodes that may need to be (re-)expanded.
    // Initially, only the start node is known.
    // This is usually implemented as a min-heap or priority queue rather than a hash-set.
    let openSet = new PriorityQueue();
    openSet.push(start, 0);

    // For node n, cameFrom[n] is the node immediately preceding it on the cheapest path from start
    // to n currently known.
    let cameFrom = {};

    // For node n, gScore[n] is the cost of the cheapest path from start to n currently known.
    let gScore = {}; // default value is infinity
    gScore[start] = 0;

    // For node n, fScore[n] := gScore[n] + h(n). fScore[n] represents our current best guess as to
    // how short a path from start to finish can be if it goes through n.
    let fScore = {}; // default value is infinity
    fScore[start] = h(start);

    let visited = {};
    visited[start] = true;

    while (openSet.data.length > 0) {
        // This operation can occur in O(1) time if openSet is a min-heap or a priority queue
        let current = openSet.shift(); // the node in openSet having the lowest fScore[] value
        if (current.key == goal) {
            if (savePath) {
                return reconstruct_path(cameFrom, current, start);
            } else {
                return {
                    priority: current.priority
                };
            }
        }
        // console.log(current.priority);

        let ns = graphFn(current.key);
        for (let neighbour in ns) {
            let dcurrentneighbour = ns[neighbour];
            // d(current,neighbour) is the weight of the edge from current to neighbour
            // tentative_gScore is the distance from start to the neighbour through current
            let tentative_gScore = gScore[current.key] + dcurrentneighbour;
            if (tentative_gScore < (gScore[neighbour] || Infinity)) {
                // This path to neighbour is better than any previous one. Record it!
                cameFrom[neighbour] = current.key;
                gScore[neighbour] = tentative_gScore;
                let prio = tentative_gScore + h(neighbour);
                fScore[neighbour] = prio;
                if (!visited[neighbour]) {
                    openSet.push(neighbour, prio);
                    visited[neighbour] = true;
                }
            }
        }
    }

    // Open set is empty but goal was never reached
    throw new Error('could not find target');
}

// Priority queue implementation from
// https://leetcode.com/problems/find-the-city-with-the-smallest-number-
// of-neighbors-at-a-threshold-distance/discuss/1004540/Javascript-
// Dijkstra-Algorithm-with-Priority-Queue
const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};

function Node(key, priority) {
    this.key = key;
    this.priority = priority;
}

function PriorityQueue() {
    this.data = [];
}

PriorityQueue.prototype.push = function push(key, priority) {
    const node = new Node(key, priority);
    this.data.push(node);
    let index = this.data.length - 1;
    while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        const parent = this.data[parentIndex];
        if (node.priority < parent.priority) {
            swap(this.data, index, parentIndex);
            index = parentIndex;
        } else {
            break;
        }
    }
};

PriorityQueue.prototype.shift = function shift() {
    const minNode = this.data[0] || {};
    const lastNode = this.data.pop();
    if (this.data.length < 1) {
        return minNode;
    }
    this.data[0] = lastNode;
    let index = 0;
    while (index < this.data.length) {
        const leftIndex = 2 * index + 1;
        const rightIndex = 2 * index + 2;
        const leftNode = this.data[leftIndex] || {};
        const rightNode = this.data[rightIndex] || {};
        let smallerIndex;
        if (leftNode.priority < lastNode.priority) {
            smallerIndex = leftIndex;
        }
        if (!smallerIndex && rightNode.priority < lastNode.priority) {
            smallerIndex = rightIndex;
        }
        if (smallerIndex && rightNode.priority < leftNode.priority) {
            smallerIndex = rightIndex;
        }
        if (!smallerIndex) {
            break;
        }
        swap(this.data, smallerIndex, index);
        index = smallerIndex;
    }
    return minNode;
}

/*
#############
#01.2.3.4.56#
###7#9#1#3###
  #8#0#2#4#
  #5#7#9#1#
  #6#8#0#2#
  #########
*/

function neighbouringSpaces(part, space) {
    switch (space) {
        case  0: return [{ next:  1, cost: 1 }];
        case  6: return [{ next:  5, cost: 1 }];

        case  1: return [{ next:  0, cost: 1 }, { next: 2, cost: 2 }, { next: 7, cost: 2 }];
        case  5: return [{ next:  6, cost: 1 }, { next: 4, cost: 2 }, { next: 13, cost: 2 }];

        case  2: return [{ next:  1, cost: 2 }, { next: 7, cost: 2 }, { next: 3, cost: 2 }, { next: 9, cost: 2 }];
        case  4: return [{ next:  5, cost: 2 }, { next: 13, cost: 2 }, { next: 3, cost: 2 }, { next: 11, cost: 2 }];

        case  3: return [{ next:  2, cost: 2 }, { next: 9, cost: 2 }, { next: 4, cost: 2 }, { next: 11, cost: 2 }];

        case  7: return [{ next:  8, cost: 1 }, { next: 1, cost: 2 }, { next: 2, cost: 2 }];
        case  9: return [{ next: 10, cost: 1 }, { next: 2, cost: 2 }, { next: 3, cost: 2 }];
        case 11: return [{ next: 12, cost: 1 }, { next: 3, cost: 2 }, { next: 4, cost: 2 }];
        case 13: return [{ next: 14, cost: 1 }, { next: 4, cost: 2 }, { next: 5, cost: 2 }];

        case  8: return part == 1 ? [{ next: 7, cost: 1 }] : [{ next: 7, cost: 1 }, { next: 15, cost: 1 }];
        case 10: return part == 1 ? [{ next: 9, cost: 1 }] : [{ next: 9, cost: 1 }, { next: 17, cost: 1 }];
        case 12: return part == 1 ? [{ next: 11, cost: 1 }] : [{ next: 11, cost: 1 }, { next: 19, cost: 1 }];
        case 14: return part == 1 ? [{ next: 13, cost: 1 }] : [{ next: 13, cost: 1 }, { next: 21, cost: 1 }];

        case 15: return [{ next:  8, cost: 1 }, { next: 16, cost: 1 }];
        case 17: return [{ next: 10, cost: 1 }, { next: 18, cost: 1 }];
        case 19: return [{ next: 12, cost: 1 }, { next: 20, cost: 1 }];
        case 21: return [{ next: 14, cost: 1 }, { next: 22, cost: 1 }];

        case 16: return [{ next: 15, cost: 1 }];
        case 18: return [{ next: 17, cost: 1 }];
        case 20: return [{ next: 19, cost: 1 }];
        case 22: return [{ next: 21, cost: 1 }];
    }
    throw new Error(`invalid space ${space}`);
}

function lettercost(letter) {
    switch (letter) {
        case 'a': return 1;
        case 'b': return 10;
        case 'c': return 100;
        case 'd': return 1000;
    }
}

function heuristic(state) {
    let res = 0;
    if (state[0] == 'a') res += 3;
    if (state[1] == 'a') res += 2;
    if (state[2] == 'a') res += 2;
    if (state[3] == 'a') res += 4;
    if (state[4] == 'a') res += 6;
    if (state[5] == 'a') res += 8;
    if (state[6] == 'a') res += 9;
    if (state[7] == 'a') res += 0;
    if (state[8] == 'a') res += 0;
    if (state[9] == 'a') res += 4;
    if (state[10] == 'a') res += 5;
    if (state[11] == 'a') res += 6;
    if (state[12] == 'a') res += 7;
    if (state[13] == 'a') res += 8;
    if (state[14] == 'a') res += 9;

    if (state[0] == 'b') res += 50;
    if (state[1] == 'b') res += 40;
    if (state[2] == 'b') res += 20;
    if (state[3] == 'b') res += 20;
    if (state[4] == 'b') res += 40;
    if (state[5] == 'b') res += 60;
    if (state[6] == 'b') res += 70;
    if (state[7] == 'b') res += 40;
    if (state[8] == 'b') res += 50;
    if (state[9] == 'b') res += 0;
    if (state[10] == 'b') res += 0;
    if (state[11] == 'b') res += 40;
    if (state[12] == 'b') res += 50;
    if (state[13] == 'b') res += 60;
    if (state[14] == 'b') res += 70;

    if (state[0] == 'c') res += 700;
    if (state[1] == 'c') res += 600;
    if (state[2] == 'c') res += 400;
    if (state[3] == 'c') res += 200;
    if (state[4] == 'c') res += 200;
    if (state[5] == 'c') res += 400;
    if (state[6] == 'c') res += 500;
    if (state[7] == 'c') res += 600;
    if (state[8] == 'c') res += 700;
    if (state[9] == 'c') res += 400;
    if (state[10] == 'c') res += 500;
    if (state[11] == 'c') res += 0;
    if (state[12] == 'c') res += 0;
    if (state[13] == 'c') res += 400;
    if (state[14] == 'c') res += 500;

    if (state[0] == 'd') res += 9000;
    if (state[1] == 'd') res += 8000;
    if (state[2] == 'd') res += 6000;
    if (state[3] == 'd') res += 4000;
    if (state[4] == 'd') res += 2000;
    if (state[5] == 'd') res += 2000;
    if (state[6] == 'd') res += 3000;
    if (state[7] == 'd') res += 8000;
    if (state[8] == 'd') res += 9000;
    if (state[9] == 'd') res += 6000;
    if (state[10] == 'd') res += 7000;
    if (state[11] == 'd') res += 4000;
    if (state[12] == 'd') res += 5000;
    if (state[13] == 'd') res += 0;
    if (state[14] == 'd') res += 0;

    if (state.length > 15) {
        if (state[15] == 'a') res += 0;
        if (state[16] == 'a') res += 0;
        if (state[17] == 'a') res += 6;
        if (state[18] == 'a') res += 7;
        if (state[19] == 'a') res += 8;
        if (state[20] == 'a') res += 9;
        if (state[21] == 'a') res += 10;
        if (state[22] == 'a') res += 11;

        if (state[15] == 'b') res += 60;
        if (state[16] == 'b') res += 70;
        if (state[17] == 'b') res += 0;
        if (state[18] == 'b') res += 0;
        if (state[19] == 'b') res += 60;
        if (state[20] == 'b') res += 70;
        if (state[21] == 'b') res += 80;
        if (state[22] == 'b') res += 90;

        if (state[15] == 'c') res += 800;
        if (state[16] == 'c') res += 900;
        if (state[17] == 'c') res += 600;
        if (state[18] == 'c') res += 700;
        if (state[19] == 'c') res += 0;
        if (state[20] == 'c') res += 0;
        if (state[21] == 'c') res += 600;
        if (state[22] == 'c') res += 700;

        if (state[15] == 'd') res += 10000;
        if (state[16] == 'd') res += 11000;
        if (state[17] == 'd') res += 8000;
        if (state[18] == 'd') res += 9000;
        if (state[19] == 'd') res += 6000;
        if (state[20] == 'd') res += 7000;
        if (state[21] == 'd') res += 0;
        if (state[22] == 'd') res += 0;
    }
    return res;
}

// 0: not ready, 1: ready, 2: full
function slotState(part, state, letter) {
    if (part == 1) {
        switch (letter) {
            case 'a':
                if (state[7] == 'a' && state[8] == 'a') return 2;
                if (state[7] == '.' && (state[8] == 'a' || state[8] == '.')) return 1;
                return 0;
            case 'b':
                if (state[9] == 'b' && state[10] == 'b') return 2;
                if (state[9] == '.' && (state[10] == 'b' || state[10] == '.')) return 1;
                return 0;
            case 'c':
                if (state[11] == 'c' && state[12] == 'c') return 2;
                if (state[11] == '.' && (state[12] == 'c' || state[12] == '.')) return 1;
                return 0;
            case 'd':
                if (state[13] == 'd' && state[14] == 'd') return 2;
                if (state[13] == '.' && (state[14] == 'd' || state[14] == '.')) return 1;
                return 0;
        }
    } else {
        switch (letter) {
            case 'a':
                if (state[7] == 'a' && state[8] == 'a' && state[15] == 'a' && state[16] == 'a') return 2;
                if (state[7] == '.'
                    && (state[8] == 'a' || state[8] == '.')
                    && (state[15] == 'a' || state[15] == '.')
                    && (state[16] == 'a' || state[16] == '.')) return 1;
                return 0;
            case 'b':
                if (state[9] == 'b' && state[10] == 'b' && state[17] == 'b' && state[18] == 'b') return 2;
                if (state[9] == '.'
                    && (state[10] == 'b' || state[10] == '.')
                    && (state[17] == 'b' || state[17] == '.')
                    && (state[18] == 'b' || state[18] == '.')) return 1;
                return 0;
            case 'c':
                if (state[11] == 'c' && state[12] == 'c' && state[19] == 'c' && state[20] == 'c') return 2;
                if (state[11] == '.'
                    && (state[12] == 'c' || state[12] == '.')
                    && (state[19] == 'c' || state[19] == '.')
                    && (state[20] == 'c' || state[20] == '.')) return 1;
                return 0;
            case 'd':
                if (state[13] == 'd' && state[14] == 'd' && state[21] == 'd' && state[22] == 'd') return 2;
                if (state[13] == '.'
                    && (state[14] == 'd' || state[14] == '.')
                    && (state[21] == 'd' || state[21] == '.')
                    && (state[22] == 'd' || state[22] == '.')) return 1;
                return 0;
        }
    }
}

function firstFreeInSlot(part, state, letter) {
    switch (letter) {
        case 'a':
            if (part == 2 && state[16] == '.') return 16;
            if (part == 2 && state[15] == '.') return 15;
            if (state[8] == '.') return 8;
            return 7;
        case 'b':
            if (part == 2 && state[18] == '.') return 18;
            if (part == 2 && state[17] == '.') return 17;
            if (state[10] == '.') return 10;
            return 9;
        case 'c':
            if (part == 2 && state[20] == '.') return 20;
            if (part == 2 && state[19] == '.') return 19;
            if (state[12] == '.') return 12;
            return 11;
        case 'd':
            if (part == 2 && state[22] == '.') return 22;
            if (part == 2 && state[21] == '.') return 21;
            if (state[14] == '.') return 14;
            return 13;
    }
}

function firstOccupiedInSlot(part, state, letter) {
    switch (letter) {
        case 'a':
            if (state[7] != '.') return 7;
            if (state[8] != '.') return 8;
            if (part == 2 && state[15] != '.') return 15;
            if (part == 2 && state[16] != '.') return 16;
            break;
        case 'b':
            if (state[9] != '.') return 9;
            if (state[10] != '.') return 10;
            if (part == 2 && state[17] != '.') return 17;
            if (part == 2 && state[18] != '.') return 18;
            break;
        case 'c':
            if (state[11] != '.') return 11;
            if (state[12] != '.') return 12;
            if (part == 2 && state[19] != '.') return 19;
            if (part == 2 && state[20] != '.') return 20;
            break;
        case 'd':
            if (state[13] != '.') return 13;
            if (state[14] != '.') return 14;
            if (part == 2 && state[21] != '.') return 21;
            if (part == 2 && state[22] != '.') return 22;
            break;
    }
}

let distCache = {};
function distance(part, i, j) {
    if (i == j) throw new Error();
    if (distCache[[part, i, j]]) return distCache[[part, i, j]];
    let res = A_Star(start => {
        let res = {};
        for (let {next, cost} of neighbouringSpaces(part, parseInt(start))) {
            res[next] = cost;
        }
        return res;
    }, i, j, () => 0, true);
    res = {
        priority: res.priority,
        path: res.path.map(i => parseInt(i)),
    }
    distCache[[part, i, j]] = res;
    return res;
}

for (let i = 0; i < 15; ++i) {
    for (let j = 0; j < 15; ++j) {
        if (i == j) continue;
        distance(1, i, j);
    }
}
asserteq(distance(1, 1, 0).priority, 1);
asserteq(distance(1, 4, 10).priority, 5);

function move(state, i, j) {
    let res = state.split('');
    res[j] = state[i];
    res[i] = '.';
    return res.join('');
}

function neighbours(part, state) {
    let res = [];
    let slotStateA = slotState(part, state, 'a');
    let slotStateB = slotState(part, state, 'b');
    let slotStateC = slotState(part, state, 'c');
    let slotStateD = slotState(part, state, 'd');
    let slotStates = { a: slotStateA, b: slotStateB, c: slotStateC, d: slotStateD };
    for (let from = 0; from <= 6; ++from) {
        let letter = state[from];
        if (letter != '.' && slotStates[letter] == 1) {
            let target = firstFreeInSlot(part, state, letter);
            let dist = distance(part, from, target);
            let allow = true;
            for (let inbetween of dist.path) {
                if (state[inbetween] != '.') {
                    allow = false;
                    break;
                }
            }
            if (allow) {
                res.push({ next: move(state, from, target), cost: lettercost(letter) * dist.priority });
            }
        }
    }
    for (let target = 0; target <= 6; ++target) {
        if (state[target] != '.') continue;
        for (let letter of ['a', 'b', 'c', 'd']) {
            if (slotStates[letter] != 0) continue;
            let from = firstOccupiedInSlot(part, state, letter);
            let dist = distance(part, from, target);
            let allow = true;
            for (let inbetween of dist.path) {
                if (state[inbetween] != '.') {
                    allow = false;
                    break;
                }
            }
            if (allow) {
                res.push({ next: move(state, from, target), cost: lettercost(state[from]) * dist.priority });
            }
        }
    }
    return res;
}

let cache = {};
function graphFn(part) {
    return node => {
        if (cache[node]) return cache[node];
        let res = {};
        for (let {next, cost} of neighbours(part, node)) {
            res[next] = cost;
        }
        cache[node] = res;
        return res;
    }
}

const FINAL_STATE_1 = '.......aabbccdd';
const FINAL_STATE_2 = '.......aabbccddaabbccdd';

let INPUT = '.......dccdaabb';
// INPUT = '.......bacdbcda';

console.log(A_Star(graphFn(1), INPUT, FINAL_STATE_1, heuristic).priority);

const INPUT_2 = `.......${INPUT[7]}d${INPUT[9]}c${INPUT[11]}b${INPUT[13]}a` + 
    `d${INPUT[8]}b${INPUT[10]}a${INPUT[12]}c${INPUT[14]}`;

console.log(A_Star(graphFn(2), INPUT_2, FINAL_STATE_2, heuristic).priority);
