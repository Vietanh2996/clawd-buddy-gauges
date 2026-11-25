> **Raw research notes (unrefined).** Written 2026-11-25 by a research agent for the Clawd art KB: Character design and facial expression. Claims are paraphrased with sources; UNVERIFIED markers matter. The refined, cross-checked synthesis is in [../README.md](../README.md); where they disagree, trust the refined modules and [../references.md](../references.md).

# Character design and facial expression in very little space

Research notes for the Clawd pixel-art knowledge base. Area: shape language, silhouette, proportion, eyes, mouth, posture, baby-schema science, mascot case studies, limits-as-style. Sources were opened live (WebFetch) unless marked SEARCH-ONLY (seen in search results, page not readable) or UNVERIFIED. Quotes are kept under 20 words; everything else is paraphrase.

---

## 1. The core thesis: at tiny sizes, every pixel is a decision

Derek Yu's classic tutorial puts the problem plainly: the smaller a sprite gets, the less it resembles the thing it stands for and the more each single pixel is responsible for. That is the whole discipline of 8-32px characters. You are no longer drawing a crab; you are choosing which 5 facts about a crab survive.

**Why it works (perception).** Humans read faces and bodies from a handful of high-contrast cues (two dark marks on a lighter field read as "eyes" almost regardless of context). Scott McCloud's "amplification through simplification" argument, as summarised on Wikipedia, says iconic, minimally-detailed faces invite identification and projection ("masking"), whereas realistic faces belong to a specific someone. Stripping detail therefore does not lose meaning; it concentrates it and hands the last 20% of the work to the viewer's imagination.

**Tension.** The simplification only works if the remaining cues are the *right* ones. A bad 16px sprite is not "simple", it is merely vague. The craft is deciding which features to keep and exaggerating them.

---

## 2. Silhouette and shape language

**Silhouette first.** Spritegen's 16x16/32x32 guide says to block the character as one flat colour and check it reads "from across the room" before any interior detail; exaggerate pose and give each defining part a distinct outline. General silhouette-test advice (SEARCH-ONLY, several design blogs) says fill the design solid black at the actual display size, and redo it if it collapses into a blob when squinted at. Derek Yu adds a cheap readability test: flip the artwork horizontally and desaturate it, and check the big light/dark clusters still hold.

**Shape language (circle = friendly, square = stable, triangle = danger).** Design blogs (SEARCH-ONLY: 3dsense, mimiccartoon) pair round with soft/kind, square with solid/reliable, triangle with threatening. Why: soft contours do not signal sharp, injurious edges (an associative argument, widely repeated, weakly sourced; treat as heuristic, not law). Useful for Clawd: a rectangle body is "sturdy, dependable, robot-adjacent", which fits a coding tool. Claws are the only pointy/pinchy element and thus where "threat" or "action" can be dialled up or down.

**Silhouette carries the species; the face carries the mood.** Because the face is only 2-4 pixels, the silhouette is what stays constant across states. If thinking, typing and sleeping each changed the outline wildly, the character would stop being recognisably the same. Change the *interior* (eyes) and *one limb* per state; keep the outline anchor.

**Limit-driven features can become identity.** Mario is the canonical case (below): the hat, moustache and overalls were pixel-budget workarounds that became iconography.

---

## 3. Proportion: the smaller the sprite, the bigger the head

Numbers from sources:
- Pixnote: 8x8 = 1-1.5 heads tall (eyes and body direction only); 16x16 = 2-3 heads; 24x24 = 2.5-3.5; 32x32 = 3-4; 48+ = 4-6.
- Spritegen: at 16x16 the head is about 40-50% of the height (e.g. 6-7px head over 9-10px body); at 32x32 a 1:3 or 1:4 head-to-body ratio still keeps the face legible. Rule of thumb: smaller sprite, bigger head.
- Sandro Maglione: at 16x16 the head should take half or more of the sprite so there is room for eye detail; at 8x8 eyes may be one pixel or absent.
- Derek Yu: chibi / super-deformed proportions (big head, big eyes) suit expressive characters at small sizes; an outline can eat the room needed for shading, and well-defined limbs may force a smaller head. These are real trade-offs.

