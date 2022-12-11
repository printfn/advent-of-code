let input = () => [{
  items: [89n, 84n, 88n, 78n, 70n],
  op: x => x * 5n,
  div_by: 7n,
  if_true: 6,
  if_false: 7,
},{
  items: [76n, 62n, 61n, 54n, 69n, 60n, 85n],
  op: x => x + 1n,
  div_by: 17n,
  if_true: 0,
  if_false: 6,
},{
  items: [83n, 89n, 53n],
  op: x => x + 8n,
  div_by: 11n,
  if_true: 5,
  if_false: 3,
},{
  items: [95n, 94n, 85n, 57n],
  op: x => x + 4n,
  div_by: 13n,
  if_true: 0,
  if_false: 1,
},{
  items: [82n, 98n],
  op: x => x + 7n,
  div_by: 19n,
  if_true: 5,
  if_false: 2,
},{
  items: [69n],
  op: x => x + 2n,
  div_by: 2n,
  if_true: 1,
  if_false: 3,
},{
  items: [82n, 70n, 58n, 87n, 59n, 99n, 92n, 65n],
  op: x => x * 11n,
  div_by: 5n,
  if_true: 7,
  if_false: 4,
},{
  items: [91n, 53n, 96n, 98n, 68n, 82n],
  op: x => x * x,
  div_by: 3n,
  if_true: 4,
  if_false: 2,
}];

// input = () => [{
//   items: [79n, 98n],
//   op: x => x * 19n,
//   div_by: 23n,
//   if_true: 2,
//   if_false: 3,

// },{
//   items: [54n, 65n, 75n, 74n],
//   op: x => x + 6n,
//   div_by: 19n,
//   if_true: 2,
//   if_false: 0,

// },{
//   items: [79n, 60n, 97n],
//   op: x => x * x,
//   div_by: 13n,
//   if_true: 1,
//   if_false: 3,

// },{
//   items: [74n],
//   op: x => x + 3n,
//   div_by: 17n,
//   if_true: 0,
//   if_false: 1,
// }];

function solve(part) {
    let data = input();

    let inspections = [];
    for (let i = 0; i < data.length; ++i) {
        inspections.push(0);
    }

    let lcm = 1n;
    for (let i = 0; i < data.length; ++i) {
        lcm *= data[i].div_by;
    }

    function round() {
        for (let i = 0; i < data.length; ++i) {
            // console.log('Monkey', i);
            for (let j = 0; data[i].items.length > 0;) {
                // console.log('  Item', j, 'worry level', data[i].items[j]);
                let worry_level = data[i].items[j];
                worry_level = data[i].op(worry_level);
                // console.log('    new level', worry_level);
                if (part == 1)
                    worry_level = worry_level / 3n;
                else
                    worry_level %= lcm;
                // console.log('    new level (after disinterested)', worry_level);
                let next = 0;
                if (worry_level % data[i].div_by == 0) {
                    next = data[i].if_true;
                } else {
                    next = data[i].if_false;
                }
                // console.log('    passing to monkey', next);
                ++inspections[i];
                data[next].items.push(worry_level);
                data[i].items.splice(0, 1);
            }
        }
    }

    for (let i = 0; i < (part == 1 ? 20 : 10000); ++i) {
        // console.log('round', i);
        round();
    }

    inspections.sort((a,b) => b - a);
    return inspections[0] * inspections[1];
}

console.log(solve(1));
console.log(solve(2));
