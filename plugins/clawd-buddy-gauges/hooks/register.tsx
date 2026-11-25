import { atom, read, update } from 'claude-code'
import type { Elements, EngineInterface, Register } from 'claude-code'

import type { Base, BaseKind, BranchMenu, Reaction, ReactionKind, Settings, ToolsToday } from '../types'
import { HAT_NAMES, hatFor, holidayHat, isNight } from './calendar'
import { PET_ASPECT, dayPartOf, moodForTool, petAnim, petSvg, setSeason, shufflePet, type Mood } from './crew-pet'
import { burnOf, k, metersSvg, span, type Info, type Sample } from './meters'

// ---------------------------------------------------------------- state

const base = atom({ plugin: 'clawd-buddy-gauges', key: 'base' } as const, {
  kind: 'idle',
  since: 0,
  line: '',
  detail: '',
} as Base)
const reaction = atom({ plugin: 'clawd-buddy-gauges', key: 'reaction' } as const, null as Reaction | null)
const settings = atom({ plugin: 'clawd-buddy-gauges', key: 'settings' } as const, {
  isHidden: false,
} as Settings)
// bumped when what the band shows changes: the band redraws on this, not on every tick
const deskTick = atom({ plugin: 'clawd-buddy-gauges', key: 'deskTick' } as const, 0)
const toolsToday = atom({ plugin: 'clawd-buddy-gauges', key: 'toolsToday' } as const, {
  date: '',
  count: 0,
} as ToolsToday)
// the branch list under the band, open while it holds the branches; null: closed
const branchMenu = atom({ plugin: 'clawd-buddy-gauges', key: 'branchMenu' } as const, null as BranchMenu | null)

type Dollar = EngineInterface

// The Compact button's press. One function for the session's life: the band redraws whenever its text changes,
// and a fresh closure each time made the desktop rebuild the button (hover flicker, presses lost between frames).
// refreshed at every render, so it works after a hot reload too (no session.start runs then)
// what the last press came to, shown on the status line for a while: the press is felt even when nothing else shows
let compactNote: { text: string; at: number } | null = null
const noteCompact = (text: string) => {
  compactNote = { text: text.replace(/^clawd-buddy-gauges: /, ''), at: Date.now() }
}
// The press itself is taken at `ui.press` (below), which holds a live $ whatever the band redrew since; the
// Button's own onPress is the fallback that never runs while that hook takes it.
const pressCompact = () => noteCompact('compact: press not handled')
const pressBranch = () => undefined

