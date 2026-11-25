import { expect, test } from 'claude-code/testing'
import { hatFor, holidayHat } from '../hooks/calendar'
import { framesOf } from '../hooks/crew-sprites.js'

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
