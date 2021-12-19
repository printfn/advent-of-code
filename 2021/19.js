function mk2d(a, b) {
    let arr = [];
    for (let i = 0; i < a; ++i) {
        let row = [];
        for (let j = 0; j < b; ++j) {
            row.push(0);
        }
        arr.push(row);
    }
    return arr;
}

let scanners = {
'0': [
[65,91,116],
[-514,-323,679],
[-810,416,687],
[-670,417,-446],
[557,770,781],
[893,-705,-874],
[769,-603,624],
[-615,-434,763],
[866,-777,-839],
[-884,416,506],
[666,-551,609],
[-830,402,-478],
[714,394,-419],
[-848,390,535],
[-723,-356,-598],
[-884,-326,-497],
[715,782,804],
[717,-686,714],
[661,494,-310],
[835,-669,-705],
[-647,-375,698],
[26,-64,-42],
[540,729,799],
[-807,445,-371],
[-764,-418,-429],
[632,440,-457],

], '1': [
[623,554,-341],
[630,-553,-714],
[694,536,-542],
[-687,464,-705],
[-844,532,-645],
[813,-586,674],
[-564,576,348],
[567,-517,-838],
[756,-671,678],
[-507,-620,398],
[-386,-393,-497],
[-542,-435,-486],
[620,-612,-772],
[-77,-1,-31],
[-457,-467,-531],
[-596,439,327],
[828,-606,643],
[-710,447,340],
[40,114,47],
[-512,-705,462],
[505,928,649],
[762,555,-401],
[-636,-638,498],
[446,804,725],
[-781,626,-743],
[565,793,665],

], '2': [
[-396,-811,-616],
[717,488,380],
[-552,-346,451],
[441,-784,-675],
[-398,-811,-479],
[404,488,-883],
[-708,298,-722],
[468,-673,-592],
[-540,-745,-557],
[427,-767,-608],
[-568,825,585],
[787,-461,442],
[488,383,-838],
[44,17,-60],
[-645,820,598],
[750,360,417],
[629,-453,480],
[518,616,-826],
[689,-502,492],
[-584,770,737],
[-721,485,-662],
[-678,358,-768],
[708,420,516],
[-638,-442,511],
[-576,-495,459],

], '3': [
[-586,-450,-590],
[-727,576,-754],
[26,-50,57],
[296,660,742],
[420,723,706],
[362,713,647],
[-628,-549,-574],
[637,-293,866],
[603,-364,792],
[325,-570,-316],
[-782,511,-717],
[331,-669,-307],
[557,937,-229],
[-629,-741,646],
[-706,407,542],
[-82,47,164],
[417,908,-244],
[-650,-601,769],
[-821,503,-650],
[-654,397,723],
[648,-449,824],
[-627,-512,-662],
[-643,-726,893],
[534,839,-306],
[-588,406,593],
[449,-506,-292],

], '4': [
[-629,-448,-538],
[-451,559,699],
[12,137,65],
[734,-533,479],
[701,437,-739],
[665,758,756],
[-142,50,-4],
[746,542,-823],
[455,-619,-759],
[538,-730,-786],
[-821,-517,693],
[-579,-407,-440],
[-554,414,-477],
[-749,-476,755],
[633,713,841],
[-617,-399,-598],
[-475,435,635],
[487,-519,464],
[610,-540,604],
[-517,542,-510],
[707,747,912],
[-653,474,-519],
[-466,441,536],
[689,670,-709],
[471,-713,-800],
[-733,-518,656],

], '5': [
[-350,-557,-558],
[534,-303,-707],
[-36,79,-85],
[-474,-620,-594],
[-657,467,-508],
[438,792,658],
[422,773,820],
[600,-294,-577],
[596,704,-531],
[589,829,-407],
[-543,854,491],
[382,821,740],
[-702,552,-476],
[-847,-613,513],
[-646,-684,495],
[-787,-752,514],
[652,-304,-758],
[-445,791,585],
[-483,697,423],
[483,-527,472],
[-416,-610,-653],
[550,-452,548],
[382,-471,503],
[575,844,-654],
[-691,396,-434],

], '6': [
[665,-388,856],
[-902,331,695],
[-747,-602,710],
[401,-727,-532],
[-842,376,680],
[396,-780,-707],
[591,553,-658],
[694,-414,892],
[-827,-571,691],
[502,377,655],
[576,605,-761],
[-512,-437,-661],
[-813,512,-738],
[437,436,623],
[419,-768,-549],
[-734,-410,733],
[-9,60,-48],
[-531,-487,-869],
[-615,-446,-791],
[486,688,-709],
[513,-414,818],
[-712,333,698],
[-671,498,-758],
[-819,380,-777],
[521,325,522],

], '7': [
[-757,981,603],
[338,-318,715],
[-552,-640,560],
[661,-339,-711],
[-790,870,490],
[754,439,319],
[673,-316,-553],
[380,611,-391],
[-660,-511,-602],
[-624,-591,635],
[-627,-510,499],
[373,-256,727],
[-619,893,-522],
[-845,963,415],
[596,507,377],
[330,592,-599],
[-795,-406,-551],
[693,563,421],
[-605,751,-502],
[-133,-1,-57],
[-712,-496,-499],
[339,695,-469],
[620,-321,-728],
[405,-288,517],
[-487,899,-483],

], '8': [
[-575,-817,237],
[-795,503,280],
[-784,347,-758],
[548,860,627],
[743,-729,-870],
[426,515,-910],
[-166,-12,-31],
[574,849,545],
[663,-777,-910],
[581,-748,-854],
[-484,-785,-703],
[-604,-843,273],
[-731,-800,-717],
[-756,-817,311],
[377,-816,451],
[-654,338,-692],
[409,-831,291],
[-768,365,283],
[302,-788,314],
[-608,-660,-696],
[395,571,-809],
[681,835,531],
[471,496,-742],
[-779,484,347],
[-835,348,-640],

], '9': [
[-539,-718,-844],
[485,-535,-554],
[950,532,-710],
[-601,-526,777],
[-468,-507,725],
[-306,518,-866],
[-518,-635,-889],
[843,561,471],
[529,-527,269],
[-428,897,771],
[-443,837,726],
[854,592,-796],
[165,-21,-100],
[-564,-560,-804],
[512,-594,283],
[-500,-442,666],
[623,-511,310],
[-406,481,-984],
[551,-476,-698],
[835,523,629],
[-425,707,769],
[485,-398,-556],
[801,540,-734],
[794,573,531],
[-395,561,-866],

], '10': [
[-539,528,-785],
[620,-478,-368],
[-509,-552,-501],
[472,735,835],
[442,537,768],
[-409,441,480],
[-353,397,577],
[-620,488,-641],
[-541,-449,834],
[7,-85,106],
[558,599,-320],
[475,-708,553],
[470,-533,500],
[-457,-371,793],
[-438,-579,843],
[671,-575,-376],
[575,-582,-440],
[-566,545,-629],
[612,510,-246],
[-499,-609,-305],
[-508,-436,-324],
[410,747,800],
[692,691,-273],
[-285,339,419],
[493,-691,512],

], '11': [
[367,-454,-454],
[475,806,-642],
[-114,30,-142],
[-781,625,591],
[663,-462,285],
[-662,741,-663],
[293,-635,-454],
[-640,-602,-611],
[-467,-463,793],
[329,-606,-428],
[487,771,293],
[490,961,291],
[-704,757,-762],
[-647,-726,-486],
[-773,587,433],
[530,-443,337],
[494,886,-611],
[-450,-530,779],
[452,793,-450],
[-732,637,531],
[-37,123,4],
[-661,-479,-471],
[562,-378,396],
[-561,-447,752],
[-663,829,-700],
[505,901,336],

], '12': [
[-844,-686,-461],
[831,-405,-512],
[426,754,489],
[357,704,-659],
[-535,558,362],
[240,669,-581],
[387,779,-588],
[-32,121,-94],
[546,-425,440],
[-739,625,-706],
[-950,-740,552],
[-134,13,56],
[-803,-521,-396],
[-897,615,-832],
[-867,-575,-539],
[525,712,505],
[-817,-761,693],
[738,-402,453],
[488,713,417],
[577,-444,360],
[-527,519,429],
[760,-356,-623],
[-880,-719,693],
[-773,717,-859],
[828,-416,-540],
[-600,613,325],

], '13': [
[406,-575,574],
[478,781,-595],
[-134,-129,85],
[-670,464,522],
[407,496,771],
[-798,-546,911],
[639,-645,-613],
[-729,-542,956],
[-503,599,-446],
[249,459,834],
[-671,-503,945],
[-488,508,-335],
[-48,18,1],
[-757,451,594],
[-729,-591,-360],
[256,504,653],
[-398,594,-305],
[-681,248,591],
[-580,-672,-374],
[-475,-585,-371],
[602,-480,-661],
[439,-452,509],
[414,-486,712],
[638,-472,-505],
[600,664,-596],
[587,784,-475],

], '14': [
[-694,776,767],
[-533,741,-630],
[-404,-717,-823],
[483,-706,316],
[-80,1,-140],
[-532,-351,541],
[468,-694,555],
[773,798,463],
[-608,817,-563],
[-690,-389,458],
[710,704,365],
[-386,-711,-803],
[57,172,-101],
[740,549,-462],
[711,631,-518],
[-765,794,566],
[616,866,403],
[562,-696,514],
[363,-454,-536],
[692,469,-502],
[-451,-758,-714],
[415,-230,-543],
[-569,-418,512],
[325,-332,-586],
[-833,775,707],
[-552,786,-462],

], '15': [
[-12,-84,63],
[-772,-427,-692],
[-793,-461,-733],
[719,552,669],
[414,460,-823],
[-630,-742,273],
[508,501,-825],
[-744,557,-518],
[483,-454,-546],
[-571,-818,397],
[471,-420,762],
[-819,449,665],
[-887,308,646],
[370,-541,-534],
[-136,-25,-123],
[-586,474,-480],
[-668,-430,-870],
[-748,248,647],
[294,-461,-644],
[562,612,737],
[-623,503,-547],
[429,699,-835],
[656,650,575],
[-690,-758,408],
[585,-433,754],
[439,-441,625],

], '16': [
[596,-593,418],
[-820,646,-381],
[638,802,-496],
[-1,71,103],
[-674,518,-399],
[-916,-524,664],
[647,-609,-454],
[-620,529,537],
[-792,-560,601],
[587,786,666],
[-107,-67,179],
[-479,548,469],
[817,-647,-500],
[609,832,-520],
[-799,593,-449],
[-626,-312,-582],
[710,845,-383],
[676,-722,-453],
[-609,-487,-657],
[600,-678,475],
[-850,-619,611],
[-419,547,608],
[-646,-423,-598],
[571,921,726],
[565,-613,403],
[647,797,785],

], '17': [
[-404,492,-456],
[896,680,623],
[63,-49,38],
[-340,577,-451],
[-620,526,812],
[775,-306,871],
[-40,89,-73],
[743,-354,-543],
[-616,611,869],
[658,-368,802],
[544,762,-486],
[772,644,686],
[-651,-359,-631],
[861,-369,-706],
[555,804,-330],
[-465,-590,412],
[-604,-339,-596],
[-383,-598,308],
[-488,-595,452],
[-440,559,-580],
[589,730,-401],
[-584,-538,-599],
[-585,591,884],
[635,-291,900],
[867,-378,-607],
[830,585,676],

], '18': [
[664,-543,735],
[638,469,-766],
[678,457,392],
[-700,-415,369],
[637,551,390],
[635,-580,668],
[-39,-39,37],
[-698,-711,-544],
[-818,-698,-665],
[-815,-589,-545],
[-420,404,856],
[119,8,-73],
[-463,314,754],
[446,-713,-479],
[581,-701,697],
[439,472,380],
[-413,352,632],
[-591,-462,328],
[-628,287,-835],
[-680,-397,375],
[557,618,-780],
[-542,377,-805],
[-633,392,-694],
[438,-749,-635],
[611,-750,-527],
[551,364,-769],

], '19': [
[473,682,455],
[-834,-721,461],
[587,626,546],
[564,-479,651],
[-545,-765,-540],
[-78,-2,-37],
[-711,617,612],
[-722,496,598],
[831,531,-771],
[-518,616,-871],
[614,-696,-440],
[726,-573,613],
[855,473,-742],
[719,416,-765],
[647,750,477],
[-490,459,-778],
[-451,525,-896],
[-846,-706,700],
[-737,628,496],
[751,-664,-419],
[-557,-652,-453],
[743,-550,-432],
[658,-416,553],
[-655,-841,-460],
[-836,-627,502],

], '20': [
[809,-632,570],
[-591,-730,-747],
[629,-731,-555],
[582,721,920],
[-714,-709,-607],
[705,-538,497],
[-487,-653,401],
[681,383,-768],
[-538,-771,400],
[-554,270,418],
[694,406,-576],
[772,-577,505],
[-747,224,-764],
[-566,298,-764],
[-543,334,537],
[441,700,850],
[-838,-716,-732],
[-527,267,556],
[-718,260,-790],
[774,425,-607],
[441,742,787],
[-668,-705,391],
[40,-182,76],
[717,-732,-518],
[645,-773,-456],
[-127,-81,-24],

], '21': [
[533,-731,630],
[788,548,552],
[684,716,-498],
[-271,702,-440],
[554,791,-559],
[571,-655,690],
[167,144,161],
[-344,778,-442],
[-751,-420,-734],
[-631,565,434],
[683,683,603],
[469,-591,-728],
[140,-18,49],
[-649,-736,760],
[-742,-538,-701],
[407,-753,658],
[-800,529,376],
[554,-525,-666],
[-785,-445,-715],
[508,-638,-686],
[-647,-639,771],
[698,631,500],
[-765,457,403],
[603,719,-634],
[-308,674,-285],
[-538,-693,781],

], '22': [
[62,5,12],
[-313,488,594],
[-312,-645,454],
[-381,692,-711],
[479,-656,617],
[-312,-464,380],
[-344,-373,-560],
[538,-721,649],
[-298,520,434],
[-352,774,-767],
[-286,-493,416],
[880,699,-452],
[-469,-497,-553],
[-329,-620,-574],
[921,-569,-363],
[460,640,541],
[165,120,110],
[791,697,-450],
[-400,854,-727],
[718,808,-445],
[-341,413,457],
[427,-637,750],
[522,471,500],
[935,-636,-380],
[894,-652,-474],
[430,539,380],

], '23': [
[584,-628,701],
[687,619,544],
[509,-313,-531],
[429,-353,-579],
[591,-369,-560],
[-572,-433,523],
[573,710,600],
[758,612,-498],
[-746,465,-788],
[-494,-387,-908],
[-734,704,-803],
[747,688,668],
[-372,-437,-946],
[-736,663,-709],
[-270,-394,-856],
[-622,567,414],
[-632,-441,668],
[-611,553,535],
[-661,-423,532],
[664,514,-561],
[586,-630,612],
[475,-635,539],
[-637,669,546],
[826,552,-655],
[39,30,-173],

], '24': [
[-403,-570,-427],
[835,-850,759],
[-354,587,-617],
[618,567,574],
[-509,-951,874],
[647,-674,-595],
[638,706,-432],
[563,799,-377],
[-541,-787,776],
[57,-145,118],
[-374,729,-603],
[-335,546,825],
[708,-804,-670],
[673,679,471],
[663,719,575],
[751,817,-465],
[-351,-660,-510],
[877,-889,712],
[101,27,2],
[-360,680,947],
[783,-755,-598],
[815,-804,646],
[-335,735,-735],
[-454,-675,-562],
[-481,-825,852],
[-281,654,798],

], '25': [
[483,-365,519],
[562,-828,-670],
[93,27,-47],
[-415,786,411],
[664,518,-347],
[883,371,601],
[-574,548,-810],
[904,504,742],
[-505,-426,-416],
[-472,424,-783],
[-376,794,478],
[-470,721,374],
[-12,108,76],
[-482,582,-657],
[487,-526,567],
[721,-840,-748],
[829,477,-412],
[718,454,-490],
[-440,-812,687],
[-446,-560,-430],
[-371,-487,-404],
[639,-791,-711],
[-483,-706,741],
[604,-431,547],
[-525,-794,680],
[862,441,742],
]
};

