import { expect, test } from 'claude-code/testing'
import CacheClock from '../hooks/cache-client'

test('client: counts down on its own clock', async () => {
  let state: any
  let tick: (() => void) | undefined
  const surface: any = {
    elements: { Text: (p: any) => p },
    get state() { return state },
    setState: (s: any) => { state = s },
    every: (_ms: number, fn: () => void) => { tick = fn; return () => {} },
  }
  CacheClock({ endAt: 10_000, now: 0, color: '#888', expiredColor: '#d9483b' }, surface)
  expect(state.shown).toBe('· cache 0:10')
  for (let i = 0; i < 4; i++) tick!()
  expect(state.shown).toBe('· cache 0:09')
  for (let i = 0; i < 40; i++) tick!()
  expect(state.shown).toBe('· cache expired · compact?')
})
