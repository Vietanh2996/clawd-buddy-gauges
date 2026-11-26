# Tamagotchi and Pokémon party icons

> **Read when:** you want a creature to feel alive in two frames, or want a polite way to ask for attention. **Template:** constraint → choices → sacrificed → what reads → what to steal (not copy).


## Constraint
Tamagotchi: a monochrome 32x16 dot matrix plus 8 fixed icons, three buttons, a piezo (from emulator READMEs; Wikipedia's "8-bit grayscale" claim conflicts and is likely wrong for gen 1). Pokémon party icons: two frames each.

## Choices
- Characters first drawn in a deliberately rough "heta-uma" style, then converted to pixels (Wikipedia). Fan research: non-baby characters animate in a 16x16 block, share about six idle patterns, eating uses 4-6 frames.
- **The attention call**: one icon plus a beep, with a roughly 15-minute window before a "care mistake" (fan guides). Some states (sickness, droppings) don't call; you have to look.
- Aki Maita tested prototypes with about 200 high-school girls in Shibuya over several weeks (Asiaweek 1997). No source I found describes her pixel-level choices.
- Pokémon icons: a two-frame bob at one tempo, with tempo and amplitude lower when hurt (Bulbapedia snippets only; the pages were blocked, UNVERIFIED in detail).

## Sacrificed
Animation volume, subtlety, and in Tamagotchi the pet can die.

## What reads
Distinct poses for needs; a dedicated icon channel; a tempo that tells you the creature's condition.

## What to steal
- **Tempo and amplitude carry state.** The same two frames played slower or smaller mean "tired".
- **A separate, tiny attention channel** (an icon) beats a bigger animation.
- **Need with a deadline, then settle.** An ignored call becomes a record, not an endless shout.
- **Test with real people over time**, not only pixel theory.

## For Clawd
Idle tempo as mood; stand-up and water reminders as consented attention calls. See [companion presence](../foundations/companion-presence.md) and [timing](../foundations/timing-and-spacing.md).

## Sources

[TamaVault gen 1 care guide](https://tamavault.com/devices/original-gen1/care-and-discipline/) · [mimitchi: Aki Maita (Asiaweek 1997)](https://www.mimitchi.com/html/aki.htm) · [TamaLIB](https://github.com/jcrona/tamalib/) · [Wikipedia: Tamagotchi](https://en.wikipedia.org/wiki/Tamagotchi) · [Tamagotchi sprite Q&A (fan)](https://www.tumblr.com/osumesu21/688600279315316736/hey-do-you-know-if-in-the-original-tamagotchi) · [Game Developer: Fun Pain](https://www.gamedeveloper.com/design/tamagotchi-farmville-and-quot-fun-pain-quot-) · Bulbapedia (blocked; snippets only)