const NO_ROT_IDX = 11;

function roll(v) {
    return [v[0],v[2],-v[1]];
}

function turn(v) {
    return [-v[1],v[0],v[2]];
}

function scannerrot(id) {
    let outer = [];
    for (let [ox,oy,oz] of scanners[id]) {
        let result = [];
        let v = [ox, oy, oz];
        for (let cycle of [0, 1]) {
            for (let step of [0, 1, 2]) {
                v = roll(v);
                result.push(v);
                for (let i of [0, 1, 2]) {
                    v = turn(v);
                    result.push(v);
                }
            }
            v = roll(turn(roll(v)))
        }
        outer.push(result);
    }
    let flipped = mk2d(outer[0].length, outer.length);
    for (let i = 0; i < outer[0].length; ++i) {
        for (let j = 0; j < outer.length; ++j) {
            flipped[i][j] = outer[j][i];
        }
    }
    return flipped;
}

let REQ_OVERLAP = 12;
let noresults = {};
let finalmap = [];

function tryoverlap(id1, id2, scannerov) {
    if (noresults[[id1,id2]]) return;
    if (noresults[[id2,id1]]) return;
    if (typeof scannerov == 'undefined') {
        scannerov = {
            rotidx: NO_ROT_IDX,
            dx: 0,
            dy: 0,
            dz: 0,
        };
    }
    let perm1 = scannerrot(id1)[scannerov.rotidx];
    for (let i = 0; i < perm1.length; ++i) {
        perm1[i][0] += scannerov.dx;
        perm1[i][1] += scannerov.dy;
        perm1[i][2] += scannerov.dz;
    }
    let count1 = 0;
    for (let [x1,y1,z1] of perm1) {
        if (!finc(x1, y1, z1)) {
            throw new Error('failed to find existing location');
        }
    }

    for (let [x1,y1,z1] of perm1) {
        let rot2 = scannerrot(id2);
        for (let rotidx in rot2) {
            let perm2 = rot2[rotidx];
            for (let [x2,y2,z2] of perm2) {
                let dx = x1 - x2;
                let dy = y1 - y2;
                let dz = z1 - z2;
                let count = 0;
                for (let [x1_,y1_,z1_] of perm1) {
                    for (let [x2_,y2_,z2_] of perm2) {
                        if (   x1_ == x2_ + dx
                            && y1_ == y2_ + dy
                            && z1_ == z2_ + dz) {

                            ++count;
                        }
                    }
                }
                if (count >= REQ_OVERLAP) {
                    let res = { dx, dy, dz, rotidx: parseInt(rotidx) };
                    res.normalisedPos = [];
                    let count2 = 0;
                    for (let [x2_,y2_,z2_] of perm2) {
                        if (finc(x2_ + dx, y2_ + dy, z2_ + dz)) ++count2;
                        res.normalisedPos.push([x2_ + dx, y2_ + dy, z2_ + dz]);
                    }
                    return res;
                }
            }
        }
    }
    noresults[[id1,id2]] = true;
}

