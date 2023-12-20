let input = `%vg -> lf, vd
%dr -> kg
%cn -> mv, pt
%rq -> bk, gr
%vp -> lp, bk
%kg -> lv
%lv -> jc, tp
%sj -> rm, vd
%jc -> tp, qr
%km -> tp, dr
%jx -> cn
&vd -> tf, lf, nb, cx, hx, lr
%lp -> jt, bk
%vj -> ps
broadcaster -> km, lr, xh, rf
%dj -> pt, gc
%cg -> vd, hx
&ln -> tg
%fl -> pt, sk
%lm -> tr, bk
%lr -> vd, vg
&pt -> vq, rf, cm, jx, rg
%cx -> gp
%gp -> vd, sj
&db -> tg
%st -> vd
%jt -> bk
%jh -> lm, bk
%xf -> bd, tp
%gc -> cm, pt
&tp -> dr, km, kg, db, vj, qr
%ps -> xf, tp
%rf -> pt, dj
%lf -> nb
%bd -> tp, gg
%dk -> tp, vj
%mn -> jh, bk
&tg -> rx
%ql -> bk, zx
%tr -> bk, vp
%sk -> pt
%nb -> cg
%sb -> vd, cx
%qr -> dk
%xh -> bk, ql
%rg -> sd
%hx -> sb
%sd -> pt, jx
%gr -> bk, mn
%gg -> tp
%zx -> rq
&bk -> xh, ln, zx
%rm -> st, vd
%hq -> fl, pt
&vq -> tg
%cm -> rg
&tf -> tg
%mv -> pt, hq`;

let sample = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`;

let sample2 = `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`;

function printPulses(pulses) {
    for (const p of pulses) {
        console.log(`${p.pulseSrc} -${p.type ? 'high' : 'low'}-> ${p.module.src}`);
    }
}

function solve(input, part) {
    const modules = input.split('\n').map(line => {
        let [src, dstString] = line.split(' -> ');
        let result = {
            type: src === 'broadcaster' ? 'broadcaster' : src.substring(0, 1),
            src: src === 'broadcaster' ? 'broadcaster' : src.substring(1),
            dst: dstString.split(', '),
        };
        if (result.type === '%') {
            result.memory = false;
        }
        if (result.type === '&') {
            result.memory = {};
        }
        return result;
    });
    modules.forEach(conj => {
        if (conj.type !== '&') return;
        modules.forEach(src => {
            if (src.dst.includes(conj.src)) {
                conj.memory[src.src] = false;
            }
        });
    });
    modules.forEach(m => {
        for (const dst of m.dst) {
            if (modules.find(m => m.src === dst)) continue;
            modules.push({ type: '?', src: dst, dst: [] });
        }
    });
    let pulseQueue = [];
    let pulseIdx = 0;
    let buttonPresses = 0;
    let part2Loops = {};
    function button() {
        ++buttonPresses;
        pulseQueue.push({ type: false, module: modules.find(m => m.type === 'broadcaster'), pulseSrc: 'button' });
    }
    function process() {
        while (pulseIdx < pulseQueue.length) {
            let { type, module, pulseSrc } = pulseQueue[pulseIdx++];
            switch (module.type) {
                case 'broadcaster':
                    for (const dst of modules) {
                        if (module.dst.includes(dst.src)) {
                            pulseQueue.push({ type: type, module: dst, pulseSrc: 'broadcaster' });
                        }
                    }
                    break;
                case '%':
                    if (type) continue;
                    module.memory = !module.memory;
                    for (const dst of modules) {
                        if (module.dst.includes(dst.src)) {
                            pulseQueue.push({ type: module.memory, module: dst, pulseSrc: module.src });
                        }
                    }
                    break;
                case '&':
                    if (module.src === 'tg' && part2Loops[pulseSrc] === undefined && type) {
                        part2Loops[pulseSrc] = buttonPresses;
                    }
                    module.memory[pulseSrc] = type;
                    const outputType = Object.values(module.memory).every(b => b) ? false : true;
                    for (const dst of modules) {
                        if (module.dst.includes(dst.src)) {
                            pulseQueue.push({ type: outputType, module: dst, pulseSrc: module.src });
                        }
                    }
                    break;
            }
        }
    }
    if (part === 1) {
        for (let i = 0; i < 1000; ++i) {
            button();
            process();
        }
        let countHigh = 0, countLow = 0;
        // printPulses(pulseQueue.slice(0, 20));
        for (let p of pulseQueue) {
            if (p.type) {
                ++countHigh;
            } else {
                ++countLow;
            }
        }
        // console.log(countHigh, countLow);
        return countHigh * countLow;
    } else {
        while (true) {
            button();
            process();
            pulseQueue = [];
            pulseIdx = 0;
            if (Object.keys(part2Loops).length === 4) {
                // console.log(Object.values(part2Loops));
                return Object.values(part2Loops).reduce((a, b) => a * b);
            }
        }
    }
}

// console.log(solve(sample, 1));
// console.log(solve(sample2, 1));
console.log(solve(input, 1));
console.log(solve(input, 2));