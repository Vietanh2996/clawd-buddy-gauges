> **Raw research notes (unrefined).** Written 2026-11-25 by a research agent for the Clawd art KB: Virtual pets, desktop pets, companion UX, kawaii research. Claims are paraphrased with sources; UNVERIFIED markers matter. The refined, cross-checked synthesis is in [../README.md](../README.md); where they disagree, trust the refined modules and [../references.md](../references.md).

# Virtual pets, desktop pets, companion UX and "cute" research: notes for Clawd

Research date: 2026-11-25. Method: web search plus page fetches. Claims are paraphrased. Where a source was only seen as a search-result snippet (not opened), or conflicts with another, it is marked. "UNVERIFIED" means I could not confirm it from an opened page.

---

## 0. The ten-line version

1. A pet communicates with a tiny vocabulary: a few poses, one or two alternating frames, and a handful of icons. Tamagotchi's original screen is a 32x16 black-and-white matrix plus 8 fixed icons. That is the real scale of "tiny".
2. Neediness is a *signal with a deadline*, not a decoration. Tamagotchi's attention call has a roughly 15-minute response window before a "care mistake" is recorded. The call is a single icon plus a beep. It carries all the emotional weight.
3. The pet that survives on a desktop is the one that minds its own business. Neko sleeps when you stop moving; Clippy died because it interrupted.
4. Clippy failed on **behavior, not looks** (Swartz): people disliked what it did, not what it was.
5. Cuteness is a *relationship* (Nittono): a nurturing motivation triggered by baby schema, but broader than it. Cute things make people more careful and detail-focused, not just happy.
6. Baby schema in pixels: oversized head, large low-set eyes, short limbs, round silhouette. Clawd already has most of these; the lever is *proportion and eye placement*.
7. Personality reads from silhouette first, then from a few consistent expressions (Animal Crossing: silhouette per species, same emotion language across species).
8. Liveliness comes from variation and pauses, not more frames: cooldowns, probabilities and "doing nothing" (Mochi) and look-before-react (Animal Crossing).
9. Small-size emoji craft: thick strokes (2-4 px at 128 source), high contrast, one idea, transparent background, test on light and dark themes at about 22-32 px.
10. Broken on purpose: Desktop Goose is *deliberately* annoying; Digimon V-pet is aggressive; Tamagotchi lets the pet die. Annoyance is a dial, and the user must hold the dial.

---

## 1. Tamagotchi: tiny hardware, big attachment

### 1.1 The hardware reality (the real "pixel budget")
- Sources (TamaLIB and MCUGotchi READMEs, seen via search results; a DeepWiki summary): the first-gen "P1" uses an Epson E0C6S46 microcontroller, a monochrome LCD of **32x16 pixels plus 8 icons**, three buttons and a piezo speaker. Source: https://github.com/jcrona/tamalib/ and https://github.com/jcrona/mcugotchi (snippets only; the blog.rona.fr page failed to load).
- Wikipedia's Tamagotchi article (opened) says the original characters were drawn in a deliberately rough "heta-uma" style then converted to pixel art, and that some pictures used only about 10 or 20 dots (the article attributes the remark to a Miyamoto; which one is unclear, UNVERIFIED attribution). The same article says "8-bit grayscale LCD", which contradicts the 32x16 black and white emulator sources. I trust the emulator sources; treat Wikipedia's grayscale claim as UNVERIFIED/likely wrong for gen 1.
- Why it matters: a creature that must read at 32x16 gets perhaps 12-16 px of body. Everything is silhouette, eye placement and 2 frames. Clawd at 8-32 px is in the same regime.

### 1.2 The attention call, the key invention
Source: TamaVault, "Tamagotchi Gen 1 Care Mistakes & Discipline Explained" https://tamavault.com/devices/original-gen1/care-and-discipline/ (fan guide, not Bandai; opened).
- A dedicated *attention icon* lights when the pet is hungry, unhappy or needs the light off; it also fires at sleep time. Respond within about 15 minutes or it is logged as a care mistake. (Fan guides agree on 15 minutes; one forum user disagreed; no official Bandai doc found.)
- Some states do NOT call: skull (sickness) and droppings must be noticed by looking. Four droppings on screen at once can cause sickness. Design lesson: the pet distinguishes "I need you" (active, audible) from "state you can see" (passive, visual).
- A "misbehavior call" fires while hunger and happiness are both full: the pet demands attention it does not need. The correct response is to scold (discipline meter 0/25/50/75/100%). Neediness has *texture*: genuine need vs. attention-seeking, answered differently.
- Why it works: a single blinking icon plus a beep is a pre-attentive cue (motion + sound) that costs the screen almost nothing. The deadline converts a decorative sprite into a relationship with consequences.

