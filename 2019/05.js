// from https://stackoverflow.com/a/14853974
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

function assert(res) {
    if (!res) {
        throw new Error('assertion failed');
    }
}

let input = [3,225,1,225,6,6,1100,1,238,225,104,0,1101,11,91,225,1002,121,77,224,101,-6314,224,224,4,224,1002,223,8,223,1001,224,3,224,1,223,224,223,1102,74,62,225,1102,82,7,224,1001,224,-574,224,4,224,102,8,223,223,1001,224,3,224,1,224,223,223,1101,28,67,225,1102,42,15,225,2,196,96,224,101,-4446,224,224,4,224,102,8,223,223,101,6,224,224,1,223,224,223,1101,86,57,225,1,148,69,224,1001,224,-77,224,4,224,102,8,223,223,1001,224,2,224,1,223,224,223,1101,82,83,225,101,87,14,224,1001,224,-178,224,4,224,1002,223,8,223,101,7,224,224,1,223,224,223,1101,38,35,225,102,31,65,224,1001,224,-868,224,4,224,1002,223,8,223,1001,224,5,224,1,223,224,223,1101,57,27,224,1001,224,-84,224,4,224,102,8,223,223,1001,224,7,224,1,223,224,223,1101,61,78,225,1001,40,27,224,101,-89,224,224,4,224,1002,223,8,223,1001,224,1,224,1,224,223,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,1008,677,226,224,1002,223,2,223,1006,224,329,101,1,223,223,8,226,677,224,102,2,223,223,1005,224,344,101,1,223,223,1107,226,677,224,102,2,223,223,1006,224,359,101,1,223,223,1007,226,226,224,102,2,223,223,1006,224,374,101,1,223,223,7,677,677,224,102,2,223,223,1005,224,389,1001,223,1,223,108,677,677,224,1002,223,2,223,1005,224,404,101,1,223,223,1008,226,226,224,102,2,223,223,1005,224,419,1001,223,1,223,1107,677,226,224,102,2,223,223,1005,224,434,1001,223,1,223,1108,677,677,224,102,2,223,223,1006,224,449,1001,223,1,223,7,226,677,224,102,2,223,223,1005,224,464,101,1,223,223,1008,677,677,224,102,2,223,223,1005,224,479,101,1,223,223,1007,226,677,224,1002,223,2,223,1006,224,494,101,1,223,223,8,677,226,224,1002,223,2,223,1005,224,509,101,1,223,223,1007,677,677,224,1002,223,2,223,1006,224,524,101,1,223,223,107,226,226,224,102,2,223,223,1006,224,539,101,1,223,223,107,226,677,224,102,2,223,223,1005,224,554,1001,223,1,223,7,677,226,224,102,2,223,223,1006,224,569,1001,223,1,223,107,677,677,224,1002,223,2,223,1005,224,584,101,1,223,223,1107,677,677,224,102,2,223,223,1005,224,599,101,1,223,223,1108,226,677,224,102,2,223,223,1006,224,614,101,1,223,223,8,226,226,224,102,2,223,223,1006,224,629,101,1,223,223,108,226,677,224,102,2,223,223,1005,224,644,1001,223,1,223,108,226,226,224,102,2,223,223,1005,224,659,101,1,223,223,1108,677,226,224,102,2,223,223,1006,224,674,1001,223,1,223,4,223,99,226];

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

function execute(input, inputfn, outputfn) {
    let pc = 0;
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
                let val = inputfn();
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

execute(input, () => 1, val => {
    if (val == 0) return;
    console.log(val);
});

//execute([3,9,8,9,10,9,4,9,99,-1,8], () => 1, console.log);
//execute([3,9,7,9,10,9,4,9,99,-1,8], () => 1, console.log);

/*execute([3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99], () => 5, console.log);*/

execute(input, () => 5, val => console.log(val));
