let tx1=265;
let tx2=287;
let ty1=-103
let ty2=-58;

let maxy = -10000;
let velcount = 0;
for (let ivx = -1000; ivx < 1000; ++ivx) {
    outer: for (let ivy = -1000; ivy < 1000; ++ivy) {
        let thismaxy = 0;
        let probex = 0;
        let probey = 0;
        let vx = ivx;
        let vy = ivy;
        for (let i = 0; i < 1000; ++i) {
            probex += vx;
            probey += vy;
            vx -= Math.sign(vx);
            vy -= 1;
            if (probey > thismaxy) thismaxy = probey;
            if (probex >= tx1 && probex <= tx2 && probey >= ty1 && probey <= ty2) {
                // inside
                ++velcount;
                if (thismaxy > maxy) {
                    maxy = thismaxy;
                }
                continue outer;
            }
        }
    }
}

console.log(maxy);
console.log(velcount);
