import { expect, test } from 'claude-code/testing'
import { hatFor, holidayHat } from '../hooks/calendar'
import { VARIANTS, framesOf } from '../hooks/crew-sprites.js'
import { CLAWD_SHORTCUTS, clawdSuggestions } from '../hooks/register'
import { ARCHIVED, petAnim, setSeason, shufflePet } from '../hooks/crew-pet'

const at = (y: number, m: number, d: number, hour = 12) => ({ year: y, month: m, day: d, hour })

test('calendar: holidays and the night pick the hat', () => {
  expect(holidayHat(2027, 2, 3)).toBe('tet') // three days before Tết 2027 (6 Feb)
  expect(holidayHat(2027, 2, 10)).toBe('tet') // four after
  expect(holidayHat(2027, 2, 11)).toBeNull()
  expect(holidayHat(2028, 1, 23)).toBe('tet') // Tết 2028 is 26 Jan
  expect(holidayHat(2026, 12, 24)).toBe('santa')
  expect(holidayHat(2026, 12, 31)).toBe('party')
  expect(holidayHat(2027, 1, 1)).toBe('party')
  expect(holidayHat(2026, 10, 31)).toBe('pumpkin')
  expect(holidayHat(2026, 11, 25)).toBeNull()
  expect(hatFor('auto', at(2026, 11, 25, 23))).toBe('nightcap')
  expect(hatFor(undefined, at(2026, 11, 25, 12))).toBeNull()
  expect(hatFor('auto', at(2026, 12, 24, 23))).toBe('santa') // the holiday beats the nightcap
  expect(hatFor('none', at(2026, 12, 24))).toBeNull()
  expect(hatFor('pumpkin', at(2026, 5, 5))).toBe('pumpkin')
})

test('sprites: a hat draws over the animation, and some looks wear none', () => {
  const plain = framesOf('idle').frames[0]
  const santa = framesOf('idle+santa').frames[0]
  expect(santa).not.toEqual(plain)
  expect(framesOf('idle.stretch').frames.length).toBeGreaterThan(10)
  expect(framesOf('thinking.wizard+santa').frames[0]).toEqual(framesOf('thinking.wizard').frames[0])
})

const NOW = 1_763_550_000_000
const mount = ($: any) => $.ui.mount({ plugin: 'clawd-buddy-gauges', surface: 'desktop', component: 'AbovePrompt', props: { bodyColumns: 120, maxRows: 20 } })

test('desktop: the stand-up reminder shows when due, and a click on Clawd answers it for every session', async ($, on) => {
  on('clock.now', () => ({ value: NOW }))
  const store: Record<string, unknown> = { stand: { next: NOW - 60_000 } }
  on('store.get', (_$, e: any) => ({ value: store[e.key] }) as never)
  on('store.set', (_$, e: any) => {
    store[e.key] = e.value
    return { value: undefined } as never
  })
  const ui = await mount($)
  expect(await ui.find({ type: 'Text', text: 'Stand up!' })).toBeDefined()
  expect(await ui.find({ type: 'Text', text: /1h at the desk · click Clawd when done/ })).toBeDefined()
  await ui.pointer({ in: 'pet', type: 'down', x: 2, y: 1, button: 'left' })
  await new Promise(r => setTimeout(r, 50))
  await ui.unmount()
  expect(store.stand).toEqual({ next: NOW + 3_600_000 })
  const again = await mount($)
  expect(await again.find({ type: 'Text', text: 'Stand up!' })).toBeUndefined()
  await again.unmount()
})

test('desktop: not due yet, no reminder', async ($, on) => {
  on('clock.now', () => ({ value: NOW }))
  on('store.get', (_$, e: any) => ({ value: e.key === 'stand' ? { next: NOW + 600_000 } : undefined }) as never)
  const ui = await mount($)
  expect(await ui.find({ type: 'Text', text: 'Stand up!' })).toBeUndefined()
  await ui.unmount()
})

test('desktop: drink water when due; with both due, standing up comes first, then water', async ($, on) => {
  on('clock.now', () => ({ value: NOW }))
  const store: Record<string, unknown> = { stand: { next: NOW - 60_000 }, water: { next: NOW - 30_000 } }
  on('store.get', (_$, e: any) => ({ value: store[e.key] }) as never)
  on('store.set', (_$, e: any) => {
    store[e.key] = e.value
    return { value: undefined } as never
  })
  const ui = await mount($)
  expect(await ui.find({ type: 'Text', text: 'Stand up!' })).toBeDefined()
  await ui.pointer({ in: 'pet', type: 'down', x: 2, y: 1, button: 'left' })
  await new Promise(r => setTimeout(r, 50))
  await ui.unmount()
  const again = await mount($)
  expect(await again.find({ type: 'Text', text: 'Drink water!' })).toBeDefined()
  expect(await again.find({ type: 'Text', text: /45m since the last sip · click Clawd when done/ })).toBeDefined()
  await again.pointer({ in: 'pet', type: 'down', x: 2, y: 1, button: 'left' })
  await new Promise(r => setTimeout(r, 50))
  await again.unmount()
  expect(store.water).toEqual({ next: NOW + 45 * 60_000 })
  const third = await mount($)
  expect(await third.find({ type: 'Text', text: 'Drink water!' })).toBeUndefined()
  await third.unmount()
})

test('sprites: the water look drinks the glass down', () => {
  const { frames } = framesOf('idle.drink')
  expect(frames.length).toBeGreaterThan(20)
  expect(frames[0]).not.toEqual(frames[frames.length - 5])
})