**Why it works.** Two reasons stack. (1) Practical: the face needs a minimum pixel budget (see eyes below), so the head must be large. (2) Psychological: a big head, big eyes low on the face is the baby schema (section 5), so the practical constraint produces appeal for free. Hence chibi is not a style choice at 16px, it is nearly forced, and it happens to be the cutest option.

**Clawd already does this.** Per the fan-documented descriptions (note.com, eqctrl), Clawd is essentially all head/body: a stubby wide rectangle with wide-set square eyes, no neck, stub legs. There is no head/body division at all, which is the extreme end of the rule.

---

## 4. Eyes: the main expressive instrument

### 4.1 What each eye size can say

Synthesised from Pixnote, Piximelon, Maglione, Spritegen, sprite-ai:
- **No eyes / one pixel for both (8x8):** identity must come from colour, hat, silhouette. Expression is carried by pose and motion alone.
- **1x1 per eye (8x8-16x16):** minimal, "dot eyes". Reads as neutral/calm/blank. Spacing matters: Spritegen says keep two dark pixels one pixel apart; Piximelon notes one pixel closer or farther can swing stern to vacant. Moving eyes one pixel *lower* in the face reads tired or sleepy (Piximelon); lower in the head also feels younger and cuter (baby schema).
- **1x2 or 2x1 (16x16 standard, per Pixnote):** adds range. Vertical 1x2 reads alert/open/curious; horizontal 2x1 reads flat, sleepy, bored or older (Maglione says horizontal can imply age or disinterest). Squash a 1x2 to a 1x1 and you have a blink or a squint for free.
- **2x2 (32x32 best per Pixnote; also common at 16x16):** room for a highlight pixel plus pupil, i.e. a "lively/shiny" eye. A highlight pixel is the classic cuteness amplifier because it implies wet, wide, attentive eyes.
- **3x3+:** pupil, iris, lid. Needed for anime-style lid work; sprite-ai says a 3x3 eye is roughly the floor for readable anime faces at 32x32.

### 4.2 One-pixel edits that change emotion
- Upper-lid line one pixel lower = angry/determined; one higher plus extra white below = surprised; inner corner dropped = sad (sprite-ai, for 3x3 eyes).
- Pixnote's recipe on one base face: normal (2x2 eyes, 1-2px mouth); happy (eyes become a closed line, mouth up); sad (inner brow raised); angry (V brows, smaller eyes); surprised (larger eyes, round mouth).
- Piximelon: brows, even one pixel, do much of the emotional work. Supporting science: Sadr, Jarudi and Sinha (2003, SEARCH-ONLY snippet) report celebrity recognition dropping from about 60% to 40% when eyebrows were removed, worse than removing eyes, so brows are disproportionately informative. UNVERIFIED beyond the snippet (page blocked, 403).
- Important design rule from sprite-ai: leave spare pixels in the *neutral* face. If the default face uses every available pixel there is nowhere left to move for other emotions.

### 4.3 Eyes in motion
- **Blink:** the cheapest "alive" signal. At 1x2 or 2x2, a blink is a 1-frame squash to 1 row (or a flat line). Pair it with irregular timing (see section 8).
- **Pupil/eye movement:** a one-pixel shift of the whole eye pair left/right/up reads as a glance. Clawd-on-desk implements "eye tracking" as a feature (GitHub README), confirming that eye direction is perceived as attention.
- **Squint:** a 2x2 eye reduced to 2x1 reads as effort, suspicion or happiness depending on mouth/brow.
- **Closed-line happy eyes (^ ^):** upward arc of 3 pixels reads as joy, a very efficient symbol.

