import { expect, test } from 'claude-code/testing'
test('vscode: pet as an Svg, meters, Compact, no Client', async ($, on) => {
  on('clock.now', () => ({ value: 1_763_550_000_000 }))
  const ui = await $.ui.mount({ plugin: 'clawd-buddy-gauges', surface: 'vscode', component: 'AbovePrompt', props: { bodyColumns: 100, maxRows: 20 } })
  const svgs = await ui.findAll({ type: 'Svg' })
  console.log('ALTS ' + JSON.stringify(svgs.map((s: any) => String(s.props?.alt ?? s.alt ?? '').slice(0, 30))))
  expect(svgs).toHaveLength(2)
  expect(await ui.find({ key: 'compact' })).toBeDefined()
  expect(await ui.find({ type: 'Client' })).toBeUndefined()
  await ui.unmount()
})
