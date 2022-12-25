let data = `1--20
1-00==1-1==
12011==21020=-2021-
101--=11
22-=02=
112=12-222
10=-0-=10
202-1-20=01-10-2
11==
122==1=100-
1====2==121--=1
1=-02-=011-2=2-00=00
1000=2
12-
201=2-1-1=02--=1=1
1=01-1=-1=012-2-=
1=1=
11102
10=
2-=--2=2=-==11-11
2=02
10-1-00=0-20
1-0=11=
2=1=0=1022=-
1==1--2-=02=
1=12-2
200-
20=02-211=11=
1==12=-0-
1=1-0101=-1
2=21000-22
1--1=11-2-=1--211-
2-=101=-
1-20210-0-1=101=1
1===1===-
211=2-0==
21===1==0
10
2=0-1=110221-2-2
1001220120=-=
10=21=0-=--=21-=
1=0=1-2-0
21-0===21=2100-02
1=-=0-0-12=-0--202=
101200-111--10-=-
2201==0--=-
12-02201-====-=
2-1220-
10-
2=00-2-2
22-
1=01--==
202-11-=02-22-02
2-0=1=1=-1-0-2=-0=
1=01-1=2=11=10
1-011
1-0-1
11000=--0122-
1=-==2=101
1=10-0=110--1
200=-21-
222==20=22121-==2
11=
1-2=22-0212=1
2=--2=02
1=0-2=1-0==0=-=1-1
101
2=1=1=1202222010=1
1-=0
1-02
1=21=2==2=2
11-10-=20==1
1002=---012=1
222
1==-1=
1-212=-=2
212=--0
1-0=2-121=-11
11211011=--
2-
12=
22-202
2=20=-1220=10=---
11=--0122==20-121
200=
2=220=
1=00=001121=1-00-
100210222
2-2==1
220
2-==-1=10
1=212=212=0=-2200
201--0=12-101
1==0000=1=0
2===
121-021220=022
1=====--10201111-0
22=2122
1=2110=2-21022
120=1=1-2002-12211
221200
110--
100120=1
22
2-==----2020=
10=-
11==-0=2-==0==2=
1===122=0=
21==-1
1-11-21--1
1011=1-0---=11=0
2=01=21-0
12=0=1-1==00010-2-
20-20--011
10=21212===-011=2=1
1-112110021-12220
1==022=112-2
1-=0-
1=
1=1
21212=211110--2
11-2-212=--02=0120
1-=1--=010=
2-11221101=-2=2=2=
2=
1=021
1===0020-1==
1022212
1-=221=
122-2-1-2--200=
1-00-10
102-20=-02--=201=`.split('\n');

// data = `1=-0-2
// 12111
// 2=0=
// 21
// 2=01
// 111
// 20012
// 112
// 1=-1=
// 1-12
// 12
// 1=
// 122`.split('\n');

function asserteq(a, b) {
    if (a != b) {
        throw new Error(`assertion failed, '${a}' != '${b}'`);
    }
}

function fromsnafu(str) {
    let res = 0n;
    for (let i = 0; i < str.length; ++i) {
        res *= 5n;
        switch (str[i]) {
        case '2': res += 2n; break;
        case '1': res += 1n; break;
        case '0': res += 0n; break;
        case '-': res += -1n; break;
        case '=': res += -2n; break;
        }
    }
    return res;
}

function tosnafu(n) {
    var output = '';
    while (n > 0) {
        var rem = n % 5n;
        n /= 5n;
        switch (rem) {
        case 3n:
            rem = -2n;
            ++n
            break;
        case 4n:
            rem = -1n;
            ++n;
            break;
        }
        switch (rem) {
        case -2n: output = '=' + output; break;
        case -1n: output = '-' + output; break;
        case 0n: output = '0' + output; break;
        case 1n: output = '1' + output; break;
        case 2n: output = '2' + output; break;
        }
    }
    if (output == '') output = '0';
    return output;
}

asserteq(fromsnafu('1'), 1n);
asserteq(fromsnafu('2'), 2n);
asserteq(fromsnafu('1='), 3n);
asserteq(fromsnafu('1-'), 4n);
asserteq(fromsnafu('10'), 5n);
asserteq(fromsnafu('11'), 6n);
asserteq(fromsnafu('12'), 7n);
asserteq(fromsnafu('2='), 8n);
asserteq(fromsnafu('2-'), 9n);
asserteq(fromsnafu('20'), 10n);
asserteq(tosnafu(fromsnafu('1')), '1');
asserteq(tosnafu(fromsnafu('2')), '2');
asserteq(tosnafu(fromsnafu('1=')), '1=');
asserteq(tosnafu(fromsnafu('1-')), '1-');
asserteq(tosnafu(fromsnafu('10')), '10');
asserteq(tosnafu(fromsnafu('11')), '11');
asserteq(tosnafu(fromsnafu('12')), '12');
asserteq(tosnafu(fromsnafu('2=')), '2=');
asserteq(tosnafu(fromsnafu('2-')), '2-');
asserteq(tosnafu(fromsnafu('20')), '20');

let sum = 0n;
for (let line of data) {
    sum += fromsnafu(line);
}
console.log(tosnafu(sum));