test('sprites: the new physical activities are registered and render valid frames', () => {
  const specs: Array<[keyof typeof VARIANTS, string, number]> = [
    ['idle', 'idle.hoops', 26],
    ['idle', 'idle.fishing', 20],
    ['idle', 'idle.kickflip', 23],
    ['idle', 'idle.real-crab', 22],
    ['idle', 'idle.claw-machine', 24],
    ['idle', 'idle.boxing', 27],
    ['thinking', 'thinking.cooking', 24],
    ['running', 'running.gatling', 12],
    ['running', 'running.bazooka', 19],
    ['responding', 'responding.sax', 24],
    ['browsing', 'browsing.dino', 23],
    ['done', 'done.katana', 20],
    ['error', 'error.flamethrower', 20],
    ['sleeping', 'sleeping.snot-bubble', 20],
    ['compacting', 'compacting.suitcase', 18],
  ]
  for (const [mood, anim, count] of specs) {
    expect(VARIANTS[mood].some(([id]) => id === anim)).toBe(true)
    const { frames } = framesOf(anim)
    expect(frames.length).toBe(count)
    expect(frames[0]).not.toEqual(frames[Math.floor(count / 2)])
  }
  expect(framesOf('sleeping.snot-bubble+nightcap').frames[0]).not.toEqual(framesOf('sleeping.snot-bubble').frames[0])
})

// out of usage: the band says when the limit resets (keep this test last of the desktop ones: the limits it reads stay)
test('desktop: a used-up limit turns the band red with when it resets', async ($, on) => {
  on('clock.now', () => ({ value: NOW }))
  on('session.usage', () => ({
    value: {
      context: { tokens: 10_000, percent: 5, window: 200_000 },
      rateLimits: [{ kind: 'five_hour', percentUsed: 100, resetsAt: new Date(NOW + 80 * 60_000).toISOString() }],
    },
  }) as never)
  on('config.set', (_$, e: any) => ({ value: e.value }) as never)
  await $.config.set({ key: 'autoCompact', value: true } as never) // re-reads the usage
  const ui = await mount($)
  expect(await ui.find({ type: 'Text', text: 'Out of usage' })).toBeDefined()
  expect(await ui.find({ type: 'Text', text: /5-hour limit resets in 1h 20m/ })).toBeDefined()
  await ui.unmount()
})

test('pet: a click never cycles to the stretch or the drink, kept for their moments, nor to an archived look', () => {
  const seen = new Set<string>()
  let t = 0
  for (const mood of ['idle', 'thinking', 'running'] as const) {
    t += 10_000 // past the 2 s a shown look holds
    petAnim(mood, t)
    for (let i = 0; i < 30; i++) seen.add(shufflePet(t + i))
  }
  for (const anim of ['idle.stretch', 'idle.drink', ...ARCHIVED]) expect([anim, seen.has(anim)]).toEqual([anim, false])
  expect(seen.has('thinking.power')).toBe(true)
  expect(seen.has('idle.peach')).toBe(false)
})

test('pet: the peach-branch photo only comes up over Tết', () => {
  setSeason('tet')
  const t = 1_000_000 // well past what the test before left showing
  petAnim('idle', t)
  const seen = new Set<string>()
  for (let i = 0; i < 30; i++) seen.add(shufflePet(t + i))
  setSeason(null)
  expect(seen.has('idle.peach')).toBe(true)
})

test('typeahead: /clawd offers its full forms, then the words that can come next', () => {
  const full = clawdSuggestions('/cla', '/cla', 0)
  expect(full.map(r => r.text)).toContain('/clawd hat tet')
  expect(clawdSuggestions('/clawd h', 'h', 7).map(r => r.text)).toEqual(['hat'])
  expect(clawdSuggestions('/clawd hat p', 'p', 11).map(r => r.text)).toEqual(['party', 'pumpkin'])
  expect(clawdSuggestions('/clawd water o', 'o', 13)).toEqual([{ text: 'off', description: 'no water reminder' }])
  expect(clawdSuggestions('hello', 'hello', 0)).toEqual([])
})

test('shortcuts: every /clawd form is a command of its own', () => {
  const names = CLAWD_SHORTCUTS.map(c => c.name)
  expect(names).toContain('clawd-hat-tet')
  expect(names).toContain('clawd-remind')
  expect(names).toContain('clawd-water-off')
  expect(names).not.toContain('clawd-remind-60')
})

test('shortcuts: /clawd-hat-santa does what /clawd hat santa does', async ($, on) => {
  on('clock.now', () => ({ value: NOW }))
  on('store.set', () => ({ value: undefined }) as never)
  const out: any = await $.command.run({ command: 'clawd-hat-santa', args: '' } as never)
  expect(out?.text).toBe('Clawd wears the santa hat.')
  const back: any = await $.command.run({ command: 'clawd-hat-auto', args: '' } as never)
  expect(back?.text).toBe('Hats follow the calendar again.')
})

test('settings: a change another session saved shows up here', async ($, on) => {
  on('clock.now', () => ({ value: NOW }))
  on('store.set', () => ({ value: undefined }) as never)
  on('store.get', () => ({ value: { isHidden: true } }) as never)
  // plain /clawd toggles, so having picked up "hidden" it brings Clawd back
  const out: any = await $.command.run({ command: 'clawd', args: '' } as never)
  expect(out?.text).toBe('Clawd is back.')
})

test('compact: /compact plays the compacting look and hands the command on', async ($, on) => {
  on('clock.now', () => ({ value: NOW }))
  on('store.set', () => ({ value: undefined }) as never)
  let ran = false
  on('command.run', () => { ran = true; return { text: 'Compacted' } as never })
  const out: any = await $.command.run({ command: 'compact', args: '' } as never)
  expect(ran).toBe(true)
  expect(out?.text).toBe('Compacted')
})
