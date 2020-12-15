let list = [0,5,4,1,10,14,7];
// list = [0,3,6];
// list = [1,3,2];
let listIdx = 0;
let numberAges = [];
let prevNumberAges = [];

let i = 0;
let num = -1;
while (i <= 30000000) {
    if (listIdx < list.length) {
        num = list[listIdx];
        numberAges[num] = i;
        ++listIdx;
    } else {
        let last = num;
        if (!prevNumberAges[last] && i != list.length + 1) {
            num = 0;
            prevNumberAges[0] = numberAges[0];
            numberAges[0] = i;
        } else {
            let age = i - 1 - prevNumberAges[last];
            num = age;
            prevNumberAges[age] = numberAges[age];
            numberAges[age] = i;
        }
    }
    ++i;
    if (i == 2020 || i == 30000000) {
        console.log(num);
    }
}
