import type { Challenge } from '../types.ts';

const sample = `19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3`;

type Pos2 = { x: number; y: number };
type Pos3 = { x: number; y: number; z: number };

function dot3(p: Pos3, q: Pos3) {
	return p.x * q.x + p.y * q.y + p.z * q.z;
}

function norm2(p: Pos3) {
	return p.x * p.x + p.y * p.y + p.z * p.z;
}

function norm(p: Pos3) {
	return Math.sqrt(norm2(p));
}

function cross3(p: Pos3, q: Pos3): Pos3 {
	return {
		x: p.y * q.z - p.z * q.y,
		y: p.z * q.x - p.x * q.z,
		z: p.x * q.y - p.y * q.x,
	};
}

function subtract2(p: Pos2, q: Pos2): Pos2 {
	return { x: p.x - q.x, y: p.y - q.y };
}

function subtract3(p: Pos3, q: Pos3): Pos3 {
	return { x: p.x - q.x, y: p.y - q.y, z: p.z - q.z };
}

function intersect3(a: Pos3, da: Pos3, b: Pos3, db: Pos3): Pos3 | null {
	if (dot3(subtract3(b, a), cross3(da, db)) !== 0) {
		// lines are not coplanar
		return null;
	}

	const t =
		dot3(cross3(subtract3(b, a), db), cross3(da, db)) / norm2(cross3(da, db));
	const u =
		dot3(cross3(subtract3(a, b), da), cross3(db, da)) / norm2(cross3(db, da));
	if (t < 0 || u < 0) {
		return null;
	}
	return {
		x: a.x + t * da.x,
		y: a.y + t * da.y,
		z: a.z + t * da.z,
	};
}

function cross2(p: Pos2, q: Pos2) {
	return p.x * q.y - p.y * q.x;
}

function scalardiv2(p: Pos2, s: number): Pos2 {
	return { x: p.x / s, y: p.y / s };
}

// https://stackoverflow.com/a/565282
function intersect2(p: Pos2, r: Pos2, q: Pos2, s: Pos2): Pos2 | null {
	if (cross2(r, s) === 0) {
		if (cross2(subtract2(q, p), r) === 0) {
			// lines are colinear
			return null;
		}
		// lines are parallel
		return null;
	}
	const t = cross2(subtract2(q, p), scalardiv2(s, cross2(r, s)));
	const u = cross2(subtract2(q, p), scalardiv2(r, cross2(r, s)));
	if (u < 0 || t < 0) return null;
	return { x: q.x + s.x * u, y: q.y + s.y * u };
}

