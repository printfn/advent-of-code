function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function assert(res) {
    if (!res) {
        throw new Error('assertion failed');
    }
}

function draw2d(img) {
    for (let i = 0; i < img.length; ++i) {
        let row = '';
        for (let j = 0; j < img[i].length; ++j) {
            row += img[i][j];
        }
        console.log(row);
    }
}

const problem = {
  start: {A: 5, B: 2},
  A: {C: 4, D: 2},
  B: {A: 8, D: 7},
  C: {D: 6, finish: 3},
  D: {finish: 1},
  finish: {}
};

const lowestCostNode = (costs, processed) => {
  return Object.keys(costs).reduce((lowest, node) => {
    if (lowest === null || costs[node] < costs[lowest]) {
      if (!processed.includes(node)) {
        lowest = node;
      }
    }
    return lowest;
  }, null);
};

// function that returns the minimum cost and path to reach Finish
const dijkstra = (graph) => {

  // track lowest cost to reach each node
  const costs = Object.assign({finish: Infinity}, graph.start);

  // track paths
  const parents = {finish: null};
  for (let child in graph.start) {
    parents[child] = 'start';
  }

  // track nodes that have already been processed
  const processed = [];

  let node = lowestCostNode(costs, processed);

  while (node) {
    let cost = costs[node];
    let children = graph[node];
    for (let n in children) {
      let newCost = cost + children[n];
      if (!costs[n]) {
        costs[n] = newCost;
        parents[n] = node;
      }
      if (costs[n] > newCost) {
        costs[n] = newCost;
        parents[n] = node;
      }
    }
    processed.push(node);
    node = lowestCostNode(costs, processed);
  }

  let optimalPath = ['finish'];
  let parent = parents.finish;
  while (parent) {
    optimalPath.push(parent);
    parent = parents[parent];
  }
  optimalPath.reverse();

  const results = {
    distance: costs.finish,
    path: optimalPath
  };

  return results;
};

