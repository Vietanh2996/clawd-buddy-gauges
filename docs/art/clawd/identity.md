# Clawd's identity

> **Read when:** you need to know what is "Clawd" and what is decoration, before adding or changing a look. **Related:** [character & appeal](../foundations/character-and-appeal.md) · [engine & conventions](engine-and-conventions.md)

This page describes Clawd *as observed*, to give you something to push against. Whoever owns the character can overrule any line.

## Where Clawd comes from

- Clawd is the crab-like orange mascot associated with Claude Code. Anthropic publishes very little official description of him; most of what's written down comes from community write-ups (e.g. a note.com article titled roughly "the crab created by Anthropic but left unexplained by Anthropic"), which mention an orange pixel crab built from stacked squares, two dark eyes, side claws, stubby legs, a name that plays on Claude + claw, and ambiguity of species (crab, octopus, robot, blob) as part of the charm. **UNVERIFIED** details: treat as folklore.
- Our artwork descends from [clawd-crew](https://github.com/hudcolighting/clawd-crew) (GPL-3.0-or-later): the first three looks per mood are its drawings, the rest (about twenty looks, the hats, the stand-up and water looks) were drawn here from the same parts. See [NOTICE.md](../../../NOTICE.md). The engine's own comment says the proportions follow the CLI's logo, whose quadrant-block pixels are twice as tall as wide: a 12x8 body, 1x2 eyes, 2x2 arms halfway down, four 1x2 legs.
- Clawd is Anthropic's character and this project is a third-party mod. Keep that in mind when you invent: stay recognisably *this* crab, and don't present new art as official.

## The constants (what you can see in every frame)

| Constant | Value in the engine | Why it matters |
|---|---|---|
| Body | one warm orange `#D97757`, a 12x8 block, no outline | identity colour and mass |
| Face | two dark eyes (`#1C1B1A`), default 1x2, **no mouth, no brows** | expression lives in eye shape, position and timing |
| Claws | two 2x2 side stubs (the code calls them "arms") that can go rest / mid / up / down | the verbs |
| Legs | four 1x2 stubs with 1 px gaps | grounding; they tuck, walk, vanish |
| Construction | rectangles only, no curves | a limit that became a look |
| Stage | a dark tile with a faint floor line | the band's background |

Variable things: pose, eyes, one prop, tempo, a hat, a tint (error moods tint the whole body to a darker shade).

## A draft of his personality (to argue with)

> A small, diligent, slightly deadpan crab who works hard, gets visibly pleased when it goes well, gets sheepish rather than hurt when it doesn't, and has a wicked sense of humour about himself when nobody's asking anything of him.

Evidence in the catalogue: coffee, humming, scuttling sideways, stretching, napping with a blanket (idle and sleeping); a hat for each holiday; a deadpan stare while a thought cloud does the talking; a few cheeky looks (a raspberry, a wiggling turn-away, a flex). Notice that **personality shows up in idle and failure states**, where the user is calm or already looking (see [companion presence](../foundations/companion-presence.md)).

## Questions that keep him himself (not a gate)

- Cover the prop and the hat: is it still him?
- Is the face still mouthless (apart from event-only accents like a yawn)?
- Does it ask for attention only when something needs the user?
- Are we using the crab's own nature (sideways walk, claws, shell) or just hanging props on a rectangle?

If the answer to one is "no" and the result is wonderful, that's a design decision worth recording, not a defect.