### 1.3 Aki Maita's design process
Sources: Asiaweek/Pathfinder article 25 July 1997, reproduced at https://www.mimitchi.com/html/aki.htm (opened); CNN-hosted Asiaweek page https://www.cnn.com/ASIANOW/asiaweek/97/0725/feat2a.html (seen in search results only); https://www.mimitchi.com/html/q10.htm (opened; mostly about Yokoi).
- Target audience: teenage girls in Japan, device portable, playable anywhere. Cuteness ("kawaii") was an explicit goal.
- She gave prototypes to about **200 high-school girls in Shibuya**, tracked their reactions over several weeks, and used questionnaires. The results shaped colour (white tested well), chain design and packaging. She credits two years of logging sales data at Bandai for her feel for what sells.
- Idea origin per her account: a TV ad about a boy taking a pet turtle to kindergarten.
- Concept pivot: it was meant to be a wristwatch but that cost too much; the egg shape resembles a pocket watch.
- Credit is contested: Wikipedia lists Akihiro Yokoi and Aki Maita as co-inventors (shared the 1997 Ig Nobel economics prize); some fan pages call Maita only a team member.
- No source I opened discusses pixel-level choices by Maita. UNVERIFIED: any claim about Maita personally designing sprites.
- Takeaway for artistic judgment: the pet was tuned by watching real users for weeks, not by pixel theory. Judge animations by showing them to someone, not only by checking grids.

### 1.4 "Fun pain" and respectful neediness
Source: Gamasutra/Game Developer, "Tamagotchi, FarmVille, and 'Fun Pain'" https://www.gamedeveloper.com/design/tamagotchi-farmville-and-quot-fun-pain-quot- (opened).
- Tamagotchi asked for a check roughly once an hour (feed, play, clean) and could not be paused. Neglect had consequences (well-behaved Mametchi vs short-lived Tarakotchi); the waiting simulated a biological need rather than a paywall.
- The article's argument: the same timed mechanic is respectful when it serves a feeling and abusive when waiting is sold back to you. Design the intent.
- For a status band: Clawd's "attention" should map to real need (cache expiring, permission needed), never to engagement farming.

### 1.5 Digimon V-pet (contrast)
Source: Wikipedia "Digivice" https://en.wikipedia.org/wiki/Digivice (opened).
- Released 1997 by WiZ and Bandai for boys 8+, a fighting pet with link-up battles. Monsters designed by Kenji Watanabe (influenced by American comics such as Spawn). Care: hunger, strength, weight, droppings, lights-off at sleep or evolution chance falls. Same care loop as Tamagotchi, different "kawaii" (edgy, aggressive) for a different audience.
- Takeaway: the same tiny-pixel vocabulary (eat, poop, sleep, sick) re-skinned with different silhouette language changes the gender and tone of the product. Pick the silhouette language deliberately. Screen specs were not in the source. Pico Pet: no source found (Wikipedia page 404). UNVERIFIED.

---

## 2. Pokemon: sprites, party icons, companion Pikachu

