import { expect, test } from 'claude-code/testing'
// a reload empties the module: the band reads the mark back from the store, per session
test('desktop: the cache countdown survives a reload', async ($, on) => {
  const NOW = 1_763_550_000_000
  on('clock.now', () => ({ value: NOW }))
  on('store.get', (_$, e: any) => ({ value: e.key === 'cache' ? { 's-1': { at: NOW - 60_000, ttl: 300_000 } } : undefined }) as never)
  on('session.id', () => ({ value: 's-1' }) as never)
  const ui = await $.ui.mount({ plugin: 'clawd-buddy-gauges', surface: 'desktop', component: 'AbovePrompt', props: { bodyColumns: 120, maxRows: 20 } })
  expect(await ui.find({ type: 'Client', key: 'cache' })).toBeDefined()
  await ui.unmount()
})
test("desktop: another session's mark is not this one's", async ($, on) => {
  const NOW = 1_763_550_000_000
  on('clock.now', () => ({ value: NOW }))
  on('store.get', (_$, e: any) => ({ value: e.key === 'cache' ? { 's-1': { at: NOW - 60_000, ttl: 300_000 } } : undefined }) as never)
  on('session.id', () => ({ value: 's-2' }) as never)
  const ui = await $.ui.mount({ plugin: 'clawd-buddy-gauges', surface: 'desktop', component: 'AbovePrompt', props: { bodyColumns: 120, maxRows: 20 } })
  expect(await ui.find({ type: 'Client', key: 'cache' })).toBeUndefined()
  await ui.unmount()
})