### 4.4 Eyes as a state *marker*
In Pac-Man, a ghost that has been eaten becomes a pair of floating eyes heading home (Pac-Man Dossier; Openers interview). The eyes alone are enough to retain the ghost's identity: an excellent proof that two eyes are a sufficient "character".

---

## 5. Cuteness science (Kindchenschema) and what it licenses

**Lorenz's baby schema.** Konrad Lorenz proposed that infant features (large head relative to body, high forehead, big low-set eyes, small nose and mouth, round cheeks, short limbs) trigger caretaking. A 2024 Proceedings B review (title "Lorenz's classic 'baby schema': a useful biological concept?", Royal Society; page 403, abstract seen only in search results) questions how well-defined and how biologically general the concept is. UNVERIFIED details; treat the schema as a *useful design heuristic*, not settled biology.

**Glocker et al. (2009), "Baby schema in infant faces induces cuteness perception and motivation for caretaking in adults"** (Rutgers abstract page, opened): the authors digitally altered infant photos to have high or low baby-schema features (rounder face, higher forehead vs narrower face, lower forehead) and 122 undergraduates rated them. High-schema faces scored higher on cuteness and on desire to care, and low-schema faces lower, with the unmanipulated in between. Experimental evidence that a few proportion changes cause the effect.

**Golle et al. (2013), PLOS ONE, "Sweet puppies and cute babies"** (opened): adapting to less cute faces made test infant faces look cuter, and the adaptation transferred between puppy and human-infant faces, suggesting a shared cuteness-coding mechanism across species. Caveat from the paper: 24 participants per experiment, one species pair, Caucasian faces. Relevance: the response is triggered by *features*, so a non-human crab with the right proportions can trigger it.

**Eye size and cuteness (PMC8786738, SEARCH-ONLY, page blocked).** The paper "Eye Size Affects Cuteness in Different Facial Expressions and Ages" exists, but I could not read results. UNVERIFIED: the common claim "bigger eyes = cuter" probably has an optimum, not a monotone, so do not oversize eyes past the point they read as alien. Test visually.

**Nittono: the power of kawaii (2012, PLOS ONE; summarised via the lab page cplnet.jp, opened).** Looking at cute images was linked with more careful behaviour and narrower attentional focus. Nittono's "two-layer model" says kawaii is a positive emotion tied to the motivation to nurture, amplified by cultural traits (amae, a preference for smallness). Baby schema is one trigger among many, so cute includes round, soft, small, helpless, and *imperfect* things. Design takeaway: Clawd's wobble, stubby legs and clumsiness are cute triggers in their own right, and a tiny cute presence in a status band should lower irritation (e.g. while waiting on a long task) rather than demand attention.

**Practical baby-schema checklist for a rectangle crab:** wide body (low centre of mass), eyes in the lower half of the face, eyes wide-set, no nose, tiny/no mouth, stubby legs, short claws relative to the body. Clawd mostly already satisfies this.

---

## 6. Mascot case studies: what each teaches

### Pac-Man and ghosts (Iwatani)
- Constraints: movable objects were limited to 16x16 pixels, 16 colours from 256 (Openers interview). Rounded shapes were hard.
- Pac-Man has no eyes by design: Iwatani wanted maximal simplicity so each player projects their own image; a colleague proposed adding eyes and he refused, fearing "no end" to additions (SEARCH snippet; Openers: "simple incompleteness"). Arcade Blogger notes he rejected eyes/hair and kept one bold yellow shape.
- Ghosts got pastel colours and expressive blue eyes to avoid alienating women; they are friendly-cute, and each has a distinct movement personality (red chases, pink ambushes, blue mirrors, orange retreats). Personality-through-behaviour on a nearly identical body.
- Lessons: (a) expression can be moved from the face to the *motion* and *behaviour*; (b) leaving a face blank is a legitimate choice; (c) a minimal data set leaves room for imagination, which Iwatani compares to haiku.

