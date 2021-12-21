let p1 = 10 - 1;
let p2 = 1 - 1;

let p1s = 0;
let p2s = 0;

let next = 0;
let rcount = 0;
function roll() {
    ++rcount;
    ++next;
    if (next > 100) next = 1;
    return next;
}

while (true) {
    p1 += roll() + roll() + roll();
    p1 = p1 % 10;
    p1s += p1 + 1;
    if (p1s >= 1000) {
        console.log(p2s * rcount);
        break;
    }

    p2 += roll() + roll() + roll();
    p2 = p2 % 10;
    p2s += p2 + 1;
    if (p2s >= 1000) {
        console.log(p1s * rcount);
        break;
    }
}

let gamestates = {};
let startingstate = {
    next: 1,
    p1: 10 - 1,
    p2: 1 - 1,
    p1s: 0,
    p2s: 0,
};
gamestates[JSON.stringify(startingstate)] = 1;
function tick(g) {
    let result = [];
    for (let r1 = 1; r1 <= 3; ++r1) {
        for (let r2 = 1; r2 <= 3; ++r2) {
            for (let r3 = 1; r3 <= 3; ++r3) {
                if (g.next == 1) {
                    let np1 = (g.p1 + r1 + r2 + r3) % 10;
                    result.push({
                        next: 2,
                        p1: np1,
                        p1s: g.p1s + np1 + 1,
                        p2: g.p2,
                        p2s: g.p2s,
                    });
                } else {
                    let np2 = (g.p2 + r1 + r2 + r3) % 10;
                    result.push({
                        next: 1,
                        p1: g.p1,
                        p1s: g.p1s,
                        p2: np2,
                        p2s: g.p2s + np2 + 1,
                    });
                }
            }
        }
    }
    return result;
}

function add(obj, key, val) {
    if (!obj[key]) {
        obj[key] = val;
    } else {
        obj[key] += val;
    }
}

p1wins = 0;
p2wins = 0;

function tickAll() {
    let newstates = {};
    let count = 0;
    for (let state in gamestates) {
        ++count;
        let results = tick(JSON.parse(state));
        for (let newstate of results) {
            if (newstate.p1s >= 21) {
                p1wins += gamestates[state];
                continue;
            } else if (newstate.p2s >= 21) {
                p2wins += gamestates[state];
                continue;
            }
            add(newstates, JSON.stringify(newstate), gamestates[state]);
        }
    }
    gamestates = newstates;
    return count > 0;
}

while (tickAll())
    ;

console.log(Math.max(p1wins, p2wins));
