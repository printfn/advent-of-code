let start = 1005526;
let x = 0;
let ids = [37,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41,x,x,x,x,x,x,x,x,x,587,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,13,19,x,x,x,23,x,x,x,x,x,29,x,733,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,17];

// for (let i in ids) {
//     console.log(i, ids[i]);
// }

// start = 939
// ids = [7,13,x,x,59,x,31,19];

let m = 0;
outer: for (let t = start; true; ++t, ++m) {
    for (let id of ids) {
        if (id == 0) continue;
        if (t % id == 0) {
            console.log(id * m);
            break outer;
        }
    }
}

// t % 37 == 0
// (t + 27) % 41 == 0
// (t + 37) % 587 == 0
// (t + 55) % 13 == 0
// (t + 56) % 19 == 0
// (t + 60) % 23 == 0

// Use this code to set realstart and next:

// let prev = 0;
// let found = 0;
// outer: for (let i = start; i < 10 * 37 * 41 * 587 * 55 * 56; ++i) {
//     if (i % 37 == 0 && (i + 27) % 41 == 0 && (i + 37) % 587 == 0
//         && (i + 55) % 13 == 0 && (i + 56) % 19 == 0) {
//         console.log(i, i - prev);
//         prev = i;
//         ++found;
//         if (found > 3) break outer;
//     }
// }

let realstart = 108942467;
let next = 328890780;
let stepSize = next - realstart;

outer: for (let t = realstart; true; t += stepSize) {
    //if ((t - realstart) % (stepSize * 10000) == 0) console.log(t);
    idcheck: for (let i = 0; i < ids.length; ++i) {
        let id = ids[i];
        if (id == 0) continue idcheck;
        if ((t + parseInt(i)) % id != 0) {
            continue outer;
        }
    }
    console.log(t);
    break outer;
}
