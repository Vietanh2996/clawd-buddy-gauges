// Clawd pixel art from clawd-crew (https://github.com/hudcolighting/clawd-crew, GPL-3.0), copied unchanged,
// except the section "drawn for clawd-buddy-gauges" and its entries at the end of VARIANTS, which are our own.
// Clawd pixel art. Every animation is a list of frames, each frame a W x H
// grid of palette indices built from a few parts (body, eyes, arms, legs and
// one prop), so a state reads at a glance and both renderers (SVG on the
// remote surfaces, terminal cells) draw from the same grids.
//
// Proportions follow the CLI's own logo ( ▐▛███▜▌ ), whose quadrant pixels
// are twice as tall as wide: a 12 x 8 body, 1 x 2 eyes, 2 x 2 arms halfway
// down and four 1 x 2 legs.

export const W = 24
export const H = 20

// Palette indices.
const B = 1 // body
const S = 2 // body shade
const K = 3 // ink
const WT = 4 // white
const G = 5 // gray
const D = 6 // dark gray
const BL = 7 // blue
const GR = 8 // green
const R = 9 // red
const Y = 10 // yellow
const L = 11 // light gray
const BR = 12 // brown
const MB = 13 // a small Clawd's body

export const PALETTE = [
  null,
  '#D97757',
  '#B4583A',
  '#1C1B1A',
  '#FFFFFF',
  '#8F8B84',
  '#4B4844',
  '#6A9BCC',
  '#6FAE5A',
  '#E0524A',
  '#F2C14E',
  '#C8C3B9',
  '#9A6B45',
  '#E8A084',
]

// The dark tile every Clawd stands on, and the floor line under his feet.
export const TILE = '#1b1a19'
export const FLOOR = '#2c2a27'

// Where the body's top-left corner sits when Clawd stands still; his legs
// reach the ground two rows under the body.
const BX = 6
const BY = 8
const BODY_W = 12
const BODY_H = 8
export const GROUND = BY + BODY_H + 2

const put = (g, x, y, c) => {
  if (x >= 0 && x < W && y >= 0 && y < H) g[y * W + x] = c
}

const box = (g, x, y, w, h, c) => {
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) put(g, x + i, y + j, c)
}

// Draws rows of characters, each mapped to a palette index; others are skipped.
const art = (g, x, y, rows, map) => {
  rows.forEach((row, j) => {
    for (let i = 0; i < row.length; i++) {
      const c = map[row[i]]
      if (c !== undefined) put(g, x + i, y + j, c)
    }
  })
}

// Each arm pose: rows from the body's top, and how tall.
const ARMS = { rest: [4, 2], mid: [2, 2], up: [-2, 3], down: [6, 2] }

const arm = (g, x, by, kind, c) => {
  if (kind === 'none') return
  const [dy, h] = ARMS[kind]
  box(g, x, by + dy, 2, h, c)
}

const eyes = (g, bx, by, bw, bh, kind) => {
  const xs = [bx + 2, bx + bw - 3]
  xs.forEach((x, side) => {
    const inward = side === 0 ? 0 : -1
    switch (kind) {
      case 'closed':
        box(g, x + inward, by + 3, 2, 1, K)
        break
      // Shut tight, halfway down however flat he has been pressed.
      case 'squished':
        box(g, x + inward, by + Math.floor((bh - 1) / 2), 2, 1, K)
        break
      // Open, on a body pressed too flat for his usual eyes.
      case 'dot':
        put(g, x, by + Math.floor((bh - 1) / 2), K)
        break
      // His left eye peeking open, the right still shut.
      case 'wink':
        if (side === 0) box(g, x, by + 2, 1, 2, K)
        else box(g, x + inward, by + 3, 2, 1, K)
        break
      case 'up':
        box(g, x, by + 1, 1, 2, K)
        break
      case 'upright':
        box(g, x + 1, by + 1, 1, 2, K)
        break
      case 'upleft':
        box(g, x - 1, by + 1, 1, 2, K)
        break
      case 'down':
        box(g, x, by + 3, 1, 2, K)
        break
      case 'downleft':
        box(g, x - 1, by + 3, 1, 2, K)
        break
      case 'downright':
        box(g, x + 1, by + 3, 1, 2, K)
        break
      case 'left':
        box(g, x - 1, by + 2, 1, 2, K)
        break
      case 'right':
        box(g, x + 1, by + 2, 1, 2, K)
        break
      case 'wide':
        box(g, x, by + 1, 1, 3, K)
        break
      // Big shiny pleading eyes, a glint in each.
      case 'plead':
        box(g, x + inward, by + 1, 2, 3, K)
        put(g, x + inward + 1, by + 1, WT)
        break
      // Screwed up tight, > <, pushing hard.
      case 'squeeze':
        put(g, side === 0 ? x - 1 : x + 1, by + 1, K)
        put(g, x, by + 2, K)
        put(g, side === 0 ? x - 1 : x + 1, by + 3, K)
        break
      // Glaring, a brow slanting down to his nose: powered up.
      case 'fierce':
        box(g, x, by + 2, 1, 2, K)
        put(g, side === 0 ? x + 1 : x - 1, by + 1, K)
        put(g, x, by + 1, K)
        break
      case 'happy':
        put(g, x - 1, by + 3, K)
        put(g, x, by + 2, K)
        put(g, x + 1, by + 3, K)
        break
      case 'wince': {
        // Pinched >.< eyes: inward-pointing chevrons.
        const outer = side === 0 ? x - 1 : x + 1
        put(g, outer, by + 1, K)
        put(g, x, by + 2, K)
        put(g, outer, by + 3, K)
        break
      }
      case 'x':
        put(g, x - 1, by + 1, K)
        put(g, x + 1, by + 1, K)
        put(g, x, by + 2, K)
        put(g, x - 1, by + 3, K)
        put(g, x + 1, by + 3, K)
        break
      default:
        box(g, x, by + 2, 1, 2, K)
    }
  })
}

// Clawd himself. `dy` moves him and his legs (a hop), `breathe` sinks the
// body a row onto shortened legs, `squash` trades height for width, `lie`
// rests the squashed body on the ground with the legs tucked under.
const clawd = (g, o) => {
  const sq = o.squash ?? o.lie ?? 0
  const bw = BODY_W + 2 * sq
  const bh = BODY_H - sq
  const bx = BX + (o.dx ?? 0) - sq
  const by = o.lie !== undefined ? GROUND - bh : BY + (o.dy ?? 0) + sq + (o.breathe ? 1 : 0)
  const c = o.color ?? B
  const legs = o.lie !== undefined ? 'none' : (o.legs ?? 'stand')
  if (legs !== 'none') {
    const ground = GROUND + (o.dy ?? 0)
    const top = by + bh
    ;[bx + 1, bx + 3, bx + bw - 4, bx + bw - 2].forEach((x, i) => {
      if ((legs === 'kickL' && i === 0) || (legs === 'kickR' && i === 3)) {
        box(g, legs === 'kickL' ? x - 2 : x, top, 3, 1, c)
        return
      }
      let bottom = legs === 'tuck' ? top + 1 : ground
      if (legs === 'walkA' && i % 2 === 0) bottom -= 1
      if (legs === 'walkB' && i % 2 === 1) bottom -= 1
      for (let y = top; y < bottom; y++) put(g, x, y, c)
    })
  }
  box(g, bx, by, bw, bh, c)
  arm(g, bx - 2, by, o.armL ?? 'rest', c)
  arm(g, bx + bw, by, o.armR ?? 'rest', c)
  eyes(g, bx, by, bw, bh, o.eyes ?? 'open')
}

const INK = { o: G, w: WT }

// A rounded white bubble over his right shoulder, its tail pointing at him.
const bubble = g => {
  art(g, 14, 0, ['.ooooooo.', 'owwwwwwwo', 'owwwwwwwo', 'owwwwwwwo', 'owwwwwwwo', '.ooooooo.'], INK)
  put(g, 15, 6, G)
  put(g, 14, 7, G)
}

// A thought cloud over his right shoulder, and the puffs trailing to it.
const cloud = g => art(g, 15, 0, ['.oooooo.', 'owwwwwwo', 'owwwwwwo', 'owwwwwwo', '.oooooo.'], INK)
const puffs = g => {
  put(g, 15, 6, G)
  put(g, 14, 7, G)
}

const GLYPHS = {
  '?': ['###', '..#', '.##', '...', '.#.'],
  '!': ['#', '#', '#', '.', '#'],
  z: ['###', '..#', '.#.', '###'],
  Z: ['####', '...#', '..#.', '.#..', '####'],
  '+': ['.#.', '###', '.#.'],
}

const glyph = (g, ch, x, y, c) => art(g, x, y, GLYPHS[ch], { '#': c })

// A small Clawd standing at column `x`: a 5 x 3 body, an arm each side and
// four legs, a little paler than the big one. `side` is which side of the
// big Clawd he stands on: he looks toward him and salutes with the outer arm.
// `lift` stands him that many rows higher, on another's head.
const mini = (g, x, pose, side, lift = 0) => {
  const y = (pose === 'hop' ? 13 : 14) - lift
  box(g, x + 1, y, 5, 3, MB)
  const outer = side === 'left' ? x : x + 6
  const inner = side === 'left' ? x + 6 : x
  put(g, inner, y + 2, MB)
  if (pose === 'salute') {
    put(g, outer, y, MB)
    put(g, outer, y - 1, MB)
  } else {
    put(g, outer, y + 2, MB)
  }
  const look = side === 'left' ? 1 : -1
  put(g, x + 2 + look, y + 1, K)
  put(g, x + 4 + look, y + 1, K)
  const legs = { walkA: [1, 4], walkB: [2, 5], hop: [2, 4] }[pose] ?? [1, 2, 4, 5]
  for (const leg of legs) put(g, x + leg, y + 3, MB)
}

// A small Clawd of a crowd, the top-left of its 5 x 3 body at (x, y), on four
// legs, an arm each side. Poses: 'stand', 'hop' (a row up), 'cheer'
// (both arms up off its top corners), 'stepA' and 'stepB' (marching, a pair
// of legs lifted).
const member = (g, x, y, pose) => {
  const top = pose === 'hop' ? y - 1 : y
  box(g, x, top, 5, 3, MB)
  put(g, x + 1, top + 1, K)
  put(g, x + 3, top + 1, K)
  const legs = { stepA: [0, 3], stepB: [1, 4], hop: [1, 3] }[pose] ?? [0, 1, 3, 4]
  for (const leg of legs) put(g, x + leg, top + 3, MB)
  // Arms: up off its top corners to cheer, else at its sides, where a
  // neighbor's arm meets it, hand in hand.
  if (pose === 'cheer') {
    put(g, x, top - 1, MB)
    put(g, x + 4, top - 1, MB)
  } else {
    put(g, x - 1, top + 2, MB)
    put(g, x + 5, top + 2, MB)
  }
}

// Where the crowd stands, left to right: one beside the podium, four in a row
// on the floor in front of it, one beside it on the other side.
const CROWD = [
  [0, 9],
  [0, 14],
  [6, 14],
  [12, 14],
  [18, 14],
  [19, 9],
]

// How high the podium lifts him, and the podium itself under his feet.
const PODIUM_LIFT = -6
const podium = g => {
  box(g, 5, GROUND + PODIUM_LIFT, 14, 1, L)
  box(g, 5, GROUND + PODIUM_LIFT + 1, 14, 1, D)
}

// Props: drawn behind Clawd unless HELD lists them, each taking a step that
// advances once per frame of its animation.
const PROPS = {
  // A thought cloud filling with dots; at step -1 only its trail of puffs.
  dots: (g, n) => {
    puffs(g)
    if (n < 0) return
    cloud(g)
    for (let i = 0; i < n; i++) put(g, 17 + i * 2, 2, K)
  },
  // The cloud holding a lit bulb: an idea. Odd steps add its rays.
  idea: (g, n) => {
    puffs(g)
    cloud(g)
    art(g, 17, 1, ['.yy.', 'yyyy', '.gg.'], { y: Y, g: G })
    if (n % 2 === 1) {
      put(g, 16, 2, Y)
      put(g, 21, 2, Y)
    }
  },
  // A speech bubble whose two lines grow; steps 0-6 write one reply, 7-13
  // the next, with lines of other lengths.
  speech: (g, n) => {
    bubble(g)
    const step = n % 7
    let left = step === 0 ? 0 : step * 2 - 1
    const lines = n < 7 ? [5, 5] : [3, 5]
    lines.forEach((max, i) => {
      const width = Math.min(left, max)
      if (width > 0) box(g, 16, 2 + i * 2, width, 1, D)
      left -= width
    })
  },
  ask: (g, n) => {
    bubble(g)
    glyph(g, '?', 17, n % 2 === 0 ? 1 : 0, K)
  },
  alert: (g, n) => {
    bubble(g)
    glyph(g, '!', 18, n % 2 === 0 ? 1 : 0, B)
  },
  // The back of a laptop lid with a steady glowing logo, `glow` its color,
  // its base below.
  laptop: (g, glow = WT) => {
    box(g, BX + 1, BY + 4, 10, 4, G)
    box(g, BX + 1, BY + 4, 10, 1, L)
    box(g, BX + 5, BY + 6, 2, 1, glow)
    box(g, BX, BY + 8, 12, 1, D)
  },
  // A book held up in front of him with its covers to us, so only his eyes
  // peek over the pages' edge. `turn` is a page flipping over the top: 1
  // lifting on the right, 2 upright at the spine, 3 falling to the left.
  book: (g, { turn = 0 } = {}) => {
    art(g, BX - 1, BY + 4, ['wwwwww.wwwwww', 'cccccckcccccc', 'cyyyyckcccccc', 'cccccckcccccc', 'cccccckcccccc'], {
      w: WT,
      c: BL,
      k: D,
      y: Y,
    })
    if (turn === 1) box(g, BX + 7, BY + 3, 2, 1, WT)
    if (turn === 2) box(g, BX + 5, BY + 2, 1, 2, WT)
    if (turn === 3) box(g, BX + 3, BY + 3, 2, 1, WT)
  },
  // A magnifying glass in his right hand: `level` 0 held low, 1 at his
  // shoulder, 2 raised high; a glint crosses the lens.
  magnifier: (g, { level = 1, glint = 0 } = {}) => {
    const y = [7, 5, 1][level]
    const hand = [BY + 4, BY + 2, BY - 2][level]
    art(g, 19, y, ['.ooo.', 'obbbo', 'obbbo', 'obbbo', '.ooo.'], { o: G, b: BL })
    put(g, 20 + (glint % 3), y + 1, WT)
    for (let row = y + 5; row <= hand; row++) put(g, 20, row, BR)
  },
  terminal: (g, n) => {
    box(g, 15, 0, 9, 7, D)
    box(g, 15, 0, 9, 1, L)
    put(g, 16, 0, R)
    put(g, 17, 0, Y)
    put(g, 18, 0, GR)
    art(g, 16, 2, ['#.', '.#', '#.'], { '#': GR })
    const typed = n % 4
    if (typed > 0) box(g, 19, 3, typed, 1, L)
    if (n % 2 === 0) box(g, 19 + typed, 4, 2, 1, WT)
  },
  // A globe whose continents scroll past as it spins.
  globe: (g, n) => {
    const disc = ['..###..', '.#####.', '#######', '#######', '#######', '.#####.', '..###..']
    const land = ['.....##.......', '..####.....#..', '.###....##.##.', '..##.....####.', '....#.....##..', '..........#...', '..............']
    disc.forEach((row, j) => {
      for (let i = 0; i < 7; i++) {
        if (row[i] === '#') put(g, 16 + i, j, land[j][(i + n) % 14] === '#' ? GR : BL)
      }
    })
  },
  // A clipboard held at his right side, a tick appearing by each line in turn.
  clipboard: (g, n) => {
    box(g, 19, 7, 5, 8, BR)
    box(g, 20, 8, 3, 6, WT)
    box(g, 20, 6, 2, 2, G)
    for (let i = 0; i < 3; i++) {
      const row = 9 + i * 2
      if (i < n) put(g, 20, row, GR)
      box(g, 21, row, 2, 1, G)
    }
  },
  // Two gears turning, and a wrench in his right hand working the lower one.
  workshop: (g, n) => {
    const a = ['.#.#.', '#####', '##.##', '#####', '.#.#.']
    const b = ['#.#.#', '.###.', '##.##', '.###.', '#.#.#']
    const turn = Math.floor(n / 2) % 2
    art(g, 14, 0, turn === 0 ? a : b, { '#': L })
    art(g, 18, 2, turn === 0 ? b : a, { '#': G })
    const wrench = turn === 0 ? ['#.#', '###', '.#.', '.#.'] : ['.#.#', '.###', '.#..', '#...']
    art(g, 19, 7, wrench, { '#': L })
  },
  // Two small Clawds at his feet taking orders; each step names their poses.
  minis: (g, { a = 'stand', b = 'stand' } = {}) => {
    mini(g, 0, a, 'left')
    mini(g, 17, b, 'right')
  },
  // He stands on a podium before a crowd of small Clawds; the step is each
  // one's pose, in the order CROWD lists them.
  crowd: (g, poses) => {
    podium(g)
    CROWD.forEach(([x, y], i) => member(g, x, y, poses[i] ?? 'stand'))
  },
  // Z's rising off him as he sleeps, a new one every other step, each
  // growing as it floats up and away. A negative step shows none.
  zz: (g, t) => {
    if (t < 0) return
    const levels = [
      () => glyph(g, 'z', 16, 8, G),
      () => glyph(g, 'z', 18, 5, L),
      () => glyph(g, 'Z', 19, 1, L),
    ]
    levels.forEach((draw, k) => {
      if ((((t - k) % 2) + 2) % 2 === 0) draw()
    })
  },
  // Three stars circling over his head while he is dizzy; the nearer ones,
  // low on the ring, are drawn bigger.
  dizzy: (g, n) => {
    for (let i = 0; i < 3; i++) {
      const angle = ((n % 6) / 6 + i / 3) * Math.PI * 2
      const x = Math.round(BX + 6 + Math.cos(angle) * 6)
      const y = Math.round(5 + Math.sin(angle) * 1.5)
      if (Math.sin(angle) > 0.3) glyph(g, '+', x - 1, y - 1, Y)
      else put(g, x, y, Y)
    }
  },
  // A bead of sweat running down beside his head.
  sweat: (g, n) => {
    put(g, BX + BODY_W, BY - 1 + n, BL)
    put(g, BX + BODY_W, BY + n, BL)
  },
  sparkles: (g, n) => {
    const spots = [
      [1, 5],
      [19, 2],
      [21, 10],
      [0, 12],
      [17, 6],
      [4, 1],
    ]
    spots.forEach(([x, y], i) => {
      if ((i + n) % 2 === 0) glyph(g, '+', x, y, Y)
      else put(g, x + 1, y + 1, Y)
    })
  },
  // A hydraulic press: its housing at the top, a rod down to a steel plate
  // with a hazard-striped edge. The step is the row the plate's top is on.
  press: (g, top) => {
    box(g, 8, 0, 8, 2, D)
    box(g, 8, 0, 8, 1, G)
    if (top > 2) box(g, 11, 2, 2, top - 2, L)
    box(g, 3, top, 18, 1, G)
    for (let x = 3; x < 21; x++) put(g, x, top + 1, Math.floor((x - 3) / 2) % 2 === 0 ? Y : D)
  },
  oops: (g, n) => {
    glyph(g, '!', 18, 1 + (n % 2), R)
    glyph(g, '!', 20, 2 - (n % 2), R)
  },
}

const HELD = new Set(['laptop', 'book', 'clipboard', 'magnifier', 'press', 'minis', 'crowd', 'workshop'])

const range = n => Array.from({ length: n }, (_, i) => i)

// A run of typing: the hands take turns on the keys, the eyes stay on them.
const typed = (count, extra = {}) =>
  range(count).map(i => ({ eyes: 'down', armL: i % 2 === 0 ? 'mid' : 'rest', armR: i % 2 === 0 ? 'rest' : 'mid', prop: ['laptop'], ...extra }))

