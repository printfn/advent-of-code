let p1 = [
10,
21,
37,
2,
47,
13,
6,
29,
9,
3,
4,
48,
46,
25,
44,
41,
23,
20,
24,
12,
45,
43,
5,
27,
50];

let p2 = [
39,
42,
31,
36,
7,
1,
49,
19,
40,
35,
8,
11,
18,
30,
14,
17,
15,
34,
26,
33,
32,
38,
28,
16,
22];

for (let r = 0; r < 10000; ++r) {
    if (p1.length == 0 || p2.length == 0)
        break;
    let top1 = p1.splice(0, 1)[0];
    let top2 = p2.splice(0, 1)[0];
    if (top1 > top2) {
        p1.push(top1);
        p1.push(top2);
    } else {
        p2.push(top2);
        p2.push(top1);
    }
}

let cards = [];
if (p1.length > 0) {
    cards = p1;
} else {
    cards = p2;
}

let score = 0;
for (let i = cards.length - 1, j = 1; i >= 0; --i, ++j) {
    score += cards[i] * j;
}
console.log(score);

p1 = [
10,
21,
37,
2,
47,
13,
6,
29,
9,
3,
4,
48,
46,
25,
44,
41,
23,
20,
24,
12,
45,
43,
5,
27,
50];

p2 = [
39,
42,
31,
36,
7,
1,
49,
19,
40,
35,
8,
11,
18,
30,
14,
17,
15,
34,
26,
33,
32,
38,
28,
16,
22];

// p1 = [9, 2, 6, 3, 1];
// p2 = [5, 8, 4, 7, 10];

function c(x) {
    return [...x];
}

// true if p1 won
function simulateGame(p1, p2) {
    let prev = new Set();
    for (let r = 0; ; ++r) {
        if (prev.has(JSON.stringify([p1, p2]))) {
            return true;
        }
        prev.add(JSON.stringify([p1, p2]));
        if (p1.length == 0)
            return false;
        if (p2.length == 0)
            return true;

        let top1 = p1.splice(0, 1)[0];
        let top2 = p2.splice(0, 1)[0];
        let winner;
        if (p1.length >= top1 && p2.length >= top2) {
            // recurse
            winner = simulateGame(c(p1.slice(0, top1)), c(p2.slice(0, top2)));
        } else if (top1 > top2) {
            winner = true;
        } else {
            winner = false;
        }
        if (winner) {
            p1.push(top1);
            p1.push(top2);
        } else {
            p2.push(top2);
            p2.push(top1);
        }
    }
}

let res = simulateGame(p1, p2);

cards = [];
if (res) {
    cards = p1;
} else {
    cards = p2;
}

score = 0;
for (let i = cards.length - 1, j = 1; i >= 0; --i, ++j) {
    score += cards[i] * j;
}
console.log(score);
