function mk2d(a, b) {
    let arr = [];
    for (let i = 0; i < a; ++i) {
        let row = [];
        for (let j = 0; j < b; ++j) {
            row.push(' ');
        }
        arr.push(row);
    }
    return arr;
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

let data = `addx 1
noop
addx 4
noop
noop
noop
addx 6
addx -1
addx 5
noop
noop
noop
addx 5
addx -14
noop
addx 19
noop
addx 1
addx 4
addx 1
noop
noop
addx 2
addx 5
addx -27
addx 20
addx -30
addx 2
addx 5
addx 2
addx 4
addx -3
addx 2
addx 5
addx 2
addx -9
addx 1
addx 11
noop
addx -20
addx 7
addx 23
addx 2
addx 3
addx -2
addx -34
addx -2
noop
addx 3
noop
addx 3
addx 2
noop
addx 3
addx 2
addx 5
addx 2
addx -9
addx -7
addx 21
noop
addx 8
noop
addx -1
addx 3
addx -2
addx 5
addx -37
noop
addx 35
addx -31
addx 1
addx 4
addx -1
addx 2
noop
addx 3
addx 1
addx 5
addx -2
addx 7
addx -2
addx -2
addx 10
noop
addx 4
noop
noop
addx -19
addx 20
addx -38
noop
noop
addx 7
addx 2
addx 3
noop
addx 4
addx -3
addx 2
addx 2
noop
addx 3
noop
noop
noop
addx 5
noop
addx 7
addx -2
addx 7
noop
noop
addx -5
addx 6
addx -36
noop
addx 1
addx 2
addx 5
addx 2
addx 3
addx -2
addx 2
addx 5
addx 2
addx 1
noop
addx 4
addx -16
addx 21
noop
noop
addx 1
addx -8
addx 12
noop
noop
noop
noop`;

data2 = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

let sum = 0;
let x = 1;
let clock = 0;

let crt = mk2d(6, 40);

function check() {
    if (clock == 20 || (clock > 50 && (clock - 20) % 40 == 0)) {
        // console.log('clock', clock, 'x', x, 'signal', clock * x);
        sum += clock * x;
    }
    let crtx = -1;
    let crty = 0;
    for (let i = 0; i < clock; ++i) {
        ++crtx;
        if (crtx == 40) {
            crtx = 0;
            ++crty;
        }
    }
    // console.log('crtx', crtx, 'crty', crty);
    if (Math.abs(crtx - x) <= 1) {
        crt[crty][crtx] = '#';
    }
}

for (let line of data.split('\n')) {
    if (line.startsWith('noop')) {
        ++clock;
        check();
    } else if (line.startsWith('addx')) {
        ++clock;
        check();
        ++clock;
        check();
        x += parseInt(line.substring(5));
    }
}
console.log(sum);

draw2d(crt);