let data = ['abccccccccccccccccaaccccccccccccccccccccaaaaaaaaaaaaacccccccccccccccccccccccccccccccccccccccccccccccccccccccaaaaaa'.split(''),
'abcccccccccccccaaaaaccccccccccccccccccccaaaaaaaaaaaaaccccccccccccccccccccccccccccccccccccccccccccccccccccccccaaaaa'.split(''),
'abccccccccccccccaaaaaccccccccccccccaaaaacccaaaaaacccccaaccccccccccccccccccccccccccccccccccccccccccccccccccccccaaaa'.split(''),
'abccccccccccccccaaaaacccccccccaacccaaaaacccaaaaaaaccccaaaacaacaaccccccccccccccccccccccccaaaccccaaaccccccccccccaaaa'.split(''),
'abcccccccccccccaaaaacccccccaaaaaccaaaaaacccaaaaaaaacaaaaaacaaaaaccccccccccccccccccccccccaaacccaaaaccccccccccccaaac'.split(''),
'abccccccaacaaaccccaaccccccccaaaaacaaaaaaccaaaacaaaacaaaaaccaaaaaaccccccccccccccccccccccccaaaaaaaacccccccccccccaacc'.split(''),
'abccccccaaaaaaccccccccccccccaaaaacaaaaaaccaaaaccaaaacaaaaacaaaaaacccccccccccccccccccccccaaaaaaaaaccccccccccccccccc'.split(''),
'abccccccaaaaaacccccccccccccaaaaaccccaaccccaacccccaaccaacaacaaaaaccccccccccccccccccccccccccaaakkkkllllcccaaaccccccc'.split(''),
'abccccccaaaaaaacccccccccccccccaaccccaacccccccccccccccccccccccaaaccccccaaaacccccccccjjjjkkkkkkkkkkllllccccaacaccccc'.split(''),
'abcccccaaaaaaaacccccaaccccccccccccccaaaaaaccccccccccccccccccaaccccccccaaaaccccccccjjjjjkkkkkkkkkppllllcccaaaaacccc'.split(''),
'abcccccaaaaaaaaccaaaacccccccccccccccaaaaaccccccccccccccccaacaaccccccccaaaacccccccjjjjjjjkkkkkppppppplllccaaaaacccc'.split(''),
'abccccccccaaaccccaaaaaacccccccccccaaaaaaaccccccccccccccccaaaaacccccccccaacccccccjjjjoooooooppppppppplllcccaaaccccc'.split(''),
'abccccccccaaccccccaaaaaccccaacccccaaaaaaaaccccaaacccccccccaaaaaaacccccccccccccccjjjooooooooppppuuppppllcccaaaccccc'.split(''),
'abccccccaacccccccaaaaacccccaaaccaaaaaaaaaaccaaaaaaccccccaaaaaaaaaacaaaccccccccccjjjoooouuuoopuuuuupppllcccaaaccccc'.split(''),
'abacccccaaccccccccccaacccccaaaaaaaccaaaaaaccaaaaaaccccccaaaaaccaaaaaaaccccaaccccjjoootuuuuuuuuuuuuvpqlllcccccccccc'.split(''),
'abaccaaaaaaaacccccccccccccccaaaaaaccaacccccccaaaaacccccccacaaaccaaaaaaccaaaacaccjjooottuuuuuuuxyuvvqqljjccddcccccc'.split(''),
'abcccaaaaaaaaccccccccccccaaaaaaaaacaacaaccccaaaaaccccccccccaaaaaaaaaacccaaaaaacciijootttxxxuuxyyyvvqqjjjjdddcccccc'.split(''),
'abcccccaaaaccccaaacccccccaaaaaaaaacaaaaaccccaaaaaccccccccccccaaaaaaaaacccaaaaccciiinntttxxxxxxyyvvqqqqjjjddddccccc'.split(''),
'abccccaaaaaccccaaaaacccccaaaaaaaaaaaaaaaaccccccccccccccccccccaaaaaaaaaaccaaaaccciiinntttxxxxxxyyvvvqqqqjjjdddccccc'.split(''),
'abccccaaaaaaccaaaaaccccccccaaaaaaaaaaaaaacccccccccccccccccccccccaaacaaacaacaaccciiinnnttxxxxxyyyvvvvqqqqjjjdddcccc'.split(''),
'SbccccaaccaaccaaaaacccccccccaaaaaaaaaaaaacccccccccccccccccccccccaaacccccccccccciiinnntttxxxEzzyyyyvvvqqqjjjdddcccc'.split(''),
'abcccccccccccccaaaaacccccccaaaaaaaaacaaaccccccccccccccccccccccccaaccccccccccccciiinnnttxxxxyyyyyyyyvvvqqqjjjdddccc'.split(''),
'abcccccccccccccaaccccccccccaaaaaaaaccccccccccccccccccccccccccccccccccccccccccciiinnntttxxyyyyyyyyyvvvvqqqjjjdddccc'.split(''),
'abccccccccccccccccccccccccaaaaaaaacccccccccccccccccccccccccccccccccccccccccccciiinntttxxxwwwyyywwvvvvrqqjjjjdddccc'.split(''),
'abcccccccccccccccccccccccccccaaaaaaccccccccccccccccccccccccccccccccccccccccccciinnntttxwwwwwyyywwvvvrrrqkkkeddcccc'.split(''),
'abcccccccccccccccccccccccccccaaaaaaccccccccccccccccccccccccccccccccccccccccccchhnnntttsswwswwyywwrrrrrrkkkkeeecccc'.split(''),
'abcccccccccccccccccccccccccccaaaaaacccccccccccccccccccaccccccccccccaaacccccccchhhnmmssssssswwwwwwrrrkkkkkeeeeecccc'.split(''),
'abcccccccccccccccccccccccccccccaaacccccccccccccccccccaaccccccccccaaaaaacccccaahhhmmmmmsssssswwwwrrrkkkkkeeeeeccccc'.split(''),
'abaacccccccccccccaccccccccccccccccccccccccccccccccaaaaacaacccccccaaaaaacaaaaaahhhhmmmmmmmmssswwwrrkkkkeeeeeacccccc'.split(''),
'abacccccccccccccaaaaaaaaccccccccaaacccccccaaccccccaaaaaaaacccccccaaaaaacaaaaaaahhhhmmmmmmmmsssrrrrkkkeeeeeaacccccc'.split(''),
'abaaaccccaaccccccaaaaaacccccccccaaacccaacaaaccccccccaaaacccccccccaaaaacccaaaaaaahhhhhhhmmmmlsssrrllkfeeeeaaaaacccc'.split(''),
'abaaaccaaaaccccccaaaaaacccccccccaaaaaaaaaaaaaacccccaaaaacccccccccaaaaacccaaaaaaachhhhhgggmllsssrrllkffeaaaaaaacccc'.split(''),
'abaacccaaaaaacccaaaaaaaacccccaaaaaaaaaaaaaaaaacccccaacaaacccccccccccccccaaaaaacccccchggggglllllllllfffaaaaaaaacccc'.split(''),
'abaaccccaaaacccaaaaaaaaaaccccaaaaaaaaacaaaaaaaccaccaccaaacccccccccccccccaaaaaacccccccccgggglllllllffffaaaaaacccccc'.split(''),
'abcccccaaaaacccaaaaaaaaaacccccaaaaaaaccaaaaacccaaaccccccccccccccccccccccccccaacccccccccagggglllllffffccccaaacccccc'.split(''),
'abcccccaacaaccccccaaaaacaccaacccaaaaaaaaaaaaaccaaacccccccccccccccccccccccccccccccccccccaagggggffffffcccccccccccccc'.split(''),
'abcccccccccccaaaaaaaaacccccaaccaaaaaaaccaaaaacaaaaccccccccccccccccccccccccccccccccccccaaaacgggfffffccccccccccccccc'.split(''),
'abcccccccccccaaaaacaacccaaaaaaaaaaccaacccaaaaaaaacccaaccccccccccccccccccccccccccccccccccccccggfffccccccccccccaaaca'.split(''),
'abccccccccccaaaaaaccccccaaaaaaaaacccccccccaaaaaaaaaaaacccccccccccccaaaccccccccccccccccccccccaaaccccccccccccccaaaaa'.split(''),
'abccccccccccaaaaaaccccccccaaaacccccccccccccaaaaaaaaaaaaccccccccccccaaaaccccccccccccccccccccccaaaccccccccccccccaaaa'.split(''),
'abcccccccccccaaaaacccccccaaaaaaccccccccccaaaaaaaaaaaaaaccccccccccccaaaaccccccccccccccccccccccccccccccccccccccaaaaa'.split('')];