### Kirby (Sakurai / HAL)
- Began as a placeholder ball-shaped sprite and was kept; Iwata said the circular design means anyone can draw it (Wikipedia, citing interviews). Original Game Boy limits made him white, though intended pink.
- A designer says Kirby is deliberately neutral so the player projects their emotions onto him, so he avoids strong expressions; and the spacing between eyes, and between eyes and mouth, is held constant even when the body squashes, to preserve cuteness (Wikipedia).
- Lesson: **fixed face geometry, flexible body.** In Clawd terms: keep eye spacing and eye-to-body relationship constant across frames; let the body squash, stretch and hop. Also a warning: a perfectly round shape has no front, so facing direction is hard to read from behind (the 3D problem noted by Wikipedia). A rectangle with side claws has a built-in front and left/right.

### Hello Kitty and the missing mouth
- Tofugu: designer Yuko Yamaguchi says no mouth lets people project their own feelings, so Kitty seems happy when you are; the original designer Yuko Shimizu said she could not draw the mouth cutely and so left it out. Wikipedia: Sanrio says it lets viewers project, and that Kitty "speaks from the heart" (a language argument). Yamaguchi has also said Kitty has a mouth "hidden in the fur" (Wikipedia).
- Caveat in Tofugu: simplicity alone does not guarantee success; other mouthless Sanrio characters flopped, and marketing mattered. Do not over-credit design.
- Lesson: a mouthless face is a *mood mirror*. Eye shape plus posture then carries 100% of the emotion. That fits Clawd perfectly (no mouth at all).

### Mario (Miyamoto, Iwata Asks; retro-replay summary)
- Original Mario was 16x16. A hat saved drawing hair, a moustache saved drawing a mouth ("You don't have to draw a mouth"), different-coloured sleeves/overalls made the arm movement readable with only 3 animation frames, and white gloves made hand motion easier to see.
- Lesson: choose design features that make *motion* legible, not just the still pose. Colour contrast between limb and body (claw vs body, leg vs body) lets 2-3 frames read as a gesture. And limits-as-style: constraints produce iconic marks.

### Tamagotchi
- Tumblr community research (fan-sourced, treat as semi-reliable): on the original device, non-baby characters animate inside a 16x16 block, share about six idle movement patterns across the whole roster, eating uses 4 or 6 frames, and main interactions keep the character centred.
- Lesson: a small pool of shared animation *patterns* with different faces/silhouettes yields many personalities cheaply; personality is a thin layer on top of a shared skeleton. Reuse patterns across Clawd's states.

### Rilakkuma and San-X
- Aki Kondo designed a bear that loves to relax, from her own office fatigue; deliberately sloppy posture, a back zipper (hint of a costume) and a calm, warm palette (japan-figure.com, SEARCH snippet for origin; Wikipedia pages not fetched). The character is always lounging/napping/eating.
- Lesson: personality is a **default posture and a repeated activity**. A character defined by "relaxed" is cute because it embodies a feeling rather than a feature.

### Mameshiba
- Beans, legumes and nuts with dog faces (Wikipedia). The pun name, a trivia hook and a large cast made them collectable; the faces are tiny dot-eyes and simple mouths on an object-shaped body.
- Lesson: you can put a minimal face onto *any* simple object and make it a character; the face is a small sticker on the form. Contrast principle: unexpected face on an expected shape (dog face on a bean) is a charm mechanism.

### Emoji and tiny chat icons
- Makeemoji: design a separate small version per target size; a hand-tuned 28px emote can beat a down-scaled 112px; check gaps between eyes, mouth and outline remain clear; integer scaling adds no detail, so if the expression is unclear fix the source. Check the outline on light and dark backgrounds. Slack/Discord icon guidance (SEARCH-ONLY blogs) advises checking at about 20-24px and using 4-16 colours.
- Lesson: author at the target size. For Clawd in a terminal band, draw at the actual cell grid, not a bigger one scaled down.

