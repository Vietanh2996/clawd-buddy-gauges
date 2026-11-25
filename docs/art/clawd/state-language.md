# State language: how Clawd says what's going on

> **Read when:** adding a mood or a look, or asking "what should *this* state look like?" **Related:** [body language & props](../foundations/body-language-and-props.md) · [companion presence](../foundations/companion-presence.md) · [studies of our animations](studies-of-our-animations.md)

The band's job is to tell you, at a glance, what Claude is doing. Clawd does that with a small grammar that the existing catalogue already follows. Describing it makes it easier to extend, or deliberately bend.

## The grammar, as observed

Every state is **one prop + one claw pose + one eye state + one tempo, on the same body.**

| Mood | When it shows | Prop and pose | Tempo (ms/frame) |
|---|---|---|---|
| idle | waiting for you | no prop; breathes, glances, blinks, shuffles, stretches | 260 (looks 180-300) |
| sleeping | idle > 10 min (3 late at night) | lying flat, zZz drifting | 500 |
| thinking | Claude is thinking | thought cloud filling with dots, a bulb now and then | 350 (looks 150-350) |
| responding | writing the reply | speech bubble whose lines grow | 300 |
| typing | Edit / Write | laptop, claws alternate, eyes down | 250 |
| reading | Read | book / paper / tablet, eyes track across | 340 |
| searching | Grep / Glob | magnifier, torch, binoculars | 280 |
| running | Bash and friends | terminal window, jog, treadmill | 110-250 |
| browsing | web tools | browser/surfboard | 200-280 |
| delegating, rallying | sub-agents, workflows | small Clawds (hand-offs, towers, crowds) | 140-260 |
| planning | task / plan tools | map, sticky notes | 300-330 |
| tooling | other tools | hammer, toolbox, build | 180-260 |
| waiting | needs you (permission, question) | "?" / "!" bubble, claws up, hops, looks around | 170-280 |
| done | turn finished | hop, claws up, sparkles / trophy / dance | 130-220 |
| error | failure | whole body tinted darker, x-eyes, wobble, smoke / rain | 140-300 |
| compacting | context compaction | a press squashes him, he pops back | 150-200 |

(Counts and times from `crew-sprites.js`; triggers from `crew-pet.ts` and [PETS.md](../../PETS.md).)

## Reserved words

- **Wave and hop mean "needs you" and "done".** The idle animation's own comment says it deliberately avoids them. Using them elsewhere would blur two of the band's most important messages.
- **Body tint means trouble.** Only error moods change the body colour.
- **Props are the nouns, claws are the verbs, eyes are the attention.**
- **Tempo is the mood**: slow = calm or sleepy, fast = busy or frantic.

## Ways to read it

- It is a **vocabulary with a few reserved words**, which is what lets a *new* look be understood on first sight (like Aicher's pictogram grammar: learn the system once, read new symbols for free).
- The same body in every state is the strongest identity move *and* a readability risk: states that share a prop shape (the speech bubble of responding vs. the "?" bubble of waiting, overlap 0.94 in the modal frames) must differ in glyph, claws and tempo. Waiting escalates over its loop (a "?", a look-around, then "!" with hops), which is the Tamagotchi attention call in animation form.
- Communities that built other Clawd companions (clawd-tank, clawd-on-desk) converged on the same pattern of distinct pose and prop per state on one body. That suggests the grammar fits the character, not just our implementation.

## Seeds for new states (you may ignore all of these)

When you meet a situation the band doesn't show yet, run through these as *prompts*:

1. **What is Claude actually doing in human terms?** (Waiting on a slow tool, double-checking, rate-limited, offline.) Humans have gestures for each.
2. **Which verb is the claw doing?** Tap, pinch, point, hold, lift, wave, snip.
3. **What would the crab do with a prop it already has?** Sometimes a new meaning for the mug or the cloud beats a new prop.
4. **Which reserved word is it closest to?** If it means "needs you", it earns a hop; if not, it doesn't.
5. **What's the quietest version?** Start with one eye change and a tempo change. Escalate only if that can't be read.
6. **Where's the joke, if any?** Failure and calm states are where jokes land best ([storytelling](../foundations/storytelling-and-humor.md)).

You can also decide that a state *shouldn't* get a new animation at all. Not every event deserves a performance.
