let grid = [[
".###..#.",
"##.##...",
"....#.#.",
"#..#.###",
"...#...#",
"##.#...#",
"#..##.##",
"#......."].map(line => line.split(''))];

// grid = [[
// ".#.",
// "..#",
// "###"].map(line => line.split(''))];

let expand = () => {
    for (let x = 0; x < grid.length; ++x) {
        for (let y = 0; y < grid[x].length; ++y) {
            grid[x][y].push('.');
            grid[x][y].splice(0, 0, '.');
        }
        grid[x].splice(0, 0, JSON.parse(JSON.stringify(grid[x][0])));
        for (let z = 0; z < grid[x][0].length; ++z) {
            grid[x][0][z] = '.';
        }
        grid[x].push(JSON.parse(JSON.stringify(grid[x][0])));
    }
    grid.splice(0, 0, JSON.parse(JSON.stringify(grid[0])));
    for (let y = 0; y < grid[0].length; ++y) {
        for (let z = 0; z < grid[0][y].length; ++z) {
            grid[0][y][z] = '.';
        }
    }
    grid.push(JSON.parse(JSON.stringify(grid[0])));
}

for (let iter = 0; iter < 6; ++iter) {
    expand();

    let nextGrid = JSON.parse(JSON.stringify(grid));

    for (let x = 0; x < grid.length; ++x) {
        for (let y = 0; y < grid[x].length; ++y) {
            for (let z = 0; z < grid[x][y].length; ++z) {
                let neighbours = 0;
                for (let dx = -1; dx < 2; ++dx) {
                    for (let dy = -1; dy < 2; ++dy) {
                        for (let dz = -1; dz < 2; ++dz) {
                            if (dx == 0 && dy == 0 && dz == 0) {
                                continue;
                            }
                            if (x + dx < 0 || x + dx >= grid.length) continue;
                            if (y + dy < 0 || y + dy >= grid[x].length) continue;
                            if (z + dz < 0 || z + dz >= grid[x][y].length) continue;
                            if (grid[x+dx][y+dy][z+dz] == '#') {
                                ++neighbours;
                            }
                        }
                    }
                }
                if (grid[x][y][z] == '#') {
                    if (neighbours == 2 || neighbours == 3) {
                        nextGrid[x][y][z] = '#';
                    } else {
                        nextGrid[x][y][z] = '.';
                    }
                }
                if (grid[x][y][z] == '.') {
                    if (neighbours == 3) {
                        nextGrid[x][y][z] = '#';
                    } else {
                        nextGrid[x][y][z] = '.';
                    }
                }
            }
        }
    }
    grid = nextGrid;
}

let count = 0;
for (let x = 0; x < grid.length; ++x) {
    for (let y = 0; y < grid[x].length; ++y) {
        for (let z = 0; z < grid[x][y].length; ++z) {
            if (grid[x][y][z] == '#') {
                ++count;
            }
        }
    }
}
console.log(count);

grid = [[[
".###..#.",
"##.##...",
"....#.#.",
"#..#.###",
"...#...#",
"##.#...#",
"#..##.##",
"#......."].map(line => line.split(''))]];

// grid = [[[
// ".#.",
// "..#",
// "###"].map(line => line.split(''))]];

expand = () => {
    for (let x = 0; x < grid.length; ++x) {
        for (let y = 0; y < grid[x].length; ++y) {
            for (let z = 0; z < grid[x][y].length; ++z) {
                grid[x][y][z].push('.');
                grid[x][y][z].splice(0, 0, '.');
            }
            grid[x][y].splice(0, 0, JSON.parse(JSON.stringify(grid[x][y][0])));
            for (let z = 0; z < grid[x][y][0].length; ++z) {
                grid[x][y][0][z] = '.';
            }
            grid[x][y].push(JSON.parse(JSON.stringify(grid[x][y][0])));
        }
        grid[x].splice(0, 0, JSON.parse(JSON.stringify(grid[x][0])));
        for (let z = 0; z < grid[x][0].length; ++z) {
            for (let w = 0; w < grid[x][0][z].length; ++w) {
                grid[x][0][z][w] = '.';
            }
        }
        grid[x].push(JSON.parse(JSON.stringify(grid[x][0])));
    }
    grid.splice(0, 0, JSON.parse(JSON.stringify(grid[0])));
    for (let y = 0; y < grid[0].length; ++y) {
        for (let z = 0; z < grid[0][y].length; ++z) {
            for (let w = 0; w < grid[0][y][z].length; ++w) {
                grid[0][y][z][w] = '.';
            }
        }
    }
    grid.push(JSON.parse(JSON.stringify(grid[0])));
}

for (let iter = 0; iter < 6; ++iter) {
    expand();

    let nextGrid = JSON.parse(JSON.stringify(grid));

    for (let x = 0; x < grid.length; ++x) {
        for (let y = 0; y < grid[x].length; ++y) {
            for (let z = 0; z < grid[x][y].length; ++z) {
                for (let w = 0; w < grid[x][y][z].length; ++w) {
                    let neighbours = 0;
                    for (let dx = -1; dx < 2; ++dx) {
                        for (let dy = -1; dy < 2; ++dy) {
                            for (let dz = -1; dz < 2; ++dz) {
                                for (let dw = -1; dw < 2; ++dw) {
                                    if (dx == 0 && dy == 0 && dz == 0 && dw == 0) {
                                        continue;
                                    }
                                    if (x + dx < 0 || x + dx >= grid.length) continue;
                                    if (y + dy < 0 || y + dy >= grid[x].length) continue;
                                    if (z + dz < 0 || z + dz >= grid[x][y].length) continue;
                                    if (w + dw < 0 || w + dw >= grid[x][y][z].length) continue;
                                    if (grid[x+dx][y+dy][z+dz][w+dw] == '#') {
                                        ++neighbours;
                                    }
                                }
                            }
                        }
                    }
                    if (grid[x][y][z][w] == '#') {
                        if (neighbours == 2 || neighbours == 3) {
                            nextGrid[x][y][z][w] = '#';
                        } else {
                            nextGrid[x][y][z][w] = '.';
                        }
                    }
                    if (grid[x][y][z][w] == '.') {
                        if (neighbours == 3) {
                            nextGrid[x][y][z][w] = '#';
                        } else {
                            nextGrid[x][y][z][w] = '.';
                        }
                    }
                }
            }
        }
    }
    grid = nextGrid;
}

count = 0;
for (let x = 0; x < grid.length; ++x) {
    for (let y = 0; y < grid[x].length; ++y) {
        for (let z = 0; z < grid[x][y].length; ++z) {
            for (let w = 0; w < grid[x][y][z].length; ++w) {
                if (grid[x][y][z][w] == '#') {
                    ++count;
                }
            }
        }
    }
}
console.log(count);