### Claude Code's Clawd (what is documented)
- Anthropic documents almost nothing officially (note.com article; mentions a GitHub issue asking for an introduction; UNVERIFIED specifics). Observed facts from that article and fan/third-party sources: an orange pixel crab made of stacked squares, two black dot/square eyes, side claws, stubby legs; official emoji is the crab; Anthropic social accounts post animations (looking around, flag, dumbbells, confetti); the name plays on Claude + claw; ambiguity of species (crab, octopus, robot, blob) is part of its charm. Eqctrl's Clawdius page (a fan derivative) reports body colour #DA7758, wide-set square eyes, and sixteen faces generated from one pair of eyes on a pixel grid, i.e. the expression system is eyes-only.
- Clawd-tank (marciogranzotto, GitHub): authored as animated SVG, rendered to PNG frames at 8 fps and scale 4 in the example, with named states: thinking, typing, building, conducting, confused (waiting 60s+), sweeping (compaction), dizzy (API error), happy, alert, sleeping. Clawd-on-desk (README): 12 states, eye tracking, click reactions, mini mode peeking from screen edge. These show a community consensus that **state = a distinct pose/activity + prop, on the same body**, which is exactly what Clawd needs.
- Trademark note: Anthropic owns the Clawd character; fan projects are unofficial.

---

## 7. Posture and body language in a few pixels

- Pixnote: at 16x16 arms should be 1px wide (2px merges with the torso); stick-figure the pose first and add bulk; three views (front idle, 3/4, side).
- Spritegen: keep limbs at least 2px wide so they do not flicker in animation, and avoid stray single pixels. These two numbers disagree on limb thickness (1 vs 2) because they address different issues: 1px arms inside a torso context versus limbs that must survive animation. Resolution: thick limbs when they move independently, thin when attached and static; test in motion.
- Posture is the cheapest emotion channel after eyes: **height** (body drops 1px = tired/sad; rises = excited/proud), **tilt/lean** (forward = effortful or curious, backward = surprised), **limb position** (claws up = cheer or alarm; claws down/together = calm or sad; one claw raised = greeting or question), **squash** (wide-flat = relaxed or heavy; tall-narrow = alert).
- Weight is perceived from timing: heavy things ease in and out; light things pop.

---

## 8. Personality via idle behaviour

- Sandro Maglione (animation guide): a 16x16 idle can be 4 frames, moving the body 1px down and back; delaying a secondary element (hair) one frame behind the body gives a floaty, following feel. No fps given by the source.
- Saint11 (Pedro Medeiros) has a Patreon tutorial on idles noting that slow idle motion may need sub-pixel (less than 1px) movement (SEARCH snippet; page 403, UNVERIFIED details). Practical approximation at 1px resolution: change a *shading* pixel or a single secondary part instead of moving the whole body.
- LA Film School piece on Disney's principles: secondary action should "whisper, never shout"; anticipation cues what is coming; exaggeration must be a deliberate choice; appeal is about how the eye finds information.
- Pixnote timing: 100-150 ms per frame (7-10 fps) for walk cycles at this size. Clawd-tank example uses 8 fps.
- Idle personality recipes (synthesis, mine, not from a single source): irregular blink (every 2-6 s, never metronomic), occasional look-around (eye pair shifts 1px for 300-600ms), small breathing bob (1px, 1-1.5 s period), rare "fidget" (one claw twitch) every 8-15 s. Irregularity matters because perfectly periodic motion reads as mechanical, while randomised micro-events read as thoughtful.
- Tamagotchi's six shared idle patterns show that even a very small repertoire is enough when each plays at a different tempo.

---

## 9. Palette and limits-as-style

