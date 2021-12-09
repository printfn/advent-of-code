let inputcode = [3,8,1001,8,10,8,105,1,0,0,21,34,55,68,85,106,187,268,349,430,99999,3,9,1001,9,5,9,1002,9,5,9,4,9,99,3,9,1002,9,2,9,1001,9,2,9,1002,9,5,9,1001,9,2,9,4,9,99,3,9,101,3,9,9,102,3,9,9,4,9,99,3,9,1002,9,5,9,101,3,9,9,102,5,9,9,4,9,99,3,9,1002,9,4,9,1001,9,2,9,102,3,9,9,101,3,9,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,99];

function readmem(input, idx, mode) {
    switch (mode) {
        case 0:
            return input[idx];
        case 1:
            return idx;
    }
}

function writemem(input, idx, value, mode) {
    switch (mode) {
        case 0:
            input[idx] = value;
            break;
        case 1:
            throw new Error('attempted to write in immediate mode');
    }
}

function* execute(input, outputfn) {
    let pc = 0;
    let inputidx = 0;
    input = JSON.parse(JSON.stringify(input));
    while (true) {
        //console.log(input, pc, [input[pc], input[pc+1], input[pc+2], input[pc+3]]);
        let opcode = input[pc];
        let modeA = Math.floor(opcode % 1000 / 100);
        let modeB = Math.floor(opcode % 10000 / 1000);
        let modeC = Math.floor(opcode % 100000 / 10000);
        switch (opcode % 100) {
            case 1: { // add
                let a = readmem(input, input[pc + 1], modeA);
                let b = readmem(input, input[pc + 2], modeB);
                let res = a + b;
                if (isNaN(a) || isNaN(b)) throw new Error('nan');
                writemem(input, input[pc + 3], res, modeC);
                pc += 4;
                break;
            }
            case 2: { // mul
                let a = readmem(input, input[pc + 1], modeA);
                let b = readmem(input, input[pc + 2], modeB);
                if (isNaN(a) || isNaN(b)) throw new Error('nan');
                let res = a * b;
                writemem(input, input[pc + 3], res, modeC);
                pc += 4;
                break;
            }
            case 3: { // read input
                let val = yield inputidx++;
                if (isNaN(val)) throw new Error('nan');
                writemem(input, input[pc + 1], val, modeA);
                pc += 2;
                break;
            }
            case 4: { // write output
                outputfn(readmem(input, input[pc + 1], modeA));
                pc += 2;
                break;
            }
            case 5: { // jump-if-true
                let a = readmem(input, input[pc + 1], modeA);
                let b = readmem(input, input[pc + 2], modeB);
                if (isNaN(a) || isNaN(b)) throw new Error('nan');
                if (a != 0) {
                    pc = b;
                } else {
                    pc += 3;
                }
                break;
            }
            case 6: { // jump-if-false
                let a = readmem(input, input[pc + 1], modeA);
                let b = readmem(input, input[pc + 2], modeB);
                if (isNaN(a) || isNaN(b)) throw new Error('nan');
                if (a == 0) {
                    pc = b;
                } else {
                    pc += 3;
                }
                break;
            }
            case 7: { // less than
                let a = readmem(input, input[pc + 1], modeA);
                let b = readmem(input, input[pc + 2], modeB);
                if (isNaN(a) || isNaN(b)) throw new Error('nan');
                writemem(input, input[pc + 3], a < b ? 1 : 0, modeC);
                pc += 4;
                break;
            }
            case 8: { // equals
                let a = readmem(input, input[pc + 1], modeA);
                let b = readmem(input, input[pc + 2], modeB);
                if (isNaN(a) || isNaN(b)) throw new Error('nan');
                writemem(input, input[pc + 3], a == b ? 1 : 0, modeC);
                pc += 4;
                break;
            }
            case 99:
                return input;
            default:
                throw new Error(`unknown opcode ${opcode % 100}`);
        }
    }
}

function permutator(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}

//inputcode = [3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0];
//inputcode = [3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0];

function compute1(phase, val) {
    let result = -1;
    let m = execute(inputcode, out => {
        result = out;
    });
    m.next();
    m.next(phase);
    m.next(val);
    return result;
}

let maximum = 0;
for (let order of permutator([0, 1, 2, 3, 4])) {
    let val = 0;
    for (let phaseSetting of order) {
        let prevVal = val;
        val = compute1(phaseSetting, val);
    }
    if (val > maximum) {
        maximum = val;
    }
}
console.log(maximum);

maximum = 0;
for (let order of permutator([5, 6, 7, 8, 9])) {
    let buffers = [[0], [], [], [], []];
    let m1 = execute(inputcode, val => buffers[1].push(val));
    let m2 = execute(inputcode, val => buffers[2].push(val));
    let m3 = execute(inputcode, val => buffers[3].push(val));
    let m4 = execute(inputcode, val => buffers[4].push(val));
    let m5 = execute(inputcode, val => buffers[0].push(val));
    let m1y = m1.next();
    let m2y = m2.next();
    let m3y = m3.next();
    let m4y = m4.next();
    let m5y = m5.next();
    m1y = m1.next(order[0]);
    m2y = m2.next(order[1]);
    m3y = m3.next(order[2]);
    m4y = m4.next(order[3]);
    m5y = m5.next(order[4]);
    while (true) {
        if (!m1y.done && buffers[0].length != 0) {
            m1y = m1.next(buffers[0].shift());
        } else if (!m2y.done && buffers[1].length != 0) {
            m2y = m2.next(buffers[1].shift());
        } else if (!m3y.done && buffers[2].length != 0) {
            m3y = m3.next(buffers[2].shift());
        } else if (!m4y.done && buffers[3].length != 0) {
            m4y = m4.next(buffers[3].shift());
        } else if (!m5y.done && buffers[4].length != 0) {
            m5y = m5.next(buffers[4].shift());
        } else {
            break;
        }
    }
    let value = buffers[0][0];
    if (value > maximum) {
        maximum = value;
    }
}
console.log(maximum);
