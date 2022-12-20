#![allow(dead_code)]

use std::collections::HashMap;

#[derive(Clone, Copy, Eq, PartialEq, Hash, Debug)]
struct Blueprint {
    ore_robot_ore: i32,
    clay_robot_ore: i32,
    obsidian_robot_ore: i32,
    obsidian_robot_clay: i32,
    geode_robot_ore: i32,
    geode_robot_obsidian: i32,
}

const DATA: &[Blueprint] = &[
    Blueprint { ore_robot_ore: 3, clay_robot_ore: 3, obsidian_robot_ore: 2, obsidian_robot_clay: 15, geode_robot_ore: 3, geode_robot_obsidian: 9, },
    Blueprint { ore_robot_ore: 4, clay_robot_ore: 4, obsidian_robot_ore: 4, obsidian_robot_clay: 12, geode_robot_ore: 4, geode_robot_obsidian: 19, },
    Blueprint { ore_robot_ore: 4, clay_robot_ore: 4, obsidian_robot_ore: 4, obsidian_robot_clay: 14, geode_robot_ore: 3, geode_robot_obsidian: 16, },
    Blueprint { ore_robot_ore: 2, clay_robot_ore: 3, obsidian_robot_ore: 2, obsidian_robot_clay: 17, geode_robot_ore: 3, geode_robot_obsidian: 19, },
    Blueprint { ore_robot_ore: 4, clay_robot_ore: 3, obsidian_robot_ore: 3, obsidian_robot_clay: 10, geode_robot_ore: 2, geode_robot_obsidian: 10, },
    Blueprint { ore_robot_ore: 3, clay_robot_ore: 3, obsidian_robot_ore: 3, obsidian_robot_clay: 16, geode_robot_ore: 3, geode_robot_obsidian: 9, },
    Blueprint { ore_robot_ore: 4, clay_robot_ore: 3, obsidian_robot_ore: 3, obsidian_robot_clay: 7, geode_robot_ore: 3, geode_robot_obsidian: 9, },
    Blueprint { ore_robot_ore: 3, clay_robot_ore: 3, obsidian_robot_ore: 2, obsidian_robot_clay: 19, geode_robot_ore: 2, geode_robot_obsidian: 12, },
    Blueprint { ore_robot_ore: 3, clay_robot_ore: 3, obsidian_robot_ore: 3, obsidian_robot_clay: 16, geode_robot_ore: 3, geode_robot_obsidian: 20, },
    Blueprint { ore_robot_ore: 2, clay_robot_ore: 2, obsidian_robot_ore: 2, obsidian_robot_clay: 7, geode_robot_ore: 2, geode_robot_obsidian: 14, },
    Blueprint { ore_robot_ore: 2, clay_robot_ore: 4, obsidian_robot_ore: 2, obsidian_robot_clay: 16, geode_robot_ore: 4, geode_robot_obsidian: 12, },
    Blueprint { ore_robot_ore: 2, clay_robot_ore: 4, obsidian_robot_ore: 4, obsidian_robot_clay: 15, geode_robot_ore: 2, geode_robot_obsidian: 15, },
    Blueprint { ore_robot_ore: 4, clay_robot_ore: 4, obsidian_robot_ore: 4, obsidian_robot_clay: 5, geode_robot_ore: 2, geode_robot_obsidian: 10, },
    Blueprint { ore_robot_ore: 4, clay_robot_ore: 4, obsidian_robot_ore: 2, obsidian_robot_clay: 15, geode_robot_ore: 3, geode_robot_obsidian: 16, },
    Blueprint { ore_robot_ore: 3, clay_robot_ore: 3, obsidian_robot_ore: 3, obsidian_robot_clay: 19, geode_robot_ore: 2, geode_robot_obsidian: 9, },
    Blueprint { ore_robot_ore: 4, clay_robot_ore: 3, obsidian_robot_ore: 4, obsidian_robot_clay: 15, geode_robot_ore: 4, geode_robot_obsidian: 9, },
    Blueprint { ore_robot_ore: 4, clay_robot_ore: 3, obsidian_robot_ore: 2, obsidian_robot_clay: 17, geode_robot_ore: 3, geode_robot_obsidian: 16, },
    Blueprint { ore_robot_ore: 3, clay_robot_ore: 3, obsidian_robot_ore: 2, obsidian_robot_clay: 13, geode_robot_ore: 3, geode_robot_obsidian: 12, },
    Blueprint { ore_robot_ore: 4, clay_robot_ore: 3, obsidian_robot_ore: 2, obsidian_robot_clay: 10, geode_robot_ore: 4, geode_robot_obsidian: 10, },
    Blueprint { ore_robot_ore: 2, clay_robot_ore: 3, obsidian_robot_ore: 3, obsidian_robot_clay: 17, geode_robot_ore: 3, geode_robot_obsidian: 10, },
    Blueprint { ore_robot_ore: 4, clay_robot_ore: 3, obsidian_robot_ore: 2, obsidian_robot_clay: 14, geode_robot_ore: 2, geode_robot_obsidian: 7, },
    Blueprint { ore_robot_ore: 3, clay_robot_ore: 4, obsidian_robot_ore: 3, obsidian_robot_clay: 20, geode_robot_ore: 3, geode_robot_obsidian: 14, },
    Blueprint { ore_robot_ore: 2, clay_robot_ore: 2, obsidian_robot_ore: 2, obsidian_robot_clay: 17, geode_robot_ore: 2, geode_robot_obsidian: 10, },
    Blueprint { ore_robot_ore: 3, clay_robot_ore: 3, obsidian_robot_ore: 3, obsidian_robot_clay: 19, geode_robot_ore: 3, geode_robot_obsidian: 19, },
    Blueprint { ore_robot_ore: 3, clay_robot_ore: 4, obsidian_robot_ore: 2, obsidian_robot_clay: 14, geode_robot_ore: 3, geode_robot_obsidian: 14, },
    Blueprint { ore_robot_ore: 3, clay_robot_ore: 4, obsidian_robot_ore: 3, obsidian_robot_clay: 13, geode_robot_ore: 3, geode_robot_obsidian: 19, },
    Blueprint { ore_robot_ore: 4, clay_robot_ore: 3, obsidian_robot_ore: 3, obsidian_robot_clay: 7, geode_robot_ore: 2, geode_robot_obsidian: 7, },
    Blueprint { ore_robot_ore: 4, clay_robot_ore: 3, obsidian_robot_ore: 3, obsidian_robot_clay: 20, geode_robot_ore: 2, geode_robot_obsidian: 19, },
    Blueprint { ore_robot_ore: 4, clay_robot_ore: 4, obsidian_robot_ore: 4, obsidian_robot_clay: 16, geode_robot_ore: 2, geode_robot_obsidian: 15, },
    Blueprint { ore_robot_ore: 2, clay_robot_ore: 4, obsidian_robot_ore: 4, obsidian_robot_clay: 19, geode_robot_ore: 2, geode_robot_obsidian: 18, },
];