- Pixnote: 2-3 colours per part, 6-12 colours total per character. Spritegen: 3-4 per material in a shadow-base-highlight ramp; hue-shift shadows cooler. Derek Yu: 16 and 32-colour palettes are common; start from a small palette, since swapping later is easy. Emoji guidance: 4-16 colours.
- Clawd's case: one saturated orange body (#DA7758 per the Clawdius page) plus near-black eyes is a 2-colour character; every extra colour (hat, prop, effect) should be earned. A single accent colour per state keeps the silhouette stable.
- Derek Yu: colour often defines features better than outlines (Mario's moustache, sleeves, overalls). Avoid anti-aliasing the exterior when the background is unknown.
- Limits become style: Kirby's white-on-Game-Boy, Mario's hat and moustache, Pac-Man's pastel ghosts on black were all hardware limits that became identities. Principle: **name the limit and lean into it** (e.g. "Clawd is made of squares only, no curves", from note.com), rather than hiding it.

---

## 10. Tensions and deliberate rule-breaking

1. **Blank vs expressive faces.** Pac-Man, Hello Kitty and Kirby deliberately minimise expression so players project; Slack/anime sprites maximise it. Pick per use: a status mascot you glance at for state wants *legible* state, but a blank default is fine if posture and props carry the state.
2. **Bigger eyes = cuter, until uncanny/alien.** Optimum unknown (UNVERIFIED); test by eye.
3. **Symmetry vs one off pixel.** Piximelon: start symmetric, then add one deliberate asymmetry (raised brow, a scar) which at tiny sizes reads as character. Counter: asymmetric eyes on a 2-eye face may read as a rendering glitch, so make it clearly intentional (a wink, a lowered brow).
4. **Outlines vs room for shading** (Derek Yu). At 16px skip the outline or use a single dark colour only where contrast needs it.
5. **Round shapes vs facing direction** (Kirby 3D). Squares give orientation.
6. **Simplicity does not guarantee appeal** (Tofugu: other mouthless Sanrio characters flopped). Appeal also needs charming proportions, clear personality and context.
7. **1px vs 2px limbs** (see section 7).

---

## 11. Translation to a tiny crab (concrete ideas for Clawd)

Assumptions: Clawd is a wide rectangular body, two claws, two eye dots, short legs, no mouth, orange with dark eyes, drawn as SVG rects.

**Eye vocabulary (the main expressive system)**
- Default: two 1x2 vertical eyes, wide-set, positioned slightly *below* the body's vertical midpoint (baby schema), with at least one empty pixel above them reserved for lids/brows.
- Blink: 1x2 to 1x1 for 1 frame (about 100-150 ms), irregular intervals.
- Thinking: eyes shifted up-and-to-one-side by 1px, optional single-pixel "brow" above the higher eye (one raised brow = puzzled); plus a small dots-or-bubble prop.
- Typing/focused: eyes squashed to 2x1 (flat, determined) or looking down 1px toward the work.
- Happy/done: closed-arc eyes (3px upward ^) plus claws raised.
- Sleeping: eyes become 2x1 flat lines, body lowers 1px, slow 1px breathing, tiny "z" prop.
- Surprised/alert (permission request, error): eyes enlarge to 2x2 or add one pixel of height, body rises 1px, claws up.
- Sad/dizzy/cache out: eyes drop 1px and widen apart, claws down; or X/spiral eyes for dizzy.
- Confused (waiting long): eyes at different heights by 1px, a slow tilt.
Because there is no mouth, never rely on a mouth for state; if a mouth is wanted, a single pixel under the eyes works only for "oh" (surprise) and should be a special-case.

**Shape and proportion**
- Keep the body rectangle as the invariant silhouette; vary only claws and legs per state. Keep eye spacing fixed (the Kirby rule) and let the body squash 1px for landings or effort.
- Claws are the expressive limbs: both up (cheer), one up (hello/question), both forward (typing), tucked (sleep). Give claws a distinct darker or lighter tone from the body for readability while moving (the Mario sleeve rule).
- Legs: short stubs alternating 1px for jogging; keep feet on the same row (Pixnote) and bob the body 1px on the passing frame.

**Idle and personality**
- Establish "relaxed but diligent" (Rilakkuma energy plus a work ethic): slow 1px breathing, irregular blink every 3-6 s, occasional glance, rare claw fidget. Use randomised, not fixed, timers.
- Use secondary action for polish: antennae or a stray pixel following the body one frame late (Maglione's hair trick).
- Per-state accent prop (hat, headphones, bubble) on the same body, as clawd-tank and clawd-on-desk do. Props must not break the silhouette badly.

**Limits and palette**
- Body colour, eye colour, plus at most 1-2 accent colours at a time. Treat squares-only as a feature.
- Author at the actual displayed grid, check at final size on light and dark backgrounds (Makeemoji).
- Test with: solid-black silhouette, flipped, desaturated, and at half size.

**Judgment checklist for agents**
1. Does the state read from silhouette plus eyes alone at final size?
2. Is there a spare pixel in the neutral face to move for other emotions?
3. Is each added pixel earning a job (state, motion legibility, or identity)?
4. Is the idle irregular, or does it look metronomic?
5. Did I keep identity constants (colour, eye spacing, outline) across states?
6. Am I overacting? Subtle one-pixel changes are the more convincing at 16px, and a bigger change should be reserved for one-shot events (done, error).

---

## Source list (title, author, URL, what I took)

1. Pixel Art Tutorial: Basics, Derek Yu, https://www.derekyu.com/makegames/pixelart.html - responsibility per pixel, chibi for expression, colour over outline, flip/desaturate test, palettes.
2. Pixel Art Faces: Eyes, Hair and Expression at Tiny Sizes, Piximelon, https://piximelon.com/guides/pixel-art-faces/ - 2-4px eyes, lower = tired, brows, asymmetry.
3. Pixel art eyes design, Sandro Maglione, https://www.sandromaglione.com/articles/pixel-art-eyes-techniques-and-styles - eye layouts by size, horizontal vs vertical personality.
4. Pixel art Character Animations guide, Sandro Maglione, https://www.sandromaglione.com/articles/pixel-art-character-animations-guide - 4-frame idle, delayed secondary.
5. How to Draw Pixel Art Characters, Pixnote, https://pixnote.net/en/learn/character/ - head ratios by size, eye sizes, expression recipes, limb widths, timing, colour counts.
6. How to Draw a Pixel Art Character (16x16 and 32x32), Spritegen, https://spritegen.io/guides/how-to-draw-a-pixel-art-character/ - silhouette first, head 40-50%, palette ramps, limb widths.
7. Anime pixel art: the JRPG tradition that never left, sprite-ai, https://www.sprite-ai.art/blog/anime-pixel-art - eye size floors, one-pixel emotion edits, spare pixels rule.
8. How to Make Pixel Art Emojis That Don't Blur, makeemoji, https://makeemoji.com/blog/how-to-make-pixel-art-emojis - per-size redraws, integer scaling, background checks.
9. Baby schema in infant faces induces cuteness perception and motivation for caretaking in adults, Glocker et al. 2009 (abstract page), https://www.researchwithrutgers.org/en/publications/baby-schema-in-infant-faces-induces-cuteness-perception-and-motiv/ - experimental baby-schema evidence.
10. Sweet Puppies and Cute Babies, Golle et al. 2013, PLOS ONE, https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0058248 - cross-species cuteness adaptation.
11. Psychology of kawaii and cuteness, Nittono lab, https://cplnet.jp/en/kawaii/ - two-layer model, careful behaviour, beyond baby schema.
12. The Power of Kawaii, Nittono et al. 2012, https://journals.plos.org/plosone/article/file?id=10.1371%2Fjournal.pone.0046362&type=printable - SEARCH-ONLY (not opened); relied on #11 summary.
13. Lorenz's classic 'baby schema': a useful biological concept?, Proc. R. Soc. B 2024, https://royalsocietypublishing.org/rspb/article/291/2025/20240570/104592/Lorenz-s-classic-baby-schema-a-useful-biological - SEARCH-ONLY (403); noted as critical review.
14. Eye Size Affects Cuteness in Different Facial Expressions and Ages, https://pmc.ncbi.nlm.nih.gov/articles/PMC8786738/ - SEARCH-ONLY (blocked); UNVERIFIED findings.
15. The Role of Eyebrows in Face Recognition, Sadr, Jarudi, Sinha 2003, https://journals.sagepub.com/doi/10.1068/p5027 - SEARCH-ONLY (403); recognition drop 60% to 40% from snippet, UNVERIFIED.
16. The Secret Behind Hello Kitty's Blank Face, Tofugu, https://www.tofugu.com/japan/hello-kitty-face/ - projection, Shimizu's practical reason, counterexamples.
17. Hello Kitty, Wikipedia, https://en.wikipedia.org/wiki/Hello_Kitty - Sanrio statements, mouth "hidden in the fur".
18. Pac-Man Turns 40: Interview with Toru Iwatani, Web Magazine OPENERS, https://openers.jp/en/design/design_features/4CoXi - constraints, ghost design, haiku-like minimalism.
19. The Development of Pac-Man, Arcade Blogger, https://arcadeblogger.com/2016/03/12/the-development-of-pacman/ - refusal of eyes, ghost personalities.
20. The Pac-Man Dossier, Jamey Pittman, https://www.gamedeveloper.com/design/the-pac-man-dossier - ghost eyes after being eaten.
21. Kirby (character), Wikipedia, https://en.wikipedia.org/wiki/Kirby_(character) - placeholder origin, neutral face, fixed eye spacing.
22. Iwata Asks: The Reason Mario Wears Overalls, Nintendo, https://www.nintendo.com/en-gb/Iwata-Asks/Iwata-Asks-New-Super-Mario-Bros-Wii/Volume-1/2-The-Reason-Mario-Wears-Overalls/2-The-Reason-Mario-Wears-Overalls-210759.html - Miyamoto on 16x16 Mario.
23. Mario's Mustache Was a Hardware Trick, Retro Replay, https://retro-replay.com/marios-mustache-was-a-hardware-trick/ - secondary summary of #22.
24. Understanding Comics, Scott McCloud (Wikipedia summary), https://en.wikipedia.org/wiki/Understanding_Comics - icon vs realism, masking.
25. Tamagotchi original sprites Q&A, osumesu21 on Tumblr, https://www.tumblr.com/osumesu21/688600279315316736/hey-do-you-know-if-in-the-original-tamagotchi - 16x16 block, shared idle patterns (fan source).
26. Meet Rilakkuma characters, japan-figure.com, https://japan-figure.com/blogs/news/rilakkuma-characters - design traits; origin from a search snippet.
27. Mameshiba (franchise), Wikipedia, https://en.wikipedia.org/wiki/Mameshiba_(character) - bean+dog-face concept.
28. Clawd: The crab created by Anthropic, but left unexplained by Anthropic, tank_ai on note.com, https://note.com/tank_ai/n/n638e16789879?hl=en - Clawd description, squares only, official animations.
29. clawd-tank, marciogranzotto, https://github.com/marciogranzotto/clawd-tank - SVG pipeline, state list, 8 fps example.
30. clawd-on-desk, rullerzhou-afk, https://github.com/rullerzhou-afk/clawd-on-desk - 12 states, eye tracking; fan project.
31. Clawdius, eqctrl, https://eqctrl.io/clawdius - Clawd colour, wide-set square eyes, eyes-only expressions (fan derivative).
32. Twelve Principles, Ninety Years Later, LA Film School, https://www.lafilm.edu/blog/twelve-principles-ninety-years-later-what-disneys-animation-rules-still-get-right/ - secondary action, anticipation, exaggeration.

Failed or blocked fetches: Royal Society (403), SAGE (403), PMC (bot check), MakerWorld Clawd 3D model (403), Patreon saint11 (403), the-pixel.art (403), Nintendo iwataasks.nintendo.com (certificate error; used the nintendo.com mirror), hamiltoncs.org (500). Mameshiba and Slack-specific design interviews were not found; Slack/Discord emoji guidance relies on third-party blogs.
