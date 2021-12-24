let input = [
['inp', 'w',],
['mul', 'x', 0],
['add', 'x', 'z'],
['mod', 'x', 26],
['div', 'z', 1],
['add', 'x', 11],
['eql', 'x', 'w'],
['eql', 'x', 0],
['mul', 'y', 0],
['add', 'y', 25],
['mul', 'y', 'x'],
['add', 'y', 1],
['mul', 'z', 'y'],
['mul', 'y', 0],
['add', 'y', 'w'],
['add', 'y', 7],
['mul', 'y', 'x'],
['add', 'z', 'y'],
['inp', 'w',], // 1
['mul', 'x', 0],
['add', 'x', 'z'],
['mod', 'x', 26],
['div', 'z', 1],
['add', 'x', 14],
['eql', 'x', 'w'],
['eql', 'x', 0],
['mul', 'y', 0],
['add', 'y', 25],
['mul', 'y', 'x'],
['add', 'y', 1],
['mul', 'z', 'y'],
['mul', 'y', 0],
['add', 'y', 'w'],
['add', 'y', 8],
['mul', 'y', 'x'],
['add', 'z', 'y'],
['inp', 'w',], // 2
['mul', 'x', 0],
['add', 'x', 'z'],
['mod', 'x', 26],
['div', 'z', 1],
['add', 'x', 10],
['eql', 'x', 'w'],
['eql', 'x', 0],
['mul', 'y', 0],
['add', 'y', 25],
['mul', 'y', 'x'],
['add', 'y', 1],
['mul', 'z', 'y'],
['mul', 'y', 0],
['add', 'y', 'w'],
['add', 'y', 16],
['mul', 'y', 'x'],
['add', 'z', 'y'],
['inp', 'w',], // 3
['mul', 'x', 0],
['add', 'x', 'z'],
['mod', 'x', 26],
['div', 'z', 1],
['add', 'x', 14],
['eql', 'x', 'w'],
['eql', 'x', 0],
['mul', 'y', 0],
['add', 'y', 25],
['mul', 'y', 'x'],
['add', 'y', 1],
['mul', 'z', 'y'],
['mul', 'y', 0],
['add', 'y', 'w'],
['add', 'y', 8],
['mul', 'y', 'x'],
['add', 'z', 'y'],
['inp', 'w',], // 4
['mul', 'x', 0],
['add', 'x', 'z'],
['mod', 'x', 26],
['div', 'z', 26],
['add', 'x', -8],
['eql', 'x', 'w'],
['eql', 'x', 0],
['mul', 'y', 0],
['add', 'y', 25],
['mul', 'y', 'x'],
['add', 'y', 1],
['mul', 'z', 'y'],
['mul', 'y', 0],
['add', 'y', 'w'],
['add', 'y', 3],
['mul', 'y', 'x'],
['add', 'z', 'y'],
['inp', 'w',], // 5
['mul', 'x', 0],
['add', 'x', 'z'],
['mod', 'x', 26],
['div', 'z', 1],
['add', 'x', 14],
['eql', 'x', 'w'],
['eql', 'x', 0],
['mul', 'y', 0],
['add', 'y', 25],
['mul', 'y', 'x'],
['add', 'y', 1],
['mul', 'z', 'y'],
['mul', 'y', 0],
['add', 'y', 'w'],
['add', 'y', 12],
['mul', 'y', 'x'],
['add', 'z', 'y'],
['inp', 'w',], // 6
['mul', 'x', 0],
['add', 'x', 'z'],
['mod', 'x', 26],
['div', 'z', 26],
['add', 'x', -11],
['eql', 'x', 'w'],
['eql', 'x', 0],
['mul', 'y', 0],
['add', 'y', 25],
['mul', 'y', 'x'],
['add', 'y', 1],
['mul', 'z', 'y'],
['mul', 'y', 0],
['add', 'y', 'w'],
['add', 'y', 1],
['mul', 'y', 'x'],
['add', 'z', 'y'],
['inp', 'w',], // 7
['mul', 'x', 0],
['add', 'x', 'z'],
['mod', 'x', 26],
['div', 'z', 1],
['add', 'x', 10],
['eql', 'x', 'w'],
['eql', 'x', 0],
['mul', 'y', 0],
['add', 'y', 25],
['mul', 'y', 'x'],
['add', 'y', 1],
['mul', 'z', 'y'],
['mul', 'y', 0],
['add', 'y', 'w'],
['add', 'y', 8],
['mul', 'y', 'x'],
['add', 'z', 'y'],
['inp', 'w',], // 8
['mul', 'x', 0],
['add', 'x', 'z'],
['mod', 'x', 26],
['div', 'z', 26],
['add', 'x', -6],
['eql', 'x', 'w'],
['eql', 'x', 0],
['mul', 'y', 0],
['add', 'y', 25],
['mul', 'y', 'x'],
['add', 'y', 1],
['mul', 'z', 'y'],
['mul', 'y', 0],
['add', 'y', 'w'],
['add', 'y', 8],
['mul', 'y', 'x'],
['add', 'z', 'y'],
['inp', 'w',], // 9, 
['mul', 'x', 0],
['add', 'x', 'z'],
['mod', 'x', 26],
['div', 'z', 26],
['add', 'x', -9],
['eql', 'x', 'w'],
['eql', 'x', 0],
['mul', 'y', 0],
['add', 'y', 25],
['mul', 'y', 'x'],
['add', 'y', 1],
['mul', 'z', 'y'],
['mul', 'y', 0],
['add', 'y', 'w'],
['add', 'y', 14],
['mul', 'y', 'x'],
['add', 'z', 'y'],
['inp', 'w',], // 10, z%26+12
['mul', 'x', 0],
['add', 'x', 'z'],
['mod', 'x', 26],
['div', 'z', 1],
['add', 'x', 12],
['eql', 'x', 'w'],
['eql', 'x', 0],
['mul', 'y', 0],
['add', 'y', 25],
['mul', 'y', 'x'],
['add', 'y', 1],
['mul', 'z', 'y'],
['mul', 'y', 0],
['add', 'y', 'w'],
['add', 'y', 4],
['mul', 'y', 'x'],
['add', 'z', 'y'],
['inp', 'w',], // 11, z%26-5
['mul', 'x', 0],
['add', 'x', 'z'],
['mod', 'x', 26],
['div', 'z', 26],
['add', 'x', -5],
['eql', 'x', 'w'],
['eql', 'x', 0],
['mul', 'y', 0],
['add', 'y', 25],
['mul', 'y', 'x'],
['add', 'y', 1],
['mul', 'z', 'y'],
['mul', 'y', 0],
['add', 'y', 'w'],
['add', 'y', 14],
['mul', 'y', 'x'],
['add', 'z', 'y'],
['inp', 'w',], // 12, z%26-4
['mul', 'x', 0],
['add', 'x', 'z'],
['mod', 'x', 26],
['div', 'z', 26],
['add', 'x', -4],
['eql', 'x', 'w'],
['eql', 'x', 0],
['mul', 'y', 0],
['add', 'y', 25],
['mul', 'y', 'x'],
['add', 'y', 1],
['mul', 'z', 'y'],
['mul', 'y', 0],
['add', 'y', 'w'],
['add', 'y', 15],
['mul', 'y', 'x'],
['add', 'z', 'y'],
['inp', 'w',],  // 13, z%26-9
['mul', 'x', 0],
['add', 'x', 'z'],
['mod', 'x', 26],
['div', 'z', 26],
['add', 'x', -9],
['eql', 'x', 'w'],
['eql', 'x', 0],
['mul', 'y', 0],
['add', 'y', 25],
['mul', 'y', 'x'],
['add', 'y', 1],
['mul', 'z', 'y'],
['mul', 'y', 0],
['add', 'y', 'w'],
['add', 'y', 6],
['mul', 'y', 'x'],
['add', 'z', 'y'],
];

