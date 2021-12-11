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

let input = [
[8,2,5,8,7,4,1,2,5,4],
[3,3,3,5,2,8,6,2,1,1],
[8,4,6,8,6,6,1,3,1,1],
[6,1,6,4,5,7,8,3,5,3],
[2,1,3,8,4,1,4,5,5,3],
[1,7,8,5,3,8,5,4,4,7],
[3,4,4,1,1,3,3,7,5,1],
[3,5,8,6,8,6,2,8,3,7],
[7,5,6,8,2,7,2,8,7,8],
[6,8,3,3,6,4,3,1,4,4],
];

let flashcount = 0;
for (let i = 0;; ++i) {
    // step
    let nextinput = mk2d(10, 10);
    let flashpositions = mk2d(10, 10);
    for (let x = 0; x < 10; ++x) {
        for (let y = 0; y < 10; ++y) {
            nextinput[x][y] = input[x][y] + 1;
        }
    }
    while (true) {
        let flashthis = 0;
        for (let x = 0; x < 10; ++x) {
            for (let y = 0; y < 10; ++y) {
                if (nextinput[x][y] > 9 && flashpositions[x][y] == 0) {
                    ++flashthis;
                    ++flashcount;
                    if (x > 0) ++nextinput[x-1][y];
                    if (y > 0) ++nextinput[x][y-1];
                    if (x < 9) ++nextinput[x+1][y];
                    if (y < 9) ++nextinput[x][y+1];
                    if (x > 0 && y > 0) ++nextinput[x-1][y-1];
                    if (x < 9 && y > 0) ++nextinput[x+1][y-1];
                    if (x > 0 && y < 9) ++nextinput[x-1][y+1];
                    if (x < 9 && y < 9) ++nextinput[x+1][y+1];
                    flashpositions[x][y] = 1;
                }
            }
        }
        if (flashthis == 0) break;
    }
    let counting = 0;
    for (let x = 0; x < 10; ++x) {
        for (let y = 0; y < 10; ++y) {
            if (flashpositions[x][y] != 0) {
                nextinput[x][y] = 0;
                ++counting;
            }
        }
    }
    if (counting == 100) {
        console.log(1 + i);
        break;
    }
    if (i == 99) {
        console.log(flashcount);
    }
    input = nextinput;
}
