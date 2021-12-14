let input = {
'BV': 'O',
'OS': 'P',
'KP': 'P',
'VK': 'S',
'FS': 'C',
'OK': 'P',
'KC': 'S',
'HV': 'F',
'HC': 'K',
'PF': 'N',
'NK': 'F',
'SC': 'V',
'CO': 'K',
'PO': 'F',
'FB': 'P',
'CN': 'K',
'KF': 'N',
'NH': 'S',
'SF': 'P',
'HP': 'P',
'NP': 'F',
'OV': 'O',
'OP': 'P',
'HH': 'C',
'FP': 'P',
'CS': 'O',
'SK': 'O',
'NS': 'F',
'SN': 'S',
'SP': 'H',
'BH': 'B',
'NO': 'O',
'CB': 'N',
'FO': 'N',
'NC': 'C',
'VF': 'N',
'CK': 'C',
'PC': 'H',
'BP': 'B',
'NF': 'O',
'BB': 'C',
'VN': 'K',
'OH': 'K',
'CH': 'F',
'VB': 'N',
'HO': 'P',
'FH': 'K',
'PK': 'H',
'CC': 'B',
'VH': 'B',
'BF': 'N',
'KS': 'V',
'PV': 'B',
'CP': 'N',
'PB': 'S',
'VP': 'V',
'BO': 'B',
'HS': 'H',
'BS': 'F',
'ON': 'B',
'HB': 'K',
'KH': 'B',
'PP': 'H',
'BN': 'C',
'BC': 'F',
'KV': 'K',
'VO': 'P',
'SO': 'V',
'OF': 'O',
'BK': 'S',
'PH': 'V',
'SV': 'F',
'CV': 'H',
'OB': 'N',
'SS': 'H',
'VV': 'B',
'OO': 'V',
'CF': 'H',
'KB': 'F',
'NV': 'B',
'FV': 'V',
'HK': 'P',
'VS': 'P',
'FF': 'P',
'HN': 'N',
'FN': 'F',
'OC': 'K',
'SH': 'V',
'KO': 'C',
'HF': 'B',
'PN': 'N',
'SB': 'F',
'VC': 'B',
'FK': 'S',
'KK': 'N',
'FC': 'F',
'NN': 'P',
'NB': 'V',
'PS': 'S',
'KN': 'S',
};

let r = 'FSKBVOSKPCPPHVOPVFPC';

// r = 'NNCB';
// input = {
// 'CH': 'B',
// 'HH': 'N',
// 'CB': 'H',
// 'NH': 'C',
// 'HB': 'C',
// 'HC': 'B',
// 'HN': 'C',
// 'NN': 'C',
// 'BH': 'H',
// 'NC': 'B',
// 'NB': 'B',
// 'BN': 'B',
// 'BB': 'N',
// 'BC': 'B',
// 'CC': 'N',
// 'CN': 'C',
// }

function solve(steps) {
    let pairfreqs = {};
    pairfreqs['_' + r[0]] = 1;
    for (let i = 1; i < r.length; ++i) {
        if (!pairfreqs[r[i-1] + r[i]])
            pairfreqs[r[i-1] + r[i]] = 1;
        else
            ++pairfreqs[r[i-1] + r[i]];
    }

    function add(obj, key, val) {
        if (!obj[key]) {
            obj[key] = val;
        } else {
            obj[key] += val;
        }
    }

    for (let s = 0; s < steps; ++s) {
        let next = {};
        for (let pf in pairfreqs) {
            if (input[pf]) {
                add(next, pf[0] + input[pf], pairfreqs[pf]);
                add(next, input[pf] + pf[1], pairfreqs[pf]);
            } else {
                add(next, pf, pairfreqs[pf]);
            }
        }
        pairfreqs = next;
    }

    let freqs = {};
    for (let pf in pairfreqs) {
        add(freqs, pf[1], pairfreqs[pf]);
    }

    let max = 0;
    let min = 10000000000000000;
    for (let x in freqs) {
        if (freqs[x] > max) {
            max = freqs[x];
        }
        if (freqs[x] < min) {
            min = freqs[x];
        }
    }
    console.log(max - min);
}
solve(10);
solve(40);
