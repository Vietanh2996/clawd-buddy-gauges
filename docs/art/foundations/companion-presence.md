# Companion presence

> **Read when:** deciding how often, how loudly, and in what situations Clawd should do something. **Related:** [idles & aliveness](idles-loops-and-aliveness.md) · [studies/clippy-vs-goose](../studies/clippy-vs-goose.md) · [studies/tamagotchi-and-pokemon-icons](../studies/tamagotchi-and-pokemon-icons.md)

*A lens, not a law: everything below is a default with a reason. Break it on purpose when you have a better idea, and say why.*

## The question

*How do I live in someone's peripheral vision for eight hours without becoming noise, or Clippy?*

## Why it works

**The pets that survive mind their own business.** Nathalie Lawhead's essay on desktop pets: the best ones (Neko, eSheep) are like a small fireplace in the corner. Neko is a state machine (chase, arrive, paw, idle, sleep) driven by one input, the cursor; a sleeping cat tells you the user stopped.

**Clippy failed on behaviour, not looks.** Luke Swartz's study, via secondary summaries: people disliked what Clippy *did*, not what it *was*. It interrupted, had no memory of the user, had a thin function, and its idle animations pulled focus (see [clippy-vs-goose](../studies/clippy-vs-goose.md)). Reeves and Nass's "media equation": give software a face and people judge it like a colleague.

**Consent changes the same behaviour.** Desktop Goose is nearly as intrusive as Clippy and is loved, because users opt in, it's bounded, and there's an off switch.

**Presence without becoming a notification system.** The Mochi pet reacts only to coarse signals and *often chooses not to react*: cooldowns and probability checks. Animal Crossing villagers *notice, pause, then react* instead of snapping, which costs no pixels and reads as thought.

**Attention calls are a separate channel.** Tamagotchi's key invention is a dedicated attention icon plus a beep, with a roughly 15-minute window before a "care mistake" is recorded (fan guides; no official Bandai doc found). Some states did *not* call (sickness, droppings) and had to be noticed by looking: the pet distinguishes "I need you" from "state you can see". The call is a pre-attentive cue, motion plus sound, costing the screen almost nothing, and converts a decorative sprite into a relationship with a deadline.

**Respect the intent of waiting.** A Game Developer essay on Tamagotchi and FarmVille: the same timed mechanic is respectful when it serves a feeling and abusive when waiting is sold back to you. For us: Clawd's attention should map to a real need (cache expiring, a permission needed, a stand-up reminder the user asked for), never to engagement.

**Cuteness may calm, but don't count on it.** Nittono's results (looking at cute images preceded more careful, detail-focused behaviour) are small-sample and not about status UIs. Don't design around them.

## Look at it

Clawd already has the right bones:

- A **priority ladder** in code: moods hold for 2 s before changing unless urgent (waiting, done, error) (`crew-pet.ts`). That is cooldown logic in miniature.
- **Stand up** (hourly) and **Drink water** (every 45 min) are attention calls that map to real, user-opted needs; they use the status line colour (amber / light blue) plus a Clawd animation, with click-to-acknowledge, and "standing up comes first when both are due" (README). That is the Tamagotchi call done with consent.
- **Time-of-day leaning** (coffee and stretch in the morning, yawns late at night) and **holiday hats** are rare flourishes chosen by probability, not timers: Mochi's weighted-chooser idea.
- **Sleeping** after 10 idle minutes (3 late at night) is Neko's "you stopped" message.

Distilled ladder for any status pet (synthesis of the sources above):

1. Always-on idle that is *calm* (slow, small, periodic).
2. State through posture, readable in peripheral vision.
3. Rare, bounded flourishes with cooldowns (stretch, blink, hat).
4. Attention calls only for real, user-actionable events; escalate gently; settle if ignored (an ignored Tamagotchi call becomes a record, not an infinite shout).
5. Aim not to grab focus or require a dismissal.

## In practice

1. **Audit what Clawd *does* before polishing how it looks.** Swartz's lesson is that behaviour is what annoys.
2. **Tie every call for attention to a real, user-actionable event.** If nothing the user can do would help, it's decoration. Make it quiet.
3. **Escalate once, then settle.** A blinking call that continues forever is Bonzi. A static marker is enough after a while.
4. **Notice, pause, react.** Hold one still frame (about 150-250 ms) before changing state in non-urgent transitions. Skip it in urgent ones.
5. **Offer an off switch and a quiet mode for anything mischievous.** Goose is the model: opt-in, bounded, obvious off.
6. **Rest is a behaviour.** Neko Atsume's reward is discovery, and absence is free. Doing nothing, well, is a design.
7. **Check the real environment.** Corner placement, no sound by default, pause during fullscreen (vendor guidance; low authority but sensible).
8. **Don't mix error with delight carelessly.** A sad-face moment in a failure state is great; a joke on top of something the user needs to act on is not.

## Tensions

- **Alive vs ignorable.** Every motion is a small tax on attention. The peripheral-vision test: after ten minutes can I stop seeing it?
- **Needy vs charming.** Tamagotchi's hard clock is charming on a device you carry; on a work desktop, the same shout is Clippy. The resolution is that the call must fire only for real events and must self-quiet.
- **Face invites social judgement.** A face raises expectations of politeness. A mouthless mascot sets lower expectations (inference).
- **Consent matters most for personality.** Aggressive designs (Digimon, Goose) succeed when the audience chose them.

## Ask yourself

- If the user ignores this, what happens next? Does it stop?
- Is this a need, or a decoration pretending to be one?
- Would I tolerate this from a colleague sitting next to me for a day?
- What is the quietest version that still works?

## Sources

[Nathalie Lawhead: about desktop pets](https://www.nathalielawhead.com/candybox/about-desktop-pets-virtual-companions-discussing-the-inhabitants-that-fill-the-void-of-our-digital-spaces) · [Mochi (DEV)](https://dev.to/mikachu/a-tiny-linux-desktop-companion-and-wayland-and-gtk-kept-getting-in-the-way-4lbi) · [TamaVault gen 1 care guide](https://tamavault.com/devices/original-gen1/care-and-discipline/) · [Game Developer: Tamagotchi, FarmVille, Fun Pain](https://www.gamedeveloper.com/design/tamagotchi-farmville-and-quot-fun-pain-quot-) · [Siliconera: Animal Crossing villagers](https://www.siliconera.com/nintendo-on-how-animal-crossing-new-horizons-lovable-villagers-were-created/) · [Desktop Goose](https://samperson.itch.io/desktop-goose) · [Wikipedia: Neko](https://en.wikipedia.org/wiki/Neko_(software)), [Neko Atsume](https://en.wikipedia.org/wiki/Neko_Atsume), [Office Assistant](https://en.wikipedia.org/wiki/Office_Assistant) · [Jerz on Swartz](https://jerz.setonhill.edu/blog/2005/08/25/3662/) · [Jaymo: Clippy history](https://thejaymo.net/2025/08/12/clippy-a-history/). The ACM ambient-companion paper was seen in a snippet only (UNVERIFIED). Repo behaviour from the README and `crew-pet.ts`. [references](../references.md) · [raw notes](../research/pets.md).
