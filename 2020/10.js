let input = [97,
62,
23,
32,
51,
19,
98,
26,
90,
134,
73,
151,
116,
76,
6,
94,
113,
127,
119,
44,
115,
50,
143,
150,
86,
91,
36,
104,
131,
101,
38,
66,
46,
96,
54,
70,
8,
30,
1,
108,
69,
139,
24,
29,
77,
124,
107,
14,
137,
16,
140,
80,
68,
25,
31,
59,
45,
126,
148,
67,
13,
125,
53,
57,
41,
47,
35,
145,
120,
12,
37,
5,
110,
138,
130,
2,
63,
83,
22,
79,
52,
7,
95,
58,
149,
123,
89,
109,
15,
144,
114,
9,
78];

let test = [16,
10,
15,
5,
1,
11,
7,
19,
6,
12,
4];

let test2 = [28,
33,
18,
42,
31,
14,
46,
20,
48,
47,
24,
23,
49,
45,
19,
38,
39,
11,
1,
32,
25,
35,
8,
17,
7,
9,
4,
2,
34,
10,
3];

input.push(0);
input = input.sort(function(a, b) {
  return a - b;
});
let ones = 0;
let threes = 1;
for (let i = 0; i < input.length - 1; ++i) {
    let diff = input[i + 1] - input[i];
    if (diff == 1) ones++;
    if (diff == 3) threes++;
}
console.log(ones * threes);

function reduce(list) {
    let options = [];
    let current = [];
    for (let i = 1; i < list.length - 1; ++i) {
        if (list[i + 1] - list[i] == 3 || list[i] - list[i - 1] == 3) {
            if (current.length > 0) {
                options.push(current);
                current = [];
            }
        } else {
            current.push(i);
        }
    }
    if (current.length > 0) {
        options.push(current);
        current = [];
    }
    return options;
}
let results = reduce(input);
let count = 1;
for (let res of results) {
    let arrangements = 0;
    arrangement: for (let i = 0; i < Math.pow(2, res.length); ++i) {
        let prev = input[res[0] - 1];
        for (let j = 0; j < res.length; ++j) {
            if ((i & (1 << j)) != 0) {
                if (input[res[j]] - prev > 3) {
                    continue arrangement;
                }
                prev = input[res[j]];
            }
        }
        if (input[res[res.length - 1] + 1] - prev > 3) continue;
        arrangements++;
    }
    count *= arrangements;
}
console.log(count);
