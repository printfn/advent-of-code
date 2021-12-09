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

let input = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,9,19,1,5,19,23,1,6,23,27,1,27,10,31,1,31,5,35,2,10,35,39,1,9,39,43,1,43,5,47,1,47,6,51,2,51,6,55,1,13,55,59,2,6,59,63,1,63,5,67,2,10,67,71,1,9,71,75,1,75,13,79,1,10,79,83,2,83,13,87,1,87,6,91,1,5,91,95,2,95,9,99,1,5,99,103,1,103,6,107,2,107,13,111,1,111,10,115,2,10,115,119,1,9,119,123,1,123,9,127,1,13,127,131,2,10,131,135,1,135,5,139,1,2,139,143,1,143,5,0,99,2,0,14,0];

function execute(input, pc) {
    if (!pc) {
        pc = 0;
    }
    input = JSON.parse(JSON.stringify(input));
    while (true) {
        switch (input[pc]) {
            case 1:
                input[input[pc + 3]] = input[input[pc + 1]] + input[input[pc + 2]];
                pc += 4;
                break;
            case 2:
                input[input[pc + 3]] = input[input[pc + 1]] * input[input[pc + 2]];
                pc += 4;
                break;
            case 99:
                return input;
        }
    }
}

assert(execute([1,0,0,0,99]).equals([2,0,0,0,99]));
assert(execute([2,3,0,3,99]).equals([2,3,0,6,99]));
assert(execute([2,4,4,5,99,0]).equals([2,4,4,5,99,9801]));
assert(execute([1,1,1,4,99,5,6,0,99]).equals([30,1,1,4,2,5,6,0,99]));

input[1] = 12;
input[2] = 2;
console.log(execute(input)[0]);


outer: for (let noun = 0; noun < 100; ++noun) {
    for (let verb = 0; verb < 100; ++verb) {
        input[1] = noun;
        input[2] = verb;
        if (execute(input)[0] == 19690720) {
            console.log(100 * noun + verb);
            break outer;
        }
    }
}
