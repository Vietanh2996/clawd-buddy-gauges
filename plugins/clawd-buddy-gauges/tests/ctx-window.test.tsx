import { expect, test } from 'claude-code/testing'
// the auto-compact window changed in /config: CTX's scale follows at once
test('desktop: CTX rescales when the auto-compact window changes', async ($, on) => {
  let max = 250_000
  on('clock.now', () => ({ value: 1_763_550_000_000 }))
  on('session.usage', (_$, e: any) => ({
    value: {
      context: {
        tokens: 100_000, percent: 10, window: 1_000_000,
        ...(e?.breakdown ? { breakdown: { percentage: Math.round(100_000 / max * 100), totalTokens: 100_000, rawMaxTokens: max, categories: [], isAutoCompactEnabled: true, autoCompactThreshold: max - 20_000 } } : {}),
      },
      rateLimits: [],
    },
  }) as never)
  on('config.set', (_$, e: any) => ({ value: e.value }) as never)
  const title = async () => {
    const ui = await $.ui.mount({ plugin: 'clawd-buddy-gauges', surface: 'desktop', component: 'AbovePrompt', props: { bodyColumns: 120, maxRows: 20 } })
    const svg: any = await ui.find({ type: 'Svg' })
    const src = String(svg?.props?.source ?? svg?.source ?? '')
    await ui.unmount()
    return src
  }
  await $.config.set({ key: 'autoCompact', value: true } as never)
  expect(await title()).toContain('of 250k')
  max = 350_000
  await $.config.set({ key: 'theme', value: 'dark' } as never) // another row: no re-measure
  expect(await title()).toContain('of 250k')
  await $.config.set({ key: 'autoCompact', value: true } as never)
  expect(await title()).toContain('of 350k')
})

// /autocompact 250K sets the window as a command, not a /config row
test('desktop: CTX rescales after /autocompact', async ($, on) => {
  let max = 250_000
  on('clock.now', () => ({ value: 1_763_550_000_000 }))
  on('session.usage', (_$, e: any) => ({
    value: {
      context: {
        tokens: 100_000, percent: 10, window: 1_000_000,
        ...(e?.breakdown ? { breakdown: { percentage: 40, totalTokens: 100_000, rawMaxTokens: max, categories: [], isAutoCompactEnabled: true, autoCompactThreshold: max - 20_000 } } : {}),
      },
      rateLimits: [],
    },
  }) as never)
  on('config.set', (_$, e: any) => ({ value: e.value }) as never)
  on('command.run', (_$, e: any) => { if (e.command === 'autocompact') max = 350_000; return { text: 'ok' } } )
  const title = async () => {
    const ui = await $.ui.mount({ plugin: 'clawd-buddy-gauges', surface: 'desktop', component: 'AbovePrompt', props: { bodyColumns: 120, maxRows: 20 } })
    const svg: any = await ui.find({ type: 'Svg' })
    const src = String(svg?.props?.source ?? svg?.source ?? '')
    await ui.unmount()
    return src
  }
  await $.config.set({ key: 'autoCompact', value: true } as never)
  expect(await title()).toContain('of 250k')
  await $.command.run({ command: 'autocompact', args: '350K' } as never)
  expect(await title()).toContain('of 350k')
})
