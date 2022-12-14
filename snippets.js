function mk2d(a, b) {
    let arr = [];
    for (let i = 0; i < a; ++i) {
        let row = [];
        for (let j = 0; j < b; ++j) {
            row.push(0);
        }
        arr.push(row);
    }
    return arr;
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function assert(res) {
    if (!res) {
        throw new Error('assertion failed');
    }
}

function asserteq(a, b) {
    if (a != b) {
        throw new Error(`assertion failed, '${a}' != '${b}'`);
    }
}

// from https://stackoverflow.com/a/14853974
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

// from https://stackoverflow.com/a/20871714
function permutator(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}

// compute the 24 possible orientations/rotations in 3d
function rotations3d(x, y, z) {
    return [
        [x, y, z],    [-z, x, -y],
        [-x, -z, -y], [z, -x, -y],
        [z, -y, x],   [y, z, x],
        [-z, y, x],   [-y, -z, x],
        [-y, x, z],   [-x, -y, z],
        [y, -x, z],   [x, z, -y],
        [-z, -x, y],  [x, -z, y],
        [z, x, y],    [-x, z, y],
        [-x, y, -z],  [-y, -x, -z],
        [x, -y, -z],  [y, x, -z],
        [y, -z, -x],  [z, y, -x],
        [-y, z, -x],  [-z, -y, -x]
    ];
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