// Each frame is Clawd's pose and a prop with its step, or several as `props`.
const ANIMS = {
  // Waiting for a prompt, but not still: he breathes, glances around, blinks,
  // shuffles a step, stretches and taps a foot. No wave or hop: those mean
  // "needs you" and "done".
  idle: {
    ms: 260,
    frames: [
      {},
      {},
      { breathe: 1 },
      { breathe: 1 },
      { eyes: 'left' },
      { eyes: 'left' },
      { eyes: 'left' },
      {},
      { eyes: 'right' },
      { eyes: 'right' },
      { eyes: 'right' },
      {},
      { eyes: 'closed' },
      {},
      { dx: -1, legs: 'walkA', eyes: 'left' },
      { dx: -1, legs: 'walkB', eyes: 'left' },
      { dx: -1 },
      { legs: 'walkA' },
      {},
      { squash: -1, armL: 'up', armR: 'up', eyes: 'closed' },
      { squash: -1, armL: 'up', armR: 'up', eyes: 'closed' },
      { armL: 'mid', armR: 'mid' },
      {},
      { breathe: 1 },
      { breathe: 1 },
      {},
      { legs: 'walkA' },
      {},
      { legs: 'walkA' },
      {},
    ],
  },
  // Ten seconds of sleep: slow breaths under a stream of Z's; he twitches
  // an arm, peeks out with one eye (the Z's pause), and shifts over.
  sleeping: {
    ms: 500,
    frames: range(20).map(f => {
      const frame = { lie: [2, 2, 3, 3][f % 4], eyes: 'closed', prop: ['zz', f] }
      if (f === 6 || f === 7) frame.armR = 'mid'
      if (f === 12 || f === 13) Object.assign(frame, { eyes: 'wink', prop: ['zz', -1] })
      if (f === 16 || f === 17) frame.dx = 1
      return frame
    }),
  },
  // Hand on his chin under a filling thought cloud: he looks about, shifts
  // his weight, taps a foot, and now and then a bulb lights up.
  thinking: {
    ms: 350,
    frames: [
      { eyes: 'up', armL: 'mid', prop: ['dots', 0] },
      { eyes: 'up', armL: 'mid', prop: ['dots', 0] },
      { eyes: 'up', armL: 'mid', prop: ['dots', 1] },
      { eyes: 'up', armL: 'mid', prop: ['dots', 2] },
      { eyes: 'up', armL: 'mid', prop: ['dots', 3] },
      { eyes: 'upleft', armL: 'mid', prop: ['dots', 3] },
      { eyes: 'upleft', armL: 'mid', breathe: 1, prop: ['dots', 3] },
      { eyes: 'closed', armL: 'mid', breathe: 1, prop: ['dots', 3] },
      { eyes: 'upright', armL: 'mid', prop: ['dots', 1] },
      { eyes: 'upright', armL: 'mid', prop: ['dots', 2] },
      { eyes: 'upright', armL: 'mid', prop: ['dots', 3] },
      { eyes: 'up', armL: 'mid', dx: 1, prop: ['dots', 3] },
      { eyes: 'up', armL: 'mid', dx: 1, legs: 'walkA', prop: ['dots', 3] },
      { eyes: 'up', armL: 'mid', dx: 1, prop: ['dots', 3] },
      { eyes: 'up', armL: 'mid', dx: 1, legs: 'walkA', prop: ['dots', 3] },
      { eyes: 'left', armL: 'mid', prop: ['dots', 2] },
      { eyes: 'left', armL: 'mid', breathe: 1, prop: ['dots', 3] },
      { eyes: 'wide', prop: ['idea', 0] },
      { eyes: 'wide', armR: 'up', prop: ['idea', 1] },
      { eyes: 'happy', armR: 'up', prop: ['idea', 0] },
      { eyes: 'happy', armR: 'mid', prop: ['idea', 1] },
      { eyes: 'up', armL: 'mid', prop: ['dots', 0] },
      { eyes: 'up', armL: 'mid', breathe: 1, prop: ['dots', 0] },
      { eyes: 'closed', armL: 'mid', prop: ['dots', 0] },
    ],
  },
  // He talks with his hands while a reply fills the bubble line by line,
  // pauses, and starts on the next.
  responding: {
    ms: 300,
    frames: [
      ...[0, 1, 2, 3, 4, 5, 6, 6, 6].map((n, i) => ({ breathe: i % 2, armR: i % 3 === 1 ? 'mid' : 'rest', prop: ['speech', n] })),
      { eyes: 'closed', prop: ['speech', 6] },
      { prop: ['speech', 6] },
      { eyes: 'right', prop: ['speech', 6] },
      ...[7, 8, 9, 10, 11, 12, 13, 13, 13].map((n, i) => ({
        breathe: i % 2,
        armL: i % 3 === 0 ? 'mid' : 'rest',
        armR: i % 3 === 2 ? 'mid' : 'rest',
        dx: i >= 3 && i < 7 ? 1 : 0,
        prop: ['speech', n],
      })),
      { eyes: 'happy', prop: ['speech', 13] },
      { eyes: 'happy', armR: 'mid', prop: ['speech', 13] },
      { eyes: 'closed', prop: ['speech', 13] },
      { prop: ['speech', 0] },
      { breathe: 1, prop: ['speech', 0] },
      { eyes: 'left', prop: ['speech', 0] },
      { prop: ['speech', 0] },
    ],
  },
  // Ten seconds at the laptop: bursts of typing between a look at the
  // screen, a think, a blink and a sit back.
  typing: {
    ms: 250,
    frames: [
      ...typed(8),
      { eyes: 'downright', prop: ['laptop'] },
      { eyes: 'downright', prop: ['laptop'] },
      { eyes: 'down', prop: ['laptop'] },
      ...typed(6),
      { eyes: 'up', prop: ['laptop'] },
      { eyes: 'up', breathe: 1, prop: ['laptop'] },
      { eyes: 'upright', prop: ['laptop'] },
      ...typed(8),
      { eyes: 'closed', prop: ['laptop'] },
      { eyes: 'down', prop: ['laptop'] },
      ...typed(6),
      { eyes: 'down', breathe: 1, prop: ['laptop'] },
      { eyes: 'down', breathe: 1, prop: ['laptop'] },
      ...typed(2),
    ],
  },
  // From behind the book: his eyes go down the left page, then the right,
  // and a page flips over the top as he turns it.
  reading: {
    ms: 340,
    frames: [
      ...range(4).map(() => ({ eyes: 'downleft', prop: ['book', {}] })),
      ...range(4).map(() => ({ eyes: 'downright', prop: ['book', {}] })),
      { eyes: 'closed', prop: ['book', {}] },
      { eyes: 'downright', armR: 'mid', prop: ['book', { turn: 1 }] },
      { eyes: 'down', armR: 'mid', prop: ['book', { turn: 2 }] },
      { eyes: 'downleft', prop: ['book', { turn: 3 }] },
      ...range(4).map(() => ({ eyes: 'downleft', prop: ['book', {}] })),
      ...range(4).map(() => ({ eyes: 'downright', prop: ['book', {}] })),
      { eyes: 'downright', breathe: 1, prop: ['book', {}] },
      { eyes: 'downright', armR: 'mid', prop: ['book', { turn: 1 }] },
      { eyes: 'down', armR: 'mid', prop: ['book', { turn: 2 }] },
      { eyes: 'downleft', prop: ['book', { turn: 3 }] },
      { eyes: 'down', prop: ['book', {}] },
      { eyes: 'closed', prop: ['book', {}] },
      { eyes: 'down', prop: ['book', {}] },
      { eyes: 'downleft', prop: ['book', {}] },
    ],
  },
  // He raises the magnifying glass high and lowers it again, peering through.
  searching: {
    ms: 280,
    frames: [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 0],
      [2, 1],
      [2, 2],
      [1, 2],
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [2, 1],
      [2, 2],
      [2, 0],
      [1, 1],
      [0, 2],
      [0, 0],
      [1, 1],
    ].map(([level, glint]) => ({ eyes: level === 2 ? 'upright' : 'right', armR: ['rest', 'mid', 'up'][level], prop: ['magnifier', { level, glint }] })),
  },
  running: {
    ms: 110,
    frames: range(8).map(n => ({
      legs: n % 2 === 0 ? 'walkA' : 'walkB',
      dy: n % 2 === 0 ? 0 : -1,
      armL: n % 2 === 0 ? 'mid' : 'down',
      armR: n % 2 === 0 ? 'down' : 'mid',
      eyes: 'upright',
      prop: ['terminal', Math.floor(n / 2)],
    })),
  },
  // Beside a spinning globe: he points at it, sways, hops with his arms up,
  // taps a foot and reaches for it.
  browsing: {
    ms: 200,
    frames: range(28).map(n => {
      const pose =
        n < 7
          ? { eyes: 'upright', armR: 'mid' }
          : n < 12
            ? { eyes: 'up', armL: 'mid', dx: n % 2 === 0 ? -1 : 0 }
            : n < 16
              ? { eyes: 'happy', armL: 'up', armR: 'up', dy: n % 2 === 0 ? -1 : 0, legs: n % 2 === 0 ? 'tuck' : 'stand' }
              : n < 22
                ? { eyes: 'right', armR: 'up', legs: n % 2 === 0 ? 'walkA' : 'stand' }
                : { eyes: 'upright', armR: n % 2 === 0 ? 'mid' : 'rest', breathe: n % 2 }
      return { ...pose, prop: ['globe', n] }
    }),
  },
  // The big Clawd gives orders to two small ones at his feet: they salute in
  // turn, march in place, and hop to it.
  delegating: {
    ms: 260,
    frames: [
      { eyes: 'left', armL: 'mid', prop: ['minis', {}] },
      { eyes: 'left', armL: 'up', prop: ['minis', {}] },
      { eyes: 'left', armL: 'up', prop: ['minis', { a: 'salute' }] },
      { eyes: 'left', armL: 'mid', prop: ['minis', { a: 'salute' }] },
      { eyes: 'right', armR: 'mid', prop: ['minis', {}] },
      { eyes: 'right', armR: 'up', prop: ['minis', {}] },
      { eyes: 'right', armR: 'up', prop: ['minis', { b: 'salute' }] },
      { eyes: 'right', armR: 'mid', prop: ['minis', { b: 'salute' }] },
      { eyes: 'down', armL: 'mid', armR: 'mid', prop: ['minis', { a: 'walkA', b: 'walkB' }] },
      { eyes: 'down', armL: 'up', armR: 'up', prop: ['minis', { a: 'walkB', b: 'walkA' }] },
      { eyes: 'down', armL: 'mid', armR: 'mid', prop: ['minis', { a: 'walkA', b: 'walkB' }] },
      { eyes: 'down', armL: 'up', armR: 'up', prop: ['minis', { a: 'walkB', b: 'walkA' }] },
      { eyes: 'happy', prop: ['minis', { a: 'hop' }] },
      { eyes: 'happy', prop: ['minis', { b: 'hop' }] },
      { eyes: 'happy', prop: ['minis', { a: 'hop' }] },
      { breathe: 1, prop: ['minis', {}] },
    ],
  },
  // A big job: up on a podium he conducts a crowd of small Clawds. A wave
  // runs through them, left to right, as he waves them on; they cheer one by
  // one; then everyone marches in place while he keeps the beat.
  rallying: {
    ms: 220,
    frames: [
      ...range(8).map(n => ({
        dy: PODIUM_LIFT,
        eyes: n < 4 ? 'downleft' : 'downright',
        armL: n % 4 < 2 ? 'up' : 'mid',
        armR: n % 4 < 2 ? 'mid' : 'up',
        prop: ['crowd', CROWD.map((_, i) => (n === i || n === i + 1 ? 'hop' : 'stand'))],
      })),
      ...range(8).map(n => ({
        dy: PODIUM_LIFT,
        eyes: n < 6 ? 'down' : 'happy',
        armL: 'up',
        armR: 'up',
        prop: ['crowd', CROWD.map((_, i) => (i <= n ? 'cheer' : 'stand'))],
      })),
      ...range(8).map(n => ({
        dy: PODIUM_LIFT,
        eyes: n % 4 < 2 ? 'down' : 'happy',
        armL: n % 2 === 0 ? 'mid' : 'rest',
        armR: n % 2 === 0 ? 'rest' : 'mid',
        prop: ['crowd', CROWD.map((_, i) => ((i + n) % 2 === 0 ? 'stepA' : 'stepB'))],
      })),
    ],
  },
  // A clipboard at his side: he reads it, ticks lines off, nods, looks up to
  // think, and starts a fresh page.
  planning: {
    ms: 330,
    frames: [
      { eyes: 'right', armR: 'mid', prop: ['clipboard', 0] },
      { eyes: 'downright', armR: 'mid', prop: ['clipboard', 0] },
      { eyes: 'downright', armR: 'mid', prop: ['clipboard', 1] },
      { eyes: 'right', armR: 'mid', breathe: 1, prop: ['clipboard', 1] },
      { eyes: 'downright', armR: 'mid', prop: ['clipboard', 1] },
      { eyes: 'downright', armR: 'mid', prop: ['clipboard', 2] },
      { eyes: 'right', armR: 'mid', breathe: 1, prop: ['clipboard', 2] },
      { eyes: 'up', armR: 'mid', prop: ['clipboard', 2] },
      { eyes: 'upleft', armR: 'mid', prop: ['clipboard', 2] },
      { eyes: 'downright', armR: 'mid', prop: ['clipboard', 2] },
      { eyes: 'downright', armR: 'mid', prop: ['clipboard', 3] },
      { eyes: 'happy', armR: 'mid', prop: ['clipboard', 3] },
      { eyes: 'happy', armR: 'mid', armL: 'mid', prop: ['clipboard', 3] },
      { eyes: 'closed', armR: 'mid', prop: ['clipboard', 3] },
      { eyes: 'right', armR: 'mid', prop: ['clipboard', 3] },
      { eyes: 'right', armR: 'mid', prop: ['clipboard', 0] },
    ],
  },
  // Wrench in hand, he turns the lower of two gears a notch at a time.
  tooling: {
    ms: 220,
    frames: range(16).map(n => ({
      eyes: n % 8 < 6 ? 'upright' : 'right',
      armR: 'mid',
      prop: ['workshop', n],
    })),
  },
  // He waves, taps a foot, hops with both arms up to be seen, waves the other
  // arm and looks around, while his bubble asks and then exclaims.
  waiting: {
    ms: 280,
    frames: [
      ...range(6).map(n => ({ eyes: 'wide', armR: n % 2 === 0 ? 'up' : 'mid', prop: ['ask', n] })),
      ...range(6).map(n => ({ eyes: n % 3 === 2 ? 'closed' : 'open', legs: n % 2 === 0 ? 'walkA' : 'stand', prop: ['ask', 0] })),
      ...range(4).map(n => ({
        eyes: 'wide',
        armL: 'up',
        armR: 'up',
        dy: n % 2 === 0 ? -2 : 0,
        legs: n % 2 === 0 ? 'tuck' : 'stand',
        prop: ['alert', n],
      })),
      ...range(6).map(n => ({ eyes: 'wide', armL: n % 2 === 0 ? 'up' : 'mid', prop: ['alert', n] })),
      ...range(4).map(n => ({ eyes: n < 2 ? 'left' : 'right', dx: n < 2 ? -1 : 1, prop: ['ask', n] })),
      ...range(4).map(n => ({ eyes: 'wide', armR: n % 2 === 0 ? 'up' : 'mid', breathe: n % 2, prop: ['ask', n] })),
    ],
  },
  done: {
    ms: 130,
    frames: [
      { squash: 1, eyes: 'happy', prop: ['sparkles', 0] },
      { dy: -2, legs: 'tuck', armL: 'up', armR: 'up', eyes: 'happy', prop: ['sparkles', 1] },
      { dy: -4, legs: 'tuck', armL: 'up', armR: 'up', eyes: 'happy', prop: ['sparkles', 0] },
      { dy: -5, legs: 'tuck', armL: 'up', armR: 'up', eyes: 'happy', prop: ['sparkles', 1] },
      { dy: -4, legs: 'tuck', armL: 'up', armR: 'up', eyes: 'happy', prop: ['sparkles', 0] },
      { dy: -2, armL: 'mid', armR: 'mid', eyes: 'happy', prop: ['sparkles', 1] },
      { squash: 1, eyes: 'happy', prop: ['sparkles', 0] },
      { eyes: 'happy', prop: ['sparkles', 1] },
      { eyes: 'happy', prop: ['sparkles', 0] },
      { eyes: 'happy', prop: ['sparkles', 1] },
    ],
  },
  // The shock (shaking, dark and X-eyed under a red "!!") and a dizzy spell
  // with stars circling his head, over and over while the error shows.
  error: {
    ms: 140,
    frames: [
      ...range(8).map(n => ({ color: S, eyes: 'x', dx: [0, -1, 0, 1][n % 4], armL: 'down', armR: 'down', prop: ['oops', n] })),
      ...range(24).map(n => ({
        color: S,
        eyes: 'x',
        breathe: 1,
        dx: [0, 0, -1, -1, 0, 0, 1, 1][n % 8],
        armL: 'down',
        armR: 'down',
        prop: ['dizzy', Math.floor(n / 2)],
      })),
    ],
  },
  // A hydraulic press comes down and squashes him flat, presses him flatter
  // still, and lifts; he lies flat a moment, comes to, and pops back up. The
  // press step is its plate's row.
  compacting: {
    ms: 150,
    frames: [
      { eyes: 'up', prop: ['press', 2] },
      { eyes: 'up', prop: ['press', 4] },
      { eyes: 'wide', prop: ['press', 6] },
      { squash: 2, eyes: 'closed', armL: 'mid', armR: 'mid', prop: ['press', 8] },
      { squash: 4, eyes: 'squished', armL: 'mid', armR: 'mid', prop: ['press', 10] },
      { squash: 5, eyes: 'squished', armL: 'none', armR: 'none', prop: ['press', 11] },
      { lie: 6, eyes: 'squished', prop: ['press', 14] },
      { lie: 6, eyes: 'squished', prop: ['press', 14] },
      { lie: 7, eyes: 'squished', prop: ['press', 15] },
      { lie: 7, eyes: 'squished', prop: ['press', 15] },
      { lie: 7, eyes: 'squished', prop: ['press', 15] },
      { lie: 6, eyes: 'squished', prop: ['press', 14] },
      { lie: 6, eyes: 'squished', prop: ['press', 11] },
      { lie: 6, eyes: 'squished', prop: ['press', 7] },
      { lie: 6, eyes: 'squished', prop: ['press', 2] },
      { lie: 6, eyes: 'dot', prop: ['press', 2] },
      { lie: 5, eyes: 'dot', prop: ['press', 2] },
      { squash: -2, armL: 'up', armR: 'up', eyes: 'happy', prop: ['press', 2] },
      { dy: -2, legs: 'tuck', armL: 'up', armR: 'up', eyes: 'happy', prop: ['press', 2] },
      { dy: -1, armL: 'mid', armR: 'mid', eyes: 'happy', prop: ['press', 2] },
      { squash: 1, eyes: 'happy', prop: ['press', 2] },
      { prop: ['press', 2] },
      { eyes: 'up', prop: ['press', 2] },
      { eyes: 'up', prop: ['press', 2] },
    ],
  },
}

// ------------------------------------------------- more to pick from --
//
// Two more animations for every mood, each a routine of five to fifteen
// seconds: the person picks which one a mood uses in the pane's settings.
// A frame may hold several props as `props`, drawn in order, those HELD lists
// in front of him.

const NOTE = ['.##', '.#.', '.#.', '##.']
const CUP = ['y....y', 'yyyyyy', '.yyyy.', '..yy..', '..yy..', '.yyyy.']

// Whether cell (x, y) is in the triangle with corners p, q and r.
const inTriangle = (x, y, [px, py], [qx, qy], [rx, ry]) => {
  const d1 = (x - qx) * (py - qy) - (px - qx) * (y - qy)
  const d2 = (x - rx) * (qy - ry) - (qx - rx) * (y - ry)
  const d3 = (x - px) * (ry - py) - (rx - px) * (y - py)
  return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0))
}

// The sea's surface at column x, `n` steps into its roll: a swell between
// rows 11 and 17.
const swellAt = (x, n) => 14 - Math.round(3 * Math.sin(((x + n * 2) / 24) * Math.PI * 2))

// A crate, its top-left corner at (x, y).
const crate = (g, x, y) => {
  box(g, x, y, 3, 2, BR)
  put(g, x + 1, y, Y)
}

