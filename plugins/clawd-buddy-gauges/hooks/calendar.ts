// What Clawd wears on its head, from the date and the hour: a hat for a holiday, a nightcap late at night. Drawn
// in crew-sprites.js (HATS); an animation name takes it as a suffix, `idle+santa`.

export type Hat = 'tet' | 'santa' | 'party' | 'pumpkin' | 'nightcap'
export const HAT_NAMES: Hat[] = ['tet', 'santa', 'party', 'pumpkin', 'nightcap']

// Tết (the lunar new year): the first day of the first month, solar dates
const TET: Record<number, [number, number]> = {
  2026: [2, 17], 2027: [2, 6], 2028: [1, 26], 2029: [2, 13], 2030: [2, 3],
  2031: [1, 23], 2032: [2, 11], 2033: [1, 31], 2034: [2, 19], 2035: [2, 8],
}

const dayNo = (year: number, month: number, day: number) => Date.UTC(year, month - 1, day) / 86_400_000

export const isNight = (hour: number) => hour >= 23 || hour < 5

// the holiday's hat, or null: Tết from three days before to four after, Christmas week, New Year's Eve and Day,
// Halloween's last week
export function holidayHat(year: number, month: number, day: number): Hat | null {
  const today = dayNo(year, month, day)
  for (const y of [year, year + 1]) {
    const tet = TET[y]
    if (tet && today - dayNo(y, tet[0], tet[1]) >= -3 && today - dayNo(y, tet[0], tet[1]) <= 4) return 'tet'
  }
  if (month === 12 && day >= 20 && day <= 26) return 'santa'
  if ((month === 12 && day === 31) || (month === 1 && day === 1)) return 'party'
  if (month === 10 && day >= 25) return 'pumpkin'
  return null
}

// `auto` follows the calendar and the clock, `none` takes it off, a hat's name keeps that hat on
export function hatFor(choice: string | undefined, l: { year: number; month: number; day: number; hour: number }): Hat | null {
  if (choice === 'none') return null
  if (choice && (HAT_NAMES as string[]).includes(choice)) return choice as Hat
  return holidayHat(l.year, l.month, l.day) ?? (isNight(l.hour) ? 'nightcap' : null)
}
