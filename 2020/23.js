let cups = '562893147'.split('').map(s => parseInt(s));
//cups = '389125467'.split('').map(s => parseInt(s));

for (let r = 0; r < 100; ++r) {
    let three = cups.splice(1, 3);
    let current = cups.splice(0, 1)[0];
    let destination = current - 1;
    let idx = cups.indexOf(destination);
    while (idx == -1) {
        destination--;
        if (destination <= 0) {
            destination = 9;
        }
        idx = cups.indexOf(destination);
    }
    cups.splice(idx + 1, 0, ...three);
    cups.push(current);
}

let res = '';
for (let i = cups.indexOf(1) + 1; cups[i] != 1;) {
    res += cups[i++];
    if (i == cups.length) {
        i = 0;
    }
}
console.log(parseInt(res));

cups = '562893147'.split('').map(s => parseInt(s));
//cups = '389125467'.split('').map(s => parseInt(s));
for (let i = 10; i <= 1000000; ++i) {
    cups.push(i);
}

let firstItem = { n: cups[0] };
let cur = firstItem;
for (let i = 1; i < cups.length; ++i) {
    let next = { n: cups[i] };
    cur.next = next;
    cur = next;
}
cur.next = firstItem;
cur = firstItem;

let indexLookupTable = {};
indexLookupTable[cur.n] = cur;
let foo = cur.next;
while (foo.n != cur.n) {
    indexLookupTable[foo.n] = foo;
    foo = foo.next;
}

for (let r = 0; r < 10_000_000; ++r) {
    let three = cur.next;
    cur.next = cur.next.next.next.next;
    let current = cur.n;
    let destination = current - 1;
    while (destination == three.n || destination == three.next.n || destination == three.next.next.n || destination <= 0) {
        destination--;
        if (destination <= 0) {
            destination = 1000000;
        }
    }
    let searchItem = indexLookupTable[destination];
    let after = searchItem.next;
    searchItem.next = three;
    three.next.next.next = after;
    cur = cur.next;
}

let one = cur;
while (one.n != 1) {
    one = one.next;
}
console.log(one.next.n * one.next.next.n);