// data=['Sabqponm'.split(''),
// 'abcryxxl'.split(''),
// 'accszExk'.split(''),
// 'acctuvwj'.split(''),
// 'abdefghi'.split('')];

function solve(part, data) {
    let start = null;
    let end = null;
    for (let x = 0; x < data.length; ++x) {
        for (let y = 0; y < data[0].length; ++y) {
            if (data[x][y] == 'S') {
                start = [x, y];
            }
            if (data[x][y] == 'E') {
                end = [x, y];
            }
        }
    }
    if (part == 1) {
        data[start[0]][start[1]] = 'z';
        data[end[0]][end[1]] = 'z';
    } else if (part == 2) {
        data[start[0]][start[1]] = 'a';
        data[end[0]][end[1]] = 'z';
    }

    const task = {
      // start: {A: 5, B: 2},
      // A: {C: 4, D: 2},
      // B: {A: 8, D: 7},
      // C: {D: 6, finish: 3},
      // D: {finish: 1},
      // finish: {}
    };
    for (let x = 0; x < data.length; ++x) {
        for (let y = 0; y < data[0].length; ++y) {
            task[`${x},${y}`] = {};
        }
    }

    function canMove(from, to) {
        if (from.charCodeAt(0) - to.charCodeAt(0) >= -1) {
            return true;
        }
        return false;
    }

    assert(canMove('z', 'a'));
    assert(canMove('a', 'b'));
    assert(canMove('b', 'a'));
    assert(!canMove('a', 'c'));

    for (let x = 0; x < data.length; ++x) {
        for (let y = 0; y < data[0].length; ++y) {
            let str = `${x},${y}`;
            if (x > 0 && canMove(data[x-1][y], data[x][y])) {
                task[`${x-1},${y}`][str] = 1;
            }
            if (x < data.length - 1 && canMove(data[x+1][y], data[x][y])) {
                task[`${x+1},${y}`][str] = 1;
            }
            if (y > 0 && canMove(data[x][y-1], data[x][y])) {
                task[`${x},${y-1}`][str] = 1;
            }
            if (y < data[x].length - 1 && canMove(data[x][y+1], data[x][y])) {
                task[`${x},${y+1}`][str] = 1;
            }
        }
    }

    task['start'] = {};
    if (part == 1) {
        task['start'][`${start[0]},${start[1]}`] = 1;
    } else {
        for (let x = 0; x < data.length; ++x) {
            for (let y = 0; y < data[0].length; ++y) {
                if (data[x][y] == 'a') {
                    task['start'][`${x},${y}`] = 1;
                }
            }
        }
    }
    task['finish'] = {};
    task[`${end[0]},${end[1]}`]['finish'] = 1;

    let res = dijkstra(task);
    console.log(res.distance - 2);
}

solve(1, clone(data));
solve(2, clone(data));