Object.assign(PROPS, {
  // A mug of coffee, steam curling off it: `at` his hand, `near` on its way
  // up, `lips` to his face for a sip.
  mug: (g, { at = 'hand', steam = 0 } = {}) => {
    const [x, y] = { hand: [20, 9], near: [18, 9], lips: [15, 10] }[at]
    art(g, x, y, ['bbb', 'www', 'www'], { b: BR, w: WT })
    ;[y - 1, y - 2, y - 3].forEach((sy, k) => put(g, x + ((steam + k) % 3), sy, k === 2 ? L : G))
  },
  // Two notes drifting up and away from him as he hums.
  notes: (g, n) => {
    ;[0, 1].forEach(k => {
      const t = (n + k * 4) % 8
      art(g, 12 + k * 5 + (t % 2), 5 - t, NOTE, { '#': k === 0 ? Y : BL })
    })
  },
  // The night over him: a crescent moon, and stars twinkling in turn.
  night: (g, n) => {
    art(g, 1, 0, ['.yy', 'y..', 'y..', '.yy'], { y: Y })
    ;[
      [7, 1],
      [12, 4],
      [18, 1],
      [21, 5],
      [15, 0],
    ].forEach(([x, y], i) => {
      const phase = (i + n) % 3
      if (phase !== 0) put(g, x, y, phase === 1 ? WT : L)
    })
  },
  // A striped blanket over him as he lies asleep, up to just under his eyes.
  blanket: (g, { lie = 2, dx = 0 } = {}) => {
    const bx = BX + dx - lie
    const bw = BODY_W + 2 * lie
    const by = GROUND - (BODY_H - lie)
    for (let y = by + 4; y < GROUND; y++) {
      for (let x = bx - 1; x <= bx + bw; x++) put(g, x, y, Math.floor((x - bx + 1) / 2) % 2 === 0 ? BL : WT)
    }
  },
  // A question mark bobbing over his head.
  qmark: (g, n) => glyph(g, '?', 11, 1 + (n % 2), Y),
  // A puzzle cube in his hands, three squares a side, two pixels each:
  // `cells` their colors row by row, `y` its top row, and `twist` a row
  // (0-2) or a column (3-5) caught turning, a pixel out of line.
  cube: (g, { cells = [], y = 11, twist = -1 } = {}) => {
    const x = BX + 3
    cells.forEach((c, i) => {
      const row = Math.floor(i / 3)
      const col = i % 3
      const shift = twist === row ? 1 : 0
      const lift = twist === col + 3 ? 1 : 0
      box(g, x + col * 2 + shift, y + row * 2 - lift, 2, 2, c)
    })
  },
  // A sheet of paper before him, written on line by line: `n` letters down,
  // the pen at the last.
  letter: (g, n) => {
    box(g, BX + 1, BY + 4, 10, 5, WT)
    let left = n
    let tip = [BX + 2, BY + 5]
    for (const [y, width] of [
      [BY + 5, 8],
      [BY + 7, 6],
    ]) {
      const w = Math.min(Math.max(left, 0), width)
      if (w > 0) box(g, BX + 2, y, w, 1, D)
      if (left >= 0) tip = [BX + 2 + w, y]
      left -= width
    }
    const [x, y] = tip
    put(g, x, y, K)
    put(g, x + 1, y - 1, Y)
    put(g, x + 2, y - 2, Y)
  },
  // A whiteboard at his upper left: `n` strokes of it drawn.
  board: (g, n) => {
    box(g, 0, 0, 11, 7, G)
    box(g, 1, 1, 9, 5, WT)
    let left = n
    for (const [x, y, c, width] of [
      [2, 2, BL, 6],
      [2, 4, R, 4],
      [7, 4, GR, 2],
    ]) {
      const w = Math.min(Math.max(left, 0), width)
      if (w > 0) box(g, x, y, w, 1, c)
      left -= width
    }
  },
  // Green code raining down behind him, as in a hacker film: in each column
  // a bright head and a fading trail.
  matrix: (g, n) => {
    ;[0, 2, 3, 5, 8, 11, 14, 18, 20, 21, 23].forEach((x, k) => {
      const head = ((n * (1 + (k % 2)) + k * 7) % 26) - 4
      for (let t = 0; t < 5; t++) {
        const y = head - t
        if (y >= 0 && y < GROUND) put(g, x, y, t === 0 ? WT : t < 3 ? GR : D)
      }
    })
  },
  // Dark glasses over his eyes, a glint crossing them now and then.
  shades: (g, glint = 0) => {
    box(g, BX + 1, BY + 2, 4, 2, K)
    box(g, BX + 7, BY + 2, 4, 2, K)
    box(g, BX + 5, BY + 2, 2, 1, K)
    if (glint % 6 === 0) put(g, BX + 2, BY + 2, WT)
    if (glint % 6 === 3) put(g, BX + 8, BY + 2, WT)
  },
  // A monitor at his upper right, code scrolling up it.
  monitor: (g, n) => {
    box(g, 14, 0, 10, 7, D)
    box(g, 15, 1, 8, 5, K)
    const code = [
      [0, 4, GR],
      [1, 6, L],
      [0, 3, Y],
      [2, 5, BL],
      [1, 4, L],
      [0, 6, GR],
      [2, 3, Y],
      [1, 5, L],
    ]
    for (let row = 0; row < 5; row++) {
      const [indent, w, c] = code[(row + n) % code.length]
      box(g, 16 + indent, 1 + row, Math.min(w, 6 - indent), 1, c)
    }
    box(g, 18, 7, 2, 1, G)
  },
  // A keyboard in front of him, its keys lighting as he types.
  keyboard: (g, n) => {
    box(g, BX, BY + 6, BODY_W, 2, D)
    for (let k = 0; k < 5; k++) put(g, BX + 1 + k * 2 + (n % 2), BY + 6 + (k % 2), (n + k) % 3 === 0 ? WT : L)
  },
  // A newspaper held up before him, his eyes over its top; `turn` lifts a
  // corner, then the page, as he turns it.
  newspaper: (g, { turn = 0 } = {}) => {
    box(g, 4, 11, 16, 6, L)
    box(g, 11, 11, 1, 6, G)
    box(g, 5, 12, 5, 1, K)
    box(g, 13, 12, 3, 1, D)
    for (const y of [14, 15]) {
      box(g, 5, y, 5, 1, G)
      box(g, 13, y, 6, 1, G)
    }
    if (turn === 1) {
      box(g, 18, 11, 2, 1, WT)
      put(g, 19, 12, WT)
    }
    if (turn === 2) box(g, 12, 10, 5, 1, WT)
  },
  // A tablet in his hands, its screen toward him: we see its back, its
  // camera and its logo.
  tablet: g => {
    box(g, BX + 2, BY + 4, 8, 5, G)
    box(g, BX + 2, BY + 4, 8, 1, L)
    put(g, BX + 8, BY + 5, K)
    box(g, BX + 5, BY + 6, 2, 2, L)
  },
  // A flashlight in his raised right hand pointed out over his head, its
  // beam sweeping the dark: `dir` 0 low, 1 level, 2 high, past the top. The
  // cone is lit in a checker, solid where it lands; the flashlight points
  // along it, its lens at the cone's tip.
  flashlight: (g, dir = 1) => {
    const [lens, a, b] = [
      [
        [14, 6],
        [0, 2],
        [0, 7],
      ],
      [
        [14, 4],
        [0, 0],
        [0, 6],
      ],
      [
        [14, 2],
        [0, -4],
        [0, 1],
      ],
    ][dir]
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < W; x++) {
        if (!inTriangle(x, y, lens, a, b)) continue
        if (x <= 1 || (x + y) % 2 === 0) put(g, x, y, Y)
      }
    }
    const [lx, ly] = lens
    if (dir === 2) {
      // Tilted up: the tube climbs from his hand to the lens.
      put(g, 17, 5, G)
      put(g, 16, 4, G)
      put(g, 16, 3, G)
      put(g, 15, 3, G)
      put(g, 15, 2, G)
    } else box(g, lx + 1, ly, 3, 2, G)
    put(g, lx, ly, WT)
    put(g, lx, ly + 1, WT)
  },
  // Binoculars held to his eyes, big barrels and lenses, a glint crossing a
  // lens: `low` rows lower on their way down to his chest (5), and `dy`
  // lifting them with him when he hops.
  binoculars: (g, { dx = 0, glint = 0, low = 0, dy = 0 } = {}) => {
    const x = BX + dx
    const y = BY + low + dy
    box(g, x, y, 4, 4, D)
    box(g, x + 8, y, 4, 4, D)
    box(g, x + 4, y + 1, 4, 2, D)
    box(g, x + 1, y + 1, 2, 2, BL)
    box(g, x + 9, y + 1, 2, 2, BL)
    if (glint % 4 === 0) put(g, x + 1, y + 1, WT)
    if (glint % 4 === 2) put(g, x + 9, y + 1, WT)
  },
  // A treadmill: its belt running under his feet, its console ahead of him.
  treadmill: (g, n) => {
    for (let x = 2; x < 22; x++) put(g, x, GROUND, (x + n) % 4 === 0 ? L : D)
    box(g, 21, 9, 1, 9, G)
    box(g, 20, 7, 4, 3, D)
    put(g, 21, 8, n % 2 === 0 ? GR : Y)
    put(g, 22, 8, GR)
  },
  // A progress bar across the top: `n` cells of 20 filled; past full, it
  // flashes.
  progress: (g, n) => {
    box(g, 1, 1, 22, 4, G)
    box(g, 2, 2, 20, 2, D)
    const fill = Math.min(20, n)
    if (fill > 0) box(g, 2, 2, fill, 2, n > 20 && n % 2 === 1 ? Y : GR)
  },
  // A big swell rolling in under him, filled down to the bottom: foam along
  // its face, a lip curling off the crest, spray flying; and his surfboard,
  // two pixels thick, riding its face, `board` the two ends of its deck.
  waves: (g, { n = 0, board: [x0, y0, x1, y1] = [5, 15, 19, 15] } = {}) => {
    for (let x = 0; x < W; x++) {
      const top = swellAt(x, n)
      for (let y = top; y <= GROUND; y++) put(g, x, y, y === top ? WT : BL)
      if (top === 11) {
        put(g, x - 1, top - 1, WT)
        if ((x + n) % 2 === 0) put(g, x - 2, top - 3, WT)
      }
    }
    for (let x = x0; x <= x1; x++) {
      const y = Math.round(y0 + ((y1 - y0) * (x - x0)) / (x1 - x0))
      put(g, x, y, x === x0 || x === x1 ? BR : Y)
      put(g, x, y + 1, BR)
    }
  },
  // A browser window at his upper right loading a page: `n` 0-3 a spinner,
  // then a picture and its lines of text one by one.
  browser: (g, n) => {
    box(g, 11, 0, 13, 7, WT)
    box(g, 11, 0, 13, 1, L)
    put(g, 12, 0, R)
    put(g, 13, 0, Y)
    put(g, 14, 0, GR)
    if (n < 4) {
      const ring = [
        [16, 2],
        [17, 2],
        [18, 3],
        [17, 4],
        [16, 4],
        [15, 3],
      ]
      ring.forEach(([x, y], i) => {
        if ((i - n * 2 + 12) % 6 < 3) put(g, x, y, BL)
      })
      return
    }
    box(g, 12, 2, 5, 4, BL)
    box(g, 12, 5, 5, 1, GR)
    put(g, 15, 3, Y)
    ;[
      [18, 2, 5],
      [18, 3, 3],
      [18, 5, 4],
    ].forEach(([x, y, w], i) => {
      if (n >= 5 + i) box(g, x, y, w, 1, G)
    })
  },
  // A stack of crates on the floor at his right, the work to hand out.
  stack: g => {
    crate(g, 20, 16)
    crate(g, 21, 14)
    crate(g, 20, 12)
  },
  // A crate held at [x, y].
  crate: (g, [x, y] = [0, 0]) => crate(g, x, y),
  // Small Clawds on the move: each { x, pose, side, lift, carry }, the
  // carriers with a crate on their heads.
  walkers: (g, list = []) => {
    for (const { x, pose = 'stand', side = 'left', lift = 0, carry = false } of list) {
      mini(g, x, pose, side, lift)
      if (carry) crate(g, x + 2, (pose === 'hop' ? 13 : 14) - lift - 2)
    }
  },
  // A star, its center at [x, y].
  star: (g, [x, y] = [21, 2]) => {
    glyph(g, '+', x - 1, y - 1, Y)
    put(g, x, y, WT)
  },
  // An endless file of small Clawds marching off to the right below the
  // podium, `n` steps along.
  line: (g, n) => {
    podium(g)
    for (let k = 0; k < 5; k++) member(g, ((k * 6 + n) % 30) - 6, 14, (n + k) % 2 === 0 ? 'stepA' : 'stepB')
  },
  // Small Clawds, each [x, y, pose].
  members: (g, list = []) => {
    for (const [x, y, pose] of list) member(g, x, y, pose)
  },
  // A map held open before him, a dotted path traced across it: `n` dots
  // drawn, then its X, flashing past six.
  map: (g, n) => {
    box(g, 4, 12, 16, 5, BR)
    box(g, 5, 13, 14, 3, L)
    put(g, 9, 14, BL)
    put(g, 10, 14, BL)
    const path = [
      [6, 15],
      [8, 14],
      [11, 15],
      [13, 14],
      [15, 15],
      [16, 13],
    ]
    path.slice(0, Math.min(n, path.length)).forEach(([x, y]) => put(g, x, y, R))
    if (n >= path.length) {
      const c = n > path.length && n % 2 === 1 ? Y : R
      put(g, 17, 13, c)
      put(g, 18, 14, c)
      put(g, 18, 13, c)
      put(g, 17, 14, c)
    }
  },
  // A cork board at his upper left, `n` sticky notes up on it.
  stickies: (g, n) => {
    box(g, 0, 0, 12, 7, BR)
    ;[
      [1, 1, Y],
      [4, 1, GR],
      [7, 1, BL],
      [1, 4, R],
      [4, 4, Y],
      [7, 4, GR],
      [10, 2, BL],
    ]
      .slice(0, n)
      .forEach(([x, y, c]) => box(g, x, y, 2, 2, c))
  },
  // A block of wood at his right with a nail in it, `nail` 0-3 how far in,
  // and a hammer in his right hand: `up` raised, else struck down on the
  // nail, `hit` with sparks.
  hammer: (g, { up = false, nail = 0, hit = false } = {}) => {
    box(g, 19, 15, 5, 3, BR)
    const h = 3 - nail
    if (h > 0) box(g, 21, 15 - h, 1, h, L)
    if (up) {
      box(g, 19, 3, 3, 2, G)
      box(g, 20, 5, 1, 1, BR)
      return
    }
    const top = 13 - h
    box(g, 20, top, 3, 2, G)
    for (let y = Math.min(11, top); y <= Math.max(11, top); y++) put(g, 19, y, BR)
    if (hit) {
      put(g, 19, top + 2, Y)
      put(g, 23, top + 2, Y)
      put(g, 23, top - 1, Y)
    }
  },
  // A toolbox on the floor at his right, `open` or shut, with `tool` held up
  // out of it: 1 a wrench, 2 a screwdriver.
  toolbox: (g, { open = false, tool = 0 } = {}) => {
    box(g, 18, 14, 6, 4, R)
    box(g, 18, 15, 6, 1, D)
    box(g, 20, 13, 2, 1, D)
    if (open) box(g, 19, 14, 4, 1, K)
    if (tool === 1) art(g, 18, 2, ['#.#', '###', '.#.', '.#.'], { '#': L })
    if (tool === 2) {
      box(g, 19, 1, 1, 3, L)
      box(g, 19, 4, 1, 2, Y)
    }
  },
  // A sign on a stick in his right hand, `glyph` on its white face in a gray
  // frame: `y` the top row of the frame, raised high over him (-3 or -2) or
  // lowered to his shoulder (1); `tilt` leans it.
  sign: (g, { glyph: ch = '?', y = -2, tilt = 0 } = {}) => {
    const x = 15 + tilt
    box(g, x, y, 9, 7, G)
    box(g, x + 1, y + 1, 7, 5, WT)
    glyph(g, ch, ch === '!' ? x + 4 : x + 3, y + 1, ch === '!' ? R : B)
    const hand = y < 0 ? 6 : 10
    for (let sy = y + 7; sy < hand; sy++) put(g, 19, sy, BR)
  },
  // A desk bell at his right; `ring` draws its sound.
  bell: (g, ring = false) => {
    box(g, 19, 16, 5, 2, D)
    art(g, 19, 13, ['.###.', '#####', '#####'], { '#': L })
    put(g, 21, 12, K)
    if (ring) {
      put(g, 18, 11, Y)
      put(g, 19, 10, Y)
      put(g, 23, 10, Y)
      put(g, 23, 12, Y)
    }
  },
  // A gold cup: `high` held up over his head, else before him; `dy` lifts it
  // with him when he hops.
  trophy: (g, { high = true, dy = 0 } = {}) => {
    const y = (high ? 1 : 10) + dy
    art(g, 9, y, CUP, { y: Y })
    put(g, 10, y + 1, WT)
  },
  // Confetti falling all around him.
  confetti: (g, n) => {
    const colors = [Y, R, BL, GR, MB, WT]
    for (let k = 0; k < 12; k++) put(g, ((k * 7 + 3) % W) + ((n + k) % 3 === 0 ? 1 : 0), (n + k * 5) % 19, colors[k % colors.length])
  },
  // Puffs of smoke rising off him.
  smoke: (g, n) => {
    for (let k = 0; k < 3; k++) {
      const t = (n + k * 3) % 9
      art(g, 9 + k * 2 + (t % 2), 6 - t, ['.##.', '####', '.##.'], { '#': t < 3 ? D : G })
    }
  },
  // A dark cloud over him and the rain from it; `flash` lights it up as
  // lightning leaves it, the rain held.
  rain: (g, { n = 0, flash = false } = {}) => {
    art(g, 5, 0, ['..####......', '.########...', '############', '.##########.'], { '#': flash ? L : D })
    if (flash) return
    ;[6, 9, 12, 15, 8, 14].forEach((x, k) => put(g, x, 4 + ((n + k * 2) % 4), BL))
  },
  // A bolt of lightning from the cloud down onto his head: `n` 0 the whole
  // bolt with sparks off him, 1 its top fading, 2 the sparks alone.
  bolt: (g, n = 0) => {
    const path = [
      [12, 4],
      [11, 5],
      [12, 6],
      [11, 7],
    ]
    path.slice(0, n === 0 ? path.length : n === 1 ? 2 : 0).forEach(([x, y]) => {
      put(g, x, y, Y)
      put(g, x + 1, y, WT)
    })
    if (n !== 1) {
      ;[
        [8, 7],
        [16, 7],
        [9, 6],
        [15, 6],
      ].forEach(([x, y]) => put(g, x, y, Y))
    }
  },
  // A stick vacuum in his right hand, its head on the floor beside him,
  // sucking up the bits that roll and hop into it, a streak behind each and
  // the air rushing in; a negative step, switched off with nothing left.
  vacuum: (g, n) => {
    box(g, 16, 13, 2, 2, G)
    put(g, 16, 12, n < 0 ? D : R)
    put(g, 17, 15, D)
    put(g, 17, 16, D)
    box(g, 16, 17, 4, 1, D)
    if (n < 0) return
    put(g, 20 + (n % 2), 15 + ((n + 1) % 2), L)
    put(g, 21 - (n % 2), 16 - ((n + 1) % 2), L)
    ;[Y, R, BL].forEach((c, k) => {
      const x = 20 + ((((k * 4 - n) % 12) + 12) % 12)
      if (x > 23) return
      const y = x <= 21 ? 16 : 17
      box(g, x, y, 2, 1, c)
      if (x + 2 < W) put(g, x + 2, y, L)
    })
  },
})

for (const prop of ['mug', 'blanket', 'cube', 'letter', 'shades', 'keyboard', 'newspaper', 'tablet', 'binoculars', 'crate', 'walkers', 'star', 'line', 'members', 'map', 'hammer', 'sign', 'trophy', 'vacuum']) {
  HELD.add(prop)
}

const loop = (count, make) => range(count).map(make)

// A puzzle cube's faces on the way from scrambled to solved, a row or a
// column turned between each, and the line turned to reach the next.
const CUBE = [
  [R, Y, BL, GR, WT, R, Y, BL, GR],
  [Y, BL, R, GR, WT, R, Y, BL, GR],
  [Y, BL, R, R, GR, WT, Y, BL, GR],
  [GR, BL, R, GR, GR, WT, GR, BL, GR],
  [GR, GR, R, GR, GR, WT, GR, GR, GR],
  [GR, GR, GR, GR, GR, GR, GR, GR, GR],
]
const CUBE_TURNS = [0, 1, 3, 4, 5]

// The two small Clawds handing work on, by step of a 24-step round: walking
// in from the left, stopping in front of him for a crate, and walking off
// to the right with it.
const carrier = f => {
  const x = f < 6 ? -7 + f * 2 : f < 9 ? 3 : 3 + (f - 8) * 2
  if (x > W) return undefined
  const isWalking = f < 6 || f >= 9
  return { x, pose: isWalking ? (f % 2 === 0 ? 'walkA' : 'walkB') : f === 8 ? 'salute' : 'stand', side: 'left', carry: f >= 6 }
}

// A horde of small Clawds: where each of them ends up, in the order they
// pile on, on the floor, clinging to his sides, on his head, in his face.
const HORDE = [
  [0, 14],
  [19, 14],
  [1, 10],
  [18, 10],
  [6, 5],
  [13, 5],
  [9, 2],
  [7, 11],
  [12, 11],
  [16, 1],
  [2, 1],
]
const hordeAt = n => {
  if (n < 4) {
    const step = n % 2 === 0 ? 'stepA' : 'stepB'
    return [
      [Math.min(0, -6 + (n + 1) * 2), 14, step],
      [Math.max(19, 25 - (n + 1) * 2), 14, step],
    ]
  }
  if (n >= 24) return []
  if (n >= 20) {
    const fling = (n - 19) * 3
    return HORDE.map(([x, y]) => [x + (x < 10 ? -fling : fling), y - fling, 'cheer'])
  }
  const count = Math.min(HORDE.length, n - 1)
  return HORDE.slice(0, count).map(([x, y], i) => [x, y, i === count - 1 && n < 12 ? 'hop' : n >= 12 && (n + i) % 2 === 0 ? 'cheer' : 'stand'])
}

// The tower: one small Clawd climbs onto the other to reach a star he
// points at, jumps for it, and brings it down to him. Each step: the
// climber's [x, lift, pose, side], the one below's [x, pose], and where
// the star is.
const TOWER = [
  [[0, 0, 'stand', 'left'], [17, 'stand'], [21, 2]],
  [[0, 0, 'stand', 'left'], [17, 'stand'], [21, 2]],
  [[0, 0, 'salute', 'left'], [17, 'salute'], [21, 2]],
  [[0, 0, 'stand', 'left'], [17, 'stand'], [21, 2]],
  [[3, 0, 'walkA', 'left'], [17, 'stand'], [21, 2]],
  [[5, 0, 'walkB', 'left'], [17, 'stand'], [21, 2]],
  [[8, 0, 'walkA', 'left'], [17, 'stand'], [21, 2]],
  [[10, 0, 'walkB', 'left'], [17, 'stand'], [21, 2]],
  [[12, 0, 'walkA', 'left'], [17, 'stand'], [21, 2]],
  [[14, 2, 'hop', 'left'], [17, 'stand'], [21, 2]],
  [[17, 4, 'stand', 'right'], [17, 'stand'], [21, 2]],
  [[17, 4, 'salute', 'right'], [17, 'stand'], [21, 2]],
  [[18, 4, 'salute', 'right'], [18, 'stand'], [21, 2]],
  [[16, 4, 'salute', 'right'], [16, 'stand'], [21, 2]],
  [[17, 4, 'salute', 'right'], [17, 'stand'], [21, 2]],
  [[17, 8, 'salute', 'right'], [17, 'stand'], [22, 4]],
  [[17, 4, 'stand', 'right'], [17, 'stand'], [20, 8]],
  [[17, 4, 'stand', 'right'], [17, 'stand'], [20, 8]],
  [[14, 2, 'hop', 'right'], [17, 'stand'], [17, 10]],
  [[11, 0, 'stand', 'right'], [17, 'stand'], [14, 12]],
  [[11, 0, 'hop', 'right'], [17, 'hop'], [14, 11]],
  [[11, 0, 'stand', 'right'], [17, 'stand'], [14, 12]],
  [[11, 0, 'hop', 'right'], [17, 'hop'], [14, 11]],
  [[11, 0, 'stand', 'right'], [17, 'stand'], [14, 12]],
  [[9, 0, 'walkA', 'right'], [17, 'stand'], [16, 9]],
  [[6, 0, 'walkB', 'right'], [17, 'stand'], [18, 6]],
  [[3, 0, 'walkA', 'right'], [17, 'stand'], [20, 4]],
  [[0, 0, 'stand', 'left'], [17, 'stand'], [21, 2]],
]

