let real = 1;

let data = [{sensor: [2332081, 2640840], beacon: [2094728, 2887414]},
{sensor: [3048293, 3598671], beacon: [3872908, 3598272]},
{sensor: [2574256, 3973583], beacon: [2520711, 4005929]},
{sensor: [3011471, 2514567], beacon: [2999559, 2558817]},
{sensor: [3718881, 2593817], beacon: [2999559, 2558817]},
{sensor: [2388052, 2201955], beacon: [2163809, 1961540]},
{sensor: [3783125, 3897169], beacon: [3872908, 3598272]},
{sensor: [1864613, 3918152], beacon: [2520711, 4005929]},
{sensor: [2850099, 689863], beacon: [3231146, 2000000]},
{sensor: [3431652, 2328669], beacon: [3231146, 2000000]},
{sensor: [3480248, 3999492], beacon: [3872908, 3598272]},
{sensor: [455409, 3347614], beacon: [-399822, 4026621]},
{sensor: [2451938, 2950107], beacon: [2094728, 2887414]},
{sensor: [1917790, 3194437], beacon: [2094728, 2887414]},
{sensor: [3947393, 3625984], beacon: [3872908, 3598272]},
{sensor: [1615064, 2655330], beacon: [2094728, 2887414]},
{sensor: [3630338, 1977851], beacon: [3231146, 2000000]},
{sensor: [3878266, 3019867], beacon: [3872908, 3598272]},
{sensor: [2837803, 2395749], beacon: [2999559, 2558817]},
{sensor: [3979396, 3697962], beacon: [3872908, 3598272]},
{sensor: [109399, 250528], beacon: [929496, -688981]},
{sensor: [2401381, 3518884], beacon: [2520711, 4005929]},
{sensor: [3962391, 71053], beacon: [5368730, -488735]},
{sensor: [1751119, 97658], beacon: [929496, -688981]},
{sensor: [2932155, 2967347], beacon: [2999559, 2558817]},
{sensor: [3326630, 2845463], beacon: [2999559, 2558817]},
{sensor: [3959042, 1734156], beacon: [3231146, 2000000]},
{sensor: [675279, 1463916], beacon: [2163809, 1961540]},
{sensor: [3989603, 3500749], beacon: [3872908, 3598272]},
{sensor: [1963470, 2288355], beacon: [2163809, 1961540]}];

let targety = 2000000;

let maxcoord = 4000000;

if (!real) {
    data = [{sensor: [2, 18], beacon: [-2, 15]},
    {sensor: [9, 16], beacon: [10, 16]},
    {sensor: [13, 2], beacon: [15, 3]},
    {sensor: [12, 14], beacon: [10, 16]},
    {sensor: [10, 20], beacon: [10, 16]},
    {sensor: [14, 17], beacon: [10, 16]},
    {sensor: [8, 7], beacon: [2, 10]},
    {sensor: [2, 0], beacon: [2, 10]},
    {sensor: [0, 11], beacon: [2, 10]},
    {sensor: [20, 14], beacon: [25, 17]},
    {sensor: [17, 20], beacon: [21, 22]},
    {sensor: [16, 7], beacon: [15, 3]},
    {sensor: [14, 3], beacon: [15, 3]},
    {sensor: [20, 1], beacon: [15, 3]}];

    targety = 10;
    maxcoord = 20;
}

let minx_orig =  10000000000;
let miny_orig =  10000000000;
let maxx_orig = -10000000000;
let maxy_orig = -10000000000;

for (let {sensor, beacon} of data) {
    if (sensor[0] < minx_orig) {
        minx_orig = sensor[0];
    }
    if (beacon[0] < minx_orig) {
        minx_orig = beacon[0];
    }
    if (sensor[0] > maxx_orig) {
        maxx_orig = sensor[0];
    }
    if (beacon[0] > maxx_orig) {
        maxx_orig = beacon[0];
    }
    if (sensor[1] < miny_orig) {
        miny_orig = sensor[1];
    }
    if (beacon[1] < miny_orig) {
        miny_orig = beacon[1];
    }
    if (sensor[1] > maxy_orig) {
        maxy_orig = sensor[1];
    }
    if (beacon[1] > maxy_orig) {
        maxy_orig = beacon[1];
    }
}

function dist(a, b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

function solve(part) {
    let diff = real ? 20000000 : 10;
    let minx = part == 1 ? minx_orig - diff : 0;
    let maxx = part == 1 ? maxx_orig + diff : maxcoord;

    if (part == 1) {
        let results = [];
        for (let i = minx; i <= maxx; ++i) {
            results.push(0);
        }
        // console.log('results has', results.length, 'elements');

        for (let {sensor, beacon} of data) {
            let d = dist(sensor, beacon);
            for (let i = minx; i <= maxx; ++i) {
                if (dist(sensor, [i, targety]) <= d) {
                    // console.log(i - minx);
                    results[i - minx] = 1;
                }
            }
            if (part == 1) {
                if (beacon[1] == targety) {
                    results[beacon[0] - minx] = 0;
                }
            }
        }
        let sum = 0;
        for (let i = minx; i <= maxx; ++i) {
            sum += results[i - minx];
        }
        return sum;
    } else {
        for (let targety = 0; targety < maxcoord; ++targety) {
            // console.log('targety', targety);
            let ranges = [];
            for (let {sensor, beacon} of data) {
                let d = dist(sensor, beacon);
                let width = d - Math.abs(sensor[1] - targety);
                ranges.push([sensor[0] - width, sensor[0] + width]);
            }
            ranges.sort((a, b) => a[0] - b[0]);
            let candidate = 0;
            for (let [a, b] of ranges) {
                if (candidate > maxcoord) break;
                if (a > candidate) {
                    return candidate * 4000000 + targety;
                }
                candidate = Math.max(candidate, b + 1);
            }
        }
    }
}
console.log(solve(1));
console.log(solve(2));

// 5461729

