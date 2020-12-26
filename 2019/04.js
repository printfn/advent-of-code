const input = '382345-843167';

let low = parseInt(input.split('-')[0]);
let high = parseInt(input.split('-')[1]);

let count1 = 0;
let count2 = 0;

for (let x = low; x <= high;) {
    let xs = x.toString();
    let digits = xs.split('').map(v => parseInt(v));
    if (digits[1] < digits[0]) {
        x = digits[0] * 100000 + digits[0] * 10000;
        continue;
    }
    if (digits[2] < digits[1]) {
        x = digits[0] * 100000 + digits[1] * 10000 + digits[1] * 1000;
        continue;
    }
    if (digits[3] < digits[2]) {
        x = digits[0] * 100000 + digits[1] * 10000 + digits[2] * 1000 + digits[2] * 100;
        continue;
    }
    if (digits[4] < digits[3]) {
        x = digits[0] * 100000 + digits[1] * 10000 + digits[2] * 1000 + digits[3] * 100 + digits[3] * 10;
        continue;
    }
    if (digits[5] < digits[4]) {
        x = digits[0] * 100000 + digits[1] * 10000 + digits[2] * 1000 + digits[3] * 100 + digits[4] * 10 + digits[4];
        continue;
    }

    if (digits[0] != digits[1] && digits[1] != digits[2] && digits[2] != digits[3] && digits[3] != digits[4] && digits[4] != digits[5]) {
        ++x;
        continue;
    }

    ++count1;

    if ((digits[0] == digits[1] && digits[1] != digits[2])
        || (digits[0] != digits[1] && digits[1] == digits[2] && digits[2] != digits[3])
        || (digits[1] != digits[2] && digits[2] == digits[3] && digits[3] != digits[4])
        || (digits[2] != digits[3] && digits[3] == digits[4] && digits[4] != digits[5])
        || (digits[3] != digits[4] && digits[4] == digits[5])) {
        ++count2;
    }
    ++x;
}

console.log(count1);
console.log(count2);