Object.assign(ANIMS, {
  // A coffee break: steam curling off the mug in his hand, he brings it up
  // to his face for a sip, savors it, looks about, and sips again.
  'idle.coffee': {
    ms: 300,
    frames: [
      ...loop(6, n => ({ armR: 'mid', breathe: n % 4 < 2 ? 0 : 1, eyes: n === 4 ? 'closed' : 'right', prop: ['mug', { steam: n }] })),
      { armR: 'mid', eyes: 'right', prop: ['mug', { at: 'near', steam: 6 }] },
      ...loop(4, n => ({ armR: 'mid', eyes: 'closed', prop: ['mug', { at: 'lips', steam: 7 + n }] })),
      { armR: 'mid', eyes: 'happy', prop: ['mug', { at: 'near', steam: 11 }] },
      ...loop(5, n => ({ armR: 'mid', eyes: 'happy', breathe: n % 2, prop: ['mug', { steam: 12 + n }] })),
      ...loop(6, n => ({ armR: 'mid', eyes: n < 3 ? 'left' : 'upright', prop: ['mug', { steam: 17 + n }] })),
      { armR: 'mid', eyes: 'right', prop: ['mug', { at: 'near', steam: 23 }] },
      ...loop(3, n => ({ armR: 'mid', eyes: 'closed', prop: ['mug', { at: 'lips', steam: 24 + n }] })),
      { armR: 'mid', eyes: 'happy', prop: ['mug', { at: 'near', steam: 27 }] },
      ...loop(3, n => ({ armR: 'mid', eyes: n === 1 ? 'closed' : 'open', legs: n === 2 ? 'walkA' : 'stand', prop: ['mug', { steam: 28 + n }] })),
    ],
  },
  // He hums a tune, swaying side to side and keeping time, notes drifting off.
  'idle.tune': {
    ms: 280,
    frames: loop(30, n => ({
      dx: [0, 1, 1, 0, -1, -1][n % 6],
      eyes: n % 10 < 7 ? 'happy' : 'closed',
      armL: n % 4 < 2 ? 'mid' : 'rest',
      armR: n % 4 < 2 ? 'rest' : 'mid',
      legs: n % 6 === 1 || n % 6 === 4 ? 'walkA' : 'stand',
      prop: ['notes', n],
    })),
  },
  // Tucked in under a striped blanket beneath the moon and twinkling stars:
  // he breathes slowly, peeks out once, and rolls over a little.
  'sleeping.blanket': {
    ms: 500,
    frames: loop(20, f => {
      const lie = [1, 1, 2, 2][f % 4]
      const dx = f >= 14 && f < 18 ? 1 : 0
      return { lie, dx, eyes: f === 8 || f === 9 ? 'wink' : 'closed', props: [['night', f], ['blanket', { lie, dx }]] }
    }),
  },
  // Dozing off on his feet: he nods, startles awake, sweats a bead, looks
  // about, and drifts off again.
  'sleeping.doze': {
    ms: 400,
    frames: [
      ...loop(14, f => ({ eyes: 'closed', breathe: f % 4 < 2 ? 0 : 1, armL: 'down', armR: 'down', prop: ['zz', f] })),
      { eyes: 'wide', armL: 'up', armR: 'up', dy: -1, legs: 'tuck' },
      { eyes: 'wide', armL: 'mid', armR: 'mid' },
      ...loop(4, n => ({ eyes: n < 2 ? 'left' : 'right', prop: ['sweat', n] })),
      { eyes: 'wink' },
      { eyes: 'closed' },
      { eyes: 'wink' },
      ...loop(2, f => ({ eyes: 'closed', breathe: 1, armL: 'down', armR: 'down', prop: ['zz', f] })),
    ],
  },
  // He paces back and forth, stops to scratch his head over a question, and
  // then the bulb lights.
  'thinking.pace': {
    ms: 300,
    frames: [
      ...[0, 1, 2, 3, 3, 2, 1, 0, -1, -2, -3, -3, -2, -1, 0].map((dx, i) => ({
        dx,
        legs: i % 2 === 0 ? 'walkA' : 'walkB',
        eyes: i < 4 || i > 10 ? 'right' : 'left',
        armL: 'mid',
        prop: ['dots', Math.min(3, Math.floor(i / 4))],
      })),
      { eyes: 'up', armL: 'up', prop: ['qmark', 0] },
      { eyes: 'up', armL: 'mid', prop: ['qmark', 1] },
      { eyes: 'up', armL: 'up', prop: ['qmark', 0] },
      { eyes: 'upleft', armL: 'mid', prop: ['qmark', 1] },
      { eyes: 'upright', armL: 'mid', breathe: 1, prop: ['qmark', 0] },
      ...loop(5, n => ({ eyes: 'up', armL: 'mid', prop: ['dots', 1 + Math.min(2, n)] })),
      { eyes: 'wide', armR: 'up', prop: ['idea', 1] },
      { eyes: 'happy', armR: 'up', prop: ['idea', 0] },
      { eyes: 'happy', armR: 'mid', prop: ['idea', 1] },
      { eyes: 'happy', prop: ['idea', 0] },
      { eyes: 'up', armL: 'mid', breathe: 1, prop: ['dots', 0] },
    ],
  },
  // A puzzle cube in his hands: he studies it and turns it a row or a column
  // at a time until every square matches, holds it up, hops, and scrambles
  // it again.
  'thinking.cube': {
    ms: 300,
    frames: [
      ...CUBE.slice(0, -1).flatMap((cells, i) => [
        { eyes: 'down', armL: 'mid', armR: 'mid', prop: ['cube', { cells }] },
        { eyes: i % 2 === 0 ? 'downleft' : 'downright', armL: 'mid', armR: 'mid', breathe: 1, prop: ['cube', { cells }] },
        { eyes: 'down', armL: 'rest', armR: 'mid', prop: ['cube', { cells, twist: CUBE_TURNS[i] }] },
      ]),
      { eyes: 'wide', armL: 'mid', armR: 'mid', prop: ['cube', { cells: CUBE[5] }] },
      { eyes: 'happy', armL: 'up', armR: 'up', prop: ['cube', { cells: CUBE[5], y: 1 }] },
      { eyes: 'happy', armL: 'up', armR: 'up', dy: -2, legs: 'tuck', prop: ['cube', { cells: CUBE[5], y: -1 }] },
      { eyes: 'happy', armL: 'up', armR: 'up', prop: ['cube', { cells: CUBE[5], y: 1 }] },
      { eyes: 'happy', armL: 'mid', armR: 'mid', prop: ['cube', { cells: CUBE[5] }] },
      { eyes: 'down', dx: -1, armL: 'mid', armR: 'mid', prop: ['cube', { cells: CUBE[2] }] },
      { eyes: 'down', dx: 1, armL: 'mid', armR: 'mid', prop: ['cube', { cells: CUBE[1] }] },
      { eyes: 'down', armL: 'mid', armR: 'mid', prop: ['cube', { cells: CUBE[0] }] },
    ],
  },
  // He writes his reply out on a sheet of paper, reads it over pleased, and
  // starts the next.
  'responding.letter': {
    ms: 260,
    frames: [
      ...loop(15, n => ({ eyes: 'down', armR: n % 2 === 0 ? 'rest' : 'mid', breathe: n % 5 === 4 ? 1 : 0, prop: ['letter', n] })),
      { eyes: 'downright', prop: ['letter', 14] },
      { eyes: 'happy', prop: ['letter', 14] },
      { eyes: 'happy', armR: 'mid', prop: ['letter', 14] },
      { eyes: 'closed', prop: ['letter', 14] },
      ...loop(13, n => ({ eyes: 'down', armR: n % 2 === 0 ? 'mid' : 'rest', prop: ['letter', n] })),
    ],
  },
  // At a whiteboard: he draws his answer out stroke by stroke, turns to
  // explain it, and wipes it for the next.
  'responding.board': {
    ms: 300,
    frames: [
      ...loop(12, n => ({ eyes: 'upleft', armL: n % 2 === 0 ? 'up' : 'mid', prop: ['board', n + 1] })),
      ...loop(8, n => ({
        eyes: n % 4 === 3 ? 'closed' : 'open',
        armR: n % 2 === 0 ? 'mid' : 'rest',
        armL: n < 4 ? 'up' : 'rest',
        breathe: n % 2,
        prop: ['board', 12],
      })),
      { eyes: 'happy', armL: 'up', prop: ['board', 12] },
      { eyes: 'happy', armL: 'up', armR: 'up', prop: ['board', 12] },
      { eyes: 'happy', prop: ['board', 12] },
      ...loop(5, () => ({ eyes: 'upleft', armL: 'mid', prop: ['board', 0] })),
    ],
  },
  // Hacker mode: dark glasses on and green code raining down behind him, he
  // types flat out, the logo on his laptop glowing green; he pushes his
  // glasses up and gets back to it.
  'typing.matrix': {
    ms: 150,
    frames: [
      ...loop(28, n => ({
        armL: n % 2 === 0 ? 'mid' : 'rest',
        armR: n % 2 === 0 ? 'rest' : 'mid',
        breathe: n % 10 === 9 ? 1 : 0,
        props: [['matrix', n], ['laptop', GR], ['shades', n]],
      })),
      ...loop(4, n => ({ armR: 'up', props: [['matrix', 28 + n], ['laptop', GR], ['shades', n === 1 ? 0 : 1]] })),
      ...loop(8, n => ({
        armL: n % 2 === 0 ? 'mid' : 'rest',
        armR: n % 2 === 0 ? 'rest' : 'mid',
        props: [['matrix', 32 + n], ['laptop', GR], ['shades', 1]],
      })),
    ],
  },
  // At a desk: code scrolls up his monitor as he types on the keyboard, a
  // glance at the keys, a sit back.
  'typing.desk': {
    ms: 250,
    frames: [
      ...loop(10, n => ({
        eyes: 'upright',
        armL: n % 2 === 0 ? 'down' : 'rest',
        armR: n % 2 === 0 ? 'rest' : 'down',
        props: [['monitor', n], ['keyboard', n]],
      })),
      ...loop(3, () => ({ eyes: 'down', props: [['monitor', 10], ['keyboard', 0]] })),
      ...loop(10, n => ({
        eyes: 'upright',
        armL: n % 2 === 0 ? 'down' : 'rest',
        armR: n % 2 === 0 ? 'rest' : 'down',
        props: [['monitor', 10 + n], ['keyboard', n]],
      })),
      { eyes: 'up', breathe: 1, props: [['monitor', 20], ['keyboard', 0]] },
      { eyes: 'closed', breathe: 1, props: [['monitor', 20], ['keyboard', 0]] },
      { eyes: 'happy', props: [['monitor', 20], ['keyboard', 0]] },
      ...loop(6, n => ({
        eyes: 'upright',
        armL: n % 2 === 0 ? 'down' : 'rest',
        armR: n % 2 === 0 ? 'rest' : 'down',
        props: [['monitor', 20 + n], ['keyboard', n]],
      })),
    ],
  },
  // Behind a newspaper: his eyes run across the columns, and he turns the
  // page.
  'reading.paper': {
    ms: 340,
    frames: [
      ...loop(5, () => ({ eyes: 'upleft', prop: ['newspaper', {}] })),
      ...loop(5, () => ({ eyes: 'upright', prop: ['newspaper', {}] })),
      { eyes: 'up', breathe: 1, prop: ['newspaper', {}] },
      { eyes: 'upright', armR: 'mid', prop: ['newspaper', { turn: 1 }] },
      { eyes: 'up', armR: 'mid', prop: ['newspaper', { turn: 2 }] },
      { eyes: 'upleft', prop: ['newspaper', {}] },
      ...loop(5, () => ({ eyes: 'upleft', prop: ['newspaper', {}] })),
      ...loop(4, () => ({ eyes: 'upright', prop: ['newspaper', {}] })),
      { eyes: 'closed', prop: ['newspaper', {}] },
      { eyes: 'up', breathe: 1, prop: ['newspaper', {}] },
      { eyes: 'upleft', prop: ['newspaper', {}] },
    ],
  },
  // Reading on a tablet held toward him, so we see its back: his eyes on it,
  // and a swipe of his hand now and then.
  'reading.tablet': {
    ms: 300,
    frames: loop(28, n => ({
      eyes: n % 14 === 13 ? 'closed' : 'down',
      armR: n % 7 === 6 ? 'mid' : 'rest',
      breathe: n % 10 === 9 ? 1 : 0,
      prop: ['tablet'],
    })),
  },
  // A flashlight held high, its beam sweeping the dark, his eyes after it.
  'searching.flashlight': {
    ms: 260,
    frames: [0, 0, 0, 1, 1, 2, 2, 2, 1, 1, 0, 0, 1, 2, 2, 1, 0, 0, 0, 1, 1, 1, 2, 2, 2, 1, 1, 0].map((dir, n) => ({
      eyes: ['left', 'left', 'upleft'][dir],
      armR: 'up',
      legs: n % 7 === 3 ? 'walkA' : 'stand',
      prop: ['flashlight', dir],
    })),
  },
  // Binoculars to his eyes, scanning side to side; he lowers them to his
  // chest, spots something, hops, and lifts them to look again.
  'searching.binoculars': {
    ms: 280,
    frames: [
      ...[0, 0, -1, -1, -1, 0, 0, 1, 1, 1, 0, 0, -1, -1, 0, 1, 1, 0].map((dx, n) => ({
        dx,
        armL: 'mid',
        armR: 'mid',
        prop: ['binoculars', { dx, glint: n }],
      })),
      { eyes: 'down', armL: 'rest', armR: 'rest', prop: ['binoculars', { low: 3 }] },
      { eyes: 'wide', armL: 'rest', armR: 'rest', prop: ['binoculars', { low: 5 }] },
      { eyes: 'wide', armL: 'rest', armR: 'rest', dy: -1, legs: 'tuck', prop: ['binoculars', { low: 5, dy: -1 }] },
      { eyes: 'happy', armL: 'rest', armR: 'rest', prop: ['binoculars', { low: 5 }] },
      { eyes: 'right', armL: 'rest', armR: 'rest', prop: ['binoculars', { low: 5 }] },
      { eyes: 'left', armL: 'rest', armR: 'rest', prop: ['binoculars', { low: 5 }] },
      { eyes: 'up', armL: 'mid', armR: 'mid', prop: ['binoculars', { low: 2 }] },
      ...loop(3, n => ({ armL: 'mid', armR: 'mid', prop: ['binoculars', { glint: n }] })),
    ],
  },
  // Running on a treadmill, its belt racing under him, until he breaks a
  // sweat.
  'running.treadmill': {
    ms: 150,
    frames: loop(40, n => ({
      legs: n % 2 === 0 ? 'walkA' : 'walkB',
      dy: n % 2 === 0 ? 0 : -1,
      armL: n % 2 === 0 ? 'mid' : 'down',
      armR: n % 2 === 0 ? 'down' : 'mid',
      eyes: n % 20 === 19 ? 'closed' : 'right',
      props: [['treadmill', n], ...(n >= 20 ? [['sweat', (n - 20) % 4]] : [])],
    })),
  },
  // He watches a progress bar fill, pumping his fists as it nears the end,
  // and cheers when it is done.
  'running.progress': {
    ms: 250,
    frames: [
      ...loop(20, n => ({
        eyes: n % 8 === 7 ? 'closed' : 'up',
        armL: n >= 14 && n % 2 === 0 ? 'mid' : 'rest',
        armR: n >= 14 && n % 2 === 1 ? 'mid' : 'rest',
        legs: n % 5 === 4 ? 'walkA' : 'stand',
        prop: ['progress', n + 1],
      })),
      ...loop(6, n => ({
        eyes: 'happy',
        armL: 'up',
        armR: 'up',
        dy: n % 2 === 0 ? -2 : 0,
        legs: n % 2 === 0 ? 'tuck' : 'stand',
        prop: ['progress', 21 + n],
      })),
      ...loop(4, n => ({ eyes: 'happy', breathe: n % 2, prop: ['progress', 0] })),
    ],
  },
  // Surfing the web on a big swell: he rides up and down its face, leaning
  // into it, arms out, and catches air off the crests.
  'browsing.surf': {
    ms: 200,
    frames: loop(36, n => {
      const y0 = swellAt(5, n) - 2
      const y1 = swellAt(19, n) - 2
      const isAir = n % 12 === 4 || n % 12 === 5
      const lean = y0 < y1 ? 1 : y0 > y1 ? -1 : 0
      return {
        dy: Math.round((y0 + y1) / 2) - GROUND - (isAir ? 3 : 0),
        legs: isAir ? 'tuck' : 'stand',
        armL: lean > 0 ? 'up' : lean < 0 ? 'down' : 'mid',
        armR: lean > 0 ? 'down' : lean < 0 ? 'up' : 'mid',
        eyes: isAir ? 'happy' : 'right',
        prop: ['waves', { n, board: [5, y0 - (isAir ? 3 : 0), 19, y1 - (isAir ? 3 : 0)] }],
      }
    }),
  },
  // A page loading in a browser window: he clicks, waits on the spinner,
  // watches it fill in, and clicks on.
  'browsing.window': {
    ms: 280,
    frames: [
      { eyes: 'upright', armR: 'up', prop: ['browser', 0] },
      { eyes: 'upright', armR: 'mid', prop: ['browser', 0] },
      ...loop(6, n => ({ eyes: 'upright', breathe: n % 2, legs: n % 3 === 2 ? 'walkA' : 'stand', prop: ['browser', n % 4] })),
      ...loop(5, n => ({ eyes: 'upright', prop: ['browser', 4 + n] })),
      { eyes: 'happy', armR: 'up', prop: ['browser', 9] },
      { eyes: 'happy', armR: 'mid', prop: ['browser', 9] },
      ...loop(6, n => ({ eyes: n % 3 === 0 ? 'up' : 'upright', prop: ['browser', 9] })),
      { eyes: 'closed', prop: ['browser', 9] },
      { eyes: 'upright', armR: 'up', prop: ['browser', 9] },
      ...loop(5, n => ({ eyes: 'upright', prop: ['browser', n % 4] })),
    ],
  },
  // Handing out the work: small Clawds walk up one after another, each takes
  // a crate from him and carries it off to the right, while he fetches the
  // next from the stack.
  'delegating.handoff': {
    ms: 250,
    frames: loop(24, n => {
      const t = n % 12
      const isHolding = t < 6 || t === 11
      return {
        eyes: t === 9 || t === 10 ? 'downright' : t === 7 || t === 8 ? 'happy' : 'downleft',
        armL: t === 6 ? 'down' : isHolding ? 'mid' : 'rest',
        armR: t === 9 || t === 10 ? 'down' : isHolding ? 'mid' : 'rest',
        props: [['stack'], ['walkers', [carrier(n), carrier((n + 12) % 24)].filter(Boolean)], ...(isHolding ? [['crate', [10, 11]]] : [])],
      }
    }),
  },
  // He points up at a star out of reach: one small Clawd climbs onto the
  // other, stretches, jumps for it, and brings it down to him, and they
  // cheer; it floats back up.
  'delegating.tower': {
    ms: 260,
    frames: TOWER.map(([[x, lift, pose, side], [bx, bpose], at], f) => ({
      eyes: f < 4 || (f >= 11 && f < 15) || f >= 24 ? 'upright' : f === 15 ? 'wide' : f >= 19 && f < 24 ? 'happy' : 'downright',
      armR: f < 4 || (f >= 11 && f < 15) ? 'up' : f >= 19 && f < 24 ? 'up' : 'rest',
      armL: f >= 19 && f < 24 ? 'up' : 'rest',
      props: [
        [
          'walkers',
          [
            { x: bx, pose: bpose, side: 'right' },
            { x, pose, side, lift },
          ],
        ],
        ['star', at],
      ],
    })),
  },
  // An endless file of small Clawds marching off to the right at his orders,
  // he up on the podium waving them on.
  'rallying.line': {
    ms: 200,
    frames: loop(30, n => ({
      dy: PODIUM_LIFT,
      eyes: n % 10 < 7 ? 'downright' : 'right',
      armR: n % 6 < 3 ? 'mid' : 'up',
      armL: n % 12 < 6 ? 'rest' : 'mid',
      prop: ['line', n],
    })),
  },
  // A horde of small Clawds swarms in from both sides and piles onto him
  // until he is buried, arms flailing; he bursts free, flinging them off, and
  // catches his breath.
  'rallying.horde': {
    ms: 220,
    frames: loop(32, n => {
      const frame = { prop: ['members', hordeAt(n)] }
      if (n < 4) return { ...frame, eyes: n < 2 ? 'left' : 'right' }
      if (n < 12) return { ...frame, eyes: 'wide', dx: [0, -1, 0, 1][n % 4], armL: n % 2 === 0 ? 'up' : 'mid', armR: n % 2 === 0 ? 'mid' : 'up' }
      if (n < 20) return { ...frame, eyes: 'wide', dx: [0, 1][n % 2], armL: 'up', armR: 'up' }
      if (n === 20) return { ...frame, eyes: 'wide', dy: -2, legs: 'tuck', armL: 'up', armR: 'up' }
      if (n === 21) return { ...frame, eyes: 'happy', dy: -1, armL: 'up', armR: 'up' }
      if (n < 24) return { ...frame, eyes: 'happy', squash: n === 22 ? 1 : 0 }
      return { ...frame, eyes: n % 4 === 3 ? 'closed' : 'open', breathe: n % 2, props: [['members', []], ['sweat', (n - 24) % 4]] }
    }),
  },
  // He traces a route across a map, dot by dot, to the X, and starts again.
  'planning.map': {
    ms: 300,
    frames: [
      ...loop(14, n => ({ eyes: n % 2 === 0 ? 'down' : 'downright', breathe: n % 7 === 6 ? 1 : 0, prop: ['map', Math.floor(n / 2)] })),
      ...loop(6, n => ({ eyes: n < 3 ? 'happy' : 'down', armR: n % 2 === 0 ? 'mid' : 'rest', prop: ['map', 7 + n] })),
      ...loop(8, n => ({ eyes: n === 4 ? 'closed' : 'downleft', prop: ['map', 0] })),
    ],
  },
  // Sticky notes going up on a cork board one by one; he steps back pleased,
  // and clears it for the next plan.
  'planning.stickies': {
    ms: 300,
    frames: [
      ...loop(21, n => {
        const isPlacing = n % 3 === 0
        return {
          eyes: isPlacing ? 'upleft' : n % 3 === 1 ? 'up' : 'upright',
          armL: isPlacing ? 'up' : 'mid',
          prop: ['stickies', Math.floor(n / 3) + 1],
        }
      }),
      ...loop(4, n => ({ eyes: 'happy', breathe: n % 2, prop: ['stickies', 7] })),
      ...loop(3, () => ({ eyes: 'upleft', armL: 'up', prop: ['stickies', 0] })),
    ],
  },
  // He hammers a nail into a block, blow by blow with sparks, admires it, and
  // sets up the next.
  'tooling.hammer': {
    ms: 180,
    frames: [
      ...[0, 1, 2].flatMap(nail => [
        { eyes: 'downright', armR: 'up', prop: ['hammer', { up: true, nail }] },
        { eyes: 'downright', armR: 'up', prop: ['hammer', { up: true, nail }] },
        { eyes: 'downright', armR: 'mid', prop: ['hammer', { nail: nail + 1, hit: true }] },
        { eyes: 'downright', armR: 'mid', prop: ['hammer', { nail: nail + 1 }] },
        { eyes: 'downright', armR: 'mid', prop: ['hammer', { nail: nail + 1 }] },
      ]),
      ...loop(6, n => ({ eyes: 'happy', armR: n % 2 === 0 ? 'up' : 'mid', breathe: n % 2, prop: ['hammer', { up: n % 2 === 0, nail: 3 }] })),
      ...loop(4, () => ({ eyes: 'downright', armR: 'mid', prop: ['hammer', { nail: 3 }] })),
      ...loop(6, () => ({ eyes: 'right', armR: 'mid', prop: ['hammer', { nail: 0 }] })),
    ],
  },
  // Rummaging in a toolbox: out comes a wrench, not the one, back it goes;
  // out comes a screwdriver, and he is pleased.
  'tooling.toolbox': {
    ms: 260,
    frames: [
      ...loop(6, n => ({ eyes: 'downright', armR: n % 2 === 0 ? 'down' : 'rest', prop: ['toolbox', { open: true }] })),
      ...loop(5, n => ({ eyes: n < 3 ? 'upright' : n === 3 ? 'left' : 'right', armR: 'up', prop: ['toolbox', { open: true, tool: 1 }] })),
      ...loop(4, n => ({ eyes: 'downright', armR: n % 2 === 0 ? 'down' : 'rest', prop: ['toolbox', { open: true }] })),
      ...loop(6, n => ({ eyes: n < 2 ? 'upright' : 'happy', armR: 'up', prop: ['toolbox', { open: true, tool: 2 }] })),
      ...loop(6, n => ({ eyes: 'happy', armR: n % 2 === 0 ? 'up' : 'mid', breathe: n % 2, prop: ['toolbox', { tool: n % 2 === 0 ? 2 : 0 }] })),
      ...loop(5, () => ({ eyes: 'downright', prop: ['toolbox', {}] })),
    ],
  },
  // He pumps a sign up and down on its stick, a question on it, then an
  // exclamation, hopping to be seen.
  'waiting.sign': {
    ms: 260,
    frames: [
      ...loop(12, n => {
        const y = [-3, -3, -2, 1, 1, -2][n % 6]
        return {
          eyes: 'wide',
          armR: y < 0 ? 'up' : 'mid',
          legs: n % 6 === 3 ? 'walkA' : 'stand',
          prop: ['sign', { glyph: '?', y, tilt: n % 6 === 1 ? 1 : n % 6 === 4 ? -1 : 0 }],
        }
      }),
      ...loop(6, n => ({ eyes: n % 3 === 2 ? 'closed' : 'open', armR: 'mid', breathe: n % 2, prop: ['sign', { glyph: '?', y: 1 }] })),
      ...loop(12, n => {
        const y = [-3, -2, 1, -2][n % 4]
        return {
          eyes: 'wide',
          armR: y < 0 ? 'up' : 'mid',
          armL: n % 2 === 0 ? 'up' : 'mid',
          legs: n % 4 === 0 ? 'walkA' : 'stand',
          prop: ['sign', { glyph: '!', y }],
        }
      }),
    ],
  },
  // He taps a desk bell, ding ding, and waits, looking out at you, and taps
  // it again.
  'waiting.bell': {
    ms: 240,
    frames: [
      { eyes: 'downright', armR: 'down', prop: ['bell', true] },
      { eyes: 'downright', armR: 'rest', prop: ['bell', false] },
      { eyes: 'downright', armR: 'down', prop: ['bell', true] },
      { eyes: 'wide', armR: 'rest', prop: ['bell', false] },
      ...loop(8, n => ({ eyes: n % 4 === 3 ? 'closed' : 'wide', legs: n % 2 === 0 ? 'walkA' : 'stand', prop: ['bell', false] })),
      ...loop(4, n => ({ eyes: n < 2 ? 'left' : 'right', prop: ['bell', false] })),
      { eyes: 'downright', armR: 'down', prop: ['bell', true] },
      { eyes: 'downright', armR: 'rest', prop: ['bell', false] },
      ...loop(6, n => ({ eyes: 'wide', armL: n % 2 === 0 ? 'up' : 'mid', prop: ['bell', false] })),
      { eyes: 'downright', armR: 'down', prop: ['bell', true] },
      { eyes: 'downright', armR: 'rest', prop: ['bell', true] },
      { eyes: 'downright', armR: 'down', prop: ['bell', true] },
      ...loop(5, n => ({ eyes: 'wide', breathe: n % 2, prop: ['bell', false] })),
    ],
  },
  // A trophy held high over his head, hopping, sparkles all around; he
  // lowers it to admire it, and lifts it again.
  'done.trophy': {
    ms: 220,
    frames: [
      ...loop(8, n => {
        const dy = n % 4 === 1 ? -2 : 0
        return { eyes: 'happy', armL: 'up', armR: 'up', dy, legs: dy ? 'tuck' : 'stand', props: [['sparkles', n], ['trophy', { dy }]] }
      }),
      ...loop(8, n => ({ eyes: n % 4 === 3 ? 'closed' : 'happy', armL: 'mid', armR: 'mid', props: [['sparkles', n], ['trophy', { high: false }]] })),
      ...loop(12, n => {
        const dy = n % 6 === 2 ? -2 : 0
        return { eyes: 'happy', armL: 'up', armR: 'up', dy, legs: dy ? 'tuck' : 'stand', props: [['sparkles', n], ['trophy', { dy }]] }
      }),
    ],
  },
  // A happy dance, side to side with his arms up in turn, under falling
  // confetti.
  'done.dance': {
    ms: 200,
    frames: loop(30, n => {
      const beat = n % 8
      return {
        dx: [0, -1, -1, 0, 0, 1, 1, 0][beat],
        dy: beat === 3 || beat === 7 ? -1 : 0,
        legs: beat % 2 === 0 ? 'walkA' : 'walkB',
        armL: beat < 4 ? 'up' : 'mid',
        armR: beat < 4 ? 'mid' : 'up',
        eyes: 'happy',
        prop: ['confetti', n],
      }
    }),
  },
  // Something burnt out: dark and X-eyed with smoke pouring off him under a
  // red "!!", then coughing and fanning at it, the smoke still coming.
  'error.smoke': {
    ms: 260,
    frames: [
      ...loop(8, n => ({ color: S, eyes: 'x', dx: [0, -1, 0, 1][n % 4], armL: 'down', armR: 'down', props: [['smoke', n], ['oops', n]] })),
      ...loop(16, n => ({
        color: S,
        eyes: n % 5 < 3 ? 'closed' : 'x',
        squash: n % 5 === 2 ? 1 : 0,
        armR: n % 2 === 0 ? 'up' : 'mid',
        prop: ['smoke', n + 8],
      })),
    ],
  },
  // A rain cloud of his own, dark and drooping under it, until lightning
  // strikes him: a white flash, and he is left charred and smoking, shaking,
  // then dazed in the rain, twitching with the odd spark.
  'error.rain': {
    ms: 300,
    frames: [
      ...loop(12, n => ({
        color: S,
        eyes: n % 6 === 5 ? 'closed' : 'down',
        breathe: n % 4 < 2 ? 1 : 0,
        armL: 'down',
        armR: 'down',
        prop: ['rain', { n }],
      })),
      { color: S, eyes: 'up', armL: 'down', armR: 'down', prop: ['rain', { n: 12 }] },
      { color: WT, eyes: 'x', armL: 'up', armR: 'up', props: [['rain', { flash: true }], ['bolt', 0]] },
      { color: D, eyes: 'x', armL: 'up', armR: 'up', props: [['rain', { flash: true }], ['bolt', 1]] },
      ...loop(4, n => ({
        color: D,
        eyes: 'x',
        dx: [-1, 1, -1, 0][n],
        armL: 'down',
        armR: 'down',
        props: [['rain', { n: 13 + n }], ['smoke', n]],
      })),
      ...loop(8, n => {
        const isTwitch = n === 2 || n === 5
        return {
          color: D,
          eyes: 'x',
          breathe: isTwitch ? 0 : 1,
          armL: isTwitch ? 'up' : 'down',
          armR: isTwitch ? 'up' : 'down',
          props: [['rain', { n: 17 + n }], ['smoke', 4 + n], ...(isTwitch ? [['bolt', 2]] : [])],
        }
      }),
      ...loop(6, n => ({ color: S, eyes: 'down', breathe: 1, armL: 'down', armR: 'down', prop: ['rain', { n: 25 + n }] })),
    ],
  },
  // He squishes himself down flat, all the way, holds it, and springs back
  // up tall; a quick shallow one, and a deep one held long.
  'compacting.squeeze': {
    ms: 200,
    frames: [
      { eyes: 'up' },
      { eyes: 'up', breathe: 1 },
      { squash: 1, eyes: 'closed', armL: 'mid', armR: 'mid' },
      { squash: 2, eyes: 'closed', armL: 'mid', armR: 'mid' },
      { squash: 3, eyes: 'squished', armL: 'none', armR: 'none' },
      { squash: 4, eyes: 'squished', armL: 'none', armR: 'none' },
      { squash: 5, eyes: 'squished', armL: 'none', armR: 'none' },
      { squash: 5, eyes: 'squished', armL: 'none', armR: 'none' },
      { squash: 4, eyes: 'squished', armL: 'none', armR: 'none' },
      { squash: 2, eyes: 'closed', armL: 'mid', armR: 'mid' },
      { squash: -1, eyes: 'wide', armL: 'up', armR: 'up' },
      { squash: -2, eyes: 'happy', armL: 'up', armR: 'up' },
      { squash: -1, eyes: 'happy', armL: 'mid', armR: 'mid' },
      {},
      { squash: 2, eyes: 'closed', armL: 'mid', armR: 'mid' },
      { squash: 3, eyes: 'squished', armL: 'none', armR: 'none' },
      { squash: 2, eyes: 'closed', armL: 'mid', armR: 'mid' },
      { squash: -1, eyes: 'open', armL: 'up', armR: 'up' },
      {},
      { squash: 1, eyes: 'closed', armL: 'mid', armR: 'mid' },
      { squash: 3, eyes: 'squished', armL: 'none', armR: 'none' },
      { squash: 5, eyes: 'squished', armL: 'none', armR: 'none' },
      { squash: 6, eyes: 'squished', armL: 'none', armR: 'none' },
      { squash: 6, eyes: 'squished', armL: 'none', armR: 'none' },
      { squash: 6, eyes: 'squished', armL: 'none', armR: 'none' },
      { squash: 4, eyes: 'squished', armL: 'none', armR: 'none' },
      { squash: 1, eyes: 'wide', armL: 'mid', armR: 'mid' },
      { squash: -2, eyes: 'happy', armL: 'up', armR: 'up' },
      { dy: -2, legs: 'tuck', eyes: 'happy', armL: 'up', armR: 'up' },
      { squash: 1, eyes: 'happy' },
    ],
  },
  // A stick vacuum in his hand, its head on the floor beside him: the bits
  // roll and hop into it, the air rushing in, until the floor is clean.
  'compacting.vacuum': {
    ms: 160,
    frames: [
      ...loop(36, n => ({
        dx: -3,
        eyes: n % 12 < 9 ? 'downright' : 'right',
        armR: 'down',
        breathe: n % 6 === 5 ? 1 : 0,
        legs: n % 12 === 6 ? 'walkA' : 'stand',
        prop: ['vacuum', n],
      })),
      ...loop(6, n => ({ dx: -3, eyes: 'happy', armR: 'down', armL: n % 2 === 0 ? 'up' : 'mid', prop: ['vacuum', -1] })),
    ],
  },
})


