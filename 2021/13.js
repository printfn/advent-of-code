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

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function assert(res) {
    if (!res) {
        throw new Error('assertion failed');
    }
}

// from https://stackoverflow.com/a/14853974
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

// from https://stackoverflow.com/a/20871714
function permutator(inputArr) {
  var results = [];

  function permute(arr, memo) {
    var cur, memo = memo || [];

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}

let input = [
[647,840],
[99,833],
[318,50],
[445,505],
[125,684],
[1154,189],
[758,236],
[1136,472],
[371,574],
[572,159],
[1223,438],
[1165,889],
[298,667],
[1215,530],
[435,183],
[453,210],
[142,628],
[2,488],
[462,135],
[126,586],
[1173,473],
[284,834],
[242,38],
[1203,21],
[638,245],
[1258,451],
[1309,600],
[863,149],
[336,803],
[440,686],
[87,639],
[241,82],
[1113,448],
[142,471],
[875,711],
[1124,851],
[581,833],
[1121,220],
[1094,227],
[1228,159],
[1228,590],
[6,532],
[266,691],
[754,558],
[956,168],
[658,406],
[231,194],
[869,700],
[594,203],
[848,862],
[1261,133],
[395,658],
[1048,390],
[1004,828],
[276,735],
[512,579],
[94,424],
[663,779],
[1228,266],
[686,33],
[929,791],
[82,12],
[662,84],
[64,392],
[156,705],
[1242,471],
[1268,217],
[1265,848],
[1113,446],
[284,60],
[52,443],
[1012,667],
[1205,551],
[1201,411],
[928,794],
[1230,648],
[711,133],
[382,726],
[1309,180],
[1200,143],
[1044,691],
[818,292],
[325,714],
[28,437],
[602,751],
[842,43],
[1180,658],
[842,267],
[431,2],
[724,121],
[512,763],
[246,361],
[1309,294],
[922,380],
[1016,658],
[1201,483],
[1288,130],
[536,301],
[589,606],
[94,470],
[647,392],
[1136,24],
[1006,92],
[1288,428],
[653,404],
[515,558],
[884,502],
[82,590],
[1093,343],
[366,829],
[994,24],
[736,607],
[1233,390],
[462,32],
[160,542],
[748,248],
[899,770],
[803,569],
[1026,665],
[199,652],
[822,576],
[539,327],
[872,246],
[177,82],
[669,364],
[1173,695],
[798,579],
[976,810],
[734,856],
[1139,390],
[395,812],
[224,478],
[1208,66],
[494,306],
[765,411],
[584,642],
[817,742],
[1010,726],
[184,539],
[494,394],
[381,133],
[1176,583],
[1272,681],
[930,323],
[165,42],
[1261,761],
[786,658],
[880,317],
[1069,82],
[671,92],
[574,648],
[766,246],
[753,270],
[453,658],
[90,751],
[1191,768],
[1032,399],
[636,799],
[944,829],
[1237,56],
[790,414],
[1068,856],
[365,355],
[147,569],
[174,472],
[494,754],
[192,480],
[1145,42],
[489,458],
[1136,283],
[1303,583],
[878,137],
[109,756],
[157,667],
[636,95],
[975,667],
[209,876],
[196,210],
[1227,602],
[1021,539],
[498,705],
[52,123],
[1042,631],
[1034,511],
[1004,645],
[142,808],
[136,511],
[290,308],
[423,250],
[95,698],
[833,82],
[534,337],
[864,665],
[907,352],
[325,742],
[423,194],
[1014,413],
[818,310],
[90,203],
[820,808],
[512,368],
[383,504],
[1207,892],
[1258,443],
[243,740],
[923,220],
[599,820],
[329,852],
[692,756],
[154,172],
[1168,490],
[648,861],
[825,891],
[537,428],
[1067,740],
[1150,52],
[1240,668],
[1054,226],
[1290,423],
[494,800],
[746,255],
[1165,5],
[711,820],
[31,443],
[492,758],
[222,585],
[195,721],
[1118,414],
[736,648],
[623,607],
[1277,343],
[1200,667],
[75,137],
[1149,212],
[564,255],
[944,661],
[818,136],
[462,862],
[473,889],
[535,126],
[329,152],
[135,271],
[904,38],
[830,24],
[1093,35],
[1067,154],
[92,117],
[1056,666],
[811,390],
[411,154],
[600,726],
[306,66],
[354,168],
[666,534],
[1279,735],
[329,180],
[411,770],
[315,646],
[663,115],
[271,372],
[1303,840],
[977,606],
[882,319],
[85,166],
[457,446],
[1191,745],
[1288,316],
[271,522],
[363,690],
[590,502],
[161,212],
[927,537],
[873,411],
[1226,408],
[930,443],
[857,12],
[437,794],
[1062,408],
[109,138],
[552,236],
[1180,236],
[1126,355],
[147,325],
[184,803],
[166,264],
[437,343],
[512,86],
[681,695],
[380,323],
[599,74],
[142,488],
[897,530],
[753,624],
[276,831],
[320,357],
[10,50],
[1283,425],
[623,735],
[403,751],
[75,361],
[663,54],
[169,443],
[224,658],
[401,838],
[826,637],
[632,18],
[217,343],
[704,210],
[438,648],
[8,249],
[38,681],
[1140,474],
[1144,500],
[8,869],
[214,700],
[1184,586],
[378,866],
[775,126],
[179,549],
[962,249],
[219,583],
[1198,208],
[986,854],
[907,751],
[898,38],
[705,581],
[606,495],
[768,271],
[1220,243],
[676,144],
[515,336],
[296,413],
[338,472],
[1034,735],
[771,865],
[1211,826],
[793,421],
[985,404],
[22,316],
[790,759],
[36,644],
[232,764],
[1079,866],
[1175,308],
[679,558],
[758,266],
[276,28],
[653,68],
[960,92],
[291,690],
[52,648],
[473,229],
[811,527],
[746,246],
[857,236],
[52,451],
[549,551],
[1242,423],
[775,149],
[1074,676],
[1009,823],
[1285,695],
[507,325],
[798,86],
[581,49],
[1074,367],
[1068,576],
[318,844],
[803,325],
[1067,124],
[412,486],
[808,172],
[353,71],
[1094,219],
[1091,172],
[132,316],
[787,675],
[863,373],
[710,726],
[274,751],
[182,204],
[1235,533],
[719,292],
[262,838],
[223,2],
[872,227],
[406,240],
[766,751],
[721,753],
[1216,470],
[130,738],
[174,870],
[652,364],
[1200,751],
[497,451],
[669,530],
[711,74],
[528,756],
[656,63],
[488,264],
[10,453],
[440,194],
[739,292],
[1016,684],
[1026,60],
[446,789],
[929,133],
[1081,178],
[306,178],
[840,249],
[306,249],
[910,890],
[736,702],
[462,759],
[74,518],
[710,278],
[726,543],
[1027,320],
[720,502],
[490,808],
[406,516],
[734,38],
[423,418],
[1034,159],
[1260,812],
[497,667],
[196,604],
[1215,698],
[750,213],
[499,390],
[1004,178],
[7,54],
[84,408],
[207,521],
[217,794],
[1186,172],
[279,193],
[837,229],
[400,4],
[186,87],
[94,578],
[634,66],
[231,812],
[687,227],
[631,446],
[939,320],
[708,3],
[1192,593],
[1,152],
[330,264],
[276,511],
[708,143],
[960,466],
[493,212],
[380,443],
[1078,764],
[664,355],
[721,606],
[982,383],
[793,695],
[1124,759],
[1159,758],
[0,63],
[813,667],
[10,422],
[447,373],
[667,198],
[395,819],
[473,665],
[782,497],
[724,423],
[1168,871],
[826,756],
[821,740],
[224,91],
[975,227],
[956,726],
[604,735],
[560,872],
[480,723],
[348,23],
[325,404],
[1290,266],
[985,490],
[113,667],
[842,627],
[1195,567],
[1185,684],
[1119,175],
[157,451],
[817,682],
[1131,549],
[1208,266],
[132,540],
[216,227],
[867,567],
[1083,826],
[912,220],
[835,549],
[734,486],
[484,474],
[145,154],
[519,308],
[119,96],
[306,423],
[1300,453],
[1079,530],
[160,140],
[850,616],
[928,100],
[951,511],
[898,408],
[915,82],
[851,805],
[887,418],
[493,742],
[581,509],
[715,674],
[1290,66],
[664,645],
[87,438],
[356,227],
[99,826],
[268,631],
[1126,136],
[837,889],
[1121,674],
[793,267],
[365,539],
[273,551],
[20,266],
[1168,361],
[309,441],
[706,159],
[329,628],
[898,318],
[22,18],
[957,71],
[770,460],
[1087,2],
[653,600],
[1168,763],
[1001,453],
[160,754],
[499,504],
[580,70],
[278,495],
[643,198],
[166,306],
[137,267],
[507,569],
[383,537],
[262,504],
[288,661],
[857,460],
[653,742],
[962,592],
[1258,123],
[1066,585],
[437,411],
[1156,620],
[319,115],
[336,172],
[1150,542],
[557,548],
[664,249],
[606,210],
[1252,43],
[300,726],
[589,158],
[1056,228],
[542,623],
[938,341],
[816,394],
[112,208],
[191,175],
[490,86],
[1184,308],
[320,196],
[226,351],
[1078,729],
[1129,665],
[729,61],
[8,620],
[962,423],
[822,264],
[1192,145],
[726,668],
[109,411],
[981,128],
[196,290],
[1,600],
[714,645],
[990,537],
[899,154],
[663,583],
[27,21],
[1078,281],
[821,436],
[102,66],
[687,607],
[94,885],
[137,21],
[546,502],
[1223,255],
[520,480],
[644,59],
[662,362],
[1205,343],
[1124,807],
[763,873],
[67,698],
[1226,632],
[130,236],
[113,194],
[1036,681],
[50,371],
[358,33],
[42,217],
[306,828],
[306,716],
[306,816],
[181,665],
[334,810],
[246,533],
[646,869],
[612,229],
[1237,385],
[954,227],
[470,473],
[875,172],
[731,757],
[1245,288],
[274,681],
[1191,798],
[1255,312],
[653,490],
[1173,873],
[453,434],
[82,814],
[267,674],
[552,882],
[418,367],
[1032,495],
[986,40],
[208,229],
[186,359],
[373,176],
[544,515],
[10,534],
[855,204],
[1283,21],
[1103,821],
[47,327],
[1173,21],
[1064,361],
[1129,677],
[738,830],
[821,234],
[90,243],
[1200,227],
[222,757],
[1168,310],
[512,526],
[1191,96],
[412,632],
[607,567],
[560,88],
[726,226],
[135,308],
[1062,38],
[865,505],
[271,357],
[1004,66],
[110,227],
[624,33],
[562,696],
[1235,361],
[1124,87],
[972,50],
[1308,488],
[1183,786],
[1026,229],
[739,602],
[962,135],
[236,676],
[1004,716],
[864,789],
[663,759],
[1247,740],
[904,68],
[248,856],
[1094,675],
[1228,423],
[1078,130],
[818,758],
[676,471],
[629,645],
[830,171],
[826,257],
[512,315],
[1066,757],
[166,500],
[667,696],
[887,250],
[644,889],
[1006,759],
[721,158],
[985,628],
[1079,250],
[756,239],
[1069,812],
[1211,61],
[1048,838],
[134,414],
[31,735],
[126,308],
[1191,149],
[436,392],
[155,311],
[1001,665],
[102,266],
[721,821],
[359,383],
[1240,564],
[142,315],
[1197,476],
[887,644],
[589,821],
[904,240],
[1086,416],
[276,159],
[666,453],
[493,10],
[320,308],
[892,751],
[930,451],
[243,154],
[612,217],
[291,372],
[227,385],
[231,250],
[648,644],
[644,5],
[766,515],
[524,658],
[1068,38],
[354,726],
[207,373],
[223,892],
[184,136],
[1168,205],
[1216,885],
[324,854],
[20,828],
[1114,210],
[294,658],
[25,695],
[338,50],
[413,530],
[1079,698],
[954,437],
[629,249],
[186,759],
[406,68],
[480,252],
[119,126],
[182,690],
[1097,700],
[1175,756],
[388,248],
[425,624],
[761,551],
[160,94],
[356,667],
[324,264],
[1126,539],
[711,838],
[242,576],
[27,873],
[572,848],
[145,453],
[1111,821],
[652,406],
[329,766],
[657,404],
[358,861],
[1068,318],
[571,292],
[863,521],
[1208,460],
[1109,434],
[1114,290],
[708,123],
[1227,292],
[962,78],
[1215,26],
[1211,833],
[581,733],
[390,410],
[77,504],
[1242,121],
[1057,56],
[681,645],
[1156,722],
[1178,502],
[922,198],
[320,698],
[873,794],
[1178,540],
[648,33],
[1086,210],
[274,143],
[990,357],
[1144,394],
[468,267],
[758,290],
[348,249],
[1279,385],
[974,91],
[1183,108],
[1064,702],
[816,588],
[1290,828],
[10,472],
[647,115],
[36,250],
[1015,511],
[288,233],
[647,759],
[562,646],
[375,775],
[348,421],
[764,392],
[403,352],

];

let folds = [
{d: 'x', val: 655},
{d: 'y', val: 447},
{d: 'x', val: 327},
{d: 'y', val: 223},
{d: 'x', val: 163},
{d: 'y', val: 111},
{d: 'x', val: 81},
{d: 'y', val: 55},
{d: 'x', val: 40},
{d: 'y', val: 27},
{d: 'y', val: 13},
{d: 'y', val: 6},
]

{
    let paper = mk2d(1500, 1500);
    let totalcount = 0;
    for (let [x, y] of input) {
        paper[x][y] = 1;
        ++totalcount;
    }

    let overlaps = 0;
    for (let fold of folds) {
        for (let c = 0; c < fold.val; ++c) {
            for (let c2 = 0; c2 < 1000; ++c2) {
                if (fold.d == 'x') {
                    if (paper[c][c2] == 1 && paper[2 * fold.val - c][c2] == 1) ++overlaps;
                } else {
                    if (paper[c2][c] == 1 && paper[c2][2 * fold.val - c] == 1) ++overlaps;
                }
            }
        }
        for (let c2 = 0; c2 < 1000; ++c2) {
            if (fold.d == 'x') {
                if (paper[fold.val][c2] == 1) throw new Error('found a dot');
            } else {
                if (paper[c2][fold.val] == 1) throw new Error('found a dot');
            }
        }
        break;
    }
    console.log(totalcount - overlaps);
}

{
    let paper = mk2d(1500, 1500);
    let totalcount = 0;
    for (let [x, y] of input) {
        paper[x][y] = 1;
        ++totalcount;
    }

    let overlaps = 0;
    for (let fold of folds) {
        for (let c = 0; c < fold.val; ++c) {
            for (let c2 = 0; c2 < 1000; ++c2) {
                if (fold.d == 'x') {
                    if (paper[2 * fold.val - c][c2] == 1) {
                        paper[c][c2] = paper[2 * fold.val - c][c2];
                    }
                } else {
                    if (paper[c2][2 * fold.val - c] == 1) {
                        paper[c2][c] = paper[c2][2 * fold.val - c];
                    }
                }
            }
        }
        for (let c2 = 0; c2 < 1000; ++c2) {
            if (fold.d == 'x') {
                if (paper[fold.val][c2] == 1) throw new Error('found a dot');
            } else {
                if (paper[c2][fold.val] == 1) throw new Error('found a dot');
            }
        }
    }
    for (let y = 0; y < 6; ++y) {
        let row = '';
        for (let x = 0; x < 40; ++x) {
            row += paper[x][y] ? 'X' : ' ';
        }
        console.log(row);
    }
}
