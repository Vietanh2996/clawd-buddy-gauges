#!/usr/bin/env node
// Renders Clawd pet tile SVGs (docs/pets/) and filmstrip SVGs (docs/art/examples/)
// directly from plugins/clawd-buddy-gauges/hooks/crew-sprites.js, plus a frame audit.

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { ANIMATIONS, FLOOR, PALETTE, TILE, W, framesOf } from '../plugins/clawd-buddy-gauges/hooks/crew-sprites.js'

const ROWS_DRAWN = 18

function pathsFor(grid, scale = 1, ox = 0, oy = 0) {
  const byColor = new Map()
  for (let y = 0; y < ROWS_DRAWN; y++) {
    let x = 0
    while (x < W) {
      const c = grid[y * W + x] ?? 0
      let w = 1
      while (x + w < W && grid[y * W + x + w] === c) w++
      if (c) {
        const px = ox + x * scale
        const py = oy + y * scale
        const pw = w * scale
        byColor.set(c, (byColor.get(c) ?? '') + `M${px} ${py}h${pw}v${scale}h-${pw}z`)
      }
      x += w
    }
  }
  return [...byColor].map(([c, d]) => `<path fill="${PALETTE[c]}" d="${d}"/>`).join('')
}

export function renderPetSvg(anim) {
  const { ms, frames } = framesOf(anim)
  const n = frames.length
  const dur = +((ms * n) / 1000).toFixed(4)
  const t = x => +x.toFixed(4)
  const groups = frames.map((grid, i) => {
    const paths = pathsFor(grid, 1)
    if (n === 1) return `<g>${paths}</g>`
    const from = t(i / n)
    const to = t((i + 1) / n)
    const [values, keyTimes] =
      i === 0 ? ['visible;hidden', `0;${to}`] : i === n - 1 ? ['hidden;visible', `0;${from}`] : ['hidden;visible;hidden', `0;${from};${to}`]
    return `<g visibility="${i === 0 ? 'visible' : 'hidden'}"><animate attributeName="visibility" values="${values}" keyTimes="${keyTimes}" dur="${dur}s" calcMode="discrete" begin="-0.00s" repeatCount="indefinite"/>${paths}</g>`
  })
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 22" width="140" height="110"><rect width="28" height="22" rx="2" fill="${TILE}"/><g transform="translate(2 2)"><g shape-rendering="crispEdges">${groups.join('')}</g></g></svg>`
}

function collapseRuns(frames) {
  const runs = []
  for (const grid of frames) {
    const prev = runs[runs.length - 1]
    if (prev && prev.grid.every((v, idx) => v === grid[idx])) prev.hold++
    else runs.push({ grid, hold: 1 })
  }
  return runs
}

function boundsOf(frames) {
  let minX = W, maxX = -1, minY = ROWS_DRAWN, maxY = -1
  for (const g of frames) {
    for (let y = 0; y < ROWS_DRAWN; y++) {
      for (let x = 0; x < W; x++) {
        if (g[y * W + x]) {
          minX = Math.min(minX, x)
          maxX = Math.max(maxX, x)
          minY = Math.min(minY, y)
          maxY = Math.max(maxY, y)
        }
      }
    }
  }
  return { minX, maxX, minY, maxY }
}

export function renderFilmstripSvg(anim, titleLabel = anim) {
  const { ms, frames } = framesOf(anim)
  const runs = collapseRuns(frames)
  const { minX, maxX } = boundsOf(frames)
  // Match the repo's 770px (8 cols x 22 px) filmstrip layout when edges 0 and 23
  // are unused; otherwise use 7 cols x 24 px (732px) so outer pixels never clip.
  const trimSides = minX >= 1 && maxX <= W - 2
  const cols = trimSides ? 8 : 7
  const scale = 4
  const cellW = (trimSides ? W - 2 : W) * scale
  const cellH = ROWS_DRAWN * scale
  const shiftX = trimSides ? -scale : 0
  const gapX = 6
  const rowStep = 108
  const pad = 12
  const topY = 34
  const rows = Math.ceil(runs.length / cols)
  const width = pad * 2 + cols * cellW + (cols - 1) * gapX
  const height = topY + rows * rowStep + 6
  const totalSec = ((ms * frames.length) / 1000).toFixed(2)
  const header = `${titleLabel}  |  ${frames.length} frames x ${ms} ms = ${totalSec} s loop, ${runs.length} runs`
  const font = 'ui-monospace,SFMono-Regular,Menlo,Consolas,monospace'

  const cells = runs.map(({ grid, hold }, idx) => {
    const col = idx % cols
    const row = Math.floor(idx / cols)
    const x = pad + col * (cellW + gapX)
    const y = topY + row * rowStep
    const cx = x + cellW / 2
    const label = hold > 1 ? `${idx + 1}  (hold x${hold})` : `${idx + 1}`
    return [
      `<rect x="${x}" y="${y}" width="${cellW}" height="${cellH}" fill="${TILE}" stroke="${FLOOR}"/>`,
      pathsFor(grid, scale, x + shiftX, y),
      `<text x="${cx}" y="${y + 86}" text-anchor="middle" font-family="${font}" font-size="11" fill="#e8e4da">${label}</text>`,
      `<text x="${cx}" y="${y + 99}" text-anchor="middle" font-family="${font}" font-size="10" fill="#8F8B84">${ms * hold} ms</text>`,
    ].join('')
  })

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img"><title>${header}</title><rect width="${width}" height="${height}" rx="6" fill="#141312"/><g shape-rendering="crispEdges"><text x="${pad}" y="24" font-family="${font}" font-size="13" fill="#F2C14E">${header}</text>${cells.join('')}</g></svg>`
}

function audit(anim) {
  const { ms, frames } = framesOf(anim)
  const runs = collapseRuns(frames)
  let minX = W, maxX = -1, minY = ROWS_DRAWN, maxY = -1
  const deltas = []
  for (let i = 0; i < frames.length; i++) {
    const g = frames[i]
    const prev = frames[(i - 1 + frames.length) % frames.length]
    let diff = 0
    for (let y = 0; y < ROWS_DRAWN; y++) {
      for (let x = 0; x < W; x++) {
        const v = g[y * W + x]
        if (v) {
          minX = Math.min(minX, x)
          maxX = Math.max(maxX, x)
          minY = Math.min(minY, y)
          maxY = Math.max(maxY, y)
        }
        if (v !== prev[y * W + x]) diff++
      }
    }
    deltas.push(diff)
  }
  return {
    anim,
    ms,
    frames: frames.length,
    runs: runs.length,
    loopSec: +((ms * frames.length) / 1000).toFixed(2),
    bounds: { x: [minX, maxX], y: [minY, maxY] },
    seamDiffPx: deltas[0],
    maxStepDiffPx: Math.max(...deltas),
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const targets = process.argv.slice(2)
  if (!targets.length) {
    console.error(`Usage: node scripts/render-sprites.mjs <anim> [...]\nKnown (${ANIMATIONS.length}): ${ANIMATIONS.slice(-5).join(', ')}`)
    process.exit(1)
  }
  for (const anim of targets) {
    const slug = anim.replace(/\./g, '-')
    const petPath = resolve(`docs/pets/${anim}.svg`)
    const filmPath = resolve(`docs/art/examples/filmstrip-${slug}.svg`)
    writeFileSync(petPath, renderPetSvg(anim))
    writeFileSync(filmPath, renderFilmstripSvg(anim))
    console.log(JSON.stringify(audit(anim)), '->', petPath, filmPath)
  }
}