Access note: Bulbapedia returned HTTP 403 to my fetcher. What follows from Bulbapedia is from search-result snippets only.
- Party menu icons use **two-frame animation**; in Gen II all icons animate (not only the selected one), the selected one more exaggerated; they move less energetically when HP is low or a status is present; Gen VI moved to smoother vertical bobbing (Bulbapedia "Pokemon sprite" and "Party", snippets: https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_sprite and https://bulbapedia.bulbagarden.net/wiki/Party). A sprite guide (pixel-smith, itch.io) describes icons as two looping poses, mostly head bobs, sometimes shake, rotation or squish: https://pixel-smith.itch.io/sprites-ii (snippet).
  - Why it works: a 2-frame bob at one tempo is enough to say "alive". Tempo and amplitude carry *state*: a slower, smaller bob reads as hurt. Direct template for Clawd: one idle loop, with the same two frames played slower or smaller to encode "tired".
  - No source found for exact pixel offsets or frame timing. UNVERIFIED.
- Sprite authorship (via Wikipedia snippets for Jynx and Eevee, https://en.wikipedia.org/wiki/Jynx, https://en.wikipedia.org/wiki/Eevee): Gen 1 sprites were created by game artists (e.g. Fujiwara and Nishida); Ken Sugimori made illustrations based on the sprites and redrew sprites in his style. Secondhand, Wikipedia only. No Game Freak interview opened. UNVERIFIED on details.
- Pokemon Yellow's Pikachu companion (Wikipedia https://en.wikipedia.org/wiki/Pok%C3%A9mon_Yellow, opened): Pikachu follows the player, has its own voice, and affection rises or falls with the player's behaviour (levelling keeps it happy; fainting makes it unhappy). Mood portraits exist (seen only in a Spriters Resource snippet https://www.spriters-resource.com/game_boy_gbc/pokemonyellow/asset/15848/). The affection system is the "pet" half; the expression set is the "face" half.
- Game Boy Camera constraints (Wikipedia, opened, https://en.wikipedia.org/wiki/Game_Boy_Camera): sensor 128x128, saved 128x112, **four shades**, dithering controlled by a contrast slider, 30-photo limit, 18 border designs. Lesson: a 4-shade palette with dither as texture is a cultural signature, and the frame/border is part of the charm. I found no source linking the Camera to Pikachu design; that request item is unanswered.

---

## 3. The desktop pet tradition

### 3.1 Neko / oneko
Source: Wikipedia "Neko (software)" and "Oneko" (both opened): https://en.wikipedia.org/wiki/Neko_(software), https://en.wikipedia.org/wiki/Oneko
- 1989: NEKO.COM for NEC PC-9801 by Naoshi Watanabe; cat on the graphics layer, moved only in cardinal directions (no diagonals). Mac NekoDA by Kenji Gotoh (new sprite sheet, adjustable speed, prey cursors: bird, mouse, fish). 1990: xneko (Masayuki Koba), oneko (Tatsuya Kato). 1991: IBM bought non-exclusive sprite rights for 300,000 yen for OS/2 "Cat and Mouse". 1997: Windows port with multiple cats and footprints.
- Behaviours: chases cursor, paws at it on arrival, scratches window border (Mac), falls asleep when idle (with falling-asleep and waking animations), oneko can hide under a kotatsu and signal new mail. Wikipedia names no frame counts (UNVERIFIED).
- Why it is a masterpiece of economy: the whole personality is a state machine of chase / arrive / paw / idle / sleep driven by one input (the cursor). The pet is a visualisation of "where your attention is". A sleeping cat tells you the user stopped.
- Cultural role: the first known virtual pet per Wikipedia "Digital pet" (opened) https://en.wikipedia.org/wiki/Digital_pet.

### 3.2 eSheep / Stray Sheep (and its modern open-source recreation)
Sources: https://github.com/Adrianotiger/desktopPet and https://adrianotiger.github.io/desktopPet/Pets/Info.html (opened).
- Original 1995 16-bit Windows app (names: eSheep, Scmpoo, Screen mate Poo, Stray Sheep), based on Tatsutoshi Nomura's Stray Sheep animation shorts. The recreation walks, falls to the taskbar, detects windows, works across monitors. Described as having "no real utility".
- Pets are defined by a transparent sprite sheet (about 1000x500 px suggested) plus an XML of animations; tooling: Piskel, GraphicsGale. I did not find the tile size. UNVERIFIED. Search snippet mentioned a "Tom Ayres" involvement; no source supports it. Treat as false/UNVERIFIED.
- Lesson: data-driven animation (sheet + XML) lets fans author. It also shows the pattern "falls with gravity, lands on UI edges", where the screen is the pet's world.

### 3.3 Shimeji
Sources: note.com article "Notes on shimeji-ee" https://note.com/8bitcanvas/n/n9eb43bbbb061 (opened); search snippet pages (openpets.dev, Pixiv Encyclopedia).
- Windows desktop mascot by Yuki Yamada (Group Finity), earliest archived site June 2009 (snippet). English fork shimeji-ee. A character is a folder of numbered PNG frames plus XML. Action files group poses by situation: standing, sitting, lying, ceiling, wall, falling, dragging. A BehaviorList gives each behaviour a *frequency* and optional NextBehavior chaining.
- Lesson: believable pets are made of *situational poses* (on ground, on wall, being dragged, falling) and a weighted random chooser, not long animations. Dragging with a dangling pose is the favourite micro-delight.

### 3.4 Ukagaka
Source: https://en.wikipedia.org/wiki/Ukagaka (opened). Mascots are usually two characters: a main one and a small side pet or monster. Each "shell" is a set of surfaces (illustrations per emotion or action). Lesson: an expression set is just a named list of surfaces; a side character gives the main one something to talk to.

### 3.5 Clippy / Office Assistant and Bonzi: the cautionary tales
Sources: Wikipedia "Office Assistant" (opened) https://en.wikipedia.org/wiki/Office_Assistant; 9to5Mac interview with Kevan Atteberry (opened) https://9to5mac.com/2017/04/26/clippy-microsoft-office-mac/; Jaymo "Clippy: A Little History of Little Guys" (opened) https://thejaymo.net/2025/08/12/clippy-a-history/; Jerz summary of Luke Swartz's Stanford thesis (opened) https://jerz.setonhill.edu/blog/2005/08/25/3662/; search snippets on Swartz (thesis page itself timed out: https://xenon.stanford.edu/~lswartz/paperclip/); BonziBuddy (Wikipedia and others, snippets only) https://en.wikipedia.org/wiki/BonziBuddy.
- Atteberry says about 250 characters were designed on the Bob/Office project (he contributed 15-20) and a six-month narrowing with Stanford social psychologists (9to5Mac). Clippit was the Bob spin-off.
- Social-actor theory (Reeves and Nass, "The Media Equation", https://en.wikipedia.org/wiki/The_Media_Equation, opened) says people treat media as social partners, which led Microsoft to give software a face. Alan Cooper called it a "tragic misunderstanding" (quoted via Wikipedia). The face, once present, invites social judgement, so the agent is judged like a rude colleague.
- Swartz (via Jerz and snippets): labels, appearance and behaviour all matter; people dislike Clippy "not because of what Clippy is, but how Clippy acts" (snippet phrase). The letter prompt broke etiquette rules. Jaymo: the learning core (Lumiere) was replaced by fixed rules; idle taps meant to make Clippy feel alive became distraction; no memory of the user; poor timing.
- Bonzi: Windows companion on Microsoft Agent tech from 1999 (gorilla in 2000), classified as adware/spyware; FTC 2004 COPPA fine of $75,000 (snippet). Lesson: a pet that monetises attention poisons the whole genre.
- Failure checklist distilled: (a) uninvited interruption, (b) stateless and context-blind, (c) idle animation that grabs focus, (d) cannot be dismissed, (e) real utility is thin, so personality is the only thing and it is intrusive.

### 3.6 Desktop Goose: annoyance as a deliberate dial
Source: itch.io page https://samperson.itch.io/desktop-goose (opened).
- Steals the cursor, tracks mud, leaves notes and memes, spawns notepads. Config file for aggression; a user comment gives "hold Esc to stop him" (UNVERIFIED as official). 4.8/5 from about 1,988 ratings.
- Lesson: mischief works when the user *opted in*, it is bounded, and it has an off switch. Same behaviours as Clippy, opposite reception, because consent and framing differ.

### 3.7 Neko Atsume, the anti-Tamagotchi
Source: https://en.wikipedia.org/wiki/Neko_Atsume (opened). Cats come and go while you do nothing; no end game; developer Yutaka Takazaki wanted something enjoyable with simple operations. 86 cats, 26 rare ones triggered by specific items. Lesson: the reward for attention is *discovery*, and absence is free. Low-demand play is a successful design.

---

## 4. Companion UX: presence without nagging

Sources: Nathalie Lawhead essay https://www.nathalielawhead.com/candybox/about-desktop-pets-virtual-companions-discussing-the-inhabitants-that-fill-the-void-of-our-digital-spaces (opened); dev.to "A Tiny Linux Desktop Companion" https://dev.to/mikachu/a-tiny-linux-desktop-companion-and-wayland-and-gtk-kept-getting-in-the-way-4lbi (opened); getanimate https://getanimate.app/desktop-pet-study-companion (opened; vendor blog); ACM paper on ambient companions https://dl.acm.org/doi/full/10.1145/3772318.3791289 (403, snippet only).
- Lawhead: the best pets mind their own business (Neko, eSheep); a desktop pet is like a small fireplace in the corner; Clippy failed because its purpose was unclear and it was intrusive; Bonzi was a warning; Shimeji and Dogz survived because fans modified them.
- Mochi (dev.to): "presence without becoming another notification system". It reacts to coarse signals only (typing happened, media playing, long idle, return), and *often chooses not to react*: cooldowns, probability checks. It remembers where it was left, responds physically to drag, and uses hand-timed animation synced with movement.
- ACM ambient companion study (snippet only): a companion in peripheral attention was not experienced as annoying; continuous but non-intrusive presence. UNVERIFIED beyond the snippet.
- getanimate (vendor): corner placement, low sound, pause during fullscreen, "let the pet wait for you, not chase you".
- Synthesis, a priority ladder for any status pet:
  1. Always-on idle that is *calm* (slow, small, periodic).
  2. State change through posture (thinking, typing, resting) readable in peripheral vision.
  3. Rare, bounded flourishes (stretch, blink, hat) with cooldowns.
  4. Attention calls only for real, user-actionable events; escalate gently; stop when ignored (Tamagotchi's "ignored call" is a record, not an infinite shout).
  5. Never grab focus; never need a dismissal.

---

## 5. Animal Crossing: personality with a few shared tools

Sources: Siliconera and Nintendo Soup coverage of Nintendo's CEDEC 2020 villager talk (both opened): https://www.siliconera.com/nintendo-on-how-animal-crossing-new-horizons-lovable-villagers-were-created/, https://nintendosoup.com/nintendo-shares-how-they-designed-animal-crossing-new-horizons-villagers/ (thegamer.com copy failed: socket hang up).
- About 400 villagers across 35 species. Each species has a distinctive **silhouette** so it is recognisable from a distance; designers start with the silhouette alone (first impression shows only "a cat"), kept simple so there is room for variation, then add texture and details.
- Five personality types built from real-world cues, so players feel they know someone like them.
- **Emotion language is shared across species**, so a player can read any villager's mood instantly.
- Behaviours: self-initiated actions (eat, yoga, sweep, fish) and reactive ones; interests change frequency (music lovers sing more) and clothing; on noticing an object, a villager *pauses to look* before reacting, which defeats the robotic feeling.
- Lessons: (1) silhouette is identity; (2) consistent emotional grammar beats bespoke expressions; (3) "notice, pause, then react" is a three-beat micro-pattern costing almost nothing in pixels; (4) vary frequency, not content.

---

## 6. Nintendogs and Petz: body language over HUD

Sources: Wikipedia "Nintendogs" (opened) https://en.wikipedia.org/wiki/Nintendogs; "Petz" (opened) https://en.wikipedia.org/wiki/Petz; "Digital pet" (opened).
- Nintendogs: dogs stay puppies (no death or aging); needs are shown as levels (hunger Full to Famished, thirst, coat); microphone for name and commands; real-time clock drives hunger. Idea came from Miyamoto's family adopting a dog.
- Petz: Dogz (1995) and Catz (1996) by PF.Magic; animals cannot die but show needs through behaviour (e.g. becoming obese or howling); Rob Fulop wanted something "so cute and so adorable" no one could call it bad for kids (paraphrase); reused the Ballz engine.
- The Digital pet article notes modern pets generally avoid message boxes and status icons; owners read body language.
- Tension: Tamagotchi uses *icons* because 32x16 has no room for body language; Nintendogs and Petz use *bodies* because they have room. At 8-32 px, Clawd is in between: a few body poses can carry the message, but a tiny icon (a "!" or "z") is still the strongest dedicated channel.

---

## 7. Emoji and emote craft at 16-32 px

Sources: Slack.green "40 Slack Emoji Ideas" https://slack.green/en/blog/slack-emoji-ideas (opened); EmoteResizer "Slack Emoji Size Guide" https://emoteresizer.net/blog/slack-emoji-size-guide (opened). Both are vendor blogs, not Slack documentation. The Medium page by giantfrog (https://medium.com/@giantfrog/making-your-first-emojis-fa435478ad81) returned 403.
- Upload 128x128 (128 KB limit); displayed about 32 px alone, about 22 px inline, about 16 px in reactions (snippet of one test; verify with your own render).
- Rules: preview at about 28 px; thick outlines (2-4 px at source scale); high contrast; one subject, one idea; avoid gradients and thin light-grey text; keep text to about 7 letters; transparent background; check light and dark themes; keep light colours off the edges.
- Why it works: at 16-32 px the eye extracts a silhouette and 2-3 big colour masses. Anything below that is noise.
- For Clawd: test the sprite at 1x on both a dark terminal and a light one. Orange body (if Clawd's body is orange) must keep an outline or contrast edge on both.

---

## 8. Cute and kawaii: what research says

Sources: Wikipedia "Baby schema" (opened) https://en.wikipedia.org/wiki/Baby_schema; Wikipedia "Kawaii" (opened) https://en.wikipedia.org/wiki/Kawaii; CPLnet "Psychology of kawaii and cuteness" (Nittono; opened) https://cplnet.jp/en/kawaii/; Nittono et al. 2012 "The Power of Kawaii" PLoS ONE (via search snippets and the APS write-up, opened) https://www.psychologicalscience.org/news/minds-business/the-power-of-puppies-looking-at-cute-images-can-improve-focus.html; PLOS One 2025/26 "Beyond the baby schema: objects being touched are perceived to be cute" (opened) https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0340903; Wang and Seaborn, "Kawaii Computing" arXiv:2405.08244 (abstract page opened; PDF not readable) https://arxiv.org/abs/2405.08244; ResearchGate two-layer model page 403.
- Lorenz baby schema: proportionally large head, round face, high forehead, large eyes, small nose and mouth. Glocker 2008-09: cuteness ratings track motivation to care; fMRI shows nucleus accumbens activity (reward). Cuter infants were rated friendlier and more competent.
- Nittono's **two-layer model**: layer one is a biologically rooted positive emotion tied to protecting and nurturing; layer two is cultural amplification (amae, an orientation towards smallness). Baby schema is *one* trigger among many.
- 2012 study (three experiments, 132 students total per APS): after viewing cute puppies/kittens, people did better at a precision task and focused on local detail; one snippet reports about 15.7% improvement versus 1.4% (PMC snippet; reaction time not faster, so the effect is care, not speed). Small sample, mainly one game (APS commenter).
- 2025/26 PLOS One: baby schema is the dominant factor for objects (effect size about 2.4-2.8 in Japan n=198 and US n=199); an object being touched by a person adds a small, additive effect (about 0.11-0.13). Stimuli were still photos of stuffed animals and pillows, so apply to animation cautiously.
- Kawaii Computing (abstract): kawaii is distinguished from generic cute by being experiential and culturally sensitive; it can be built into appearance AND behaviour of agents.
- Kawaii design traits (Wikipedia): soft colours, rounded shapes, features suggesting vulnerability such as big eyes and small mouths.
- Pixel translation of baby schema: head about 60 percent or more of height; eyes set below the vertical midpoint of the head; eyes about 1 px with a gap rather than rows of detail; no mouth or a single-pixel mouth; stubby legs; asymmetric tiny motion (a one-pixel lean) is *more* alive than symmetry. (These pixel numbers are my inference, not from sources.)
- A design consequence of "cute makes you careful": a cute pet in a coding tool may be calming rather than distracting, but that is speculative (UNVERIFIED for status UIs).

---

## 9. Cross-cutting principles (why it works)

| Principle | Evidence | Pixel-level meaning |
|---|---|---|
| Two frames at a state-dependent tempo read as life | Pokemon party icons (Bulbapedia snippet) | One bob, slow vs fast encodes calm vs urgent |
| An icon is a dedicated, cheap channel | Tamagotchi 8 fixed icons + attention call | Keep a separate 3x3 or 5x5 badge for the alert |
| Need needs a deadline and a consequence | Tamagotchi 15 min care mistakes | Escalate once, then settle; do not nag forever |
| Silhouette first | Animal Crossing CEDEC | Clawd must be identifiable as a solid black shape |
| One emotional grammar | Animal Crossing | Same eye pair means the same thing in every pose |
| Notice, pause, react | Animal Crossing | Add a 1-2 frame hold before changing state |
| Chooser with weights and cooldowns | Shimeji Frequency, Mochi cooldowns | Random rare flourishes, never on a timer |
| Doing nothing is a behaviour | Mochi; Neko sleeping | Rest pose when idle is not a failure |
| Behaviour, not looks, creates dislike | Swartz | Audit what Clawd does before polishing sprites |
| Consent changes the same behaviour | Goose vs Clippy | Provide a quiet mode and obvious off |

## 10. Tensions and deliberate rule-breaking
- Neediness vs annoyance: Tamagotchi's hard clock is charming for a device you carry; on a work desktop, the same shout is Clippy. Resolution: the call must only fire for real events and must self-quiet.
- Consistency vs variation: shared expression grammar (Animal Crossing) vs unique, quirky shapes (Shimeji fan art). Keep grammar fixed, vary silhouette detail.
- Realism vs readability: Petz and Nintendogs use full body language; 32x16 needs icons. Mix: tiny pose plus tiny icon.
- Cute makes people care, but also invites social judgement (Clippy): a face raises expectations of politeness. A mascot with no mouth sets lower social expectations than one that speaks. (Inference.)
- Aggressive designs (Digimon, Goose) succeed when the audience chose them.

## 11. Translation to a tiny crab (Clawd)

Concrete ideas (my inferences, built on the above):
1. **Idle**: two-frame loop, a one-pixel body bob, claws offset by one pixel alternately; period about 600-800 ms. Slow it down to about 1200 ms for "resting" and add a "z" icon. Same two frames at different tempos give three states for free (Pokemon icon lesson).
2. **Attention call**: a dedicated icon (a 3x5 "!" claw-wave) that blinks at a human-noticeable but gentle rate; fires only for actionable events (needs permission, cache about to expire). After about 15 minutes (Tamagotchi precedent) it stops blinking and becomes a static marker. Never audible by default.
3. **Passive vs active states**: like the skull and droppings, show some states only visually (thinking, editing) with no alert; reserve the call icon for "needs you".
4. **Silhouette test**: render each pose as a solid black shape at 1x; thinking, typing, jogging, sleeping, celebrating must all differ in outline by at least the claw position and body height, not only in the eyes.
5. **Eyes as the shared emotional grammar**: define 4 eye states (open, blink, squint-happy, closed) and use them in every pose. Two single pixels spaced apart, set low on the body (baby schema).
6. **Notice, pause, react**: when state changes (e.g. thinking to done), hold one still frame for about 150-250 ms before the new animation, then react. This is the cheapest "alive" trick (Animal Crossing).
7. **Weighted flourishes with cooldowns**: stretch, blink, sidestep, tiny hat swaps (the repo already has a holiday-hat and time-of-day look system): chosen with probability and cooldown (Mochi), never periodic.
8. **Drag or touch response is a luxury**; in a terminal band, the analogue is reacting to events (a keystroke burst gives faster claws).
9. **Sleeping as honest idle**: Neko's sleep is a message ("you stopped"); Clawd resting should do likewise and wake with one frame of surprise when activity resumes (waking animation as in Neko).
10. **Check on both themes**: outline or contrast edge; test at 1x and 2x (Slack emoji lesson).
11. **Opt-in mischief**: if you add silly behaviours, gate them behind a setting and a quiet mode (Goose lesson).
12. **Expression budget**: for a 16 px pet, treat each extra pixel as a word. Prefer changing one pixel (eye or claw) over redrawing the body.

## 12. Source list (title, author, URL, use)
1. Aki Maita, Pathfinder article, Asiaweek 1997, mimitchi.com: https://www.mimitchi.com/html/aki.htm. Testing with 200 girls, kawaii goal, constraints.
2. Akihiro Yokoi page, mimitchi.com: https://www.mimitchi.com/html/q10.htm. Sales and credit context.
3. "Tamagotchi, FarmVille, and Fun Pain", Game Developer: https://www.gamedeveloper.com/design/tamagotchi-farmville-and-quot-fun-pain-quot-. Respectful vs abusive timers.
4. Wikipedia "Tamagotchi": https://en.wikipedia.org/wiki/Tamagotchi. History, meters, heta-uma remark (some claims conflicting).
5. TamaLIB / MCUGotchi (J. Rona), GitHub: https://github.com/jcrona/tamalib/ and https://github.com/jcrona/mcugotchi. 32x16 + 8 icons (snippets).
6. TamaVault gen 1 care guide: https://tamavault.com/devices/original-gen1/care-and-discipline/. Attention-call mechanics and 15 minute window.
7. Wikipedia "Digivice": https://en.wikipedia.org/wiki/Digivice. Digimon V-pet.
8. Wikipedia "Digital pet": https://en.wikipedia.org/wiki/Digital_pet. Genre history and body language note.
9. Bulbapedia "Pokemon sprite" / "Party": snippets only (403).
10. Wikipedia "Pokemon Yellow": https://en.wikipedia.org/wiki/Pok%C3%A9mon_Yellow. Pikachu affection system.
11. Wikipedia "Game Boy Camera": https://en.wikipedia.org/wiki/Game_Boy_Camera. 4 shades, 128x112.
12. Wikipedia "Neko (software)" / "Oneko": https://en.wikipedia.org/wiki/Neko_(software). History and behaviours.
13. Adrianotiger "desktopPet" (eSheep), GitHub: https://github.com/Adrianotiger/desktopPet. Sprite sheet + XML approach.
14. "Notes on shimeji-ee", 8bitcanvas, note.com: https://note.com/8bitcanvas/n/n9eb43bbbb061. Action/behaviour structure.
15. Wikipedia "Ukagaka": https://en.wikipedia.org/wiki/Ukagaka. Shells and surfaces.
16. Wikipedia "Office Assistant": https://en.wikipedia.org/wiki/Office_Assistant, and Kevan Atteberry interview via 9to5Mac: https://9to5mac.com/2017/04/26/clippy-microsoft-office-mac/.
17. Jaymo, "Clippy: A Little History of Little Guys": https://thejaymo.net/2025/08/12/clippy-a-history/.
18. Luke Swartz, "Why People Hate the Paperclip" (2003), via Jerz blog https://jerz.setonhill.edu/blog/2005/08/25/3662/ (primary page unreachable).
19. Wikipedia "The Media Equation" (Reeves and Nass): https://en.wikipedia.org/wiki/The_Media_Equation.
20. Samperson, "Desktop Goose", itch.io: https://samperson.itch.io/desktop-goose.
21. Wikipedia "Neko Atsume": https://en.wikipedia.org/wiki/Neko_Atsume.
22. Nathalie Lawhead, "About desktop pets and virtual companions": https://www.nathalielawhead.com/candybox/about-desktop-pets-virtual-companions-discussing-the-inhabitants-that-fill-the-void-of-our-digital-spaces.
23. "A Tiny Linux Desktop Companion" (Mochi), DEV Community: https://dev.to/mikachu/a-tiny-linux-desktop-companion-and-wayland-and-gtk-kept-getting-in-the-way-4lbi.
24. Nintendo CEDEC 2020 villager talk via Siliconera and Nintendo Soup: URLs in section 5.
25. Wikipedia "Nintendogs" and "Petz": URLs in section 6.
26. Slack emoji guides (slack.green, emoteresizer.net): URLs in section 7.
27. Wikipedia "Baby schema", "Kawaii"; CPLnet Nittono page; APS write-up of Nittono et al. 2012; PLOS One touch-and-cuteness paper; Wang and Seaborn arXiv:2405.08244: URLs in section 8.
28. getanimate.app quiet companion guide: https://getanimate.app/desktop-pet-study-companion (vendor blog; low authority).

Failed or limited: Bulbapedia (403), Medium giantfrog (403), ACM ambient-companion paper (403), ResearchGate (403), Tamagotchi Fandom (402), Stanford Swartz thesis page (connection refused), blog.rona.fr (connection refused), thegamer.com (socket hang up), Wikipedia Pico Pet and Desktop Goose (404). The web search tool hit rate limits on the first batch, so some queries (Pokemon sprite artists, oneko) rely on later snippets.
