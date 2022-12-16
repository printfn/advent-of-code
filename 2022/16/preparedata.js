let data = {
HM: { rate: 0, tunnels: 'LS, YS'.split(', ') },
IY: { rate: 15, tunnels: 'YI, MU, KN, QS, QM'.split(', ') },
VI: { rate: 22, tunnels: 'LE, SE, RB, JR'.split(', ') },
SE: { rate: 0, tunnels: 'VI, AZ'.split(', ') },
QU: { rate: 0, tunnels: 'YC, QK'.split(', ') },
RB: { rate: 0, tunnels: 'AN, VI'.split(', ') },
PU: { rate: 0, tunnels: 'JR, IM'.split(', ') },
OA: { rate: 0, tunnels: 'KZ, FR'.split(', ') },
AQ: { rate: 23, tunnels: 'FA, QM, GE'.split(', ') },
QS: { rate: 0, tunnels: 'IM, IY'.split(', ') },
HC: { rate: 24, tunnels: 'XH'.split(', ') },
QI: { rate: 0, tunnels: 'KQ, LS'.split(', ') },
FA: { rate: 0, tunnels: 'HA, AQ'.split(', ') },
BA: { rate: 0, tunnels: 'KZ, ME'.split(', ') },
DH: { rate: 0, tunnels: 'LT, HA'.split(', ') },
TE: { rate: 0, tunnels: 'AA, ZJ'.split(', ') },
AA: { rate: 0, tunnels: 'YS, XT, TE, GY, FS'.split(', ') },
YC: { rate: 9, tunnels: 'DV, XH, DJ, QU'.split(', ') },
KN: { rate: 0, tunnels: 'IY, AZ'.split(', ') },
GS: { rate: 0, tunnels: 'FS, KZ'.split(', ') },
DJ: { rate: 0, tunnels: 'YC, UV'.split(', ') },
GY: { rate: 0, tunnels: 'QK, AA'.split(', ') },
ZJ: { rate: 6, tunnels: 'RC, HS, UV, ME, TE'.split(', ') },
RC: { rate: 0, tunnels: 'BY, ZJ'.split(', ') },
QK: { rate: 10, tunnels: 'QU, XX, HS, RM, GY'.split(', ') },
AN: { rate: 0, tunnels: 'HA, RB'.split(', ') },
XT: { rate: 0, tunnels: 'AA, KQ'.split(', ') },
LT: { rate: 0, tunnels: 'IM, DH'.split(', ') },
YI: { rate: 0, tunnels: 'LE, IY'.split(', ') },
BK: { rate: 0, tunnels: 'LS, RM'.split(', ') },
LE: { rate: 0, tunnels: 'VI, YI'.split(', ') },
IM: { rate: 19, tunnels: 'PU, EC, QS, LT'.split(', ') },
SK: { rate: 0, tunnels: 'RF, AZ'.split(', ') },
RM: { rate: 0, tunnels: 'QK, BK'.split(', ') },
YM: { rate: 0, tunnels: 'LS, KZ'.split(', ') },
DV: { rate: 0, tunnels: 'YC, AI'.split(', ') },
QM: { rate: 0, tunnels: 'IY, AQ'.split(', ') },
KZ: { rate: 5, tunnels: 'BA, GS, YM, OA, XX'.split(', ') },
FS: { rate: 0, tunnels: 'GS, AA'.split(', ') },
UV: { rate: 0, tunnels: 'DJ, ZJ'.split(', ') },
AZ: { rate: 20, tunnels: 'SE, KN, SK, MS'.split(', ') },
BY: { rate: 0, tunnels: 'RC, LS'.split(', ') },
OY: { rate: 0, tunnels: 'KQ, EI'.split(', ') },
XX: { rate: 0, tunnels: 'KZ, QK'.split(', ') },
ME: { rate: 0, tunnels: 'BA, ZJ'.split(', ') },
YS: { rate: 0, tunnels: 'AA, HM'.split(', ') },
MS: { rate: 0, tunnels: 'AZ, HA'.split(', ') },
HS: { rate: 0, tunnels: 'QK, ZJ'.split(', ') },
LS: { rate: 3, tunnels: 'BK, HM, QI, BY, YM'.split(', ') },
KQ: { rate: 17, tunnels: 'OY, XT, QI'.split(', ') },
MU: { rate: 0, tunnels: 'IY, HA'.split(', ') },
EC: { rate: 0, tunnels: 'IM, GE'.split(', ') },
XH: { rate: 0, tunnels: 'HC, YC'.split(', ') },
JR: { rate: 0, tunnels: 'PU, VI'.split(', ') },
EI: { rate: 0, tunnels: 'OY, RF'.split(', ') },
AI: { rate: 25, tunnels: 'DV'.split(', ') },
GE: { rate: 0, tunnels: 'AQ, EC'.split(', ') },
RF: { rate: 18, tunnels: 'EI, FR, SK'.split(', ') },
FR: { rate: 0, tunnels: 'OA, RF'.split(', ') },
HA: { rate: 12, tunnels: 'AN, FA, MU, MS, DH'.split(', ') },
};

// data = {
// AA: { rate: 0, tunnels: 'DD, II, BB'.split(', ') },
// BB: { rate: 13, tunnels: 'CC, AA'.split(', ') },
// CC: { rate: 2, tunnels: 'DD, BB'.split(', ') },
// DD: { rate: 20, tunnels: 'CC, AA, EE'.split(', ') },
// EE: { rate: 3, tunnels: 'FF, DD'.split(', ') },
// FF: { rate: 0, tunnels: 'EE, GG'.split(', ') },
// GG: { rate: 0, tunnels: 'FF, HH'.split(', ') },
// HH: { rate: 22, tunnels: 'GG'.split(', ') },
// II: { rate: 0, tunnels: 'AA, JJ'.split(', ') },
// JJ: { rate: 21, tunnels: 'II'.split(', ') },
// };

// transform data to numeric
let map = [];
for (let key in data) {
    if (data[key].rate != 0) {
        map.push(key);
    }
}
for (let key in data) {
    if (data[key].rate == 0) {
        map.push(key);
    }
}
let newdata = [];
for (let key of map) {
    newdata.push({
        rate: data[key].rate,
        tunnels: data[key].tunnels.map(e => map.indexOf(e)),
    });
}
data = newdata;

const initialpos = map.indexOf('AA');
let count = 0;

console.log(data);
console.log(initialpos);