function finc(x,y,z) {
    for (let [fx,fy,fz] of finalmap) {
        if (fx == x && fy == y && fz == z) {
            return true;
        }
    }
    return false;
}
for (let [x,y,z] of scanners[0]) {
    finalmap.push([x,y,z]);
}
let found_scanners = [0];
let scannerovs = {};
scannerovs[0] = {
    dx: 0,
    dy: 0,
    dz: 0,
    rotidx: NO_ROT_IDX,
}
let remaining_scanners = [];
for (let i = 1; i <= 25; ++i) {
    remaining_scanners.push(i);
}
outer: while (remaining_scanners.length > 0) {
    for (let scannerid of remaining_scanners) {
        for (let existing of found_scanners) {
            if (scannerid == existing) {
                throw new Error();
            }
            let ov = tryoverlap(existing, scannerid, scannerovs[existing]);
            if (ov) {
                let overlapcount = 0;
                for (let [ox,oy,oz] of ov.normalisedPos) {
                    if (finc(ox,oy,oz)) {
                        ++overlapcount;
                    } else {
                        finalmap.push([ox,oy,oz]);
                    }
                }

                if (overlapcount < REQ_OVERLAP) {
                    throw new Error('internal');
                }
                found_scanners.push(scannerid);
                remaining_scanners.splice(remaining_scanners.indexOf(scannerid), 1);
                scannerovs[scannerid] = ov;
                continue outer;
            }
        }
    }
}
console.log(finalmap.length);
let maxdist = 0;
for (let i = 0; i <= 25; ++i) {
    for (let j = 0; j <= 25; ++j) {
        let dist = Math.abs(scannerovs[i].dx - scannerovs[j].dx) +
            Math.abs(scannerovs[i].dy - scannerovs[j].dy) +
            Math.abs(scannerovs[i].dz - scannerovs[j].dz);
        if (dist > maxdist) {
            maxdist = dist;
        }
    }
}
console.log(maxdist);