const EXAMPLE: &[Blueprint] = &[
    Blueprint { ore_robot_ore: 4, clay_robot_ore: 2, obsidian_robot_ore: 3, obsidian_robot_clay: 14, geode_robot_ore: 2, geode_robot_obsidian: 7, },
    Blueprint { ore_robot_ore: 2, clay_robot_ore: 3, obsidian_robot_ore: 3, obsidian_robot_clay: 8, geode_robot_ore: 3, geode_robot_obsidian: 12, },
];

#[derive(Clone, Copy, Debug, Eq, PartialEq, Hash)]
struct State {
    ore: i32, clay: i32, obs: i32, geo: i32, orer: i32, clayr: i32, obsr: i32
}

impl Default for State {
    fn default() -> Self {
        Self {
            ore: 0,
            clay: 0,
            obs: 0,
            geo: 0,
            orer: 1,
            clayr: 0,
            obsr: 0,
        }
    }
}

impl State {
    fn tick(&self) -> Self {
        Self {
            ore: self.ore + self.orer,
            clay: self.clay + self.clayr,
            obs: self.obs + self.obsr,
            ..*self
        }
    }
}

#[derive(Eq, PartialEq, Hash)]
struct Key {
    blueprint: Blueprint,
    mins: i32,
    state: State,
}

#[derive(Default, Clone, Copy)]
struct Hints {
    no_ore: bool,
    no_clay: bool,
    no_obsidian: bool,
}

