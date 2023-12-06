let times = [56, 71, 79, 99];
let dists = [334, 1135, 1350, 2430];

// times = [7, 15, 30];
// dists = [9, 40, 200];

function calc(hold, duration) {
    let speed = hold;
    let dist = (duration - hold) * speed;
    return dist;
}

function ways(duration, dist) {
    let ways = 0;
    for (let hold = 0; hold < duration; ++hold) {
        if (calc(hold, duration) > dist)
            ways++;
    }
    return ways;
}

let product = 1;
for (let i = 0; i < times.length; ++i) {
    product *= ways(times[i], dists[i]);
}
console.log(product);

let time = 56717999;
let dist = 334113513502430;
console.log(ways(time, dist));
