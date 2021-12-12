function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

let input = [
['start','qs'],
['qs','jz'],
['start','lm'],
['qb','QV'],
['QV','dr'],
['QV','end'],
['ni','qb'],
['VH','jz'],
['qs','lm'],
['qb','end'],
['dr','fu'],
['jz','lm'],
['start','VH'],
['QV','jz'],
['VH','qs'],
['lm','dr'],
['dr','ni'],
['ni','jz'],
['lm','QV'],
['jz','dr'],
['ni','end'],
['VH','dr'],
['VH','ni'],
['qb','HE'],
];

function conn(current) {
    let res = [];
    for (let [a, b] of input) {
        if (a == current) {
            res.push(b);
        }
    }
    for (let [b, a] of input) {
        if (a == current) {
            res.push(b);
        }
    }
    return res;
}

let count = 0;
function step(current, prev) {
    if (current == 'end') {
        ++count;
        return;
    }
    prev = clone(prev);
    prev.push(current);
    for (let next of conn(current)) {
        if (next[0] == next[0].toLowerCase()) {
            // don't visit more than once
            if (prev.includes(next)) {
                continue;
            }
        }
        step(next, prev);
    }
}
step('start', [], false);
console.log(count);

count = 0;
function step2(current, prev, usedup) {
    if (current == 'end') {
        ++count;
        return;
    }
    prev = clone(prev);
    prev.push(current);
    for (let next of conn(current)) {
        if (next[0] == next[0].toLowerCase()) {
            // don't visit more than once
            if (prev.includes(next)) {
                if (!usedup && next != 'start' && next != 'end') {
                    step2(next, prev, true);
                }
                continue;
            }
        }
        step2(next, prev, usedup);
    }
}
step2('start', [], false);
console.log(count);