// Git branches, two levels: the ⎇ button by Compact opens a row of the git repos in the session's folder (itself
// and those under it, 4 levels down), each with the branch it is on; a repo opens a row of its local branches (latest
// first, the current one marked), and a branch switches that repo to it, unless its tracked files have changes,
// which would ride along or block the switch. With one repo alone the first row is skipped.
const BRANCH_ICON = '⎇'
const BRANCH_MAX = 12
const REPO_MAX = 20
const PRUNE = ['node_modules', '.venv', 'venv', 'dist', 'build', 'Pods', '.next', 'Library', '_archive', 'Archived']
let repos: string[] = [] // relative to the session's folder, '.' the folder itself, which comes first
const git = ($: Dollar, dir: string, ...args: string[]) => $.process.run(['git', '-C', dir, ...args], { timeoutMs: 10_000 })
async function findRepos($: Dollar) {
  try {
    const prune = PRUNE.flatMap((n, k) => (k ? ['-o', '-name', n] : ['-name', n]))
    const r = await $.process.run(['find', '.', '-maxdepth', '4', '(', ...prune, ')', '-prune', '-o', '-name', '.git', '-print', '-prune'], { timeoutMs: 5_000 })
    const found = r.stdout.split('\n').filter(Boolean).map(x => x.replace(/\/?\.git$/, '').replace(/^\.\//, '') || '.')
    // a session in a repo's subfolder has no .git of its own, yet is in that repo
    if (!found.includes('.') && (await git($, '.', 'rev-parse', '--is-inside-work-tree')).stdout.trim() === 'true') found.push('.')
    repos = [...new Set(found)].sort((a, b) => (a === '.' ? -1 : b === '.' ? 1 : a.localeCompare(b))).slice(0, REPO_MAX)
  } catch {
    // keep the last list
  }
}
const repoName = async ($: Dollar, dir: string) =>
  dir === '.' ? ((await $.session.cwd().catch(() => '.')).split('/').filter(Boolean).pop() ?? '.') : dir
async function folderMenu($: Dollar): Promise<BranchMenu> {
  const items = await Promise.all(repos.map(async dir => {
    const on = (await git($, dir, 'branch', '--show-current').catch(() => null))?.stdout.trim() || 'detached'
    return { key: `repo:${dir}`, label: `${await repoName($, dir)} · ${on}`, isCurrent: false }
  }))
  return { dir: null, current: '', items }
}
async function branchList($: Dollar, dir: string, hasBack: boolean): Promise<BranchMenu | null> {
  const r = await git($, dir, 'branch', '--sort=-committerdate', '--format=%(refname:short)')
  if (r.exitCode !== 0) return null
  const current = (await git($, dir, 'branch', '--show-current')).stdout.trim()
  const list = r.stdout.split('\n').map(x => x.trim()).filter(Boolean).slice(0, BRANCH_MAX)
  if (current && !list.includes(current)) list.unshift(current)
  const back = hasBack ? [{ key: 'branch-back', label: `← ${await repoName($, dir)}`, isCurrent: false }] : []
  return { dir, current, items: [...back, ...list.map(b => ({ key: `branch:${b}`, label: b, isCurrent: b === current }))] }
}
// the meters' label grey, shared by the status line's detail so the two rows read as one (light and dark alike)
const LABEL = '#8a8984'

// ---------------------------------------------------------------- meters (from clawd-bar)

const PET_H = 36
const PET_W = Math.round(PET_H * PET_ASPECT)
const METER_H = 28 // room above the CTX number for the +12k that floats up
let info: Info = { ctx: null, limits: [], burn: null, working: false, waiting: false, nudge: null, turnAt: 0, endAt: null, lastMs: null, flash: null }
let samples: Sample[] = [] // the 5-hour window's readings, for its pace
let windowSeen = ''
let ctxShown: number | null = null // the context's tokens the last float-up was measured from
let runTokens = 0 // what the running turn has burned so far, summed per model call
let metersKey = ''
let metersMarkup = ''
let isReplying = false // the main loop's model is streaming its reply text (crew's 'responding')
let afterCompact = false // from a compaction until the next model response: usage().context.tokens is stale
let lastTokens: number | null = null // what the last turn burned: every request's input, cache and output
let cacheAt: number | null = null // when the main loop's last answered request was sent: its cache lifetime counts from here
let cacheTtlMs = 300_000 // that cache's lifetime: 1h or 5m as the last write said, kept when a request only read

async function refresh($: Dollar, breakdown = false) {
  try {
    const u = await $.session.usage(breakdown ? { breakdown: 'summary' } : undefined)
    const b = u.context.breakdown
    info = {
      ...info,
      ctx: {
        // after a compaction the last response's figure is the old window's: trust the breakdown, or what the
        // compaction reported, until the next response
        pct: Math.round((afterCompact ? b?.percentage ?? info.ctx?.pct : u.context.percent ?? b?.percentage) ?? 0),
        tokens: (afterCompact ? b?.totalTokens ?? info.ctx?.tokens : u.context.tokens ?? b?.totalTokens) ?? 0,
        window: u.context.window,
        cats: b ? b.categories.filter(c => c.kind === 'used').map(c => ({ name: c.name, tokens: c.tokens })) : info.ctx?.cats ?? [],
        max: b?.rawMaxTokens ?? info.ctx?.max ?? u.context.window,
        ...(b ? (b.isAutoCompactEnabled && b.autoCompactThreshold ? { compactAt: b.autoCompactThreshold } : {}) : info.ctx?.compactAt ? { compactAt: info.ctx.compactAt } : {}),
      },
      limits: u.rateLimits.map(r => ({ kind: r.kind, pct: r.percentUsed, ...(r.resetsAt ? { resetsAt: r.resetsAt } : {}) })),
    }
    const five = info.limits.find(l => l.kind === 'five_hour')
    const now = await $.clock.now()
    if (five) {
      const last = samples[samples.length - 1]
      if ((five.resetsAt ?? '') !== windowSeen || (last && five.pct < last.pct - 1)) samples = []
      windowSeen = five.resetsAt ?? ''
      if (!last || last.pct !== five.pct) samples.push({ t: now, pct: five.pct })
      samples = samples.filter(x => now - x.t <= 3_600_000)
    }
    info = { ...info, burn: five ? burnOf(samples, now, five.pct, five.resetsAt) : null }
    noteLimits(now)
  } catch {
    // keep the last reading
  }
  await findRepos($)
}

// floats what a limit spent since its last float-up over its % (as what is left drops 1 point or more); a rise (the
// window reset) only moves the mark
const limitShown: Record<string, number> = {}
function noteLimits(now: number) {
  for (const l of info.limits) {
    const left = Math.round(100 - Math.min(l.pct, 100))
    const was = limitShown[l.kind]
    limitShown[l.kind] = left
    if (was === undefined || left >= was) continue
    info = { ...info, limitFlash: { ...info.limitFlash, [l.kind]: { text: `−${was - left}%`, at: now } } }
  }
}

// floats the context's change since the last float-up over the CTX number, once it moved 1k or more
function noteCtx(now: number) {
  if (!info.ctx) return
  if (ctxShown === null) {
    ctxShown = info.ctx.tokens
    return
  }
  const d = info.ctx.tokens - ctxShown
  if (Math.abs(d) < 1000) return
  ctxShown = info.ctx.tokens
  info = { ...info, flash: { text: `${d > 0 ? '+' : '−'}${k(Math.abs(d))}`, at: now } }
}

function setWaiting(waiting: boolean) {
  if (info.waiting !== waiting) info = { ...info, waiting }
}

// rebuilt only when what it shows changes; the float-up animates inside the SVG
function metersFor(now: number) {
  const key = JSON.stringify([
    info.ctx, info.limits.map(l => [l.kind, Math.round(l.pct)]), Math.round(info.burn?.projected ?? 0), info.flash?.at,
    info.limitFlash?.five_hour?.at, info.limitFlash?.seven_day?.at,
    Math.floor(now / 60_000), // the 5H countdown and the pace lines move with the clock
  ])
  if (key !== metersKey) {
    metersKey = key
    metersMarkup = metersSvg(METER_H, now, info)
  }
  return metersMarkup
}

function metersText() {
  const pct = (kind: string) => {
    const l = info.limits.find(x => x.kind === kind)
    return l ? `${Math.round(100 - Math.min(l.pct, 100))}%` : '—' // what is left
  }
  return [`CTX ${info.ctx ? k(info.ctx.tokens) : '—'}`, `5H ${pct('five_hour')}`, `7D ${pct('seven_day')}`].join('  ')
}

// the prompt cache's countdown while idle: from the last request's send time to the end of its lifetime
// (the desktop hands cacheEnd() to cache-client.tsx, which counts by itself; VS Code shows only the expiry)
function cacheEnd() {
  return info.working || cacheAt === null ? null : cacheAt + cacheTtlMs
}

// the cache mark lives in module variables, which a reload of the mod (a reinstall, the app reconnecting after the
// Mac slept) empties: it is kept in the store too, per session, and read back on the first tick or draw after a load
const CACHE_KEY = 'cache'
const CACHE_SESSIONS = 20
type CacheMark = { at: number | null; ttl: number }
let isCacheLoaded = false

async function loadCache($: Dollar) {
  if (isCacheLoaded) return
  isCacheLoaded = true
  try {
    const all = (await $.store.get(CACHE_KEY)) as Record<string, CacheMark> | undefined
    const mark = all?.[await $.session.id()]
    if (mark && cacheAt === null) {
      cacheAt = mark.at
      cacheTtlMs = mark.ttl
    }
  } catch {
    // no store: the mark lasts as long as the module, as before
  }
}

async function saveCache($: Dollar) {
  try {
    const id = await $.session.id()
    const all = { ...((await $.store.get(CACHE_KEY)) as Record<string, CacheMark> | undefined) }
    delete all[id]
    all[id] = { at: cacheAt, ttl: cacheTtlMs }
    await $.store.set(CACHE_KEY, Object.fromEntries(Object.entries(all).slice(-CACHE_SESSIONS)))
  } catch {
    // a failed save costs the countdown after a reload, never the turn
  }
}

const isCacheExpired = (now: number) => {
  const end = cacheEnd()
  return end !== null && now >= end
}

// the status line's tail: the running turn's clock, or nothing (the done line carries time and tokens)
function turnClock(now: number) {
  if (!info.working) return ''
  return runTokens ? `${span(now - info.turnAt)} · ${k(runTokens)} tok` : span(now - info.turnAt)
}

const SETTINGS_KEY = 'settings'

async function setBase($: Dollar, kind: BaseKind, line = '', detail = '') {
  const since = await $.clock.now()
  await update($, base, () => ({ kind, since, line, detail }))
}

async function react($: Dollar, kind: ReactionKind, line: string, ms: number) {
  const until = (await $.clock.now()) + ms
  await update($, reaction, () => ({ kind, line, until }))
}

async function saveSettings($: Dollar, patch: Partial<Settings>) {
  await update($, settings, s => ({ ...s, ...patch }))
  await $.store.set(SETTINGS_KEY, await read($, settings))
}

// ---------------------------------------------------------------- reminders

// two reminders, each on its own clock: stand up (every 60 minutes unless set) and drink water (every 45). 0 turns
// one off. Each due time sits in $.store, shared by every session: one reminder, and a click in any session clears it
// for all. Read again every 30 s. When both are due, standing up comes first.
type Nudge = 'stand' | 'water'
const NUDGE_ORDER: Nudge[] = ['stand', 'water']
const NUDGES = {
  stand: { command: 'remind', name: 'Stand-up', main: 'Stand up!', since: 'at the desk', color: '#f0a030', anim: 'idle.stretch', thanks: 'Nice stretch!' },
  water: { command: 'water', name: 'Water', main: 'Drink water!', since: 'since the last sip', color: '#5bc0de', anim: 'idle.drink', thanks: 'Glug glug!' },
} as const
const NUDGE_STALE_MS = 3 * 3_600_000 // due this long ago and never answered (the computer slept): start over
const nudgeNext: Record<Nudge, number> = { stand: 0, water: 0 }
let nudgeReadAt = 0

const everyMinOf = (s: Settings, n: Nudge) => (n === 'stand' ? (s.remindMin ?? 60) : (s.waterMin ?? 45))

async function syncNudges($: Dollar, now: number, isForced = false) {
  if (!isForced && now - nudgeReadAt < 30_000) return
  nudgeReadAt = now
  const s = await read($, settings)
  for (const n of NUDGE_ORDER) {
    const every = everyMinOf(s, n) * 60_000
    if (!every) {
      nudgeNext[n] = 0
      continue
    }
    // the store unreachable: the reminder keeps this session's own count
    const saved = (await $.store.get(n).catch(() => undefined)) as { next?: number } | undefined
    let next = saved?.next ?? nudgeNext[n]
    if (!next || now - next > NUDGE_STALE_MS || next - now > every) {
      next = now + every
      await $.store.set(n, { next }).catch(() => undefined)
    }
    nudgeNext[n] = next
  }
}

// the reminder answered (or restarted): due again a full interval from now
async function restartNudge($: Dollar, n: Nudge, now: number) {
  const every = everyMinOf(await read($, settings), n) * 60_000
  nudgeNext[n] = every ? now + every : 0
  await $.store.set(n, { next: nudgeNext[n] }).catch(() => undefined)
}

const dueNudge = (now: number) => NUDGE_ORDER.find(n => nudgeNext[n] > 0 && now >= nudgeNext[n]) ?? null
const minutesLabel = (min: number) => (min % 60 ? `${min}m` : `${min / 60}h`)

// ---------------------------------------------------------------- time

type Local = { year: number; month: number; day: number; hour: number; minute: number }

function localTime(now: number): Local {
  const d = new Date(now - new Date(now).getTimezoneOffset() * 60_000)
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
    hour: d.getUTCHours(),
    minute: d.getUTCMinutes(),
  }
}

const pad = (n: number) => String(n).padStart(2, '0')
const dateKey = (l: Local) => `${l.year}-${pad(l.month)}-${pad(l.day)}`
const clock = (l: Local) => `${pad(l.hour)}:${pad(l.minute)}`

// ---------------------------------------------------------------- words

const VERBS = [
  'Noodling…',
  'Clauding…',
  'Pondering…',
  'Percolating…',
  'Cogitating…',
  'Brewing…',
  'Scheming…',
  'Ruminating…',
  'Simmering…',
  'Conjuring…',
  'Moseying…',
  'Finagling…',
  'Schlepping…',
  'Tinkering…',
  'Mulling…',
  'Spelunking…',
  'Hatching…',
  'Wrangling…',
]


let lastPick = ''
function pick(list: string[]) {
  let s = list[Math.floor(Math.random() * list.length)] ?? ''
  if (s === lastPick && list.length > 1) s = list[(list.indexOf(s) + 1) % list.length] ?? s
  lastPick = s
  return s
}

// ---------------------------------------------------------------- tools

function basename(path: unknown) {
  return typeof path === 'string' ? (path.split(/[\\/]/).pop() ?? path) : ''
}

function cut(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + '…' : s
}

function lineFor(tool: string, input: Record<string, unknown>) {
  switch (tool) {
    case 'Read':
      return `reading ${basename(input.file_path)}`
    case 'Edit':
    case 'Write':
    case 'NotebookEdit':
      return `editing ${basename(input.file_path ?? input.notebook_path)}`
    case 'Bash':
    case 'PowerShell':
      return `$ ${cut(String(input.command ?? '').split('\n')[0] ?? '', 48)}`
    case 'Grep':
      return `grep ${cut(String(input.pattern ?? ''), 40)}`
    case 'Glob':
      return `glob ${cut(String(input.pattern ?? ''), 40)}`
    case 'WebFetch':
      return cut(String(input.url ?? 'fetching'), 48)
    case 'WebSearch':
      return `searching “${cut(String(input.query ?? ''), 40)}”`
    case 'Agent':
    case 'Task':
      return cut(String(input.description ?? 'calling in a friend'), 48)
    default:
      return tool.startsWith('mcp__') ? tool.split('__').slice(1).join(' · ') : tool
  }
}

const TEST_CMD =
  /\b(flutter test|dart test|npm (run )?test|pnpm (run )?test|yarn test|bun test|npx (jest|vitest)|jest|vitest|pytest|go test|cargo test|gradlew?( \S+)* test|mvn test|dotnet test|rspec|phpunit|deno test)\b/

// installing a test runner is not running the tests
const INSTALL_CMD =
  /\b(npm|pnpm|yarn|bun) (i|install|add)\b|\bpip install\b|\bcargo add\b|\b(dart|flutter) pub add\b/

function testSummary(out: string): { isFail: boolean; summary: string } | null {
  const failed = /(\d+)\s+(tests?\s+)?(failed|failing|failures?)/i.exec(out)
  const passed = /(\d+)\s+(tests?\s+)?(passed|passing)/i.exec(out)
  const flutterFail = /Some tests failed/i.test(out)
  const flutterPass = /All tests passed/i.test(out)
  const failCount = failed ? Number(failed[1]) : 0
  const parts: string[] = []
  if (passed) parts.push(`${passed[1]} passed`)
  if (failCount > 0) parts.push(`${failCount} failed`)
  if (failCount > 0 || flutterFail) return { isFail: true, summary: parts.join(', ') || 'some tests failed' }
  if (passed || flutterPass) return { isFail: false, summary: parts.join(', ') || 'all green' }
  return null
}

function duration(ms: number) {
  const s = Math.round(ms / 1000)
  return s >= 60 ? `${Math.floor(s / 60)}m ${s % 60}s` : `${s}s`
}

// ---------------------------------------------------------------- scene

const ORANGE = '#d97757'
const GREEN = '#5cb85c'
const BLUE = '#4a9fe8'
const AMBER = '#f0a030'
const RED = '#e05252'

type Scene = {
  mood: Mood // the crew Clawd to show
  anim?: string // a set animation instead of one of the mood's
  main: string
  sub: string
  color?: string
  isMainDim?: boolean
}

type DueNudge = { main: string; sub: string; color: string; anim: string }

// a usage limit used up: which one, and how long until it resets (NaN when unknown)
type Broke = { name: string; left: number }
const LIMIT_NAMES: Record<string, string> = { five_hour: '5-hour', seven_day: 'weekly' }
function brokeAt(now: number): Broke | null {
  const out = info.limits.filter(l => l.pct >= 100)
  if (!out.length) return null
  // the one that frees him last is the one that matters
  const left = (l: { resetsAt?: string }) => (l.resetsAt ? Date.parse(l.resetsAt) - now : NaN)
  const worst = out.reduce((a, c) => (left(c) > left(a) ? c : a))
  return { name: LIMIT_NAMES[worst.kind] ?? worst.kind.replace(/_/g, ' '), left: left(worst) }
}
const hoursMin = (ms: number) => {
  const m = Math.max(1, Math.round(ms / 60_000))
  return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`
}

function compose(b: Base, r: Reaction | null, l: Local, now: number, tools: number, nudge: DueNudge | null = null, broke: Broke | null = null): Scene {
  const scene: Scene = { mood: 'idle', main: '', sub: '' }
  const age = now - b.since

  // timeouts, worked out from the clock instead of stored
  let kind: BaseKind | 'sleep' = b.kind
  let idleSince = b.since
  const expire = (ms: number) => {
    if (age > ms) {
      kind = 'idle'
      idleSince = b.since + ms
    }
  }
  if (kind === 'done') expire(300_000)
  else if (kind === 'thinking' || kind === 'working' || kind === 'compacting') expire(1_200_000)
  else if (kind === 'needs') expire(3_600_000)
  // late at night Clawd dozes off after 3 minutes, not 10
  if (kind === 'idle' && now - idleSince > (isNight(l.hour) ? 180_000 : 600_000)) kind = 'sleep'

  switch (kind) {
    case 'thinking':
      scene.mood = isReplying ? 'responding' : 'thinking'
      scene.main = b.line || 'Clauding…'
      scene.sub = 'thinking'
      scene.color = ORANGE
      break
    case 'working':
      scene.mood = moodForTool(b.detail)
      scene.main = b.line
      scene.sub = b.detail.replace(/^mcp__/, 'mcp ')
      break
    case 'needs': {
      const isImpatient = age > 20_000
      scene.mood = 'waiting'
      // red and amber by turns, a second each (onTick runs once a second)
      scene.color = Math.floor(now / 1000) % 2 ? AMBER : RED
      scene.main = b.detail === 'question' ? 'Question!' : b.detail === 'plan' ? 'Plan ready' : 'Needs you!'
      scene.sub = isImpatient ? `${b.line} · waiting ${duration(age)}` : b.line
      break
    }
    case 'done':
      scene.mood = 'done'
      scene.main = 'Done!'
      scene.sub = b.line
      scene.color = GREEN
      break
    case 'compacting':
      scene.mood = 'compacting'
      scene.main = 'Compacting'
      scene.sub = 'squeezing context'
      scene.color = BLUE
      break
    case 'idle':
      scene.mood = 'idle'
      scene.main = clock(l)
      scene.sub = `${tools} tools today`
      scene.isMainDim = true
      break
    case 'sleep':
      scene.mood = 'sleeping'
      scene.main = clock(l)
      scene.sub = 'zzz…'
      scene.isMainDim = true
      break
  }

  // a reminder due: its words in its colour, and Clawd acts it out when it is not busy (a question waiting comes first)
  if (nudge && kind !== 'needs') {
    scene.main = nudge.main
    scene.sub = nudge.sub
    scene.color = nudge.color
    scene.isMainDim = false
    if (kind === 'idle' || kind === 'sleep' || kind === 'done') {
      scene.mood = 'idle'
      scene.anim = nudge.anim
    }
  }

  // out of usage: no Claude till it resets, so the band says when (a question waiting comes first); Clawd idles on
  // in his usual looks until one is drawn for it
  if (broke && (kind === 'idle' || kind === 'sleep' || kind === 'done')) {
    scene.mood = 'idle'
    scene.anim = undefined
    scene.main = 'Out of usage'
    scene.sub = `${broke.name} limit resets ${Number.isFinite(broke.left) ? `in ${hoursMin(broke.left)}` : 'soon'}`
    scene.color = RED
    scene.isMainDim = false
  }

  // reactions sit on top for a few seconds
  if (r !== null && now < r.until) {
    scene.isMainDim = false
    switch (r.kind) {
      case 'oops':
        scene.mood = 'error'
        scene.main = 'Oops'
        scene.sub = r.line
        scene.color = RED
        break
      case 'testsFail':
        scene.mood = 'error'
        scene.main = 'Tests failed'
        scene.sub = r.line
        scene.color = RED
        break
      case 'testsPass':
        scene.mood = 'done'
        scene.main = 'Tests pass!'
        scene.sub = r.line
        scene.color = GREEN
        break
    }
  }

  return scene
}

// ---------------------------------------------------------------- hooks

const TOOLS_KEY = 'tools-today'

// what the band shows now: shared by the render and by onTick, which works out whether the desktop changed
async function viewAt($: Dollar) {
  const now = await $.clock.now()
  const b = await read($, base)
  const r = await read($, reaction)
  const l = localTime(now)
  const counted = await read($, toolsToday)
  const tools = counted.date === dateKey(l) ? counted.count : 0
  const s = await read($, settings)
  const due = dueNudge(now)
  const nudge = due && { ...NUDGES[due], sub: `${minutesLabel(everyMinOf(s, due))} ${NUDGES[due].since} · click Clawd when done` }
  const scene = compose(b, r, l, now, tools, nudge, brokeAt(now))
  const hat = hatFor(s.hat, l)
  setSeason(hat === 'tet' || holidayHat(l.year, l.month, l.day) === 'tet' ? 'tet' : null)
  const shown = petAnim(scene.mood, now, dayPartOf(l.hour))
  const anim = (scene.anim ?? shown.anim) + (hat ? `+${hat}` : '')
  const pet = { anim, since: scene.anim ? 0 : shown.since }
  const note = compactNote && Date.now() - compactNote.at < 15_000 ? compactNote.text : ''
  const clockNow = [turnClock(now), note].filter(Boolean).join(' · ')
  const sub = clockNow ? (scene.sub ? `${scene.sub} · ${clockNow}` : clockNow) : scene.sub
  return { now, scene, pet, sub }
}

// what the desktop drew last; a module variable, so a reload draws once afresh
let deskSig = ''

async function onTick($: Dollar) {
  const s = await read($, settings)
  if (s.isHidden) return
  await loadCache($)
  await syncNudges($, await $.clock.now())
  // the desktop's pet animates itself in its Client: redraw only when the text, colours, pet or meters change
  const v = await viewAt($)
  metersFor(v.now)
  const sig = JSON.stringify([v.scene.main, v.scene.sub, v.sub, v.scene.color, v.scene.isMainDim, v.pet.anim, metersKey, info.working, info.waiting, repos.length > 0, cacheEnd(), isCacheExpired(v.now)])
  if (sig !== deskSig) {
    deskSig = sig
    await update($, deskTick, n => (n + 1) % 100_000)
  }
}

// what /clawd takes, each with the line the typeahead shows beside it
const HAT_LINES: Record<string, string> = {
  tet: 'red áo dài for Tết', santa: 'Santa hat', party: 'party hat', pumpkin: 'pumpkin for Halloween',
  nightcap: 'nightcap', auto: 'hats by the calendar', none: 'no hat',
}
const CLAWD_FORMS: [string, string][] = [
  ['on', 'show Clawd'], ['off', 'hide Clawd'],
  ...Object.entries(HAT_LINES).map(([hat, line]): [string, string] => [`hat ${hat}`, line]),
  ['remind 60', 'stand-up reminder every 60 min'], ['remind off', 'no stand-up reminder'],
  ['water 45', 'water reminder every 45 min'], ['water off', 'no water reminder'],
]
// each form of /clawd as a command of its own, so the slash menu lists them all: /clawd-hat-tet runs /clawd hat tet
export const CLAWD_SHORTCUTS: { name: string; args: string; description: string; argumentHint?: string }[] = [
  ...CLAWD_FORMS.filter(([form]) => !/^(remind|water) \d/.test(form))
    .map(([form, line]) => ({ name: `clawd-${form.replace(/ /g, '-')}`, args: form, description: `Clawd: ${line}` })),
  { name: 'clawd-remind', args: 'remind', description: 'Clawd: stand-up reminder every <minutes>; alone, you stood up', argumentHint: '<minutes>' },
  { name: 'clawd-water', args: 'water', description: 'Clawd: water reminder every <minutes>; alone, you drank', argumentHint: '<minutes>' },
]
export const clawdSuggestions = (before: string, token: string, start: number) => {
  // typing the command itself: offer each full form
  if (start === 0 && token.startsWith('/') && token.length > 1 && '/clawd'.startsWith(token))
    return CLAWD_FORMS.map(([form, line]) => ({ text: `/clawd ${form}`, description: line }))
  if (!before.startsWith('/clawd ')) return []
  const words = before.slice(7).split(/\s+/)
  const typed = words.slice(0, -1).join(' ')
  const pool = CLAWD_FORMS.map(([form, line]) => ({ parts: form.split(' '), line }))
    .filter(f => f.parts.length > words.length - 1 && f.parts.slice(0, words.length - 1).join(' ') === typed)
    .filter(f => f.parts[words.length - 1]!.startsWith(token.toLowerCase()))
  const seen = new Set<string>()
  return pool.flatMap(f => {
    const word = f.parts[words.length - 1]!
    if (seen.has(word)) return []
    seen.add(word)
    const isLast = f.parts.length === words.length
    return [isLast ? { text: word, description: f.line } : { text: word, label: `${word} …` }]
  })
}

export const register: Register = on => {
  let isTurnRunning = false
  let turnStartedAt = 0
  let turnTools = 0
  let toolsInFlight = 0

  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'clawd',
      description: 'Clawd: show or hide (on|off), remind <minutes>|off, water <minutes>|off, hat <name>|auto|none',
      argumentHint: 'on|off · hat <name> · remind <min> · water <min>',
    })
    for (const { name, description, argumentHint } of CLAWD_SHORTCUTS)
      await $.command.register(argumentHint ? { name, description, argumentHint } : { name, description })
    const saved = (await $.store.get(SETTINGS_KEY)) as Partial<Settings> | undefined
    if (saved) await update($, settings, s => ({ ...s, ...saved }))
    const tools = (await $.store.get(TOOLS_KEY)) as ToolsToday | undefined
    if (tools) await update($, toolsToday, () => tools)
    await setBase($, 'idle')
    $.clock.every(1000, () => void onTick($))
    await refresh($, true)
    // limits move while idle too (another session spends them); during a turn turn.start's ticker reads them
    $.clock.every(60_000, () => void (info.working ? undefined : refresh($)))

    return next(e)
  })

  // the typeahead for /clawd: while typing the command, every full form of it; after it, the words that can come next
  on('prompt.autocomplete', async ($, e, next) => {
    const rows = clawdSuggestions(e.text.slice(0, e.cursor), e.token, e.start)
    if (!rows.length) return next(e)
    return { suggestions: [...(await next(e)).suggestions, ...rows] }
  })

  on('command.run', async ($, e, next) => {
    const short = CLAWD_SHORTCUTS.find(c => c.name === e.command)
    if (e.command !== 'clawd' && !short) return next(e)
    const args = short ? `${short.args} ${e.args}` : e.args
    const [word = '', arg = ''] = args.trim().toLowerCase().split(/\s+/)
    const now = await $.clock.now()
    const n = NUDGE_ORDER.find(x => NUDGES[x].command === word)
    if (n) {
      const key = n === 'stand' ? 'remindMin' : 'waterMin'
      const what = n === 'stand' ? 'stand up' : 'drink water'
      if (arg === 'off' || arg === '0') {
        await saveSettings($, { [key]: 0 })
        await syncNudges($, now, true)
        return { text: `${NUDGES[n].name} reminder off.` }
      }
      const min = Number(arg)
      if (arg && !(Number.isInteger(min) && min >= 5 && min <= 600)) return { text: `Usage: /clawd ${word} <minutes, 5-600> | off` }
      if (arg) await saveSettings($, { [key]: min })
      else if (!everyMinOf(await read($, settings), n)) await saveSettings($, { [key]: n === 'stand' ? 60 : 45 })
      await restartNudge($, n, now)
      return { text: `Clawd will remind you to ${what} every ${minutesLabel(everyMinOf(await read($, settings), n))}, next one counted from now.` }
    }
    if (word === 'hat') {
      const choice = arg || 'auto'
      if (choice !== 'auto' && choice !== 'none' && !(HAT_NAMES as string[]).includes(choice))
        return { text: `Hats: ${HAT_NAMES.join(', ')}, or auto (by the calendar) or none.` }
      await saveSettings($, { hat: choice })
      return { text: choice === 'auto' ? 'Hats follow the calendar again.' : choice === 'none' ? 'No hat.' : `Clawd wears the ${choice} hat.` }
    }
    const hidden = word === 'on' ? false : word === 'off' ? true : !(await read($, settings)).isHidden
    await saveSettings($, { isHidden: hidden })
    return { text: hidden ? 'Clawd went to nap.' : 'Clawd is back.' }
  })

  let ticker: { cancel: () => void } | null = null
  on('turn.start', async ($, e, next) => {
    if (e.agentId) return next(e)
    info = { ...info, working: true, turnAt: await $.clock.now() }
    ctxShown = info.ctx?.tokens ?? null
    runTokens = 0
    ticker?.cancel()
    ticker = $.clock.every(5000, async () => {
      await refresh($)
      noteCtx(await $.clock.now())
    })
    return next(e)
  })

  // each model call of the main turn: add what it burned, and re-read the context so its growth floats up live
  on('turn.step', async function* ($, e, next) {
    const sentAt = e.agentId ? 0 : await $.clock.now()
    const stream = next(e)
    for await (const chunk of stream) {
      if (!e.agentId) isReplying = chunk.kind === 'text' ? true : chunk.kind === 'thinking' || chunk.kind === 'tool' ? false : isReplying
      yield chunk
    }
    const r = await stream.result
    if (!e.agentId) isReplying = false
    if (!e.agentId && r.usage) {
      afterCompact = false
      // the cache writes by lifetime: newer engines report them, older type packs do not name them yet
      const u = r.usage as typeof r.usage & { ephemeral_1h_input_tokens?: number; ephemeral_5m_input_tokens?: number }
      const ttl = cacheTtlMs
      if (u.ephemeral_1h_input_tokens) cacheTtlMs = 3_600_000
      else if (u.ephemeral_5m_input_tokens) cacheTtlMs = 300_000
      if (u.cache_creation_input_tokens || u.cache_read_input_tokens) cacheAt = sentAt
      if (cacheAt === sentAt || cacheTtlMs !== ttl) await saveCache($)
      runTokens += u.input_tokens + u.cache_creation_input_tokens + u.cache_read_input_tokens + u.output_tokens
      await refresh($)
      noteCtx(await $.clock.now())
    }
    return r
  })

  // the auto-compact row changed in /config: rescale CTX and move its tick now, not at the next turn's end
  on('config.set', async ($, e, next) => {
    const result = await next(e)
    if (/compact/i.test(e.key) && !info.working) await refresh($, true)
    return result
  })

  // /autocompact 250K writes the window without going through /config, so catch the command itself
  on('command.run', { command: 'autocompact' }, async ($, e, next) => {
    const result = await next(e)
    if (!info.working) await refresh($, true)
    return result
  })

  on('session.measure', async ($, e, next) => {
    await refresh($, e.changed.includes('context') && !info.working)
    return next(e)
  })

  on('prompt.submit', async ($, e, next) => {
    setWaiting(false)
    if (e.text.trim().startsWith('/')) return next(e)
    isTurnRunning = true
    turnStartedAt = await $.clock.now()
    turnTools = 0
    await setBase($, 'thinking', pick(VERBS))

    return next(e)
  })

  // only when a real permission dialog shows up, so bypass / auto modes stay quiet
  on('classic.PermissionRequest', async ($, e, next) => {
    if (e.permission_mode !== 'bypassPermissions') {
      setWaiting(true)
      await setBase($, 'needs', `${e.tool_name.replace(/^mcp__/, '')} wants to run`, 'permission')
    }
    return next(e)
  })

  on('tool.call', async ($, e, next) => {
    const input = e as unknown as Record<string, unknown>
    if (!e.agentId) turnTools++

    if (e.tool === 'AskUserQuestion') await setBase($, 'needs', 'Claude has a question', 'question')
    else if (e.tool === 'ExitPlanMode') await setBase($, 'needs', 'plan is ready for review', 'plan')
    else await setBase($, 'working', lineFor(e.tool, input), e.tool)
    if (e.tool === 'AskUserQuestion' || e.tool === 'ExitPlanMode') setWaiting(true)

    toolsInFlight++
    const ran = await next(e).finally(() => {
      toolsInFlight = Math.max(0, toolsInFlight - 1)
      setWaiting(false)
    })

    const now = await $.clock.now()
    const today = dateKey(localTime(now))
    await update($, toolsToday, t =>
      t.date === today ? { date: today, count: t.count + 1 } : { date: today, count: 1 },
    )
    void $.store.set(TOOLS_KEY, await read($, toolsToday))

    const command = String(input.command ?? '')
    const isTest =
      (e.tool === 'Bash' || e.tool === 'PowerShell') && TEST_CMD.test(command) && !INSTALL_CMD.test(command)
    if (ran.deny !== undefined) {
      await react($, 'oops', `${e.tool} not allowed`, 2_200)
    } else if (isTest) {
      const out = JSON.stringify(ran.result ?? '')
      const verdict = testSummary(out) ?? { isFail: ran.isError === true, summary: cut(command, 40) }
      await react($, verdict.isFail || ran.isError ? 'testsFail' : 'testsPass', verdict.summary, 3_500)
    } else if (ran.isError) {
      await react($, 'oops', `${e.tool.replace(/^mcp__/, '')} failed`, 2_200)
    }

    // with parallel tools, stay on working until the last one is back
    if (isTurnRunning && toolsInFlight === 0) await setBase($, 'thinking', pick(VERBS))
    return ran
  })

  on('session.compact', async ($, e, next) => {
    if (e.agentId) return next(e)
    await setBase($, 'compacting')
    const result = await next(e)
    if (result.messages) {
      afterCompact = true
      cacheAt = null // the compacted prompt starts a new cache
      await saveCache($)
      if (info.ctx && result.tokensAfter !== undefined) {
        const max = info.ctx.max || info.ctx.window
        info = { ...info, ctx: { ...info.ctx, tokens: result.tokensAfter, pct: Math.round((result.tokensAfter / max) * 100), cats: [] } }
      }
    }
    await refresh($, true)
    noteCtx(await $.clock.now())
    if (isTurnRunning) await setBase($, 'thinking', pick(VERBS))
    else await setBase($, 'idle')
    return result
  })

  on('turn.complete', async ($, e, next) => {
    // a subagent finishing is not the main turn finishing
    if (e.agentId) return next(e)
    isTurnRunning = false
    toolsInFlight = 0
    ticker?.cancel()
    ticker = null
    const ended = await $.clock.now()
    info = { ...info, working: false, waiting: false, endAt: ended, lastMs: e.durationMs > 0 ? e.durationMs : ended - info.turnAt }
    const u = e.usage
    lastTokens = u ? u.input_tokens + u.cache_creation_input_tokens + u.cache_read_input_tokens + u.output_tokens : null
    await refresh($, true)
    noteCtx(ended)
    if (e.isAborted || e.reason === 'aborted') {
      await setBase($, 'idle')
      return next(e)
    }
    if (e.reason === 'error' || e.reason === 'refusal') {
      await setBase($, 'idle')
      await react($, 'oops', e.reason === 'error' ? 'the turn ended with an error' : 'claude refused that one', 2_200)
      return next(e)
    }
    const ms = e.durationMs > 0 ? e.durationMs : (await $.clock.now()) - turnStartedAt
    const burned = lastTokens ? ` · ${k(lastTokens)} tok` : ''
    await setBase($, 'done', `${duration(ms)} · ${turnTools} tool${turnTools === 1 ? '' : 's'}${burned}`)
    return next(e)
  })

  // Compact: runs the /compact command, not awaited, so the hook returns at once (a compaction runs longer
  // than the 30 s a hook may hold $ for, which is how $.session.compact() from a press failed)
  on('ui.press', { plugin: 'clawd-buddy-gauges', element: 'compact' }, async ($, e) => {
    noteCompact('compacting…')
    void $.command
      .run({ command: 'compact' })
      .catch((err: unknown) => noteCompact(`compact failed: ${err instanceof Error ? err.message : String(err)}`))
    return { element: e.element }
  })

  // ⎇ opens or closes the rows; a repo in the first opens its branches, a branch switches that repo to it
  on('ui.press', { plugin: 'clawd-buddy-gauges' }, async ($, e, next) => {
    const el = e.element
    if (el !== 'branch' && el !== 'branch-back' && !el.startsWith('repo:') && !el.startsWith('branch:')) return next(e)
    const open = await read($, branchMenu)
    const show = async (menu: BranchMenu | null | undefined) => {
      if (menu === undefined) $.ui.toast('clawd-buddy-gauges: could not list the branches')
      await update($, branchMenu, () => menu ?? null)
      return { element: el }
    }
    try {
      if (el === 'branch') {
        if (open) return show(null)
        await findRepos($)
        if (!repos.length) {
          $.ui.toast('No git repo in this folder')
          return show(null)
        }
        return show(repos.length === 1 ? (await branchList($, repos[0]!, false)) ?? undefined : await folderMenu($))
      }
      if (el === 'branch-back') return show(await folderMenu($))
      if (el.startsWith('repo:')) return show((await branchList($, el.slice('repo:'.length), true)) ?? undefined)
      const name = el.slice('branch:'.length)
      if (!open?.dir || name === open.current) return show(null)
      const dir = open.dir
      const dirty = (await git($, dir, 'status', '--porcelain', '--untracked-files=no')).stdout.split('\n').filter(Boolean).length
      if (dirty) {
        $.ui.toast(`${dirty} uncommitted file${dirty === 1 ? '' : 's'}: commit or stash before switching to ${name}`)
        return { element: el }
      }
      const r = await git($, dir, 'switch', name)
      if (r.exitCode !== 0) {
        $.ui.toast(`git switch ${name} failed: ${(r.stderr.trim().split('\n').pop() ?? '').slice(0, 120)}`)
        return { element: el }
      }
      $.ui.toast(`${await repoName($, dir)} is on ${name} now`)
      return show(null)
    } catch (err) {
      $.ui.toast(`clawd-buddy-gauges: ${err instanceof Error ? err.message : String(err)}`)
      return { element: el }
    }
  })

  // a click on the pet (pet-client.tsx posts it): the next animation of the same mood, in turn, handed straight back as the next props
  on('ui.message', async ($, e, next) => {
    if (e.element !== 'pet') return next(e)
    const now = await $.clock.now()
    // a click while a reminder shows answers it, in every session, and starts its next interval
    const due = dueNudge(now)
    if (due) {
      await restartNudge($, due, now)
      $.ui.toast(`${NUDGES[due].thanks} Next one in ${minutesLabel(everyMinOf(await read($, settings), due))}.`)
    }
    const l = localTime(now)
    const hat = hatFor((await read($, settings)).hat, l)
    setSeason(hat === 'tet' || holidayHat(l.year, l.month, l.day) === 'tet' ? 'tet' : null)
    const anim = shufflePet(now) + (hat ? `+${hat}` : '')
    return { props: { anim, px: PET_H / 18 / 8 } }
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const s: Settings = { ...(await read($, settings)) } as Settings
    if (e.props.hasSurvey || s.isHidden) return next(e)
    await loadCache($)
    await syncNudges($, await $.clock.now())

    // the app only, not the terminal; read deskTick so the band redraws when onTick finds a change
    if (e.surface === 'terminal') return next(e)
    await read($, deskTick)
    // the branch rows: read always (its writes redraw the band), shown only between turns where there is a repo
    // (a menu of the old shape, from before a reload, counts as closed)
    const hasRepo = repos.length > 0
    const openMenu = await read($, branchMenu)
    const isBranchShown = hasRepo && !info.working
    const menu = isBranchShown && openMenu?.items ? openMenu : null
    const { now, scene, pet, sub } = await viewAt($)

    const { Box, Text, Button, Svg } = $.ui.resolve(e)
    // Client is the desktop app's alone: VS Code draws the pet as an Svg (SMIL plays it) and no countdown
    const { Client } = e.surface === 'desktop' ? ($.ui.resolve(e) as Elements['desktop']) : { Client: undefined }
    // the app sizes an Svg from its width prop alone (none: 300px), so the meters' width comes from the band's
    // cells (8 CSS px each) less the pet (85), what the cells overcount past the band's own edge, the Compact button and
    // its gap, and the band's right padding (48 together: the bar then ends ~32 px short of the buttons), and in a repo the ⎇ button and its
    // gap (~48; kept while a turn hides it, so the meters never jump); no inner padding.
    // No border here either (a border pads the band and shifts it): needs-you and reactions speak through the text color
    const end = cacheEnd()
    const meterW = Math.max(300, e.props.bodyColumns * 8 - 48 - PET_W - (hasRepo ? 48 : 0))
    const row = (
      <Box alignItems="center" gap={1} paddingRight={1}>
        {Svg && (
          (Client ? (
            <Client key="pet" module="./pet-client.tsx" props={{ anim: pet.anim, px: PET_H / 18 / 8 }} width={(PET_H / 18 / 8) * 24} height={PET_H / 16} />
          ) : (
            <Svg source={petSvg(pet.anim, now - pet.since)} alt={`Clawd: ${scene.main}`} width={PET_W} height={PET_H} />
          ))
        )}
        {/* minWidth 0 + overflow hidden: the column may shrink below its text, so a long step truncates instead of
            pushing the Compact button out of the band */}
        <Box flexDirection="column" flexGrow={1} flexShrink={1} minWidth={0} overflow="hidden">
          {Svg && (
            <Box key="meters" width="100%" flexGrow={1}>
              <Svg source={metersFor(now)} alt={metersText()} width={meterW} height={METER_H} isInteractive />
            </Box>
          )}
          {/* one Text, one row: a long step is cut with an ellipsis at the column's edge; the cache countdown after it
              counts in its own Client, so its seconds never redraw the band */}
          <Box key="status" alignItems="center" gap={1} minWidth={0}>
            <Box flexShrink={1} minWidth={0} overflow="hidden">
              <Text mono size="caption" color={scene.isMainDim ? LABEL : scene.color} weight={scene.isMainDim ? 'regular' : 'bold'} wrap="truncate-end">
                {scene.main}
                {sub ? (
                  <Text color={LABEL} weight="regular">
                    {` · ${e.surface === 'desktop' ? sub : sub.replace('click Clawd', `/clawd ${NUDGES[dueNudge(now) ?? 'stand'].command}`)}`}
                  </Text>
                ) : null}
              </Text>
            </Box>
            {Client && end !== null && (
              <Box key="cache" flexShrink={0}>
                <Client key="cache" module="./cache-client.tsx" props={{ endAt: end, now, color: LABEL, expiredColor: RED }} />
              </Box>
            )}
            {/* VS Code has no Client to count: it shows only the expiry, which onTick's signature redraws once */}
            {!Client && end !== null && now >= end && (
              <Box key="cache" flexShrink={0}>
                <Text mono size="caption" color={RED} weight="bold" wrap="truncate-end">
                  · cache expired · compact?
                </Text>
              </Box>
            )}
          </Box>
        </Box>
        {/* no Compact while a turn runs: /compact would only queue behind it, and the native button's hover jumped
            with every redraw the turn brings */}
        {isBranchShown && (
          <Box flexShrink={0}>
            <Button key="branch" label={BRANCH_ICON} {...(menu ? { variant: 'primary' as const } : {})} onPress={pressBranch} />
          </Box>
        )}
        {!info.working && (
          <Box flexShrink={0}>
            <Button key="compact" label="Compact" onPress={pressCompact} />
          </Box>
        )}
      </Box>
    )
    if (!menu) return row
    // the repos, or one repo's branches latest first (the current one drawn as the primary button). The desktop
    // leaves a wrapped row's rowGap out, so the rows are cut here, by each button's width as the app draws it
    // (~7.6 px a character plus 24 of chrome, measured), and stacked in a column whose gap matches the one across
    const avail = e.props.bodyColumns * 8 - 56
    const lines: (typeof menu.items)[] = [[]]
    let used = 0
    for (const it of menu.items) {
      const w = it.label.length * 7.6 + 24
      const line = lines[lines.length - 1]!
      if (line.length && used + 13 + w > avail) {
        lines.push([it])
        used = w
      } else {
        line.push(it)
        used += (line.length > 1 ? 13 : 0) + w
      }
    }
    return (
      <Box flexDirection="column" gap={1}>
        {row}
        <Box key="branches" flexDirection="column" gap="md" paddingRight={1}>
          {lines.map((line, n) => (
            <Box key={`branches-${n}`} flexWrap="wrap" gap="sm">
              {line.map(it => (it.isCurrent
                ? <Button key={it.key} label={it.label} variant="primary" onPress={pressBranch} />
                : <Button key={it.key} label={it.label} variant="secondary" onPress={pressBranch} />))}
            </Box>
          ))}
        </Box>
      </Box>
    )
  })
}
