let a = 17773298;
let b = 15530095;

// a = 5764801;
// b = 17807724;

let t = (s, loop_size) => {
    let v = 1;
    for (let i = 0; i < loop_size; ++i) {
        v = v * s;
        v = v % 20201227;
    }
    return v;
}

let search_for = (s, target) => {
    let v = 1;
    for (let i = 1;; ++i) {
        v = v * s;
        v = v % 20201227;
        if (v == target) return i;
    }
}

let a_lp = search_for(7, a);
let encryption_key_via_a = t(b, a_lp);

// let b_lp = search_for(7, b);
// let encryption_key_via_b = t(a, b_lp);

console.log(encryption_key_via_a);
