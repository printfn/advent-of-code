struct Pos {
    rate: i32,
    tunnels: &'static [usize],
}

const DATA: [Pos; 60] = [
    Pos { rate: 15, tunnels: &[ 36, 53, 28, 21, 43 ] },
    Pos { rate: 22, tunnels: &[ 38, 16, 18, 56 ] },
    Pos { rate: 23, tunnels: &[ 23, 43, 58 ] },
    Pos { rate: 24, tunnels: &[ 55 ] },
    Pos { rate: 9, tunnels: &[ 42, 55, 30, 17 ] },
    Pos { rate: 6, tunnels: &[ 32, 52, 45, 49, 26 ] },
    Pos { rate: 10, tunnels: &[ 17, 48, 52, 40, 31 ] },
    Pos { rate: 19, tunnels: &[ 19, 54, 21, 35 ] },
    Pos { rate: 5, tunnels: &[ 24, 29, 41, 20, 48 ] },
    Pos { rate: 20, tunnels: &[ 16, 28, 39, 51 ] },
    Pos { rate: 3, tunnels: &[ 37, 15, 22, 46, 41 ] },
    Pos { rate: 17, tunnels: &[ 47, 34, 22 ] },
    Pos { rate: 25, tunnels: &[ 42 ] },
    Pos { rate: 18, tunnels: &[ 57, 59, 39 ] },
    Pos { rate: 12, tunnels: &[ 33, 23, 53, 51, 25 ] },
    Pos { rate: 0, tunnels: &[ 10, 50 ] },
    Pos { rate: 0, tunnels: &[ 1, 9 ] },
    Pos { rate: 0, tunnels: &[ 4, 6 ] },
    Pos { rate: 0, tunnels: &[ 33, 1 ] },
    Pos { rate: 0, tunnels: &[ 56, 7 ] },
    Pos { rate: 0, tunnels: &[ 8, 59 ] },
    Pos { rate: 0, tunnels: &[ 7, 0 ] },
    Pos { rate: 0, tunnels: &[ 11, 10 ] },
    Pos { rate: 0, tunnels: &[ 14, 2 ] },
    Pos { rate: 0, tunnels: &[ 8, 49 ] },
    Pos { rate: 0, tunnels: &[ 35, 14 ] },
    Pos { rate: 0, tunnels: &[ 27, 5 ] },
    Pos { rate: 0, tunnels: &[ 50, 34, 26, 31, 44 ] },
    Pos { rate: 0, tunnels: &[ 0, 9 ] },
    Pos { rate: 0, tunnels: &[ 44, 8 ] },
    Pos { rate: 0, tunnels: &[ 4, 45 ] },
    Pos { rate: 0, tunnels: &[ 6, 27 ] },
    Pos { rate: 0, tunnels: &[ 46, 5 ] },
    Pos { rate: 0, tunnels: &[ 14, 18 ] },
    Pos { rate: 0, tunnels: &[ 27, 11 ] },
    Pos { rate: 0, tunnels: &[ 7, 25 ] },
    Pos { rate: 0, tunnels: &[ 38, 0 ] },
    Pos { rate: 0, tunnels: &[ 10, 40 ] },
    Pos { rate: 0, tunnels: &[ 1, 36 ] },
    Pos { rate: 0, tunnels: &[ 13, 9 ] },
    Pos { rate: 0, tunnels: &[ 6, 37 ] },
    Pos { rate: 0, tunnels: &[ 10, 8 ] },
    Pos { rate: 0, tunnels: &[ 4, 12 ] },
    Pos { rate: 0, tunnels: &[ 0, 2 ] },
    Pos { rate: 0, tunnels: &[ 29, 27 ] },
    Pos { rate: 0, tunnels: &[ 30, 5 ] },
    Pos { rate: 0, tunnels: &[ 32, 10 ] },
    Pos { rate: 0, tunnels: &[ 11, 57 ] },
    Pos { rate: 0, tunnels: &[ 8, 6 ] },
    Pos { rate: 0, tunnels: &[ 24, 5 ] },
    Pos { rate: 0, tunnels: &[ 27, 15 ] },
    Pos { rate: 0, tunnels: &[ 9, 14 ] },
    Pos { rate: 0, tunnels: &[ 6, 5 ] },
    Pos { rate: 0, tunnels: &[ 0, 14 ] },
    Pos { rate: 0, tunnels: &[ 7, 58 ] },
    Pos { rate: 0, tunnels: &[ 3, 4 ] },
    Pos { rate: 0, tunnels: &[ 19, 1 ] },
    Pos { rate: 0, tunnels: &[ 47, 13 ] },
    Pos { rate: 0, tunnels: &[ 2, 54 ] },
    Pos { rate: 0, tunnels: &[ 20, 13 ] }
];
const INITIAL_POS: usize = 27;

fn solve(mut open: u32, mut mins: i32, pos: usize, cache: &mut std::collections::HashMap<u64, i32>, part1: bool) -> i32 {
    if mins <= 0 {
        return if part1 {
            0
        } else {
            solve(open, 26, INITIAL_POS, cache, true)
        };
    }

    let mut k = u64::from(open) << 32;
    k |= ((mins + 1) as u64) << 16;
    k |= pos as u64;
    if part1 {
        k |= 1 << 63;
    }
    if let Some(res) = cache.get(&k) {
        return *res;
    }

    let mut best = 0;
    for adj in DATA[pos].tunnels {
        let res = solve(open, mins - 1, *adj, cache, part1);
        if res > best {
            best = res;
        }
    }

    if (open & (1 << pos)) == 0 && DATA[pos].rate > 0 && mins > 0 {
        open |= 1 << pos;
        mins -= 1;
        let total = mins * DATA[pos].rate;
        for adj in DATA[pos].tunnels {
            let res = total + solve(open, mins - 1, *adj, cache, part1);
            if res > best {
                best = res;
            }
        }
    }
    cache.insert(k, best);
    return best;
}

fn main() {
    let mut cache = std::collections::HashMap::new();
    println!("{}", solve(0, 30, INITIAL_POS, &mut cache, true));
    println!("{}", solve(0, 26, INITIAL_POS, &mut cache, false));
}