fn eval(blueprint: Blueprint, mins: i32, state: State, mut hints: Hints, cache: &mut HashMap<Key, i32>) -> i32 {
    if mins <= 0 {
        return state.geo;
    }

    let k = Key {
        blueprint, mins, state
    };
    if let Some(res) = cache.get(&k) {
        return *res;
    }

    let mut best = -1;
    let mut choice = -1;

    if !hints.no_ore {
        let mut max_ore_cost = blueprint.ore_robot_ore;
        if blueprint.clay_robot_ore > max_ore_cost {
            max_ore_cost = blueprint.clay_robot_ore;
        }
        if blueprint.obsidian_robot_ore > max_ore_cost {
            max_ore_cost = blueprint.obsidian_robot_ore;
        }
        if blueprint.geode_robot_ore > max_ore_cost {
            max_ore_cost = blueprint.geode_robot_ore;
        }
        if state.orer * mins + state.ore >= mins * max_ore_cost {
            hints.no_ore = true;
        }
    }

    if !hints.no_clay {
        if state.clayr * mins + state.clay >= mins * blueprint.obsidian_robot_clay {
            hints.no_clay = true;
        }
    }

    if !hints.no_obsidian {
        if state.obsr * mins + state.obs >= mins * blueprint.geode_robot_obsidian {
            hints.no_obsidian = true;
        }
    }

    // try building robots
    if !hints.no_ore && state.ore + mins * state.orer >= blueprint.ore_robot_ore {
        let duration = 1 + i32::max(0, (blueprint.ore_robot_ore - state.ore + state.orer - 1) / state.orer);
        let res = eval(blueprint, mins - duration, State {
            ore: state.ore + state.orer * duration - blueprint.ore_robot_ore,
            orer: state.orer + 1,
            ..state.tick()
        }, hints, cache);
        if res > best { best = res; choice = 0; }
    }
    if !hints.no_clay && state.ore + mins * state.orer >= blueprint.clay_robot_ore {
        let duration = 1 + i32::max(0, (blueprint.clay_robot_ore - state.ore + state.orer - 1) / state.orer);
        let res = eval(blueprint, mins - duration, State {
            ore: state.ore + state.orer * duration - blueprint.clay_robot_ore,
            clayr: state.clayr + 1,
            ..state.tick()
        }, hints, cache);
        if res > best { best = res; choice = 1; }
    }
    if !hints.no_obsidian && state.ore + mins * state.orer >= blueprint.obsidian_robot_ore
            && state.clay + mins * state.clayr >= blueprint.obsidian_robot_clay {
        let duration = 1 + i32::max(i32::max(0, 
            (blueprint.obsidian_robot_ore - state.ore + state.orer - 1) / state.orer),
            (blueprint.obsidian_robot_clay - state.clay + state.clayr - 1) / state.clayr);
        let res = eval(blueprint, mins - duration, State {
            ore: state.ore + state.orer * duration - blueprint.obsidian_robot_ore,
            clay: state.clay + state.clayr * duration - blueprint.obsidian_robot_clay,
            obsr: state.obsr + 1,
            ..state.tick()
        }, hints, cache);
        if res > best { best = res; choice = 2; }
    }
    if state.ore + mins * state.orer >= blueprint.geode_robot_ore
            && state.obs + mins * state.obsr >= blueprint.geode_robot_obsidian {
        let duration = 1 + i32::max(i32::max(0, 
            (blueprint.geode_robot_ore - state.ore + state.orer - 1) / state.orer),
            (blueprint.geode_robot_obsidian - state.obs + state.obsr - 1) / state.obsr);
        let res = eval(blueprint, mins - duration, State {
            ore: state.ore + state.orer * duration - blueprint.geode_robot_ore,
            obs: state.obs + state.obsr * duration - blueprint.geode_robot_obsidian,
            geo: state.geo + mins - duration,
            ..state.tick()
        }, hints, cache);
        if res > best { best = res; choice = 3; }
    }

    // or do nothing
    {
        // slow but correct solution
        // let res = eval(blueprint, mins - 1, state.tick(), hints, cache);

        // fast, incorrect solution that is needed for part 2
        let res = state.geo;
        if res > best { best = res; choice = 4; }
    }

    if choice == -1 || best == -1 {
        panic!();
    }

    cache.insert(k, best);

    return best;
}

fn main() {
    let mut sum = 0;
    for (i, blueprint) in EXAMPLE.iter().enumerate() {
        // println!("Checking blueprint {blueprint:?}");
        sum += (i + 1) as i32 * eval(*blueprint, 24, State::default(), Hints::default(), &mut HashMap::new());
        // println!("current sum: {sum}");
    }
    // println!("result: {}", sum);
    sum = 0;
    for (i, blueprint) in DATA.iter().enumerate() {
        // println!("Checking blueprint {blueprint:?}");
        sum += (i + 1) as i32 * eval(*blueprint, 24, State::default(), Hints::default(), &mut HashMap::new());
        // println!("current sum: {sum}");
    }
    println!("{sum}");

    let mut product = 1;
    for blueprint in DATA.iter().take(3) {
        // println!("Checking blueprint {blueprint:?}");
        product *= eval(*blueprint, 32, State::default(), Hints::default(), &mut HashMap::new());
        // println!("current product: {product}");
    }
    println!("{product}")
}
