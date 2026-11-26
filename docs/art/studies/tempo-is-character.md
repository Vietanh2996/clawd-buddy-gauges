# Tempo is character: Space Invaders, Kirby, Pokémon

> **Read when:** you are tempted to add frames when you should change timing. **Template:** constraint → choices → sacrificed → what reads → what to steal (not copy).


## Constraint
Very few frames per creature: Space Invaders used two per alien; Game Boy-era Pokémon walks are four beats from two drawings; Kirby's team had a sprite anyone could draw.

## Choices
- **Space Invaders** (Taito, 1978): two frames per invader, made with a custom tool; each type has a distinct silhouette (squid, crab, octopus). The famous speed-up was a hardware accident: fewer aliens means the processor draws faster, so the horde accelerates. Nishikado kept it because it made the game more exciting.
- **Kirby** (HAL, 1992): began as a placeholder blob that Sakurai kept. A later developer interview records Sakurai warning that too many frames make animation sluggish; the answer was to make the movement better, not longer.
- **Pokémon**: Gold/Silver walks reuse the idle frame twice; Gen 5 idles play a common loop several times then a rare one, always starting and ending on the rest pose, on 50 ms ticks; speed changes with status.

## What reads
Two good frames plus the right tempo are enough to look alive. A faster loop reads as urgent; a slower one as calm, sick or sleepy.

## What to steal
- **Delete the weakest frame, lengthen the rest** (Slynyrd's 8-to-4 run).
- **Tempo is a free expressive channel**: change the beat with state.
- **A limit can become the main device** (the speed-up).
- **Common and rare loops** keep a long-running creature from going stale.

## Gaps
No source I opened gives the pixel dimensions of Space Invaders aliens or the original Kirby; those are UNVERIFIED. Time Extension and CBR pages on Nishikado were not readable.

## For Clawd
He already runs on this principle (sleeping 500 ms to running 110 ms). See [timing](../foundations/timing-and-spacing.md), [idles](../foundations/idles-loops-and-aliveness.md).

## Sources

[Wikipedia: Space Invaders](https://en.wikipedia.org/wiki/Space_Invaders) · [Shmuplations: Kirby Nightmare in Dream Land interview](https://shmuplations.com/kirbynightmare/) · [Wikipedia: Kirby](https://en.wikipedia.org/wiki/Kirby_(character)) · [Niko Uusitalo: Looking at Pixels](https://www.nikouusitalo.com/blog/looking-at-pixels-part-1-characters/) · [Oripoke](https://oripoke.wordpress.com/2025/06/21/how-to-make-animated-pokemon-sprites/) · [Slynyrd Pixelblog 8](https://www.slynyrd.com/blog/2018/8/19/pixelblog-8-intro-to-animation)