function test(modelnumstr) {
    let inputidx = 0;
    let mem = {
        w: 0,
        x: 0,
        y: 0,
        z: 0,
    };

    let read = x => {
        if (typeof x == 'string') {
            return mem[x];
        } else {
            return x;
        }
    };

    let pc = 0;
    while (pc < input.length) {
        let ins = input[pc++];
        switch (ins[0]) {
            case 'inp': {
                let arg = parseInt(modelnumstr[inputidx]);
                let v = -1;
                if (inputidx == 1) { v = mem.z%26+14; }
                else if (inputidx == 2) { v = mem.z%26+10; }
                else if (inputidx == 3) { v = mem.z%26+14; }
                else if (inputidx == 4) { v = mem.z%26-8; }
                else if (inputidx == 5) { v = mem.z%26+14; }
                else if (inputidx == 6) { v = mem.z%26-11; }
                else if (inputidx == 7) { v = mem.z%26+10; }
                else if (inputidx == 8) { v = mem.z%26-6; }
                else if (inputidx == 9) { v = mem.z%26-9; }
                else if (inputidx == 10) { v = mem.z%26+12; }
                else if (inputidx == 11) { v = mem.z%26-5; }
                else if (inputidx == 12) { v = mem.z%26-4; }
                else if (inputidx == 13) { v = mem.z%26-9; }
                if (v > 0 && v <= 9) {
                    arg = v;
                    modelnumstr[inputidx] = v.toString();
                }
                if (arg == 0) return false;
                mem[ins[1]] = arg;
                ++inputidx;
                break;
            }
            case 'add': {
                mem[ins[1]] += read(ins[2]);
                break;
            }
            case 'mul': {
                mem[ins[1]] *= read(ins[2]);
                break;
            }
            case 'div': {
                mem[ins[1]] = Math.floor(mem[ins[1]] / read(ins[2]));
                break;
            }
            case 'mod': {
                mem[ins[1]] %= read(ins[2]);
                break;
            }
            case 'eql': {
                mem[ins[1]] = read(ins[1]) == read(ins[2]) ? 1 : 0;
                break;
            }
        }
    }
    return mem.z == 0 ? modelnumstr : false;
}

let modeln = '99999999999999'.split('');
let max = 0;
let min = 99999999999999;
while (true) {
    for (let i = 0; i < modeln.length; ++i) {
        modeln[i] = Math.floor(Math.random() * 9) + 1
    }
    let m = modeln;
    if (test(m)) {
        let n = parseInt(m.join(''));
        if (n > max) {
            max = n;
        }
        if (n < min) {
            min = n;
        }
        if (max == 95299897999897 && min == 31111121382151) break;
    }
}
console.log(max);
console.log(min);
