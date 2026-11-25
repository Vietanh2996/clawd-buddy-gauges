# Pac-Man and the ghosts (1980)

> **Read when:** you want to see how little a character needs to be a *someone*. **Template:** constraint → choices → sacrificed → what reads → what to steal (not copy).


## Constraint
Hardware sprites of 16x16, a maze on an 8-pixel tile grid, a limited colour set.

## Choices
- **Pac-Man** is a disc with a wedge. Iwatani said the idea came from a pizza with a slice missing; he refused to add eyes (so each player projects their own) and picked yellow because it read as neither hero nor enemy. The wedge opening and closing is the whole animation and doubles as a direction indicator.
- **Ghosts** share one silhouette and are told apart by colour and by movement rules: four different chase behaviours make four personalities out of near-identical bodies (Pittman's Dossier). Iwatani avoided angry expressions to keep them cute.
- **Frightened state**: ghosts turn blue and flash near the end; eaten ghosts shrink to just eyes heading home. Reducing a character to its eyes says "defeated".

## Sacrificed
Facial expression and individual outlines.

## What reads
A global state change (colour flip, then flash as a warning) is understood instantly. Eyes alone carry identity.

## What to steal
- **Personality can live in behaviour**, not in drawing.
- **A blank can be a choice.**
- A **warning flash** before a state ends is a cheap way to say "this is about to change" (a good pattern for a cache timer, for instance).

## Notes
Ghost pupils leaning toward their direction of travel is widely known and easy to check in an emulator, but the Dossier page I could open does **not** discuss it: treat it as UNVERIFIED in a source sense. Counts of players in Iwatani's colour survey differ between sources (50, or 40 to 0), so quote the story, not the number.

## For Clawd
A shared silhouette plus a small state vocabulary; one-pixel eye offsets for attention; a pre-warning flash. See [faces & eyes](../foundations/faces-and-eyes.md).

## Sources

[The Pac-Man Dossier (Game Developer)](https://www.gamedeveloper.com/design/the-pac-man-dossier) · [GDC 2011: Iwatani (Game Developer)](https://www.gamedeveloper.com/game-platforms/gdc-2011-i-pac-man-i-creator-iwatani-discusses-female-friendly-design-lessons) · [OPENERS: Iwatani interview](https://openers.jp/en/design/design_features/4CoXi) · [Arcade Blogger](https://arcadeblogger.com/2016/03/12/the-development-of-pacman/) · [Wikipedia: Pac-Man](https://en.wikipedia.org/wiki/Pac-Man_(character)), [Ghosts](https://en.wikipedia.org/wiki/Ghosts_(Pac-Man))