// ---------------------------------------------- drawn for clawd-buddy-gauges --
//
// Eighteen more, drawn here from the same parts, some after ideas seen in
// other Clawd pets (juggling, conducting, sweeping...): no art copied, only
// the ideas.

const BALLS = [R, Y, BL]
const BUG = [
  ['k..k', '.rr.', 'krrk'],
  ['.kk.', 'krrk', 'k..k'],
]

Object.assign(PROPS, {
  // Three balls in a shower: each flies over his head from his left hand to
  // his right, and is passed back low in front of him.
  balls: (g, n) => {
    BALLS.forEach((c, k) => {
      const p = ((n + k * 4) % 12) / 12
      let x = 0
      let y = 0
      if (p < 0.75) {
        const q = p / 0.75
        x = Math.round(12 - 8 * Math.cos(Math.PI * q))
        y = Math.round(6 - 6 * Math.sin(Math.PI * q))
      } else {
        x = Math.round(19 - 14 * ((p - 0.75) / 0.25))
        y = 12
      }
      box(g, x - 1, y, 2, 2, c)
    })
  },
  // A conductor's baton in his right hand, the arm's pose, its tip gold.
  baton: (g, pose = 'mid') => {
    const tip = {
      up: [[20, 5], [21, 4], [22, 3]],
      mid: [[20, 10], [21, 9], [22, 8]],
      rest: [[20, 12], [21, 11], [22, 10]],
    }[pose]
    tip.forEach(([x, y], i) => put(g, x, y, i === 2 ? Y : WT))
  },
  // A broom swept at his right, `s` its swish (-1 to 1); `dust` how many of
  // the four specks it has pushed into the pile, `moving` the one on its way.
  broom: (g, { s = 0, dust = 0, moving = -1, f = 0, up = false } = {}) => {
    const specks = [1, 7, 11, 13]
    specks.forEach((x, i) => {
      if (i < dust) return
      if (i === moving) put(g, Math.round(x + ((22 - x) * f) / 4), 17, L)
      else put(g, x, 17, G)
    })
    const pile = [[], [[22, 17]], [[22, 17], [23, 17]], [[22, 17], [23, 17], [22, 16]], [[21, 17], [22, 17], [23, 17], [22, 16], [23, 16]]][dust]
    pile.forEach(([x, y]) => put(g, x, y, y === 16 ? L : G))
    if (up) {
      ;[[16, 9], [17, 8], [18, 7]].forEach(([x, y]) => put(g, x, y, BR))
      box(g, 18, 5, 3, 2, Y)
      return
    }
    ;[[16, 11], [16, 12], [17, 13], [17 + s, 14], [18 + s, 15]].forEach(([x, y]) => put(g, x, y, BR))
    box(g, 17 + s, 16, 4, 1, Y)
    for (let x = 17 + s; x <= 20 + s; x++) put(g, x, 17, (x - s) % 2 === 0 ? Y : BR)
    if (s === 1) {
      put(g, 22, 14, L)
      put(g, 23, 13, G)
    }
  },
  // A pointed wizard's hat with a gold star, on his head however he sits.
  hat: (g, dy = 0) => {
    art(
      g,
      BX - 1,
      1 + dy,
      ['........bb....', '.......bbb....', '......bbbbb...', '.....bbybbb...', '....bbbbbbbb..', '...bbbbbbbbbb.', 'dddddddddddddd'],
      { b: BL, y: Y, d: D },
    )
  },
  // A wand in his right hand, held `up` or at his shoulder, its tip
  // twinkling; `burst` throws a ring of sparks off it.
  wand: (g, { up = false, n = 0, burst = false } = {}) => {
    const line = up ? [[20, 5], [21, 4]] : [[20, 10], [21, 9]]
    line.forEach(([x, y]) => put(g, x, y, BR))
    const [tx, ty] = up ? [22, 3] : [22, 8]
    put(g, tx, ty, n % 2 === 0 ? Y : WT)
    if (burst) {
      glyph(g, '+', tx - 1, ty - 4, Y)
      glyph(g, '+', tx - 5, ty - 2, WT)
      put(g, tx + 1, ty + 2, Y)
      put(g, tx - 3, ty + 3, WT)
      put(g, tx + 1, ty - 1, WT)
    }
  },
  // A glow around him as he thinks hard: an outline `r` cells out from his
  // body and arms, in `c`, lifted `dy` with him.
  aura: (g, { r = 0, c = Y, dy = 0 } = {}) => {
    const x0 = BX - 3 - r
    const x1 = BX + BODY_W + 2 + r
    const y0 = BY - 1 - r + dy
    for (let x = x0 + 1; x < x1; x++) put(g, x, y0, c)
    for (let y = y0 + 1; y < GROUND; y++) {
      if ((y + r) % 2 === 0 || y < y0 + 3) {
        put(g, x0, y, c)
        put(g, x1, y, c)
      }
    }
  },
  // His mouth open in a yawn, `size` rows tall; `sq` how far he is stretched.
  mouth: (g, { size = 1, sq = 0 } = {}) => {
    if (size > 0) box(g, BX + 5, BY + sq + 4, 2, size, K)
  },
  // Pincers on his raised arms, `open` or snapped shut, `dx` with him.
  claws: (g, { dx = 0, open = false } = {}) => {
    const bx = BX + dx
    for (const x of [bx - 2, bx + BODY_W]) {
      if (open) {
        put(g, x - 1, 5, B)
        put(g, x - 1, 4, B)
        put(g, x + 2, 5, B)
        put(g, x + 2, 4, B)
      } else {
        put(g, x, 5, B)
        put(g, x + 1, 5, B)
        put(g, x + 1, 4, B)
      }
    }
  },
  // A big parcel `dx` with him: held `high` over his head on both hands,
  // else low in front of him; `sweat` runs a bead down his brow.
  parcel: (g, { dx = 0, high = true, sweat = -1 } = {}) => {
    const bx = BX + dx
    if (high) {
      box(g, bx - 2, 2, 16, 4, BR)
      box(g, bx + 5, 2, 2, 4, Y)
    } else {
      box(g, bx - 1, 12, 14, 5, BR)
      box(g, bx + 5, 12, 2, 5, Y)
    }
    if (sweat >= 0) {
      put(g, bx + BODY_W + (high ? 2 : 0), BY + (sweat % 3), BL)
      put(g, bx + BODY_W + (high ? 2 : 0), BY + 1 + (sweat % 3), BL)
    }
  },
  // A brick wall going up at his right, `count` of its eight bricks laid,
  // one more `held` in his raised hand; `shake` jiggles it, `gone` leaves only
  // dust where it stood.
  wall: (g, { count = 0, held = false, shake = 0, gone = false } = {}) => {
    if (gone) {
      ;[[18, 16], [20, 14], [22, 17], [19, 12], [23, 15], [21, 11]].forEach(([x, y], i) => put(g, x, y, i % 2 ? L : G))
      return
    }
    for (let i = 0; i < count; i++) {
      const course = Math.floor(i / 2)
      box(g, 18 + (i % 2) * 3 + shake, 16 - course * 2, 3, 2, (i + course) % 2 === 0 ? R : S)
    }
    if (held) box(g, 15, 7, 3, 2, R)
  },
  // A bug on the floor at column `x`, `step` its legs; `flat` once swatted.
  bug: (g, { x = 23, step = 0, flat = false } = {}) => {
    if (flat) {
      put(g, x - 1, 17, K)
      box(g, x, 17, 4, 1, R)
      put(g, x + 4, 17, K)
      return
    }
    art(g, x, 15, BUG[step % 2], { k: K, r: R })
  },
  // A fly swatter in his right hand, raised `up` or slammed on the floor.
  swatter: (g, { up = false, hit = false } = {}) => {
    if (up) {
      box(g, 15, 0, 4, 3, G)
      put(g, 16, 1, L)
      put(g, 17, 1, L)
      put(g, 16, 3, BR)
      put(g, 16, 4, BR)
      put(g, 16, 5, BR)
      return
    }
    box(g, 18, 15, 4, 3, G)
    put(g, 19, 16, L)
    put(g, 20, 16, L)
    put(g, 17, 15, BR)
    if (hit) {
      put(g, 17, 13, Y)
      put(g, 22, 13, Y)
      put(g, 23, 16, Y)
      put(g, 20, 13, WT)
    }
  },
})

for (const prop of ['balls', 'baton', 'broom', 'hat', 'wand', 'mouth', 'claws', 'parcel', 'wall', 'bug', 'swatter']) HELD.add(prop)

// The crab's walk: steps out to his right and back, then to his left and back.
const CRAB = [0, 1, 2, 3, 4, 3, 2, 1, 0, -1, -2, -3, -4, -3, -2, -1]

Object.assign(ANIMS, {
  // A big yawn: he stretches up tall, arms over his head, mouth wide, then
  // settles back with a blink.
  'idle.yawn': {
    ms: 220,
    frames: [
      ...loop(4, n => ({ breathe: n % 4 < 2 ? 0 : 1 })),
      ...loop(2, n => ({ eyes: 'closed', armL: 'mid', armR: 'mid', prop: ['mouth', { size: n + 1 }] })),
      ...loop(6, n => ({ eyes: 'closed', squash: -1, armL: 'up', armR: 'up', prop: ['mouth', { size: n < 2 ? 2 : 3, sq: -1 }] })),
      ...loop(2, () => ({ eyes: 'closed', armL: 'mid', armR: 'mid', prop: ['mouth', { size: 2 }] })),
      ...loop(3, n => ({ eyes: 'closed', breathe: 1, prop: ['mouth', { size: n === 0 ? 1 : 0 }] })),
      { eyes: 'wink' },
      { eyes: 'closed' },
      ...loop(7, n => ({ breathe: n % 4 < 2 ? 0 : 1 })),
    ],
  },
  // A crab's walk: sideways out to the right and back, then to the left,
  // his claws up and snapping, and a snap at the end.
  'idle.crab': {
    ms: 180,
    frames: [
      ...CRAB.map((dx, i) => ({
        dx,
        legs: i % 2 === 0 ? 'walkA' : 'walkB',
        armL: 'up',
        armR: 'up',
        eyes: i < 4 || i >= 12 ? 'right' : 'left',
        prop: ['claws', { dx, open: i % 4 < 2 }],
      })),
      ...loop(6, n => ({ armL: 'up', armR: 'up', eyes: 'happy', breathe: n % 2, prop: ['claws', { open: n % 2 === 0 }] })),
    ],
  },
  // A wizard at work: the wand twinkles, he winds up, casts, sparks fly and
  // an idea lights up.
  'thinking.wizard': {
    ms: 220,
    frames: [
      ...loop(6, n => ({ eyes: 'upright', armR: 'mid', breathe: n % 4 < 2 ? 0 : 1, props: [['hat', n % 4 < 2 ? 0 : 1], ['wand', { n }]] })),
      ...loop(4, n => ({ eyes: 'upright', armR: 'up', props: [['hat', 0], ['wand', { up: true, n }]] })),
      ...loop(3, n => ({ eyes: 'wide', armR: 'mid', props: [['hat', 0], ['wand', { n, burst: true }]] })),
      ...loop(8, n => ({ eyes: 'happy', armR: 'mid', breathe: n % 2, props: [['idea', n], ['hat', n % 2]] })),
      ...loop(3, n => ({ eyes: 'right', armR: 'mid', props: [['hat', 0], ['wand', { n }]] })),
    ],
  },
  // Thinking very hard: eyes shut, a glow grows around him, he lifts off the
  // floor in sparks, then lands with the answer.
  'thinking.ultrathink': {
    ms: 150,
    frames: [
      ...loop(8, n => ({ eyes: 'closed', breathe: n % 4 < 2 ? 0 : 1, props: [['aura', { r: 0, c: n % 2 ? S : G }]] })),
      ...loop(8, n => ({ eyes: 'closed', dy: -1, props: [['aura', { r: 1, c: n % 2 ? Y : WT, dy: -1 }]] })),
      ...loop(10, n => {
        const dy = n % 2 === 0 ? -2 : -1
        return { eyes: 'closed', dy, armL: 'mid', armR: 'mid', props: [['aura', { r: 2, c: n % 2 ? Y : WT, dy }], ['sparkles', n]] }
      }),
      ...loop(4, n => ({ eyes: 'wide', props: [['idea', n]] })),
      ...loop(6, n => ({ eyes: 'happy', breathe: n % 2, props: [['idea', n]] })),
    ],
  },
  // Juggling three balls, his eyes on them, then a bow.
  'delegating.juggle': {
    ms: 140,
    frames: [
      ...loop(36, n => ({
        eyes: n % 4 < 2 ? 'upleft' : 'upright',
        armL: n % 4 < 2 ? 'up' : 'mid',
        armR: n % 4 === 1 || n % 4 === 2 ? 'up' : 'mid',
        prop: ['balls', n],
      })),
      ...loop(6, n => ({ eyes: 'happy', breathe: n < 4 ? 1 : 0 })),
      ...loop(2, () => ({})),
    ],
  },
  // Conducting two small Clawds in song: a four-beat with his baton, the
  // little ones hopping on the beat, a finale and a bow.
  'rallying.conduct': {
    ms: 200,
    frames: [
      ...loop(32, n => {
        const beat = n % 4
        const armR = ['up', 'mid', 'rest', 'mid'][beat]
        return {
          eyes: n % 8 < 4 ? 'closed' : 'happy',
          armR,
          armL: ['mid', 'up', 'mid', 'rest'][beat],
          props: [['notes', n], ['minis', { a: beat === 0 ? 'hop' : 'stand', b: beat === 2 ? 'hop' : 'stand' }], ['baton', armR]],
        }
      }),
      ...loop(4, n => ({ eyes: 'wide', armL: 'up', armR: 'up', props: [['minis', { a: 'salute', b: 'salute' }], ['baton', 'up'], ['sparkles', n]] })),
      ...loop(4, () => ({ eyes: 'closed', breathe: 1, props: [['minis', {}], ['baton', 'rest']] })),
    ],
  },
  // Hauling a big parcel over his head across the floor, setting it down to
  // catch his breath, and back the other way.
  'running.carry': {
    ms: 200,
    frames: [
      ...[1, -1].flatMap(dir => [
        ...loop(9, i => {
          const dx = dir * (-4 + i)
          return { dx, legs: i % 2 === 0 ? 'walkA' : 'walkB', eyes: dir > 0 ? 'right' : 'left', armL: 'up', armR: 'up', prop: ['parcel', { dx, sweat: i > 4 ? i : -1 }] }
        }),
        ...loop(2, () => ({ dx: dir * 4, eyes: 'down', armL: 'down', armR: 'down', prop: ['parcel', { dx: dir * 4, high: false }] })),
        ...loop(4, n => ({ dx: dir * 4, eyes: 'closed', breathe: n % 2, armL: 'down', armR: 'down', prop: ['parcel', { dx: dir * 4, high: false, sweat: n }] })),
        ...loop(2, () => ({ dx: dir * 4, eyes: 'up', armL: 'mid', armR: 'mid', prop: ['parcel', { dx: dir * 4 }] })),
      ]),
    ],
  },
  // Laying a brick wall: brick by brick up to four courses, a proud look,
  // then it wobbles and crumbles to start again.
  'tooling.build': {
    ms: 200,
    frames: [
      ...range(8).flatMap(i => [
        { dx: -3, eyes: 'downright', armR: 'down', prop: ['wall', { count: i }] },
        { dx: -3, eyes: i < 4 ? 'right' : 'upright', armR: 'up', prop: ['wall', { count: i, held: true }] },
        { dx: -3, eyes: i < 4 ? 'right' : 'upright', armR: 'mid', prop: ['wall', { count: i + 1 }] },
      ]),
      ...loop(6, n => ({ dx: -3, eyes: 'happy', breathe: n % 2, armL: n % 2 ? 'up' : 'mid', prop: ['wall', { count: 8 }] })),
      ...loop(3, n => ({ dx: -3, eyes: 'wide', prop: ['wall', { count: 8, shake: n % 2 === 0 ? 1 : -1 }] })),
      ...loop(3, () => ({ dx: -3, eyes: 'x', prop: ['wall', { gone: true }] })),
      ...loop(2, () => ({ dx: -3, eyes: 'right', prop: ['wall', {}] })),
    ],
  },
  // A bug crawls in; he spots it, raises a swatter, smacks it flat, is
  // pleased, and here comes another.
  'error.debug': {
    ms: 160,
    frames: [
      ...loop(6, i => ({ dx: -3, eyes: i < 3 ? 'right' : 'downright', prop: ['bug', { x: 23 - i, step: i }] })),
      ...loop(2, n => ({ dx: -3, eyes: 'wide', props: [['bug', { x: 18, step: n }], ['oops', n]] })),
      ...loop(3, n => ({ dx: -3, eyes: 'downright', armR: 'up', props: [['bug', { x: 18, step: n }], ['swatter', { up: true }]] })),
      { dx: -3, eyes: 'closed', armR: 'down', breathe: 1, props: [['swatter', { hit: true }]] },
      ...loop(3, () => ({ dx: -3, eyes: 'downright', armR: 'down', props: [['swatter', {}]] })),
      ...loop(6, n => ({ dx: -3, eyes: 'happy', breathe: n % 2, prop: ['bug', { x: 18, flat: true }] })),
      ...loop(3, i => ({ dx: -3, eyes: 'wide', props: [['bug', { x: 18, flat: true }], ['bug', { x: 24 - i, step: i }]] })),
    ],
  },
  // Sweeping up: each swish pushes a speck along the floor into a pile at
  // his right, then he lifts the broom, pleased.
  'compacting.sweep': {
    ms: 180,
    frames: [
      ...range(4).flatMap(c =>
        [-1, 0, 1, 0].map((s, f) => ({ dx: -4, eyes: 'downright', armR: 'mid', breathe: s === 1 ? 1 : 0, prop: ['broom', { s, dust: c, moving: c, f: f + 1 }] })),
      ),
      ...loop(6, n => ({ dx: -4, eyes: 'happy', armR: 'up', armL: n % 2 ? 'up' : 'mid', props: [['broom', { dust: 4, up: true }]] })),
      ...loop(2, () => ({ dx: -4, eyes: 'right', armR: 'mid', prop: ['broom', { dust: 4 }] })),
    ],
  },
})

// ------------------------------------------- cheeky, but clean ---------

const HEART = ['.#.#.', '#####', '#####', '.###.', '..#..']
const HEART_S = ['#.#', '###', '.#.']