// copied from https://github.com/physbuzz/adventofcode/blob/master/day24/day24kek.js
const day24bNoExternal = (input: string) => {
	const lines = input
		.split('\n')
		.map(l => l.trim())
		.filter(l => l.length > 0);
	const parseTriple = (trip: string) => trip.split(',').map(x => +x.trim());
	const parseLine = (line: string) => {
		const args = line.split('@');
		return [parseTriple(args[0]), parseTriple(args[1])];
	};
	const parsed = lines.map(parseLine);

	//particle at solution sx,sy,sz, velocity svx,svy,svz
	//equations are:
	//sx+svx*t[i]==x[i]+vx[i]*t[i] ...same for y,z.
	//sy+svy*t[i]==y[i]+vy[i]*t[i]
	//sz+svz*t[i]==z[i]+vz[i]*t[i]
	//Ok, let's assume svx,svy,svz are fixed and linear solve on that...

	//sx+(svx-vx[0])*t[0]==x[0]
	//sy+(svy-vy[0])*t[0]==y[0]
	//sz+(svz-vz[0])*t[0]==z[0]
	//
	//sx+(svx-vx[1])*t[1]==x[1]
	//sy+(svy-vy[1])*t[1]==y[1]
	//Matrix looks like:
	//[1 0 0 svx-vx[0]     0    ][ sx ]   [x[0]]
	//[0 1 0 svy-vy[0]     0    ][ sy ]   [y[0]]
	//[0 0 1 svz-vz[0]     0    ][ sz ] = [z[0]]
	//[1 0 0    0      svx-vx[1]][t[0]]   [x[1]]
	//[0 1 0    0      svy-vy[1]][t[1]]   [y[1]]
	// the matrix has determinant (svx-vx[1])*(svy-vy[0])-(svx-vx[0])*(svy-vy[1])
	// mvx1 mvy0 - mvx0 mvy1
	const linearSolve = (n: number, m: number, svx: number, svy: number, svz: number) => {
		const x0 = parsed[n][0][0];
		const y0 = parsed[n][0][1];
		const z0 = parsed[n][0][2];
		const x1 = parsed[m][0][0];
		const y1 = parsed[m][0][1];
		const x0v = parsed[n][1][0];
		const y0v = parsed[n][1][1];
		const z0v = parsed[n][1][2];
		const x1v = parsed[m][1][0];
		const y1v = parsed[m][1][1];
		const mvx0 = svx - parsed[n][1][0];
		const mvy0 = svy - parsed[n][1][1];
		const mvz0 = svz - parsed[n][1][2];
		const mvx1 = svx - parsed[m][1][0];
		const mvy1 = svy - parsed[m][1][1];
		const det = mvx1 * mvy0 - mvx0 * mvy1;
		if (det !== 0) {
			return [
				(mvx1 * mvy0 * x0 - mvx0 * mvy1 * x1 + mvx0 * mvx1 * (-y0 + y1)) / det,
				(mvy0 * mvy1 * (x0 - x1) - mvx0 * mvy1 * y0 + mvx1 * mvy0 * y1) / det,
				(mvy1 * mvz0 * (x0 - x1) + mvx1 * mvz0 * (-y0 + y1)) / det + z0,
				(mvy1 * (-x0 + x1) + mvx1 * (y0 - y1)) / det,
				(mvy0 * (-x0 + x1) + mvx0 * (y0 - y1)) / det,
			];
		}
		return undefined;
	};
	//error function
	const ef = (svx: number, svy: number, svz: number) => {
		const nums1 = linearSolve(0, 1, svx, svy, svz);
		const nums2 = linearSolve(2, 1, svx, svy, svz);
		if (!nums1 || !nums2) return undefined;
		const dsx = nums1[0] - nums2[0];
		const dsy = nums1[1] - nums2[1];
		const dsz = nums1[2] - nums2[2];
		const dt = nums1[4] - nums2[4];
		return dsx + dsy + dsz + dt;
	};
	let xm = 0;
	let ym = 0;
	let zm = 0;
	let minimumfound = undefined;
	//Let's search in progressively larger shells around the origin.
	//This is just boring ctrl-c ctrl-v code for the six faces of a cube.
	//x,y,z are the velocities of the line, I guess I should have named them svx,svy,svz.
	for (let r = 1; r < 400; r++) {
		for (let x = -r; x < r + 1; x++) {
			for (let y = -r; y < r + 1; y++) {
				for (let z = -r; z < r + 1; z += 2 * r) {
					const e = ef(x, y, z);
					if (e === undefined) continue;
					if (!Number.isNaN(e)) {
						if (minimumfound === undefined) {
							xm = x;
							ym = y;
							zm = z;
							minimumfound = Math.abs(e);
						} else if (Math.abs(e) < minimumfound) {
							xm = x;
							ym = y;
							zm = z;
							minimumfound = Math.abs(e);
						}
					}
				}
			}
		}
		for (let x = -r; x < r + 1; x++) {
			for (let y = -r; y < r + 1; y += 2 * r) {
				for (let z = -r; z < r + 1; z += 1) {
					const e = ef(x, y, z);
					if (e === undefined) continue;
					if (!Number.isNaN(e)) {
						if (minimumfound === undefined) {
							xm = x;
							ym = y;
							zm = z;
							minimumfound = Math.abs(e);
						} else if (Math.abs(e) < minimumfound) {
							xm = x;
							ym = y;
							zm = z;
							minimumfound = Math.abs(e);
						}
					}
				}
			}
		}
		for (let x = -r; x < r + 1; x += 2 * r) {
			for (let y = -r; y < r + 1; y++) {
				for (let z = -r; z < r + 1; z++) {
					const e = ef(x, y, z);
					if (e === undefined) continue;
					if (!Number.isNaN(e)) {
						if (minimumfound === undefined) {
							xm = x;
							ym = y;
							zm = z;
							minimumfound = Math.abs(e);
						} else if (Math.abs(e) < minimumfound) {
							xm = x;
							ym = y;
							zm = z;
							minimumfound = Math.abs(e);
						}
					}
				}
			}
		}
		if (minimumfound !== undefined && minimumfound < 1) break;
	}
	const nums1 = linearSolve(0, 1, xm, ym, zm);
	if (!nums1) {
		throw new Error('failed to find solution');
	}
	return nums1[0] + nums1[1] + nums1[2];
};

function solve(input: string, part: 1 | 2) {
	const lines = input.split('\n').map(l => {
		const [p, v] = l.split(' @ ');
		const [x, y, z] = p.split(', ').map(Number);
		const [dx, dy, dz] = v.split(', ').map(Number);
		return { x, y, z, dx, dy, dz };
	});
	if (part === 1) {
		const rangeMin = lines.length === 5 ? 7 : 200000000000000;
		const rangeMax = lines.length === 5 ? 27 : 400000000000000;
		let count = 0;
		for (let i = 0; i < lines.length; ++i) {
			for (let j = 0; j < lines.length; ++j) {
				if (j <= i) continue;
				const p = { x: lines[i].x, y: lines[i].y, z: 0 };
				const r = { x: lines[i].dx, y: lines[i].dy, z: 0 };
				const q = { x: lines[j].x, y: lines[j].y, z: 0 };
				const s = { x: lines[j].dx, y: lines[j].dy, z: 0 };
				const intersection = intersect3(p, r, q, s);
				if (
					intersection === null ||
					!(
						intersection.x >= rangeMin &&
						intersection.x <= rangeMax &&
						intersection.y >= rangeMin &&
						intersection.y <= rangeMax
					)
				) {
					continue;
				}
				++count;
			}
		}
		return count.toString();
	}

	// part 2 is too hard
	return day24bNoExternal(input).toString();
}

const challenge: Challenge = {
	solve,
	answer: ['13910', '618534564836937'],
	samples: [{ sample, answer: '2', part: 1 }],
};
export default challenge;
