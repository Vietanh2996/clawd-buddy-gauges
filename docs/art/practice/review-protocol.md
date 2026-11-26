# Review protocol

> **Read when:** you have a sprite or animation you want to sharpen. **Not for:** filtering ideas. Explore first, review after (see [README: creativity comes first](../README.md#creativity-comes-first-read-this-before-anything-else)). **Related:** [tensions](tensions.md) · [exercises](exercises.md)

A review is a conversation between the idea and the viewer. The tests below are cheap ways to *see* the sprite the way a stranger will, so you can decide what to change, or decide that it's right as it is.

## 0. Say what you were going for
One sentence: "Clawd is sheepish because the build failed." If you can't, the sprite can't be judged. Pixeli asks reviewers to state what they checked and the compromises they made, because hidden compromises can't be fixed.

## 1. The glance (5 seconds)
View at **1x**, in the real band or a mock of it. Look away for five seconds, look back. Write down the first thing you noticed and what you think the state is. If it isn't what you intended, that's your lead.

## 2. The shape test
Flat-fill the sprite with one colour ([example](../examples/silhouette-test.svg)). Can you name it? Does each state differ from its neighbours? Then 50% size. Then flipped horizontally (it exposes proportion and shading faults, per Derek Yu).

## 3. The value test
Remove the colour. Do the big masses still read? Then check on a dark tile, a white background and a real screenshot crop. Check there's a 2-step value gap between the body and what's behind it ([colour](../foundations/value-color-and-outline.md)).

## 4. The face and attention test
Cover the body: what does the face say? Cover the face: what does the body say? Do they agree? Where does the eye go first, and is that where you want it? Is there a spare pixel left in the neutral face?

## 5. The motion tests
- **Filmstrip:** lay out the distinct frames with their holds ([filmstrips](../examples/)). Does the volume drift? Do limbs change thickness? Does any outline pixel exist for only one frame?
- **Score:** write the beats in ms. Where's the longest hold and why? What's on which clock? Is there a rare event?
- **Real speed:** watch it for a full loop at least three times, then once while doing something else. Seams only show in motion.
- **Tempo swap:** play it at half and double speed. If the mood changes completely, tempo is doing a lot of work, so make sure it's the right tempo.

## 6. The peripheral test
Put it in the corner of your vision while reading something. After a minute, are you annoyed? After ten, do you forget it? ([companion presence](../foundations/companion-presence.md))

## 7. The story test
Can you find a setup, a beat, a payoff? Is anything doing a job that nothing else could do? What would you cut? (Slynyrd: cut the recoil, keep the high point.)

## 8. The stranger test
Show it to someone without context, for one second, and ask what it's doing. Aki Maita's Tamagotchi team learned more from 200 girls over several weeks than from any pixel theory. Real reactions beat our own opinions.

## What to write down
- What I was going for.
- What the tests showed.
- What I changed, and what I **chose not to change on purpose** (and why).
- Any rule I broke deliberately.

## Reading the results
- **Passing every test doesn't make it good.** The tests catch problems of clarity, not lack of charm.
- **Failing one test isn't a bug** if the failure is the point (a deliberately ambiguous gag, an intentionally low-contrast sleepy state). Name it.
- If two tests disagree (the glance reads fine, the story test says dull), use [tensions](tensions.md).

## Pixeli's checklists
When you want a thorough numeric review (cluster budgets, orphan counts, palette ladders, banding), read Pixeli's [review checklist (rule 07)](https://pixeli.pebbly.space/knowledge/rules/07-review-checklist), [readability (14)](https://pixeli.pebbly.space/knowledge/rules/14-readability-and-scale) and its pixel-critic agent. This protocol is deliberately lighter.