Object.assign(PROPS, {
  // Turned away from us: his eyes painted over, the line of his bottom, and
  // `peek` one eye looking back over his shoulder.
  back: (g, { dx = 0, peek = false } = {}) => {
    const bx = BX + dx
    box(g, bx + 1, BY + 1, BODY_W - 2, 4, B)
    for (let y = BY + 5; y < BY + BODY_H; y++) put(g, bx + 6, y, S)
    if (peek) box(g, bx + BODY_W - 2, BY + 2, 1, 2, K)
  },
  // A green cloud let out behind him, `n` steps on: it swells, drifts up and
  // fades, a fly buzzing round it.
  gas: (g, n) => {
    const c = n < 10 ? GR : G
    const puffs = [[2, 14], [0, 11], [3, 9], [1, 6]].slice(0, Math.min(4, 1 + Math.floor(n / 2)))
    puffs.forEach(([x, y], k) => art(g, x + ((n + k) % 2), y - Math.floor(n / 4), ['.##.', '####', '.##.'], { '#': c }))
    if (n >= 4) {
      const a = (n / 3) * Math.PI
      put(g, Math.round(3 + Math.cos(a) * 3), Math.round(9 - Math.floor(n / 4) + Math.sin(a) * 2), K)
    }
  },
  // Hearts floating up off him: a big one, and a small one after it.
  hearts: (g, n) => {
    art(g, 17, 7 - n, HEART, { '#': R })
    if (n >= 3) art(g, 20, 9 - (n - 3), HEART_S, { '#': MB })
  },
  // Pink cheeks, `dx` with him.
  blush: (g, dx = 0) => {
    box(g, BX + dx + 1, BY + 4, 2, 1, MB)
    box(g, BX + dx + BODY_W - 3, BY + 4, 2, 1, MB)
  },
  // His tongue stuck out at us, wagging `w` a cell either way.
  tongue: (g, { dx = 0, w = 0 } = {}) => {
    const x = BX + dx + 5
    box(g, x - 1, BY + 4, 4, 1, K)
    box(g, x + w, BY + 5, 2, 2, R)
    put(g, x + w, BY + 6, MB)
  },
})

for (const prop of ['back', 'hearts', 'blush', 'tongue']) HELD.add(prop)

Object.assign(ANIMS, {
  // A sly look, then he turns his back and wiggles his bottom at us, peeking
  // over his shoulder now and then, and turns back pleased with himself.
  'waiting.butt': {
    ms: 170,
    frames: [
      ...loop(3, () => ({ eyes: 'right' })),
      { eyes: 'happy' },
      ...loop(18, n => {
        const dx = n % 2 === 0 ? -1 : 1
        return { dx, legs: n % 2 === 0 ? 'walkA' : 'walkB', armL: 'mid', armR: 'mid', prop: ['back', { dx, peek: n % 8 >= 5 }] }
      }),
      ...loop(5, n => ({ eyes: 'happy', breathe: n % 2, prop: ['blush', 0] })),
    ],
  },
  // He strains, a little hop, out comes a green cloud; he looks away and
  // whistles, then glances at it as it drifts off with a fly.
  'error.fart': {
    ms: 180,
    frames: [
      ...loop(3, () => ({})),
      ...loop(4, n => ({ eyes: 'closed', squash: 1, prop: ['sweat', n % 2] })),
      { eyes: 'wide', dy: -1, prop: ['gas', 0] },
      ...loop(12, n => ({ eyes: 'right', armR: 'mid', props: [['gas', n + 1], ['notes', n]] })),
      ...loop(6, n => ({ eyes: n < 3 ? 'left' : 'downleft', props: [['gas', n + 13]] })),
      ...loop(2, () => ({ eyes: 'right' })),
    ],
  },
  // A wink and a finger-gun, blushing, as hearts float up.
  'done.wink': {
    ms: 200,
    frames: [
      ...loop(3, n => ({ eyes: 'happy', breathe: n % 2 })),
      ...loop(2, () => ({ eyes: 'wink', armR: 'mid', prop: ['blush', 0] })),
      ...loop(10, n => ({ eyes: n < 4 ? 'wink' : 'happy', armR: n < 4 ? 'mid' : 'rest', breathe: n % 2, props: [['hearts', n], ['blush', 0]] })),
      ...loop(3, () => ({ eyes: 'happy' })),
    ],
  },
  // Something broke; he blows a raspberry at it, tongue wagging, head
  // shaking, and grins.
  'error.tongue': {
    ms: 160,
    frames: [
      ...loop(4, n => ({ eyes: n < 2 ? 'wide' : 'right', prop: ['oops', n] })),
      ...loop(14, n => {
        const dx = [0, -1, 0, 1][n % 4]
        return { dx, eyes: 'closed', armL: n % 2 ? 'up' : 'mid', armR: n % 2 ? 'mid' : 'up', prop: ['tongue', { dx, w: n % 2 ? 1 : 0 }] }
      }),
      ...loop(5, n => ({ eyes: 'happy', breathe: n % 2 })),
    ],
  },
  // Nodding off at the keyboard: he types, his eyes droop, he snores, his
  // face hits the keys, he jolts awake, looks round, and types fast.
  'typing.nod': {
    ms: 200,
    frames: [
      ...typed(8),
      ...loop(4, () => ({ eyes: 'down', prop: ['laptop'] })),
      ...loop(8, n => ({ eyes: 'closed', breathe: n % 4 < 2 ? 1 : 0, props: [['zz', n], ['laptop']] })),
      { eyes: 'closed', squash: 1, prop: ['laptop'] },
      { eyes: 'wide', dy: -2, armL: 'up', armR: 'up', props: [['oops', 0], ['laptop']] },
      { eyes: 'left', prop: ['laptop'] },
      { eyes: 'right', prop: ['laptop'] },
      ...typed(8, { breathe: 0 }).map((f, i) => ({ ...f, armL: i % 2 ? 'mid' : 'rest', armR: i % 2 ? 'rest' : 'mid' })),
    ],
  },
})

// ------------------------------------------------------- at the gym --

Object.assign(PROPS, {
  // A barbell, its bar on row `y` from x0 to x1 with a plate at each end;
  // `bend` sags the ends a row under the weight.
  barbell: (g, { y = 15, x0 = 1, x1 = 22, bend = false } = {}) => {
    for (let x = x0; x <= x1; x++) put(g, x, bend && (x < x0 + 3 || x > x1 - 3) ? y + 1 : y, L)
    const py = y - 1 + (bend ? 1 : 0)
    for (const x of [x0, x1 - 1]) {
      box(g, x, py, 2, 4, D)
      put(g, x, py, G)
    }
  },
  // A sweatband round his head, `dy` with him.
  band: (g, { dx = 0, dy = 0 } = {}) => box(g, BX + dx, BY + dy, BODY_W, 1, R),
  // Speed lines streaming off behind him, and dust kicked up at his heels.
  dash: (g, n) => {
    ;[[0, 9, 3], [1, 12, 2], [0, 14, 3]].forEach(([x, y, w], k) => box(g, x + ((n + k) % 2), y, w, 1, k === 1 ? L : G))
    put(g, 5 - (n % 3), 17, G)
    put(g, 3 - (n % 2), 16, L)
  },
  // A syringe of green stuff jabbed into his left arm, `gap` cells short of
  // it, `left` how much is still in it (0-3).
  syringe: (g, { gap = 0, left = 3 } = {}) => {
    const x = -gap
    put(g, x, 10, BR)
    put(g, x + 1, 10, D)
    box(g, x + 2, 9, 4, 3, L)
    if (left > 0) box(g, x + 6 - left, 10, left, 1, GR)
    put(g, x + 6, 10, WT)
    put(g, x + 7, 10, WT)
  },
  // Pumped up: `level` 1 a column of extra bulk down each side, 2 also bulging
  // biceps on his raised arms, abs and a vein.
  buff: (g, { level = 1, dx = 0 } = {}) => {
    const bx = BX + dx
    for (let y = BY; y < BY + BODY_H; y++) {
      put(g, bx - 1, y, B)
      put(g, bx + BODY_W, y, B)
    }
    if (level < 2) return
    box(g, bx - 5, BY - 3, 3, 3, B)
    box(g, bx + BODY_W + 2, BY - 3, 3, 3, B)
    put(g, bx - 4, BY - 2, S)
    put(g, bx + BODY_W + 3, BY - 2, S)
    ;[[4, 5], [7, 5], [4, 7], [7, 7]].forEach(([x, y]) => box(g, bx + x, BY + y - 1, 1, 1, S))
  },
})

for (const prop of ['barbell', 'band', 'syringe', 'buff']) HELD.add(prop)

// One squat: how low he sinks, frame by frame.
const SQUAT = [0, 1, 2, 3, 3, 3, 2, 1, 0, 0]

Object.assign(ANIMS, {
  // Jogging on the spot in a sweatband, bobbing, arms pumping, speed lines
  // streaming off him; a glance at his watch, and on he goes.
  'running.jog': {
    ms: 110,
    frames: [
      ...loop(24, n => {
        const dy = n % 2 === 0 ? 0 : -1
        return {
          dy,
          legs: n % 2 === 0 ? 'walkA' : 'walkB',
          eyes: 'right',
          armL: n % 2 === 0 ? 'mid' : 'rest',
          armR: n % 2 === 0 ? 'rest' : 'mid',
          props: [['dash', n], ['band', { dy }], ...(n > 12 ? [['sweat', n % 4]] : [])],
        }
      }),
      ...loop(4, n => ({ eyes: 'downleft', armL: 'mid', legs: n % 2 === 0 ? 'walkA' : 'walkB', prop: ['band', {}] })),
    ],
  },
  // Squats with a loaded bar on his shoulders: down slow, up hard, three
  // times, then he racks it, beaming.
  'running.squat': {
    ms: 170,
    frames: [
      ...range(3).flatMap(rep =>
        SQUAT.map(sq => ({
          squash: sq,
          eyes: sq >= 2 ? 'closed' : 'right',
          armL: 'up',
          armR: 'up',
          props: [['barbell', { y: BY - 1 + sq, x0: 0, x1: 23, bend: sq === 3 }], ...(rep > 0 && sq === 3 ? [['sweat', rep]] : [])],
        })),
      ),
      ...loop(5, n => ({ eyes: 'happy', breathe: n % 2, props: [['barbell', { y: 15 }]] })),
    ],
  },
  // A jab of something green in the arm: he winces, it goes in, he shakes,
  // swells up huge and flexes both biceps, then deflates back to himself.
  'done.roid': {
    ms: 170,
    frames: [
      ...loop(3, n => ({ eyes: 'left', armL: 'mid', prop: ['syringe', { gap: 3 - n }] })),
      ...loop(4, n => ({ eyes: 'closed', armL: 'mid', props: [['syringe', { left: 3 - n }], ['sweat', n % 2]] })),
      ...loop(4, n => ({ dx: n % 2 ? 1 : -1, eyes: 'wide' })),
      ...loop(2, () => ({ eyes: 'wide', armL: 'mid', armR: 'mid', prop: ['buff', { level: 1 }] })),
      ...loop(10, n => ({ eyes: n % 4 < 2 ? 'closed' : 'happy', armL: 'up', armR: 'up', breathe: n % 2, props: [['buff', { level: 2 }], ['sparkles', n]] })),
      ...loop(2, () => ({ eyes: 'wide', armL: 'mid', armR: 'mid', prop: ['buff', { level: 1 }] })),
      ...loop(3, n => ({ eyes: n === 0 ? 'dot' : 'down', breathe: 1 })),
    ],
  },
})

// A football drawn in front of Clawd while it crosses his body.
PROPS.football = (g, { x, y }) => art(g, x - 2, y - 1, ['.ww.', 'wDww', '.ll.'], { w: WT, D, l: L })
HELD.add('football')

const keepUp = (x, y, pose = {}) => ({
  armL: 'mid', armR: 'mid', ...pose, prop: ['football', { x, y }],
})

// A basketball hoop on the right edge of the stage (6 px rim, 4-row net);
// `net` flares wide when the ball swishes through.
PROPS.hoop = (g, { net = 'still', spark = false } = {}) => {
  box(g, 22, 0, 2, 8, WT)
  box(g, 22, 2, 1, 4, R)
  box(g, 23, 8, 1, 10, D)
  box(g, 16, 6, 6, 1, R)
  const mesh = net === 'swish'
    ? ['w....w', '.w..w.', 'w.ww.w', '.w..w.']
    : ['w.w.w.', '.w.w.w', 'w.w.w.', '.w..w.']
  art(g, 16, 7, mesh, { w: L })
  if (spark) {
    put(g, 15, 5, Y)
    put(g, 16, 4, Y)
  }
}

PROPS.bball = (g, { x, y }) => art(g, x, y, ['.yy.', 'yDry', '.rr.'], { y: Y, r: R, D })
HELD.add('bball')

// Chill boat fishing that turns dramatic: Clawd sits far right on the
// wooden bow (slightly cropped at edge) so a long 10-px rod can bow deeply.
PROPS.rod = (g, { wave = 0, bob = 0, pose = 'rest', bobY = 14, fish, splash = 0, sweat = -1, pop = false } = {}) => {
  box(g, 0, 17, 24, 1, BL)
  for (let x = 0; x < 24; x++) {
    if ((x + wave) % 4 === 0) put(g, x, 16, BL)
    if ((x + wave) % 7 === 1) put(g, x, 17, WT)
  }
  const by = 12 + bob
  art(g, 8, by, [
    '.bbbbbbbbbbbbbbb',
    'dddddddddddddddd',
    '..bbbbbbbbbbbbbb',
    '...ddddddddddddd',
  ], { b: BR, d: D })
  if (pose === 'strain1' || pose === 'strain2') {
    // Long rod starts cleanly at his left claw (9 or 10, 8) and bows deeply.
    const dip = pose === 'strain2' ? 1 : 0
    const sx = pose === 'strain2' ? 10 : 9
    const pts = [
      [sx, 8 + bob], [sx - 1, 7 + bob], [sx - 3, 6 + bob + dip], [sx - 5, 6 + bob + dip],
      [4, 7 + bob + dip], [3, 8 + bob + dip], [2, 10 + bob + dip], [1, 11 + bob + dip],
    ]
    for (const [rx, ry] of pts) put(g, rx, ry, BR)
    for (let y = 12 + bob + dip; y <= 16; y++) put(g, 1, y, L)
    put(g, 0, 10 + bob + dip, WT)
    if (pose === 'strain2') {
      put(g, 5, 5 + bob, Y)
      put(g, 2, 15, WT)
    }
  } else if (pose === 'snap') {
    for (let i = 0; i < 5; i++) put(g, 10 - i, 4 - i, BR)
    put(g, 5, 1, L)
    put(g, 4, 2, L)
    put(g, 3, 3, L)
  } else if (pose === 'yank') {
    for (let i = 0; i < 6; i++) put(g, 10 - i, 5 + bob - Math.floor(i * 0.8), BR)
    put(g, 4, 2 + bob, L)
    put(g, 3, 3 + bob, L)
  } else {
    for (let i = 0; i < 10; i++) put(g, 10 - i, 7 + bob - Math.floor(i * 0.55), BR)
    const tipY = 2 + bob
    for (let y = tipY; y <= bobY; y++) put(g, 1, y, L)
    if (bobY >= 13) {
      put(g, 1, bobY, R)
      put(g, 1, bobY + 1, WT)
    }
  }
  if (fish) art(g, fish.x, fish.y, ['..rr..', '.yyy.r', 'ywkyy.', '.yyy.r'], { y: Y, r: R, w: WT, k: K })
  if (pop) {
    put(g, 0, 12, Y)
    put(g, 5, 11, Y)
    put(g, 3, 9, WT)
  }
  if (splash >= 1) {
    put(g, 0, 14, WT)
    put(g, 2, 13, WT)
    put(g, 4, 14, WT)
    put(g, 5, 15, BL)
  }
  if (splash >= 2) {
    put(g, 1, 11, WT)
    put(g, 3, 10, BL)
    put(g, 4, 12, WT)
    put(g, 0, 12, BL)
  }
  // A clean sweat bead right above his brow while straining.
  if (sweat >= 0) {
    put(g, 20, 4 + sweat, BL)
    put(g, 20, 5 + sweat, BL)
    put(g, 19, 4 + sweat, WT)
  }
}
HELD.add('rod')

// A translucent snot bubble growing from Clawd's face as he breathes out in his sleep.
PROPS.snot = (g, stage) => {
  if (stage === 1) art(g, 12, 13, ['wb', 'bb'], { b: BL, w: WT })
  else if (stage === 2) art(g, 12, 12, ['.b.', 'w.b', '.b.'], { b: BL, w: WT })
  else if (stage === 3) art(g, 12, 11, ['.bb.', 'w..b', 'b..b', '.bb.'], { b: BL, w: WT })
  else if (stage === 4) art(g, 12, 10, ['.bbb.', 'w...b', 'b...b', 'b...b', '.bbb.'], { b: BL, w: WT })
  else if (stage === 'pop') art(g, 11, 9, ['.b...b.', 'w.....b', '.......', 'b.....b', '.b...b.'], { b: BL, w: WT })
}
HELD.add('snot')

// An overstuffed leather suitcase sitting on the floor; `level` goes 3 (bursting) -> 0 (latched).
PROPS.suitcase = (g, { level = 3, flash = false, poke = false } = {}) => {
  const top = [13, 13, 12, 11][level]
  if (level >= 2) {
    art(g, 4, top, [
      '.rr..yy..bb..w.',
      'rrwyyyybbbbwwrr',
    ], { r: R, y: Y, b: BL, w: WT })
  } else if (level === 1) {
    box(g, 5, top, 2, 1, Y)
    box(g, 16, top, 2, 1, R)
  }
  const lidY = top + (level >= 2 ? 2 : 1)
  box(g, 5, lidY, 14, 18 - lidY, BR)
  box(g, 5, lidY, 14, 1, D)
  box(g, 8, lidY, 1, 18 - lidY, D)
  box(g, 15, lidY, 1, 18 - lidY, D)
  const clasp = flash ? WT : Y
  put(g, 8, lidY + 1, clasp)
  put(g, 15, lidY + 1, clasp)
  if (poke) box(g, 19, 15, 2, 1, R)
}

// Parallax skate scene drawn behind Clawd: dashed road, scrolling dark-green
// trees (car-window camera effect), and a red-and-white traffic cone obstacle.
PROPS.skateRoad = (g, { scroll = 0, obsX = null, knocked = false } = {}) => {
  // Ground / sidewalk with scrolling dashes.
  box(g, 0, 17, 24, 1, D)
  for (let x = 0; x < 24; x++) {
    if ((x + scroll) % 7 === 0) put(g, x, 17, G)
  }
  // Passing trees every 14 px, dim so orange Clawd pops in the foreground.
  for (let base = -((scroll % 14 + 14) % 14); base < 24; base += 14) {
    const tx = base + 8
    art(g, tx, 8, [
      '.gGg.',
      'dDDDd',
      'DDDDD',
      'dDDDd',
      '..D..',
      '..D..',
      '..D..',
      '..D..',
      '..D..',
    ], { D, d: G, g: D, G: GR })
  }
  // Traffic cone obstacle (upright or knocked over after a crash).
  if (obsX !== null) {
    if (knocked) {
      art(g, obsX, 15, [
        'drr.',
        'dwwr',
      ], { r: R, w: WT, d: D })
    } else {
      art(g, obsX, 13, [
        '.rr.',
        '.ww.',
        'rrrr',
        'dddd',
      ], { r: R, w: WT, d: D })
    }
  }
}

// A 9-px skateboard drawn in front when needed: `flip` 0..3 performs a true
// nose-to-tail barrel roll (grip top -> maple bottom rolling toward camera ->
// wheels up -> grip rolling back over -> upright).
PROPS.skateboard = (g, { x, y = 16, flip = 0, tilt = null, sparks = false } = {}) => {
  if (tilt === 'pop') {
    for (let i = 0; i < 9; i++) {
      const py = i < 3 ? y + 1 : i < 6 ? y : y - 1
      put(g, x + i, py, i === 0 || i === 8 ? R : D)
    }
    put(g, x + 2, y + 1, WT)
    put(g, x + 6, y, WT)
  } else if (tilt === 'crash') {
    for (let i = 0; i < 9; i++) {
      const py = i < 4 ? y - 1 : i < 7 ? y : y + 1
      put(g, x + i, py, i === 0 || i === 8 ? R : Y)
    }
    put(g, x + 1, y - 2, WT)
    put(g, x + 6, y - 1, WT)
  } else if (flip === 1) {
    // 90° barrel roll: bright maple underside facing the camera, wheels mid-rail.
    art(g, x, y, ['ryyyyyyyr', '.w.rrr.w.'], { r: R, y: Y, w: WT })
  } else if (flip === 2) {
    // 180° upside down: wheels pointing straight up over maple deck.
    art(g, x, y, ['.w.....w.', 'ryyyyyyyr'], { w: WT, r: R, y: Y })
  } else if (flip === 3) {
    // 270° barrel roll: dark grip rolling back up.
    art(g, x, y, ['rdddddddr', '.l.ddd.l.'], { r: R, d: D, l: L })
  } else {
    art(g, x, y, ['rdddddddr', '.w.....w.'], { r: R, d: D, w: WT })
  }
  if (sparks) {
    put(g, x + 1, y + 1, Y)
    put(g, x + 7, y + 1, Y)
    put(g, x, y, WT)
    put(g, x + 8, y, WT)
  }
}
HELD.add('skateboard')

// Up on his hind legs (`dy` rows taller), a big toothy grin, clapping: his
// claws `phase` 0 out wide, 1 halfway, 2 meeting in front of him with a clap.
// Arms in front of his body are drawn in the shade, so they show against it.
PROPS.clapper = (g, { phase = 0, dy = -2, grin = true } = {}) => {
  const by = BY + dy
  for (const x of [BX + 1, BX + 3, BX + BODY_W - 4, BX + BODY_W - 2]) box(g, x, GROUND + dy, 1, -dy, B)
  if (grin) art(g, BX + 2, by + 4, ['wwwwwwww', '.wlwwlw.'], { w: WT, l: L })
  if (phase === null) return
  const cy = by + 6
  const mid = BX + BODY_W / 2
  const gap = [8, 4, 0][phase]
  // a thin arm from the shoulder, then the claw taller than it, so the two
  // claws read as two even pressed together (an ink seam between them)
  for (const side of [-1, 1]) {
    const shoulder = side < 0 ? BX - 1 : BX + BODY_W
    const claw = side < 0 ? mid - gap - 2 : mid + gap + 1
    const from = Math.min(shoulder, claw)
    const to = Math.max(shoulder, claw + 1)
    for (let x = from; x <= to; x++) put(g, x, cy + 1, inBody(x) ? S : B)
    box(g, shoulder, cy, 1, 2, B)
    for (const x of [claw, claw + 1]) box(g, x, cy - 1, 1, 3, inBody(x) ? S : B)
  }
  if (phase === 2) box(g, mid, cy - 1, 1, 3, K)
  if (phase === 2) for (const [x, y] of [[mid - 4, cy - 1], [mid + 3, cy - 1], [mid - 4, cy + 2], [mid + 3, cy + 2]]) put(g, x, y, Y)
}

// After the clapping: a claw over his mouth, eyes darting side to side, a
// sneaky snicker (`b` sinks him a row, with the frame's `breathe`). Kept as
// plain as his other arms: a shaded arm across him, a block on the mouth.
PROPS.hush = (g, { b = 0, dy = -2 } = {}) => {
  const by = BY + dy + b
  for (const x of [BX + 1, BX + 3, BX + BODY_W - 4, BX + BODY_W - 2]) box(g, x, GROUND + dy, 1, -dy - b, B)
  box(g, BX + BODY_W, by + 5, 2, 2, B)
  box(g, BX + 7, by + 6, BODY_W - 7, 1, S)
  box(g, BX + 2, by + 4, 4, 3, S)
  // the claw's edge, so the arm doesn't run into it
  box(g, BX + 6, by + 4, 1, 3, K)
}
HELD.add('hush')

// Then his right claw held out to you for a handshake: the arm straight out,
// the claw at the end, and the grin.
PROPS.offer = (g, { dy = -2 } = {}) => {
  const by = BY + dy
  for (const x of [BX + 1, BX + 3, BX + BODY_W - 4, BX + BODY_W - 2]) box(g, x, GROUND + dy, 1, -dy, B)
  art(g, BX + 2, by + 4, ['wwwwwwww', '.wlwwlw.'], { w: WT, l: L })
  box(g, BX + BODY_W, by + 4, 4, 2, B)
  box(g, BX + BODY_W + 3, by + 3, 2, 1, B)
  put(g, BX + BODY_W + 4, by + 6, B)
}
HELD.add('offer')
const inBody = x => x >= BX && x < BX + BODY_W
HELD.add('clapper')

