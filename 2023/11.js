let data = `...........................#.............#..........#.........#..................#.......#.............................................#....
..............#...........................................................................................#...............#.................
.....................#......................................................................................................................
...................................#................................#................................................#....................#.
.................#.......................................................#..........#..................#.............................#......
...............................................................................................#.................#..........................
......................................................#........................#........................................#...................
........#.....................................................#...........................#.................#...............................
.........................................#.....#...............................................................................#............
...........................#.........................................................#...................................................#..
.....#................................................................#............................................................#........
.............#..........................................#.......................................#.................#.........#...............
............................................#...............................................................................................
.#...............#.....................#....................................#.............................#................................#
............................#....................#..........................................................................................
...................................................................................................#..........#.............................
.......#............#.........................................#........#.........................................................#..........
..............#.................................................................#..........#............................#...................
................................#........................................................................................................#..
...............................................#.....................................................#...........#..........................
#...............................................................#...........................................................................
............#......#...................................#....................................................#.............#.........#.......
.......................................................................................#....................................................
....................................#........................#......#...........................#...........................................
.........#.....#.............#............#.....................................#.....................................#.....................
..........................................................................................................#.....#...............#..........#
........................................................#...................................................................................
..........................#.................................................................................................................
....#..................................................................#..................................................#.................
.....................#..........................................#...........................#.........#.....................................
...........#.........................#.......................................#......#.................................................#.....
#...............................................................................................#..................#............#...........
............................#.............#.........#.......................................................................................
........#...........................................................#.......................................................................
.........................................................................#..........................#.......................................
..#..........#............................................#.....#.....................#...............................#.....................
.....................................#...............................................................................................#......
....................#......................#....................................................................................#...........
.....#......................................................................................................................................
................................#....................#............................#.........................................................
........................#......................................................................#.............................#..............
.......................................................................#....................................................................
..............#.................................#......................................................#.......#..................#.......#.
............................................................#............................#..................................................
..........................................................................................................................#.................
..#.................#.........#............................................#.......#........................................................
.......#.............................................#........................................#.......................#.....................
...............................................................#.................................................................#..........
...........................#...............#.......................................................#.....................................#..
.................................#..............#...............................................................#...........................
...............#........................................................................#...................................................
.........................................................#......................................#..........#................................
..#......................................#................................#.................................................................
...............................#............................................................#..............................................#
..........#........#............................................#...............................................................#...........
................................................................................#..................#...........#..........#.................
..................................#........#................................................................................................
............................................................................................................................................
.....................#............................................#............................#.......#.....................#..............
............................#........................#.....................#..........#..........................#.....................#....
.........................................................................................................................#..................
.#.........#...........................#.......................#...................................#........................................
................#........#.....................................................................................................#..........#.
...........................................................................................#.................#..............................
...............................#......................................#............................................#........................
.........................................#.......#......................................................#...................................
..........#..................................................#.................#............................................................
#.......................#..............................................................#...........................................#.......#
.................................#......................#........................................................#........#.................
............................................................................................................................................
...............................................#...............................................#............................................
................#.....................#.......................................#.............................................................
......................................................#...............#.....................................................................
...................................................................................#.............................................#..........
..................................................................#........#....................................#...........................
.#.......................................................#.................................#............#...................................
............................................................................................................................................
........#.......................#................................................#.........................................#................
..................#......#......................................................................#...........................................
......................................#...............#..........#.....................................................................#....
...#....................................................................................#...................................................
...............#..............................#.............................#...............................................................
...................................#..............................................................#.....#........................#.........#
.......#............#...................................................................................................#...................
...........................#.................................................................#................#.............................
.....................................................#...............................................#......................................
...........#..............................................#.................................................................................
..............................................#.................#...............#.........#.................................................
................#.......#...........#.................................#...................................#.................................
.....................................................................................#...........#...................#......................
........................................................#......................................................................#.......#....
.....#......................#...............................................................................................................
.............#........#..........................#..........................................................#.............#................#
............................................................................................................................................
........#............................#............................................#..........#..............................................
............................................#...................................................................#...........................
............................................................................................................................................
..#..............#......#.........................................#...............................#.........................................
....................................................#......................#.......................................................#......#.
...................................#........................#................................................................#..............
.....................................................................#...........#..........................................................
...............#.............................#...........................................................#..................................
..........#..............................................................................#.....#.................#..........................
.....................................................................................................................................#......
.#................................#.........................................................................#...............................
........................#.........................................#......#.........#................#.......................................
.................#........................................#..................................................................#..............
........................................#...................................................................................................
....#.....#........................................#............................................#...........................................
............................................................................................................................................
..............................................................................#.....................................#................#......
.....................#................................................................#.........................................#...........
.............................#.........#........#.........#.............#...........................#.......................................
................................................................#.........................#..................#............#.............#...
........#.......................................................................#...........................................................
........................#..................#............................................................#...................................
.....................................#.................................................#.........#................#.........................
...................................................#.....................#....................................................#............#
............................................................................................................................................
................#..............................................#.................#............................#.............................
....#........................#..........................#............#......................................................................
....................................#........................................................#..............................................
.......................#..........................................................................#.....#...........#............#..........
........#..................................#................#.............#...........................................................#.....
................................................#.......................................................................#..................#
..................#.................................................................#.......................................................
............#........................#...........................................................................#.............#............
...#........................................................................................................................................
..........................................#.................................#................#..............................................
.......................#............................#.............#...................................................#.............#.......
.................................#....................................................#........................#............................
.................................................................................#........................................................#.
..........................................................#.............................................#...................................
...#............#...........................................................................................................................
..............................................#...................................................#.........................................
.........................................................................#.....#.......#.........................................#..........
............#.........#......................................................................#........#.....................................
...........................#........................................#........................................#.......................#......
.....#.................................#..............#........#.....................................................#......................
...............................#............................................#........#....................................#.................`;

let sample = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

function emptyrow(data, y) {
    return data[y].every(c => c === '.');
}

function emptycol(data, x) {
    for (let y = 0; y < data.length; ++y) {
        if (data[y][x] === '#') return false;
    }
    return true;
}

function solve(data, part) {
    const multiple = part === 1 ? 2 : 1000000;
    data = data.split('\n').map(l => l.split(''));
    let sum = 0;
    for (let y = 0; y < data.length; ++y) {
        for (let x = 0; x < data[y].length; ++x) {
            if (data[y][x] === '.') continue;
            for (let y2 = 0; y2 < data.length; ++y2) {
                for (let x2 = 0; x2 < data[y2].length; ++x2) {
                    if (data[y2][x2] === '.') continue;
                    if (x === x2 && y === y2) continue;
                    let dist = 0;
                    for (let i = x; i < x2; ++i) {
                        if (emptycol(data, i)) dist += multiple;
                        else ++dist;
                    }
                    for (let i = y; i < y2; ++i) {
                        if (emptyrow(data, i)) dist += multiple;
                        else ++dist;
                    }
                    sum += dist;
                }
            }
        }
    }
    return sum;
}

// console.log(solve(sample, 1));
console.log(solve(data, 1));
// console.log(solve(sample, 2));
console.log(solve(data, 2));