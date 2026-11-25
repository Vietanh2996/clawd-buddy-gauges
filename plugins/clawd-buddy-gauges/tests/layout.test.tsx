import { expect, test } from 'claude-code/testing'
import { metersSvg } from '../hooks/meters'

test('desktop: pet, meters with the status line, and a Compact button', async ($, on) => {
  on('clock.now', () => ({ value: 1_763_550_000_000 }))
  const ui = await $.ui.mount({ plugin: 'clawd-buddy-gauges', surface: 'desktop', component: 'AbovePrompt', props: { bodyColumns: 120, maxRows: 20 } })
  expect(await ui.findAll({ type: 'Svg' })).toHaveLength(1) // the meters row
  expect(await ui.find({ type: 'Client', key: 'pet' })).toBeDefined() // the pet, clickable
  expect(await ui.find({ key: 'compact' })).toBeDefined()
  await ui.unmount()
})

test('desktop: pressing Compact runs /compact', async ($, on) => {
  on('clock.now', () => ({ value: 1_763_550_000_000 }))
  const sent: string[] = []
  on('command.run', { command: 'compact' }, (_$, e) => {
    sent.push(e.command)
    return { text: '' } as never
  })
  const ui = await $.ui.mount({ plugin: 'clawd-buddy-gauges', surface: 'desktop', component: 'AbovePrompt', props: { bodyColumns: 120, maxRows: 20 } })
  await ui.press({ key: 'compact' })
  await new Promise(r => setTimeout(r, 50))
  await ui.unmount()
  const again = await $.ui.mount({ plugin: 'clawd-buddy-gauges', surface: 'desktop', component: 'AbovePrompt', props: { bodyColumns: 120, maxRows: 20 } })
  expect(await again.find({ type: 'Text', text: /compact failed/ })).toBeUndefined()
  await again.unmount()
  expect(sent).toEqual(['compact'])
})

test('desktop: clicking the pet shows another animation', async ($, on) => {
  on('clock.now', () => ({ value: 1_763_550_000_000 }))
  const ui = await $.ui.mount({ plugin: 'clawd-buddy-gauges', surface: 'desktop', component: 'AbovePrompt', props: { bodyColumns: 120, maxRows: 20 } })
  const before = ((await ui.find({ type: 'Client', key: 'pet' })) as { props: { props: { anim: string } } }).props.props.anim
  await ui.pointer({ in: 'pet', type: 'down', x: 2, y: 1, button: 'left' })
  await new Promise(r => setTimeout(r, 50))
  await ui.unmount()
  const again = await $.ui.mount({ plugin: 'clawd-buddy-gauges', surface: 'desktop', component: 'AbovePrompt', props: { bodyColumns: 120, maxRows: 20 } })
  const after = ((await again.find({ type: 'Client', key: 'pet' })) as { props: { props: { anim: string } } }).props.props.anim
  await again.unmount()
  expect(after).not.toBe(before)
})

test('meters: a limit that dropped floats its −% in orange', async () => {
  const now = 1_763_550_000_000
  const base = { ctx: null, burn: null, working: false, waiting: false, nudge: null, turnAt: 0, endAt: null, lastMs: null, flash: null }
  const limits = [{ kind: 'five_hour', pct: 40 }, { kind: 'seven_day', pct: 20 }]
  const svg = metersSvg(28, now, { ...base, limits, limitFlash: { five_hour: { text: '−3%', at: now - 500 } } })
  expect(svg).toContain('fill="#d97757" opacity="0" pointer-events="none">−3%')
  expect(metersSvg(28, now + 5_000, { ...base, limits, limitFlash: { five_hour: { text: '−3%', at: now - 500 } } })).not.toContain('−3%')
})

test('desktop: ⎇ lists the folder repos, then a repo branches; refuses a switch over uncommitted files', async ($, on) => {
  on('clock.now', () => ({ value: 1_763_550_000_000 }))
  let dirty = ' M a.ts\n'
  const ran: string[] = []
  on('process.run', (_$, e) => {
    const out = (stdout: string, exitCode = 0) => ({ value: { exitCode, stdout, stderr: '' } }) as never
    if (e.argv[0] === 'find') return out('./.git\n./apps/web/.git\n')
    const [, , dir, ...rest] = e.argv
    const a = `${dir}: ${rest.join(' ')}`
    ran.push(a)
    if (rest[0] === 'rev-parse') return out('true\n')
    if (rest[0] === 'branch' && rest[1]?.startsWith('--sort')) return out(dir === '.' ? 'main\n' : 'dev\nfeat/x\n')
    if (rest.join(' ') === 'branch --show-current') return out(dir === '.' ? 'main\n' : 'dev\n')
    if (rest[0] === 'status') return out(dirty)
    if (rest.join(' ') === 'switch feat/x') return out('')
    return out('', 1)
  })
  on('session.cwd', () => ({ value: '/Users/x/shop' }) as never)
  on('command.register', () => ({ value: undefined }) as never)
  on('session.start', () => ({ cwd: '/tmp' }) as never)
  on('store.get', () => ({ value: undefined }) as never)
  on('clock.every', () => ({ value: undefined }) as never)
  const toasts: string[] = []
  on('ui.toast', (_$, e) => {
    toasts.push(String((e as { text?: string }).text ?? e))
    return { value: undefined } as never
  })
  await ($.session as unknown as { start: (a: unknown) => Promise<unknown> }).start({ cwd: '/tmp' })
  const ui = await $.ui.mount({ plugin: 'clawd-buddy-gauges', surface: 'desktop', component: 'AbovePrompt', props: { bodyColumns: 120, maxRows: 20 } })
  await ui.press({ key: 'branch' })
  expect(toasts).toEqual([])
  expect(['repo:.', !!(await ui.find({ key: 'repo:.' }))]).toEqual(['repo:.', true])
  expect(['repo:apps/web', !!(await ui.find({ key: 'repo:apps/web' }))]).toEqual(['repo:apps/web', true])
  await ui.press({ key: 'repo:apps/web' })
  expect(['branch:dev', !!(await ui.find({ key: 'branch:dev' }))]).toEqual(['branch:dev', true])
  expect(['branch-back', !!(await ui.find({ key: 'branch-back' }))]).toEqual(['branch-back', true])
  await ui.press({ key: 'branch:feat/x' })
  expect(ran).not.toContain('apps/web: switch feat/x')
  dirty = ''
  await ui.press({ key: 'branch:feat/x' })
  expect(ran).toContain('apps/web: switch feat/x')
  expect(await ui.find({ key: 'branch:dev' })).toBeUndefined()
  await ui.unmount()
})