// Sat up on the toilet, seen from the front, the whole thing behind him:
// the tank rising over his head, the seat's rim either side of his bottom,
// the bowl showing between his dangling legs and its pedestal on the floor
// under them, and a roll of paper on the wall to his right.
PROPS.toilet = g => {
  // the tank, wider than him so it shows either side of his head, under a
  // lid that overhangs it with rounded corners
  art(g, BX - 3, 0, [
    '..llllllllllllll..',
    '.lwwwwwwwwwwwwwwl.',
    'lwwwwwwwwwwwwwwwwl',
    '.llllllllllllllll.',
    '.lwwwwwwwwwwwwwwl.',
    '.lwwwwwwwwwwwwwwl.',
    '.lwwwwwwwwwwwwwwl.',
    '.lwwwwwwwwwwwwwwl.',
    '.lwwwwwwwwwwwwwwl.',
    '..llllllllllllll..',
  ], { l: L, w: WT })
  box(g, BX - 1, GROUND - 7, BODY_W + 2, 2, L)
  box(g, BX, GROUND - 5, BODY_W, 2, WT)
  box(g, BX + 3, GROUND - 3, BODY_W - 6, 2, WT)
  box(g, BX + 2, GROUND - 1, BODY_W - 4, 1, L)
  art(g, 20, 9, ['ww', 'wl', 'ww', 'w.', 'w.'], { w: WT, l: L })
}
const SEAT = -3
const seat = () => ['toilet', 0]
// A lit bulb by his head, no cloud: the idea. Odd steps add its rays.
PROPS.bulb = (g, n) => {
  art(g, 20, 4, ['.yy.', 'yyyy', '.gg.'], { y: Y, g: G })
  if (n % 2 === 1) {
    put(g, 20, 3, Y)
    put(g, 23, 3, Y)
  }
}

// Both claws clasped together in front of his chest, as if in prayer, his
// arms in the shade across him. `strain` adds his effort: marks by his head,
// a bead of sweat.
PROPS.clasp = (g, { dy = 1, b = 0, strain = 0 } = {}) => {
  const by = BY + dy + b
  const mid = BX + BODY_W / 2
  // arms in a V from his sides up to his chest, claws pressed together pointing up
  box(g, BX - 1, by + 5, 1, 2, B)
  box(g, BX + BODY_W, by + 5, 1, 2, B)
  for (const [x, y] of [[0, 6], [1, 6], [2, 5], [3, 5]]) {
    put(g, BX + x, by + y, S)
    put(g, BX + BODY_W - 1 - x, by + y, S)
  }
  box(g, mid - 2, by + 4, 4, 1, S)
  box(g, mid - 1, by + 2, 2, 2, S)
  if (!strain) return
  for (const [x, y] of [[BX - 1, by - 1], [BX + 1, by - 2], [BX + BODY_W, by - 1], [BX + BODY_W - 2, by - 2]]) put(g, x, y, L)
  if (strain > 1) art(g, BX + BODY_W + 1, by + 1, ['b', 'b'], { b: BL })
}
HELD.add('clasp')

// Off to the flower market for Tết: a green step-through motorbike parked
// behind him on his left, an electric pole on his right papered with little
// ads. `sway` tips the top of the peach branch he holds up in his left claw.
PROPS.market = (g, { sway = 0 } = {}) => {
  // the pole, its ads in red and ink
  box(g, 21, 0, 3, H, L)
  box(g, 23, 0, 1, H, G)
  for (const [x, y, c] of [[21, 2, R], [22, 2, R], [21, 4, K], [22, 4, K], [22, 7, R], [21, 9, WT], [22, 9, WT], [21, 12, K], [22, 13, R], [21, 15, R], [22, 15, R], [21, 17, K]]) put(g, x, y, c)
  // the motorbike: front wheel, leg shield, basket, lamp, handlebar, back wheel
  art(g, 0, 8, [
    'kkk.....',
    '..kkkk..',
    '.y.g....',
    'lllgg...',
    'l.lgg...',
    'lllggg..',
    '..ggggg.',
    '.kkkgggg',
    'k..kgggg',
    'k.dk.gg.',
    'k..k....',
    '.kk.....',
  ], { k: D, y: Y, g: GR, l: L, d: G })
  art(g, 15, 15, ['..ddd', '.d..d', 'd...d', 'd...d', '.ddd.'], { d: D })
  // the peach branch, held up, its top swaying, blossoms on the twigs
  const t = sway
  art(g, 0 + t, 0, [
    'p.q..p.',
    '.x.pxq.',
    'p.x.x..',
    'qp.xx.p',
    '...x.xq',
    '....x..',
  ], { x: BR, p: PK, q: PD })
  art(g, 4, 6, ['x', 'x'], { x: BR })
}

// In his áo dài with blossom spots, the peach branch's stem in his left claw
// and his right arm straight out, claw flat on the pole. `fall` drops a petal.
PROPS.marketFront = (g, { fall = -1 } = {}) => {
  const by = BY
  for (let y = by + 4; y < by + BODY_H; y++) for (let x = BX; x < BX + BODY_W; x++) {
    const c = g[y * W + x]
    if (c === B) g[y * W + x] = R
    else if (c === S) g[y * W + x] = DR
  }
  for (const [x, y] of [[BX + 2, by + 5], [BX + 6, by + 4], [BX + 9, by + 6], [BX + 4, by + 7], [BX + 10, by + 4]]) if (g[y * W + x] === R) g[y * W + x] = PK
  box(g, BX - 2, by - 1, 2, 5, R)
  box(g, BX - 2, by - 2, 2, 1, B)
  put(g, BX - 1, by - 3, BR)
  box(g, BX + BODY_W, by + 2, 3, 2, R)
  box(g, BX + BODY_W + 3, by + 1, 1, 4, B)
  if (fall >= 0) put(g, 3 + (fall % 2), 7 + fall * 2, PK)
}
HELD.add('marketFront')

// Out of usage, begging for lì xì: his right claw held out, open and
// upturned for the envelope, and a red envelope in his thought cloud. `bow`
// dips him a row, `rub` gives the open claw a little hopeful jiggle.
PROPS.lixi = (g, { bow = 0, rub = 0, wish = true } = {}) => {
  const by = BY + bow
  const x = BX + BODY_W
  box(g, x, by + 4 - rub, 4, 2, B)
  art(g, x + 3, by + 2 - rub, ['B.B', 'BBB'], { B })
  if (!wish) return
  puffs(g)
  cloud(g)
  art(g, 17, 1, ['rrrr', 'ryyr', 'rrrr'], { r: R, y: Y })
}
HELD.add('lixi')

// A glass of water in his hand, drunk down a row at each sip: `level` rows
// of water left (3 full), `at` his hand, `near` on its way up, `lips` to drink.
PROPS.glass = (g, { at = 'hand', level = 3 } = {}) => {
  const [x, y] = { hand: [20, 8], near: [18, 8], lips: [15, 9] }[at]
  const rows = ['l..l', ...[3, 2, 1].map(r => (level >= r ? 'lbbl' : 'l..l')), '.ll.']
  art(g, x, y, rows, { l: L, b: BL })
}
HELD.add('glass')

Object.assign(ANIMS, {
  'idle.keepie-ups': {
    ms: 110,
    frames: [
      // Two alternating taps, low enough to stay in easy reach.
      keepUp(4, 16, { eyes: 'downleft', armL: 'rest', armR: 'rest' }),
      keepUp(4, 16, { eyes: 'downleft' }),
      keepUp(4, 14, { eyes: 'downleft', legs: 'kickL' }),
      keepUp(6, 11, { eyes: 'left' }),
      keepUp(9, 9, { eyes: 'upleft' }),
      keepUp(12, 8, { eyes: 'up' }),
      keepUp(15, 9, { eyes: 'upright' }),
      keepUp(17, 11, { eyes: 'right' }),
      keepUp(19, 14, { eyes: 'downright', legs: 'kickR' }),
      keepUp(17, 11, { eyes: 'right' }),
      keepUp(14, 9, { eyes: 'upright' }),
      keepUp(11, 8, { eyes: 'up' }),
      keepUp(8, 9, { eyes: 'upleft' }),
      keepUp(6, 11, { eyes: 'left' }),
      // The third tap sails wide. He scuttles after it and saves it.
      keepUp(4, 14, { eyes: 'downleft', legs: 'kickL' }),
      keepUp(6, 9, { eyes: 'wide' }),
      keepUp(9, 5, { eyes: 'upleft' }),
      keepUp(12, 3, { eyes: 'up' }),
      keepUp(15, 2, { eyes: 'upright' }),
      keepUp(18, 3, { dx: 1, legs: 'walkA', eyes: 'upright' }),
      keepUp(20, 5, { dx: 2, legs: 'walkB', eyes: 'upright' }),
      keepUp(22, 9, { dx: 3, eyes: 'right' }),
      keepUp(22, 14, { dx: 3, eyes: 'downright', legs: 'kickR' }),
      // A softer touch sends the ball back to where he started.
      keepUp(20, 12, { dx: 3, eyes: 'right' }),
      keepUp(17, 11, { dx: 2, legs: 'walkA', eyes: 'right' }),
      keepUp(14, 12, { dx: 1, legs: 'walkB', eyes: 'down' }),
      keepUp(11, 14, { eyes: 'down' }),
      keepUp(8, 16, { eyes: 'downleft', armL: 'rest', armR: 'rest' }),
      keepUp(6, 16, { eyes: 'downleft', armL: 'rest', armR: 'rest' }),
      keepUp(5, 16, { eyes: 'downleft', armL: 'rest', armR: 'rest' }),
      ...loop(4, () => keepUp(4, 16, { eyes: 'happy', armL: 'rest', armR: 'rest' })),
    ],
  },
  // Shooting hoops: two dribbles, a swish through the bigger 6 px net, then
  // a second shot that clanks off the rim right back onto his head.
  'idle.hoops': {
    ms: 130,
    frames: [
      { dx: -4, armR: 'mid', eyes: 'downright', props: [['hoop', {}], ['bball', { x: 12, y: 11 }]] },
      { dx: -4, armR: 'down', eyes: 'downright', props: [['hoop', {}], ['bball', { x: 12, y: 15 }]] },
      { dx: -4, armR: 'mid', eyes: 'downright', props: [['hoop', {}], ['bball', { x: 12, y: 11 }]] },
      { dx: -4, armR: 'down', eyes: 'downright', props: [['hoop', {}], ['bball', { x: 12, y: 15 }]] },
      { dx: -4, squash: 1, armR: 'mid', eyes: 'upright', props: [['hoop', {}], ['bball', { x: 12, y: 10 }]] },
      { dx: -4, dy: -1, legs: 'tuck', armR: 'up', eyes: 'upright', props: [['hoop', {}], ['bball', { x: 13, y: 5 }]] },
      { dx: -4, armR: 'up', eyes: 'upright', props: [['hoop', {}], ['bball', { x: 15, y: 2 }]] },
      { dx: -4, armR: 'mid', eyes: 'right', props: [['hoop', {}], ['bball', { x: 17, y: 1 }]] },
      { dx: -4, eyes: 'right', props: [['hoop', {}], ['bball', { x: 17, y: 3 }]] },
      { dx: -4, eyes: 'right', props: [['hoop', {}], ['bball', { x: 17, y: 5 }]] },
      { dx: -4, eyes: 'happy', armL: 'mid', armR: 'mid', props: [['hoop', { net: 'swish' }], ['bball', { x: 17, y: 8 }]] },
      { dx: -4, eyes: 'happy', armL: 'mid', armR: 'mid', props: [['hoop', { net: 'swish' }], ['bball', { x: 17, y: 12 }]] },
      { dx: -4, eyes: 'happy', props: [['hoop', {}], ['bball', { x: 17, y: 15 }]] },
      { dx: -4, eyes: 'downright', props: [['hoop', {}], ['bball', { x: 14, y: 15 }]] },
      { dx: -4, squash: 1, armR: 'mid', eyes: 'upright', props: [['hoop', {}], ['bball', { x: 12, y: 10 }]] },
      { dx: -4, dy: -1, legs: 'tuck', armR: 'up', eyes: 'upright', props: [['hoop', {}], ['bball', { x: 13, y: 5 }]] },
      { dx: -4, armR: 'up', eyes: 'upright', props: [['hoop', {}], ['bball', { x: 15, y: 2 }]] },
      { dx: -4, eyes: 'right', props: [['hoop', { spark: true }], ['bball', { x: 15, y: 4 }]] },
      { dx: -4, eyes: 'wide', props: [['hoop', {}], ['bball', { x: 12, y: 2 }]] },
      { dx: -4, eyes: 'up', props: [['hoop', {}], ['bball', { x: 8, y: 4 }]] },
      { dx: -4, squash: 2, eyes: 'wince', props: [['hoop', {}], ['bball', { x: 6, y: 7 }]] },
      { dx: -4, squash: 2, eyes: 'wince', props: [['hoop', {}], ['bball', { x: 2, y: 12 }]] },
      { dx: -4, eyes: 'downleft', props: [['hoop', {}], ['bball', { x: 1, y: 15 }]] },
      { dx: -4, eyes: 'down', props: [['hoop', {}], ['bball', { x: 5, y: 15 }]] },
      { dx: -4, eyes: 'downright', props: [['hoop', {}], ['bball', { x: 9, y: 15 }]] },
      { dx: -4, armR: 'mid', eyes: 'downright', props: [['hoop', {}], ['bball', { x: 12, y: 13 }]] },
    ],
  },
  // Tracking-camera skateboarding: trees & dashes scroll past behind Clawd as he
  // cruises at dx -4, spots a cone, pops a true barrel-roll kickflip over it,
  // lands with sparks — then clips a second cone, freezing the world while
  // momentum throws him forward into a faceplant!
  'idle.kickflip': {
    ms: 115,
    frames: [
      { dx: -4, dy: -2, eyes: 'right', props: [['skateRoad', { scroll: 0 }], ['skateboard', { x: 3 }]] },
      { dx: -4, dy: -2, eyes: 'right', props: [['skateRoad', { scroll: 2, obsX: 21 }], ['skateboard', { x: 3 }]] },
      { dx: -4, dy: -2, eyes: 'right', props: [['skateRoad', { scroll: 4, obsX: 18 }], ['skateboard', { x: 3 }]] },
      { dx: -4, dy: -2, squash: 1, armL: 'down', armR: 'down', eyes: 'downright', props: [['skateRoad', { scroll: 6, obsX: 15 }], ['skateboard', { x: 3, tilt: 'pop' }]] },
      // Kickflip over Cone 1 as it passes cleanly underneath.
      { dx: -4, dy: -5, legs: 'tuck', armL: 'up', armR: 'up', eyes: 'wide', props: [['skateRoad', { scroll: 8, obsX: 12 }], ['skateboard', { x: 3, y: 12, flip: 1 }]] },
      { dx: -4, dy: -6, legs: 'tuck', armL: 'mid', armR: 'up', eyes: 'down', props: [['skateRoad', { scroll: 10, obsX: 9 }], ['skateboard', { x: 3, y: 11, flip: 2 }]] },
      { dx: -4, dy: -6, legs: 'tuck', armL: 'up', armR: 'mid', eyes: 'down', props: [['skateRoad', { scroll: 12, obsX: 6 }], ['skateboard', { x: 3, y: 11, flip: 3 }]] },
      { dx: -4, dy: -4, armL: 'mid', armR: 'mid', eyes: 'down', props: [['skateRoad', { scroll: 14, obsX: 3 }], ['skateboard', { x: 3, y: 13, flip: 0 }]] },
      { dx: -4, dy: -2, squash: 1, armL: 'mid', armR: 'mid', eyes: 'happy', props: [['skateRoad', { scroll: 16, obsX: 0 }], ['skateboard', { x: 3, sparks: true }]] },
      { dx: -4, dy: -2, eyes: 'happy', props: [['skateRoad', { scroll: 18 }], ['skateboard', { x: 3 }], ['sparkles', 0]] },
      { dx: -4, dy: -2, eyes: 'happy', props: [['skateRoad', { scroll: 20, obsX: 21 }], ['skateboard', { x: 3 }], ['sparkles', 1]] },
      { dx: -4, dy: -2, eyes: 'right', props: [['skateRoad', { scroll: 22, obsX: 17 }], ['skateboard', { x: 3 }]] },
      { dx: -4, dy: -2, eyes: 'right', props: [['skateRoad', { scroll: 24, obsX: 13 }], ['skateboard', { x: 3 }]] },
      // WHAM! Front wheel clips Cone 2 at x=10 -> scrolling freezes, Clawd flies forward!
      { dx: -2, dy: -3, armL: 'up', armR: 'up', eyes: 'wide', props: [['skateRoad', { scroll: 26, obsX: 10 }], ['skateboard', { x: 2, tilt: 'crash' }]] },
      { dx: 1, dy: -3, legs: 'tuck', armL: 'up', armR: 'up', eyes: 'wide', props: [['skateRoad', { scroll: 26, obsX: 6, knocked: true }], ['skateboard', { x: 0, y: 15, flip: 2 }]] },
      { dx: 4, dy: -1, legs: 'tuck', armL: 'mid', armR: 'mid', eyes: 'wide', props: [['skateRoad', { scroll: 26, obsX: 5, knocked: true }], ['skateboard', { x: 0, y: 16, flip: 2 }]] },
      { dx: 4, lie: 2, eyes: 'wince', props: [['skateRoad', { scroll: 26, obsX: 5, knocked: true }], ['skateboard', { x: 0, y: 16, flip: 2 }]] },
      { dx: 4, lie: 2, eyes: 'wince', props: [['skateRoad', { scroll: 26, obsX: 5, knocked: true }], ['skateboard', { x: 0, y: 16, flip: 2 }]] },
      { dx: 4, lie: 2, eyes: 'wink', props: [['skateRoad', { scroll: 26, obsX: 5, knocked: true }], ['skateboard', { x: 0, y: 16, flip: 2 }]] },
      // Gets up, walks back, flips the board upright and pushes off again.
      { dx: 1, dy: -1, legs: 'walkA', armL: 'mid', eyes: 'downleft', props: [['skateRoad', { scroll: 26 }], ['skateboard', { x: 0, y: 16, flip: 2 }]] },
      { dx: -2, dy: -1, legs: 'walkB', armL: 'mid', eyes: 'downleft', props: [['skateRoad', { scroll: 26 }], ['skateboard', { x: 1, y: 16, flip: 1 }]] },
      { dx: -4, dy: -2, legs: 'tuck', armL: 'mid', armR: 'mid', eyes: 'down', props: [['skateRoad', { scroll: 27 }], ['skateboard', { x: 3, y: 16, flip: 0 }]] },
      { dx: -4, dy: -2, eyes: 'right', props: [['skateRoad', { scroll: 28 }], ['skateboard', { x: 3 }]] },
    ],
  },
  // Chill boat fishing that turns explosive: Clawd sits far right on the bow
  // with a long rod, strains with a deeply bowed arc until "BỤP!" launches
  // the golden fish sky-high in a huge arc before it splashes back into the sea.
  'idle.fishing': {
    ms: 190,
    frames: [
      { dx: 6, dy: -3, legs: 'none', armL: 'mid', armR: 'none', eyes: 'left', prop: ['rod', { wave: 0, bob: 0, bobY: 14 }] },
      { dx: 6, dy: -3, legs: 'none', armL: 'mid', armR: 'none', eyes: 'left', prop: ['rod', { wave: 1, bob: 0, bobY: 14 }] },
      { dx: 6, dy: -2, legs: 'none', armL: 'mid', armR: 'none', eyes: 'downleft', prop: ['rod', { wave: 2, bob: 1, bobY: 15 }] },
      { dx: 6, dy: -2, legs: 'none', armL: 'mid', armR: 'none', eyes: 'closed', prop: ['rod', { wave: 3, bob: 1, bobY: 15 }] },
      { dx: 6, dy: -3, legs: 'none', armL: 'mid', armR: 'none', eyes: 'left', prop: ['rod', { wave: 4, bob: 0, bobY: 14 }] },
      { dx: 6, dy: -2, legs: 'none', armL: 'mid', armR: 'none', eyes: 'wide', prop: ['rod', { wave: 5, bob: 1, bobY: 16, splash: 1 }] },
      // Straining hard: shakes back and forth (dx 5 <-> 6), >.< wince eyes, sweating, long rod bowed down.
      { dx: 5, dy: -2, legs: 'none', squash: 1, armL: 'mid', armR: 'none', eyes: 'wince', prop: ['rod', { wave: 6, bob: 1, pose: 'strain1', splash: 1, sweat: 0 }] },
      { dx: 6, dy: -2, legs: 'none', squash: 1, armL: 'mid', armR: 'none', eyes: 'wince', prop: ['rod', { wave: 7, bob: 1, pose: 'strain2', splash: 1, sweat: 1 }] },
      { dx: 5, dy: -2, legs: 'none', squash: 1, armL: 'mid', armR: 'none', eyes: 'wince', prop: ['rod', { wave: 8, bob: 1, pose: 'strain1', splash: 2, sweat: 0 }] },
      { dx: 6, dy: -3, legs: 'none', squash: 1, armL: 'mid', armR: 'none', eyes: 'wince', prop: ['rod', { wave: 9, bob: 0, pose: 'strain2', splash: 1, sweat: 1 }] },
      // "BỤP!" Tension snaps: Clawd recoils, long rod whips up, fish rockets out of the sea.
      { dx: 7, dy: -3, legs: 'none', armL: 'up', armR: 'none', eyes: 'wide', prop: ['rod', { wave: 10, bob: 0, pose: 'snap', fish: { x: 0, y: 8 }, splash: 2, pop: true }] },
      { dx: 6, dy: -3, legs: 'none', armL: 'up', armR: 'none', eyes: 'upleft', prop: ['rod', { wave: 11, bob: 0, pose: 'snap', fish: { x: 3, y: 2 }, splash: 2 }] },
      { dx: 6, dy: -3, legs: 'none', armL: 'up', armR: 'none', eyes: 'up', prop: ['rod', { wave: 12, bob: 0, pose: 'yank', fish: { x: 9, y: 0 }, splash: 1 }] },
      { dx: 6, dy: -2, legs: 'none', armL: 'mid', armR: 'none', eyes: 'upright', prop: ['rod', { wave: 13, bob: 1, pose: 'yank', fish: { x: 14, y: 2 } }] },
      // Bonk right on top of his crown, then dives back into the waves.
      { dx: 5, dy: -2, legs: 'none', squash: 2, armR: 'none', eyes: 'wince', prop: ['rod', { wave: 14, bob: 1, pose: 'yank', fish: { x: 12, y: 4 } }] },
      { dx: 6, dy: -3, legs: 'none', armL: 'mid', armR: 'none', eyes: 'wide', prop: ['rod', { wave: 15, bob: 0, bobY: 11, fish: { x: 5, y: 8 } }] },
      { dx: 6, dy: -3, legs: 'none', armL: 'mid', armR: 'none', eyes: 'downleft', prop: ['rod', { wave: 16, bob: 0, bobY: 14, fish: { x: 0, y: 12 } }] },
      { dx: 6, dy: -2, legs: 'none', armL: 'mid', armR: 'none', eyes: 'wide', prop: ['rod', { wave: 17, bob: 1, bobY: 15, splash: 2 }] },
      { dx: 6, dy: -2, legs: 'none', armL: 'mid', armR: 'none', eyes: 'closed', prop: ['rod', { wave: 18, bob: 1, bobY: 15, splash: 1 }] },
      { dx: 6, dy: -3, legs: 'none', armL: 'mid', armR: 'none', eyes: 'left', prop: ['rod', { wave: 19, bob: 0, bobY: 14 }] },
    ],
  },
  // Fast asleep with a translucent snot bubble that swells as he exhales,
  // wobbles huge, and pops with a tiny startle before he drifts back to Z's.
  'sleeping.snot-bubble': {
    ms: 340,
    frames: [
      { lie: 2, eyes: 'closed', prop: ['zz', 0] },
      { lie: 2, eyes: 'closed', prop: ['zz', 1] },
      { lie: 1, eyes: 'closed', prop: ['zz', 2] },
      { lie: 1, eyes: 'closed', prop: ['zz', 3] },
      { lie: 1, eyes: 'closed', prop: ['snot', 1] },
      { lie: 2, eyes: 'closed', prop: ['snot', 2] },
      { lie: 2, eyes: 'closed', prop: ['snot', 3] },
      { lie: 1, eyes: 'closed', prop: ['snot', 2] },
      { lie: 2, eyes: 'closed', prop: ['snot', 3] },
      { lie: 2, eyes: 'closed', prop: ['snot', 4] },
      { lie: 3, eyes: 'closed', prop: ['snot', 4] },
      { lie: 3, eyes: 'closed', prop: ['snot', 4] },
      { lie: 1, armL: 'mid', eyes: 'squished', prop: ['snot', 'pop'] },
      { lie: 2, eyes: 'wink' },
      { lie: 2, eyes: 'wink' },
      { lie: 2, eyes: 'closed' },
      { lie: 2, eyes: 'closed', prop: ['zz', 0] },
      { lie: 2, eyes: 'closed', prop: ['zz', 1] },
      { lie: 1, eyes: 'closed', prop: ['zz', 2] },
      { lie: 1, eyes: 'closed', prop: ['zz', 3] },
    ],
  },
  // Cramming an overflowing suitcase: three big jumps onto the lid squash it
  // flat until the gold clasps snap shut — then one red sock peeks back out.
  'compacting.suitcase': {
    ms: 170,
    frames: [
      { dy: -5, legs: 'tuck', armL: 'mid', armR: 'mid', eyes: 'down', prop: ['suitcase', { level: 3 }] },
      { dy: -6, legs: 'tuck', armL: 'up', armR: 'up', eyes: 'down', prop: ['suitcase', { level: 3 }] },
      { dy: -3, squash: 2, eyes: 'closed', prop: ['suitcase', { level: 2 }] },
      { dy: -3, squash: 2, eyes: 'closed', prop: ['suitcase', { level: 2 }] },
      { dy: -5, legs: 'tuck', armL: 'mid', armR: 'mid', eyes: 'down', prop: ['suitcase', { level: 2 }] },
      { dy: -6, legs: 'tuck', armL: 'up', armR: 'up', eyes: 'down', prop: ['suitcase', { level: 2 }] },
      { dy: -2, squash: 2, eyes: 'closed', prop: ['suitcase', { level: 1 }] },
      { dy: -2, squash: 2, eyes: 'closed', prop: ['suitcase', { level: 1 }] },
      { dy: -5, legs: 'tuck', armL: 'mid', armR: 'mid', eyes: 'down', prop: ['suitcase', { level: 1 }] },
      { dy: -6, legs: 'tuck', armL: 'up', armR: 'up', eyes: 'down', prop: ['suitcase', { level: 1 }] },
      { dy: -1, squash: 2, eyes: 'squished', prop: ['suitcase', { level: 0, flash: true }] },
      { dy: -2, squash: 1, eyes: 'happy', armL: 'mid', armR: 'mid', props: [['suitcase', { level: 0 }], ['sparkles', 0]] },
      { dy: -2, squash: 1, eyes: 'happy', armL: 'mid', armR: 'mid', props: [['suitcase', { level: 0 }], ['sparkles', 1]] },
      { dy: -2, squash: 1, eyes: 'happy', props: [['suitcase', { level: 0 }], ['sparkles', 2]] },
      { dy: -2, eyes: 'downright', prop: ['suitcase', { level: 0, poke: true }] },
      { dy: -2, eyes: 'downright', prop: ['suitcase', { level: 0, poke: true }] },
      { dy: -2, eyes: 'wide', prop: ['suitcase', { level: 0, poke: true }] },
      { dy: -3, squash: 1, eyes: 'closed', prop: ['suitcase', { level: 2 }] },
    ],
  },
  // A morning stretch: arms up, taller on his toes, a lean to each side with
  // his eyes shut, then a shake and back to himself, bright eyed.
  // A drink of water: the glass up to his lips three times, a row gone each
  // time, then a happy, sparkly, watered Clawd.
  // That clapping cat: up on his hind legs with a huge grin, clapping fast,
  // a pause to stare, then more.
  'done.clap': { ms: 110, frames: [
    { armL: 'none', armR: 'none', eyes: 'wide', prop: ['clapper', { dy: -1, grin: false }] },
    ...loop(3, () => ({ dy: -2, armL: 'none', armR: 'none', eyes: 'wide', prop: ['clapper', {}] })),
    ...loop(3, () => [0, 1, 2, 1].map(phase => ({ dy: -2, armL: 'none', armR: 'none', eyes: 'wide', prop: ['clapper', { phase }] }))).flat(),
    ...loop(5, () => ({ dy: -2, armL: 'none', armR: 'none', eyes: 'wide', prop: ['clapper', { phase: 0 }] })),
    ...loop(4, () => [0, 1, 2, 1].map(phase => ({ dy: -2, armL: 'none', armR: 'none', eyes: 'wide', prop: ['clapper', { phase }] }))).flat(),
    ...loop(3, () => ({ dy: -2, armL: 'none', armR: 'none', eyes: 'wide', prop: ['clapper', {}] })),
    // then a claw over the mouth, a shifty look around, snickering
    ...loop(14, n => ({ dy: -2, armL: 'rest', armR: 'none', eyes: ['left', 'left', 'left', 'right', 'right', 'right', 'left', 'right', 'closed', 'closed', 'closed', 'closed', 'right', 'wide'][n], breathe: n >= 8 && n < 12 ? n % 2 : 0, prop: ['hush', { b: n >= 8 && n < 12 ? n % 2 : 0 }] })),
    // and the claw held straight out at you, still, waiting for you to shake it
    ...loop(20, n => ({ dy: -2, armL: 'rest', armR: 'none', eyes: n % 10 < 8 ? 'wide' : 'happy', prop: ['offer', {}] })),
  ] },
  // Thinking it over on the toilet: claws clasped, eyes up as the thought
  // cloud fills, then a long hard push, red in the face and sweating, a
  // shiver, relief, and the idea comes.
  'thinking.toilet': { ms: 260, frames: [
    ...['up', 'up', 'upleft', 'upleft', 'upright', 'upright', 'up', 'closed'].map(eyes => ({ dy: SEAT, armL: 'none', armR: 'none', eyes, props: [seat(), ['clasp', { dy: SEAT }]] })),
    ...loop(10, n => ({ dy: SEAT, armL: 'none', armR: 'none', eyes: 'squeeze', breathe: n % 2, color: n >= 6 ? R : undefined, props: [seat(), ['clasp', { dy: SEAT, b: n % 2, strain: n >= 4 ? 2 : 1 }]] })),
    ...loop(3, () => ({ dy: SEAT, armL: 'none', armR: 'none', eyes: 'closed', breathe: 1, props: [seat(), ['clasp', { dy: SEAT, b: 1 }]] })),
    ...loop(3, () => ({ dy: SEAT, armL: 'none', armR: 'none', eyes: 'happy', props: [seat(), ['clasp', { dy: SEAT }]] })),
    ...loop(4, n => ({ dy: SEAT, armL: 'none', armR: 'none', eyes: 'wide', props: [seat(), ['clasp', { dy: SEAT }], ['bulb', n]] })),
  ] },
  // That Tết photo: in his áo dài by the motorbike, a peach branch held high,
  // one claw on the electric pole, posing; the branch sways, a petal falls.
  'idle.peach': { ms: 300, frames: loop(16, n => ({
    armL: 'none', armR: 'none',
    eyes: n === 9 ? 'closed' : n >= 12 ? 'right' : 'wide',
    props: [['market', { sway: n % 8 < 4 ? 0 : 1 }], ['marketFront', { fall: n >= 4 && n < 9 ? n - 4 : -1 }]],
  })) },
  // Out of usage: a claw held out, pleading eyes, bowing and jiggling it
  // for a lì xì to tide him over till the limit resets.
  'idle.lixi': { ms: 260, frames: [
    ...loop(8, n => ({ armR: 'none', eyes: 'plead', breathe: n % 4 >= 2 ? 1 : 0, prop: ['lixi', { bow: n % 4 >= 2 ? 1 : 0 }] })),
    ...loop(6, n => ({ armR: 'none', eyes: n % 2 ? 'closed' : 'happy', prop: ['lixi', { rub: n % 2 }] })),
    ...loop(4, () => ({ armR: 'none', eyes: 'plead', prop: ['lixi', {}] })),
  ] },
  'idle.drink': { ms: 200, frames: [
    ...loop(3, n => ({ armR: 'mid', eyes: 'right', breathe: n % 2, prop: ['glass', {}] })),
    ...[2, 1, 0].flatMap(level => [
      { armR: 'mid', eyes: 'right', prop: ['glass', { at: 'near', level: level + 1 }] },
      ...loop(3, n => ({ armR: 'mid', eyes: 'closed', prop: ['glass', { at: 'lips', level: n < 2 ? level + 1 : level }] })),
      { armR: 'mid', eyes: 'happy', prop: ['glass', { at: 'near', level }] },
      ...loop(2, n => ({ armR: 'mid', eyes: 'happy', breathe: n % 2, prop: ['glass', { level }] })),
    ]),
    ...loop(4, n => ({ armR: 'mid', eyes: 'happy', breathe: n % 2, props: [['sparkles', n], ['glass', { level: 0 }]] })),
    ...loop(3, n => ({ breathe: n % 2 })),
  ] },
  'idle.stretch': {
    ms: 200,
    frames: [
      ...loop(3, n => ({ breathe: n % 2 })),
      { eyes: 'closed', armL: 'mid', armR: 'mid' },
      ...loop(4, () => ({ eyes: 'closed', squash: -1, armL: 'up', armR: 'up' })),
      ...loop(3, () => ({ dx: -1, eyes: 'closed', squash: -1, armL: 'up', armR: 'up' })),
      ...loop(3, () => ({ dx: 1, eyes: 'closed', squash: -1, armL: 'up', armR: 'up' })),
      { eyes: 'closed', armL: 'mid', armR: 'mid' },
      ...loop(2, n => ({ dx: n % 2 ? 1 : -1, eyes: 'happy' })),
      ...loop(4, n => ({ eyes: 'happy', breathe: n % 2, prop: ['sparkles', n] })),
      ...loop(4, n => ({ breathe: n % 2 })),
    ],
  },
})

