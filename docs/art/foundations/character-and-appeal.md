# Character and appeal

> **Read when:** deciding what Clawd *is* (and isn't), what makes a blob lovable, or whether a new idea is "in character". **Related:** [faces & eyes](faces-and-eyes.md) · [body language & props](body-language-and-props.md) · [clawd/identity](../clawd/identity.md) · [studies/constraints-as-character](../studies/constraints-as-character.md)

*A lens, not a law: everything below is a default with a reason. Break it on purpose when you have a better idea, and say why.*

## The question

*Why do we care about this little thing, and what would make us stop?*

## Why it works

**Proportion does most of the work, and tiny sprites force it.** The smaller the sprite, the bigger the head must be, because the face needs a minimum number of pixels. Rough figures from guide sources: at 8x8 about 1-1.5 heads tall; 16x16 about 2-3; 32x32 about 3-4 (Pixnote); at 16 px the head is about 40-50% of height (Spritegen). Pixeli's "cute levers" (use three or more): head 40-60% of height, no neck, eyes below the midline of the head, a short torso, fewer than four heads, short tapering limbs. This lines up with Konrad Lorenz's *baby schema* (large head, big low-set eyes, small features, short limbs), so the practical constraint produces appeal for free.

**What the science says, and how far to trust it.**
- Glocker et al. (2009) digitally manipulated infant faces and found that more baby-schema features raised both cuteness ratings and the wish to care for the infant; a 2013 PLOS ONE study found cuteness-adaptation transferring between puppy and infant faces, suggesting a shared mechanism across species. Both are small studies with caveats the authors state. The 2024 Royal Society review questioning how well-defined baby schema is as a biological concept could not be read here, so treat it as a *design heuristic*, not settled biology.
- Hiroshi Nittono's work on **kawaii** adds that cuteness is a *nurturing motivation* that also depends on culture (preferences for smallness, softness, imperfection), so baby schema is one trigger among many. His 2012 experiments report that looking at cute images preceded more careful, detail-focused behaviour; a small sample. A cute presence in a tool *might* calm rather than distract. Speculative for status UIs.
- A 2025/26 PLOS ONE paper on objects found baby schema dominant for cuteness, with being touched adding a small effect; stimuli were still photos, so animation is an extrapolation.

**Personality is a default posture plus a repeated activity.** Rilakkuma is a bear who relaxes; the design (sloppy posture, calm palette, a back zipper) embodies a *feeling* rather than a feature. Pac-Man's ghosts share one silhouette but their movement rules give four distinct characters. Tamagotchi shares roughly six idle patterns across its whole cast (fan-sourced); personality is a thin layer over a shared skeleton. So a character is *what it does when nothing is happening*.

**Constraints are identity.** Mario's cap and moustache, Kirby's ball, Pac-Man's pastel ghosts on black, and Clawd's squares-only construction all began as limits and became the look. Name your limit and lean into it (see [constraints as character](../studies/constraints-as-character.md)).

**Leaving something out is a choice that invites the viewer in.** Kirby is deliberately neutral so players project onto him, and his eye spacing is held constant when the body squashes. A design that leaves a blank rewards the viewer's imagination (Pac-Man, Hello Kitty, Clawd's mouthless face) but isn't enough alone.

## Look at it

Clawd, as the engine and the repo document him:

- A wide blocky body (12x8) with side claws, four short legs, two dark eyes, **no neck, no mouth, no brows**. The engine's comments say the proportions follow the CLI's own logo (`▐▛███▜▌`).
- One warm orange (`#D97757`). The sprite is almost entirely one hue; accents live on props.
- The same body is reused for **every** mood; moods differ by pose, eyes and one prop (hat, cloud, laptop, book, mug).
- Rectangles throughout, with no curves. Community write-ups call the squares-only look part of the identity; Anthropic itself documents almost nothing about Clawd (see [identity](../clawd/identity.md)).

Against the baby-schema checklist Clawd scores high on: huge head-body, no neck, no mouth, stubby legs, short arms, wide-set eyes. It scores lower on: eyes sit above the midline; the body is a hard rectangle (soft = kind, but squares = sturdy and dependable, which suits a coding tool). The result isn't "baby" but "diligent small robot-crab": cute through proportion and behaviour, dependable through shape.

## In practice

1. **State the character in a sentence before drawing** (see [gag garden](../clawd/gag-garden.md) for a draft). "Relaxed but diligent" is a Rilakkuma energy plus a work ethic. If a new animation doesn't fit the sentence, either the sentence or the animation is wrong.
2. **Vary one part per state; keep the rest.** Identity constants for Clawd: body colour, body proportions, eye spacing, no mouth. Keep them across *every* new look (hats and props sit on top, like Mario's cap).
3. **Shape language is a dial.** Circles friendly, squares sturdy, triangles aggressive (widely repeated, weakly sourced; treat as heuristic). Claws are the only pointed/pinchy element, so they're where "action" or "threat" is dialled up or down.
4. **Use imperfection.** Wobble, stubby legs, a clumsy hop are cute triggers in their own right (Nittono). A perfect, metronomic loop is less endearing than a slightly human one.
5. **Don't let the face demand politeness you can't deliver.** Reeves and Nass's "media equation": people treat media as social partners. Give software a face and you get judged like a colleague. A character with no mouth sets lower social expectations than one that speaks (my inference); see [companion presence](companion-presence.md).
6. **A unifying hand across a roster.** Pokémon's creatures were redrawn by Ken Sugimori to feel like one world; Clawd's ~70 looks are in the same position. New looks should be checkable against the body, eye and palette constants.

## Tensions

- **Neutral vs expressive.** A blank face invites projection; a status mascot needs legibility. Clawd resolves this with a neutral face and expressive posture/props.
- **Cute vs competent.** Cute things can read as unserious. Clawd's boxy, upright stance and work-themed props (laptop, hammer, desk) lean competent; the joke-states (yawn, dance, flex) lean charming. Balance matters.
- **Roster vs identity.** Seventy looks risk diluting the character. The test: cover the prop. Is it still Clawd?

## Ask yourself

- If I cover the prop and hat, is this still unmistakably Clawd?
- What does this animation say about what Clawd *wants*?
- Which constant did I just break, and was it for a reason?
- Is the cuteness coming from proportion and behaviour, or am I decorating?

## Sources

[Pixeli 30 Proportions](https://pixeli.pebbly.space/knowledge/rules/30-proportions-by-size) and [36 Character design](https://pixeli.pebbly.space/knowledge/rules/36-character-design) · [Pixnote](https://pixnote.net/en/learn/character/) · [Spritegen](https://spritegen.io/guides/how-to-draw-a-pixel-art-character/) · [Glocker et al. 2009 (abstract)](https://www.researchwithrutgers.org/en/publications/baby-schema-in-infant-faces-induces-cuteness-perception-and-motiv/) · [Golle et al. 2013, PLOS ONE](https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0058248) · [Nittono lab summary](https://cplnet.jp/en/kawaii/) · [Wikipedia: Kirby](https://en.wikipedia.org/wiki/Kirby_(character)) · [Wikipedia: Baby schema](https://en.wikipedia.org/wiki/Baby_schema) · [Wikipedia: The Media Equation](https://en.wikipedia.org/wiki/The_Media_Equation) · [japan-figure: Rilakkuma](https://japan-figure.com/blogs/news/rilakkuma-characters) · [Tamagotchi sprite Q&A (fan)](https://www.tumblr.com/osumesu21/688600279315316736/hey-do-you-know-if-in-the-original-tamagotchi). [references](../references.md) · raw notes: [character](../research/character.md), [pets](../research/pets.md).