// What each mood can be drawn as, its own animation first, each with the
// short name the settings show.
export const VARIANTS = {
  idle: [
    ['idle', 'Classic'],
    ['idle.coffee', 'Coffee'],
    ['idle.tune', 'Humming'],
  ],
  sleeping: [
    ['sleeping', 'Classic'],
    ['sleeping.blanket', 'Tucked in'],
    ['sleeping.doze', 'Dozing'],
  ],
  thinking: [
    ['thinking', 'Classic'],
    ['thinking.pace', 'Pacing'],
    ['thinking.cube', 'Cube'],
  ],
  responding: [
    ['responding', 'Classic'],
    ['responding.letter', 'Letter'],
    ['responding.board', 'Board'],
  ],
  typing: [
    ['typing', 'Classic'],
    ['typing.matrix', 'Matrix'],
    ['typing.desk', 'Desk'],
  ],
  reading: [
    ['reading', 'Classic'],
    ['reading.paper', 'Paper'],
    ['reading.tablet', 'Tablet'],
  ],
  searching: [
    ['searching', 'Classic'],
    ['searching.flashlight', 'Torch'],
    ['searching.binoculars', 'Binocs'],
  ],
  running: [
    ['running', 'Classic'],
    ['running.treadmill', 'Treadmill'],
    ['running.progress', 'Progress'],
  ],
  browsing: [
    ['browsing', 'Classic'],
    ['browsing.surf', 'Surfing'],
    ['browsing.window', 'Browser'],
  ],
  delegating: [
    ['delegating', 'Classic'],
    ['delegating.handoff', 'Hand-off'],
    ['delegating.tower', 'Tower'],
  ],
  rallying: [
    ['rallying', 'Classic'],
    ['rallying.line', 'Line'],
    ['rallying.horde', 'Horde'],
  ],
  planning: [
    ['planning', 'Classic'],
    ['planning.map', 'Map'],
    ['planning.stickies', 'Stickies'],
  ],
  tooling: [
    ['tooling', 'Classic'],
    ['tooling.hammer', 'Hammer'],
    ['tooling.toolbox', 'Toolbox'],
  ],
  waiting: [
    ['waiting', 'Classic'],
    ['waiting.sign', 'Sign'],
    ['waiting.bell', 'Bell'],
  ],
  done: [
    ['done', 'Classic'],
    ['done.trophy', 'Trophy'],
    ['done.dance', 'Dance'],
  ],
  error: [
    ['error', 'Classic'],
    ['error.smoke', 'Smoke'],
    ['error.rain', 'Rain'],
  ],
  compacting: [
    ['compacting', 'Classic'],
    ['compacting.squeeze', 'Squeeze'],
    ['compacting.vacuum', 'Vacuum'],
  ],
}


// The variants drawn for clawd-buddy-gauges, after each mood's own three.
;[
  ['idle', 'idle.yawn', 'Yawn'], ['idle', 'idle.crab', 'Crab'],
  ['thinking', 'thinking.wizard', 'Wizard'], ['thinking', 'thinking.ultrathink', 'Ultrathink'],
  ['delegating', 'delegating.juggle', 'Juggle'], ['rallying', 'rallying.conduct', 'Conduct'],
  ['running', 'running.carry', 'Carry'], ['tooling', 'tooling.build', 'Build'],
  ['error', 'error.debug', 'Debug'], ['compacting', 'compacting.sweep', 'Sweep'],
  ['waiting', 'waiting.butt', 'Wiggle'], ['error', 'error.fart', 'Toot'], ['done', 'done.wink', 'Wink'],
  ['error', 'error.tongue', 'Raspberry'], ['typing', 'typing.nod', 'Nod off'],
  ['running', 'running.jog', 'Jog'], ['running', 'running.squat', 'Squat'],
  ['done', 'done.roid', 'Juiced'], ['idle', 'idle.stretch', 'Stretch'], ['idle', 'idle.drink', 'Water'], ['done', 'done.clap', 'Clap'], ['thinking', 'thinking.toilet', 'Toilet'], ['idle', 'idle.peach', 'Peach'], ['idle', 'idle.lixi', 'Lì xì'], ['thinking', 'thinking.power', 'Power up'],
  ['idle', 'idle.keepie-ups', 'Keepie-ups'], ['idle', 'idle.hoops', 'Hoops'], ['idle', 'idle.fishing', 'Fishing'], ['idle', 'idle.kickflip', 'Kickflip'],
  ['sleeping', 'sleeping.snot-bubble', 'Snot bubble'], ['compacting', 'compacting.suitcase', 'Suitcase'],
].forEach(([mood, anim, label]) => VARIANTS[mood].push([anim, label]))


// ------------------------------------------- hats, drawn for clawd-buddy-gauges --
//
// Worn over any animation: framesOf('idle.coffee+santa'). Each hat is rows of
// characters, its last row sitting on the top of his head, centred on him.

const DR = PALETTE.push('#A8322C') - 1 // dark red
const OR = PALETTE.push('#EE8B2E') - 1 // pumpkin
const OD = PALETTE.push('#C0631A') - 1 // pumpkin's ridges
const NV = PALETTE.push('#4F6FA8') - 1 // nightcap blue
const PK = PALETTE.push('#F49AB8') - 1 // peach blossom
const PD = PALETTE.push('#D9577F') - 1 // its heart
const GD = PALETTE.push('#E8B33A') - 1 // gold thread

const HAT_INK = { r: R, d: DR, j: GD, c: B, w: WT, y: Y, b: BL, g: GR, o: OR, O: OD, n: NV, k: K, x: BR }

export const HATS = {
  // Father Christmas's, its tip and bobble flopping over to his left.
  santa: [
    '........rrww',
    '......rrrrww',
    '....rrrrrr..',
    '..rrrrrrrr..',
    '.wwwwwwwwww.',
  ],
  // A striped party cone with a star on top, for the new year.
  party: [
    '...y...',
    '..yyy..',
    '...b...',
    '..byb..',
    '..yby..',
    '.bybyb.',
  ],
  // A pumpkin balanced on his head, two eyes cut in it.
  pumpkin: [
    '....xg..',
    '...xx...',
    '.oOoOoO.',
    'oOkoOkoO',
    'oOoOoOoO',
    '.oOoOoO.',
  ],
  // For Tết nothing on his head: the áo dài is the whole of it (see dressTet).
  tet: [],
  // A striped nightcap, its bobble hanging by his ear.
  nightcap: [
    '...nwnw.....',
    '..nwnwnwn...',
    '.nwnwnwnwnn.',
    '.wwwwwwwwwnw',
    '..........ww',
  ],
}

// already wearing something on his head, or not quite himself
const HATLESS = new Set(['thinking.wizard', 'running.jog', 'thinking.cube', 'rallying.horde', 'delegating.tower'])

// where his body is in this frame, as clawd() works it out
const bodyOf = o => {
  const sq = o.squash ?? o.lie ?? 0
  const bw = BODY_W + 2 * sq
  const bh = BODY_H - sq
  const bx = BX + (o.dx ?? 0) - sq
  const by = o.lie !== undefined ? GROUND - bh : BY + (o.dy ?? 0) + sq + (o.breathe ? 1 : 0)
  return { bx, by, bw, bh }
}

const wearHat = (g, o, rows) => {
  const { bx, by, bw } = bodyOf(o)
  const w = Math.max(...rows.map(r => r.length))
  const last = rows.length - 1
  // the last row (a brim) sits on his head, all but the nightcap's bobble, which hangs beside it
  const lift = rows === HATS.nightcap ? 1 : 0
  art(g, bx + Math.floor((bw - w) / 2), by - last - 1 + lift, rows, HAT_INK)
}

// Tết: below his eyes his body and sleeves turn to a red áo dài with gold
// roundels, over whatever he is doing.
const dressTet = (g, o) => {
  const { bx, by, bw, bh } = bodyOf(o)
  const top = by + Math.min(4, bh - 2)
  for (let y = top; y < Math.min(H, by + bh + 1); y++) {
    for (let x = Math.max(0, bx - 2); x < Math.min(W, bx + bw + 2); x++) {
      const c = g[y * W + x]
      if (c === B) g[y * W + x] = R
      else if (c === S) g[y * W + x] = DR
    }
  }
  // the stand-up collar and a few gold roundels on the red
  for (const [x, y] of [[bx + bw / 2 - 1, top], [bx + bw / 2, top], [bx + 2, top + 2], [bx + bw - 3, top + 1], [bx + bw / 2 - 2, top + 3]]) {
    if (g[y * W + x] === R) g[y * W + x] = GD
  }
}

// Powering up: he crouches and strains, a glow flickering round him, then
// bursts into spiky golden hair inside a blazing aura.
const HG = PALETTE.push('#F6B91C') - 1 // golden hair
const AU = PALETTE.push('#FFF1A8') - 1 // aura
const AF = PALETTE.push('#FFF7D1') - 1 // aura's pale outer flicker

// Spiky golden hair standing up off his head, a few locks over his brow.
PROPS.hair = (g, { dy = 0 } = {}) => {
  const by = BY + dy
  art(g, BX - 1, by - 5, [
    '...h.....h....',
    '..hh....hh..h.',
    '.hhho..hhho.hd',
    '.hhhhdhhhhhdhh',
    'hhhhhhhhhhhhhh',
    '.hd.hh..hd.hd.',
  ], { h: HG, d: OR, o: GD })
}

// The aura, drawn last so it can trace him: a ring hugging his outline, a
// paler flickering ring outside it, and flames licking up off the top.
// `level` 1 is the faint glow while he strains, 2 the full blaze.
PROPS.aura = (g, { n = 0, level = 2 } = {}) => {
  const filled = (x, y) => x >= 0 && x < W && y >= 0 && y < H && g[y * W + x] && g[y * W + x] !== AU && g[y * W + x] !== AF
  const near = (x, y, r) => {
    for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) if (Math.abs(dx) + Math.abs(dy) <= r && filled(x + dx, y + dy)) return true
    return false
  }
  const ring1 = [], ring2 = []
  for (let y = 0; y < GROUND; y++) for (let x = 0; x < W; x++) {
    if (g[y * W + x]) continue
    if (near(x, y, 1)) ring1.push([x, y])
    else if (near(x, y, 2)) ring2.push([x, y])
  }
  const flick = (x, y) => (x * 7 + y * 3 + n * 5) % 4
  for (const [x, y] of ring1) if (level > 1 || flick(x, y) < 2) put(g, x, y, AU)
  if (level < 2) return
  for (const [x, y] of ring2) if (flick(x, y) !== 0) put(g, x, y, AF)
  // flames: from the top of each column, a tongue of 1-3 rising, shifting each step
  for (let x = 0; x < W; x++) {
    let top = -1
    for (let y = 0; y < GROUND; y++) if (g[y * W + x] === AU || g[y * W + x] === AF) { top = y; break }
    if (top < 1) continue
    const len = (x * 5 + n * 3) % 4
    for (let k = 1; k <= len; k++) put(g, x, top - k, k === 1 ? AU : AF)
  }
}
HELD.add('hair')
HELD.add('aura')
HATLESS.add('thinking.power')

Object.assign(ANIMS, {
  'thinking.power': { ms: 150, frames: [
    ...loop(3, () => ({ eyes: 'open' })),
    ...loop(3, n => ({ eyes: 'closed', breathe: 1, armL: 'down', armR: 'down' })),
    ...loop(8, n => ({ dx: n % 2 ? 1 : -1, eyes: 'squeeze', breathe: 1, armL: 'down', armR: 'down', color: n >= 4 ? R : undefined, props: [['aura', { n, level: 1 }]] })),
    { eyes: 'wide', armL: 'up', armR: 'up', props: [['hair', {}], ['aura', { n: 0 }]] },
    ...loop(16, n => ({ eyes: 'fierce', breathe: n % 4 === 3 ? 1 : 0, armL: 'down', armR: 'down', props: [['hair', { dy: n % 4 === 3 ? 1 : 0 }], ['aura', { n }]] })),
    ...loop(3, n => ({ eyes: 'fierce', armL: 'down', armR: 'down', props: [['hair', {}], ['aura', { n, level: 1 }]] })),
  ] },
})


export const ANIMATIONS = Object.keys(ANIMS)

const cache = new Map()

// The frames of one animation as grids, and how long each frame shows.
// `name` may end in `+<hat>` (see HATS): the hat is drawn on his head in every frame.
export const framesOf = name => {
  const [base, hatName] = name.split('+')
  const hat = HATS[hatName] && !HATLESS.has(base) ? HATS[hatName] : null
  const key = (ANIMS[base] ? base : 'idle') + (hat ? `+${hatName}` : '')
  const hit = cache.get(key)
  if (hit) return hit
  const anim = ANIMS[ANIMS[base] ? base : 'idle']
  const frames = anim.frames.map(o => {
    const g = new Uint8Array(W * H)
    const props = o.props ?? (o.prop ? [o.prop] : [])
    for (const [prop, step] of props) if (!HELD.has(prop)) PROPS[prop](g, step)
    clawd(g, o)
    for (const [prop, step] of props) if (HELD.has(prop)) PROPS[prop](g, step)
    if (hat?.length) wearHat(g, o, hat)
    if (hat === HATS.tet) dressTet(g, o)
    return g
  })
  const out = { ms: anim.ms, frames }
  cache.set(key, out)
  return out
}
