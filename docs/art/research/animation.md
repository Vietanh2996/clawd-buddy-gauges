> **Raw research notes (unrefined).** Written 2026-11-25 by a research agent for the Clawd art KB: Animation for tiny sprites. Claims are paraphrased with sources; UNVERIFIED markers matter. The refined, cross-checked synthesis is in [../README.md](../README.md); where they disagree, trust the refined modules and [../references.md](../references.md).

# Animation for tiny sprites (8-32px): research notes for Clawd

Scope: Disney's principles at 2-8 frames, timing and spacing, squash and stretch at 1px scale, anticipation, follow-through, smears, holds, easing, idle loops, blinks, sub-pixel animation, why some 2-frame loops feel alive. Notes are paraphrased. Sources are listed at the end with what I took from each. Claims marked UNVERIFIED rest on one weak source or on a search snippet only.

A caveat up front: most of the numeric guidance found online comes from SEO-style guide sites (Sprite AI, PiXiMelon, SpritePilot, NeatForge) with no named author. They agree with each other and with primary sources (Slynyrd, Saint11 snippets, Williams), so I treat the consensus as reliable but the exact millisecond figures as starting points, not laws.

---

## 1. The big picture: at tiny scale, timing beats drawing

The single most repeated finding: with 2-4 frames and 1px changes, how long each frame stays on screen and how far things move matter more than how many frames you draw.

- Sprite AI's frame-budget article says only three of the twelve principles translate directly to small sprites: squash and stretch, anticipation, follow-through. Its guide on principles ranks timing first and says uneven timing is what separates amateur sprite animation from professional work.
- Equal frame durations are called "mechanical timing" by several sources. Motion that changes speed reads alive; constant rate reads like a machine.
- The same drawings can feel completely different at different playback rates: an 8-frame walk at 12 fps loops in about 0.67 s (a stride), at 24 fps in about 0.33 s (a shuffle) (Postma/spritesheetgenerator).
- Think in milliseconds per frame, not fps (Sprite AI). 4 fps = 250 ms, 6 fps ~ 167 ms, 8 fps = 125 ms, 12 fps ~ 83 ms.

Why it works (my synthesis): at 16px there are few pixels to carry information, so the channel that is free is time. A held frame costs zero pixels and communicates weight, intent, and mood. Disney's "timing" principle says exactly this: the number of drawings controls speed and mood (Wikipedia summary of the 12 principles).

---

## 2. Frame budgets and rates

| Loop | Frames | Per-frame time | Source |
|---|---|---|---|
| Idle / breathing | 2-4 | 300-800 ms (400-500 typical) | Sprite AI x2, PiXiMelon (4-6 fps = 167-250 ms) |
| Walk | 4 (small) to 6-8 | 80-150 ms | Sprite AI, Postma |
| Run | 6-8 (4 works) | 50-100 ms | Sprite AI; Slynyrd |
| Jump | 3-5 | launch 60-80, apex hold 120-180, land squash 80-120 ms | Sprite AI |
| Hit reaction | 2-3 | fast | Sprite AI |
| Attack | 3-6 | wind-up 80-200, strike 30-60, recovery 80-150 | Sprite AI |

Key supporting facts:
- A 16x16 sprite lacks the pixels to show differences between many walk frames; later frames end up near-identical, so extra frames are wasted. Celeste's run is cited as 4 frames (Sprite AI; UNVERIFIED beyond that article).
- Frame cost multiplies: 4 directions x 6 animations x 8 frames = 192 drawings (Sprite AI). For a one-person project, a budget is a design tool.
- Slynyrd's run-cycle reduction: an 8-frame cycle at 80 ms per pose was cut to 6 (drop the recoil frame, similar to contact), then 4 (drop the high point), with each pose shown 160 ms in the 4-frame version so loop duration stays about equal. Energy survives because the strong key poses survive. Lesson: reduce frames by deleting the weakest drawing, and lengthen the survivors.
- Mega Man style 3-drawing run: two stride poses plus a pass pose that plays twice (so 4 beats from 3 drawings).
- Game Boy era: Link's walk is often 2 frames, the second being the first mirrored; Pokemon Gold/Silver walk is 4 beats from 2 unique drawings, idle frame appearing twice (Niko Uusitalo). The bike has 1px shifts for head, pedal, wheel. Hardware limits forced re-use, and players did not notice.
- Past about 12 frames is rarely worth it at small sizes (Postma).
- Gen 5 Pokemon idles used part-based transforms (translate/rotate/scale of cut-out pieces) rather than redrawn frames; loops were about 1.5 s, many frames held for 2 beats at 50 ms ticks, a common loop that plays 3x then a rarer loop, both starting and ending on the resting pose (Oripoke). Speed could change by status (slower when sick) — a neat precedent for Clawd changing tempo with load.

Tension: Hyper Light Drifter-style forum remarks note frame counts vary per animation by need, and that a later 60 fps engine update did not add frames to cycles (NeoGAF/Steam forum snippets, UNVERIFIED). Frame count is independent of screen refresh.

---

## 3. Timing and spacing

Spacing = distance between successive positions; timing = how long each stays. At pixel scale spacing is quantised to whole pixels, so you shape speed with (a) pixel offsets like 1,2,3 and (b) frame durations.

- Equal gaps read as constant speed (a glide); widening gaps read as acceleration; bunching reads as deceleration (PiXiMelon). Onion-skin check: even gaps between red/current/blue ghost = even speed.
- A worked fall (SpritePilot): top edge moves 3, 5, then 9 px over frames 1-4 (growing gaps), squash on frame 5; the rise reuses the fall frames in reverse. NeatForge's 32px bounce: 1-2 px, then 3-4 px, gaps growing until impact.
- Key frames first, then test pacing by duplicating key frames to feel how long the gap is before deciding on 0, 1, or 3 inbetweens (r1k, Pixel Joint forum thread). Too many inbetweens makes motion look sluggish; the motion should read from the keys alone (Slynyrd). Old 8-bit games used keys only.
- Williams' pendulum structure (via a book summary): motion swings between anticipation and recovery, and contact drawings are set first because they fix speed and scale. Williams says avoid pauses without a reason, and when you pause, make it count (sobrief summary; page paraphrase, not Williams' exact words).
- Frame-rate conventions: pixel art 8-12 fps ("animating on twos" = 12 fps), slow ambient loops about 6 fps, fast action 12 fps (NeatForge, Pixel Overload).

---

## 4. Slow in / slow out with few frames

Ease-in/out classically = more drawings near extremes, fewer in the middle. With 2-4 frames you cannot add inbetweens, so:

1. Hold extreme frames longer, play the middle fast. Sprite AI: hold first and last frames, play the middle quickly, using timing alone since pixel spacing cannot be fine. Postma agrees: holds give weight and emphasis with no new art, and the eye lingers on the pose you want noticed.
2. Duplicate frames where the engine lacks per-frame durations: two 60 ms copies equal one 120 ms frame.
3. In whole-pixel spacing, step 1, 2, 3 px (or the reverse). Pixel Overload: reduce per-frame distance exponentially near start/end.
4. Overshoot: go 1px past the target and settle back; adds life (Pixel Overload).

Sprite AI example (4-frame attack): wind-up 150 ms, anticipation peak 200 ms, strike 50 ms, recovery 120 ms. The long hold before a very fast strike is the contrast that makes the hit feel heavy. Rule of thumb: anticipation frames 120-200 ms, action 30-60 ms, follow-through 80-150 ms, return 60-100 ms.

---

## 5. Squash and stretch at pixel scale

- Magnitude: 1-3 px shifts; at 16px, 1px of height is about 6 percent, visible. Sprite AI's jump example for a ~14px character: anticipation frame 12-13 px tall and 1 px wider; launch frame 15-16 px tall and 1 px narrower. Postma: landing = 1px wider, 1px shorter, for one frame, then recover.
- Volume rule: width x height stays roughly constant (area of an ellipse is a constant times w x h). SpritePilot's numbers: a 24x24 ball (576 px) squashed to 16 tall wants about 36 wide; squashing to 16 tall without widening leaves two-thirds of the area and reads as shrinking. Aim within ~10 percent; if a squash looks wrong, count pixels, it is usually too small. On a 16x16 ball, squash to 12 tall needs about 21 wide.
- Squash on the contact frame, from the contact point (bottom pivot), so the feet stay on the same row. Stretch only on the fastest frames just before and after impact, not at the apex.
- One frame is enough for stiff things; two frames of squash suggest something soft that takes time to recover, like a slime or sack (SpritePilot, snippet-level summary elsewhere).
- Amount by material: a bowling ball loses 1-2 px; a water balloon half its height.
- Why it works: the deformation lasts only a frame or two, so the eye reads energy without registering the deformation (Sprite AI). Removing it, a jump feels wrong though viewers cannot say why. Madeline's squash in Celeste is described as 1px in each axis (Sprite AI; secondary claim, UNVERIFIED against Celeste's artists).
- Trick attributed to Saint11 (UNVERIFIED, via a developer's Medium post seen only as a search snippet): draw the squash frame at the start of a jump but have the character already leave the ground on that frame. It reads as anticipation but keeps the response snappy. Relevant to anything reactive, like a status band, where latency matters.
- Exceptions: static objects, UI, background, town NPCs need none. For a 14px-tall figure exaggeration beats accuracy: NeatForge says subtle changes at 32x32 are nearly invisible; PiXiMelon says exaggeration reads better than accuracy.
- Eye blink as squash: squash the eyes, do not redraw them (PiXiMelon).

---

## 6. Anticipation

- One frame of counter-movement before the main action: crouch before jump, pull back before punch (nearly every source). Sprite AI calls it non-negotiable and notes it also telegraphs enemy attacks so players can react.
- It works because it points the viewer's attention to where the action will go and makes motion feel grounded (Postma). Williams frames anticipation as one end of a pendulum.
- Frame cost: 1 frame, 120-200 ms hold; a 2-frame crouch makes a player jump feel instant (Sprite AI).
- Tension: for reactive UIs, anticipation adds latency. Use very short anticipation (1 frame, 60-80 ms), or fold it into the squash-and-launch trick above, or use anticipation only for non-urgent state changes (falling asleep, celebrating), not for the response to a keypress.

---

## 7. Follow-through, overlapping action, secondary motion

- Follow-through scales with pixels: at 32x32, 1-2 extra frames for hair/cape/tail/ears; at 16x16, about 1px of trailing; at 8x8 skip it (Sprite AI).
- Overlap = parts on different timing. A loose part lags 1-2 frames behind the body (Postma; PiXiMelon: hair tips, capes, weapons lag one frame behind the torso, which separates "breathing" from "bobbing").
- Drag in the Wikipedia summary: parts of a figure lag a few frames behind the main body.
- Secondary action should reinforce the main action and not compete (Wikipedia). Dust, cloth, particles add cause and effect (Pixel Overload).
- Cheap trick: a 1px body bob plus a 1px lag on an appendage is more effective than redrawing the torso (PiXiMelon).

---

## 8. Smear frames and motion blur at pixel scale

- A smear frame is one frame that distorts or multiplies the subject to fake motion blur. Four classic forms: elongated inbetween (stretch over 1-2 frames; the term is from Williams' book), multiples (copies along the path), duplicated trailing parts, and trails or blobs (Wikipedia "Smear frame"; CGWire).
- At 32x32 and below, a 2px colour trail can work (Sprite AI); one frame at fast moments only. Tools offer trail lengths 1-24 px (mst_9's extension), and a dithered fade-out to thin the tail.
- Smear on the fastest frame only, placed near top speed, with ease before and after (Clip Studio tip by pokebattler).
- Overuse clutters and confuses (CGWire). Early games rarely used them due to hardware.
- Do not resize to smear: resizing blurs pixels; extend existing pixels with existing palette colours.
- Pixel-scale version for a claw: on the one fast frame of a snap, extend the claw 1-2px along the motion and leave the shadow/body alone.

---

## 9. Holds and moving holds

- Holds: a single held frame before a punch; a 2-frame pause at landing (Postma). Hold impact and apex frames longer to sell weight (Sprite AI).
- Moving hold (Disney principle): a character that must be still gets subtle drift so it does not look dead; Wikipedia gives breathing as the example. In pixels: a pose "hold" has a 1px breath, an eye-dot blink, or an appendage micro-shift, never a frozen frame.
- Stillness reads as broken in games (PiXiMelon). Players rarely notice a good idle but notice if it is missing (Sprite AI).
- Williams' caution: do not pause without a reason. A hold needs a story: thinking, waiting, listening.

---

## 10. Idle and breathing loops

Recipes that are consistent across sources:

- 2-frame: body down 1px, hair/cape opposite 1px, 400-500 ms each (Sprite AI). The itch.io idle tutorial (JIK-A-4): frame 2 raises hands 1px and lowers head 1px, frame 3 lowers the whole body 1px; play 1-2-3-2 (inferred, wording ambiguous). Everything is 1px.
- 3-4 frame: rest, inhale/bob peak, return (mirror of frame 1 or held), optional settle (PiXiMelon). Play at 4-6 fps; hold the first frame a bit longer so the loop feels relaxed rather than twitchy.
- Pick two of {breath, bob, blink} and put them on different periods (e.g. a 4-frame breath plus a blink every few loops). Synchronised everything looks mechanical.
- Keep feet planted; animate upper body. Layer moving parts over a shared static layer so the still parts do not jitter.
- Build idle, walk and hit from one shared rest pose so transitions are seamless (PiXiMelon).
- Saint11's idle tutorial (only seen via search snippet because Patreon is gated, UNVERIFIED in detail): warns against bouncing too much; since idle moves little or slowly, under-1px movement may be needed, and he links his sub-pixel tutorial.
- Do not tween an idle: a YouTube Short title says so (seen as a search result only; UNVERIFIED content). Consistent with the Game Boy precedent of discrete poses.
- Idle in third-person games is long to avoid looking robotic (Wikipedia Idle animation; UNVERIFIED, flagged as lacking citations).

---

## 11. Blinks and gesture sequencing

- Blink: 1 frame, eyes squashed or filled with skin/body colour, every 2-4 s of loop time; more frequent blinking reads nervous (PiXiMelon FAQ). Offset from breathing, do not align with the breath peak.
- Real-world numbers are not sourced here: I found no source giving per-blink milliseconds beyond "one frame". Treat 80-150 ms as plausible (UNVERIFIED, my inference from frame durations above).
- Sequencing a gesture: anticipation (hold) then fast action (1-2 frames) then overshoot/settle then return to rest. Use Williams' pendulum: crouch, go, recoil. The Sprite AI attack sample above gives the shape of timing: 150/200/50/120 ms.
- Gen 5 Pokemon: two loops per creature, common and rare, so repeated viewing does not become stale (Oripoke). A cheap way to add personality: a rare 'gesture' every N idle loops.
- Randomise or vary intervals a little so the blink does not metronome. (Inference; consistent with offset-period advice.)

---

## 12. Looping seamlessly

- The last frame must flow into the first: end on the start pose, or pass through it mid-cycle (PiXiMelon). Symmetric motion (down then up) hides the seam.
- Ping-pong (1-2-3-2) reuses frames: fewer drawings, perfectly smooth turnarounds, and naturally eased because the extremes are visited once per half-cycle but the middle twice.
- Looping exposes every orphan pixel and badly-clustered shape, so clean pixels matter more in animation (Slynyrd, Intro to Animation).
- Preview the loop in motion; the seam only shows in motion, not when scrubbing.
- Pokemon B/W loops all start and end on the resting pose so any loop can chain to any other (Oripoke).

---

## 13. Sub-pixel animation

- Idea: whole-pixel movement is jerky for slow drift; fake a half-pixel by moving interior colour/shading while keeping the silhouette on the grid. Tools: ODD FERRY's extension moves outlines by whole pixels and shifts highlights by 1/2, 1/3 or 1/4 pixel, using only colours already in the sprite. locpixel's does the same, keeping the silhouette crisp while shading moves inside.
- Brandon (Tiny Warrior Games): add an in-between frame and smear two positions together, each colour/part separately, so a pixel looks wider for a frame; works better on larger sprites and on low-detail areas.
- Pixel Overload: half-pixel movement via intermediate shades gives smooth subtle movement for idles.
- Saint11 has a tutorial on movement under 1px (2017, Patreon; content not read).
- Limits: needs at least 2-3 tones in the area; at 16px with a 4-colour palette there may be no spare shade. Dithered/fade edges can look noisy on the silhouette.

---

## 14. Why 2-frame animations feel alive or mechanical (synthesis)

Alive when:
1. Durations are unequal (a hold on rest, brief on peak).
2. Different parts move on different periods or lag by a frame (body 1px, appendage 1px later).
3. The motion has a reason (breath, weight shift, attention) and a direction that matches the character's state.
4. The loop contains a rare event (blink, twitch) so it is not perfectly periodic.
5. Delta is small and located on a feature that reads as intentional (eye, claw tip), not the whole sprite jumping.
6. Volume is preserved if the shape is deformed.

Mechanical when:
1. Equal durations, equal 50/50 toggle.
2. Whole sprite shifts together as one rigid block.
3. Everything on the same period (bob + blink + claw wiggle in sync).
4. Amplitude too big for the sprite (pogo-stick bounce; Sprite AI warns against bouncing too much in idle).
5. Distortion without volume conservation, which reads as a size change or glitch.
6. Missing anticipation or settle: it starts and stops instantly.

---

## 15. Translation to a tiny crab (Clawd)

Concrete, testable ideas. Numbers assume a ~16-24px-wide crab; adjust.

1. **Breathing idle (2 frames + hold).** Body down 1px for 500-600 ms, up for 400 ms. Claws lag by one beat: claw tips move 1px the opposite way on frame 2. Feet and shadow never move.
2. **Blink.** Eye dots collapse to 1px high for exactly one frame (~100 ms) every 3-5 s; vary the interval ±1 s; never on the breath peak. Never blink during a typing burst (attention is on the task).
3. **Thinking.** A moving hold: one claw lifts 1px on a 700 ms beat; eyes look up by shifting dots 1px; the body stays at rest. Add a slow secondary: an optional antenna or a single "thought" pixel pulsing at a different period (e.g. 900 ms vs 600 ms) so the pair never sync.
3b. **Typing.** Alternate claws in a 2-frame pattern of 80-100 ms with the long body fixed; add a 1px body kick on every third strike (irregularity avoids a metronome). Vary one claw's frame to be 1 tick shorter.
4. **Jogging.** 4 beats from 2-3 drawings: contact, passing (reused twice, Game Boy trick), 80-120 ms per beat; body bob 1px; claws swing opposite to legs with a 1-frame lag. For a crab, sideways scuttle: legs alternate in pairs; mirror a single asymmetric drawing for the second half.
5. **Celebrate.** Anticipation: a 1-frame crouch (body 1px lower and 1px wider, 120 ms). Launch: 1px taller/narrower, claws up (60-80 ms). Apex: hold 150 ms. Land: squash for one frame (80-100 ms; two frames for soft), then settle. Optional 2px trail only on the launch frame as a smear.
6. **Sleeping.** Slower and larger periods: 1 s down, 1.2 s up; eyes become a 1px line; no blinks; maybe a "z" with sub-pixel drift. Use asymmetric dwell: long at the bottom (exhale hold).
7. **Cache-out / alarm states.** Use anticipation sparingly: a single 1-frame flinch (1px squash) is enough; avoid long wind-ups for urgent events because they add latency.
8. **Transitions.** Build all states from one rest pose so any state can cut back to idle seamlessly (PiXiMelon). Entering a state = 1 anticipation frame; leaving = return through rest pose.
9. **Rare loops.** Borrow the Pokemon B/W common/rare structure: the idle plays several times, then occasionally a rare variant (claw clack, look-around, tiny yawn). Keeps a status band alive without drawing lots.
10. **Tempo as data.** The Pokemon engine slowed animation for status effects; Clawd could change beat length with load (idle 600 ms, busy 300 ms) rather than adding frames. Cost: zero pixels.
11. **Pixel budget check.** At 1px per move, test the animation blurred or at 1x: if the change is invisible at a glance, double the amplitude instead of adding frames (NeatForge, Sprite AI: exaggerate).
12. **Do not** squash static UI, apply follow-through at 8px, or sync every motion to one clock.

---

## Sources (title, author, URL, what I took)

1. **Twelve basic principles of animation** — Wikipedia, https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation. Opened. One-line definitions: moving hold (breathing), drag, slow in/out, secondary action, timing.
2. **The 12 animation principles adapted for pixel art sprites** — Sprite AI (no author), https://www.sprite-ai.art/guides/animation-principles. Opened. Timing table; 1-3px squash with 12-13px/15-16px jump numbers; follow-through scaling by size; staging blur test.
3. **Sprite animation frames: how many do you actually need?** — Sprite AI Team, https://www.sprite-ai.art/blog/sprite-animation-frames. Opened. Frame budgets by animation, 192-frame cost example, phase timing, duplicate-frame holds.
4. **How to animate pixel art: walk cycles, idles, attacks** — Sprite AI, https://www.sprite-ai.art/guides/how-to-animate-pixel-art. Opened. 2-frame idle recipe, 400-500 ms, 2px smear trail at 32px, walk bob 1px.
5. **Pixel Art Animation Basics: Timing, Spacing and Loops** — PiXiMelon, https://piximelon.com/guides/pixel-art-animation-basics/. Opened. Spacing-as-speed, volume-preserving squash, seamless loop rules, onion-skin check.
6. **Pixel Art Idle Animation: Breathing Sprites in 2-4 Frames** — PiXiMelon, https://piximelon.com/guides/pixel-art-idle-animation/. Opened. Pick-two-of-three, offset periods, blink every 2-4 s, 1px lag, shared rest pose.
7. **Squash and Stretch for Sprite Animation (with a Bouncing Ball)** — SpritePilot, https://spritepilot.com/blog/squash-and-stretch-sprites. Opened. Pixel-count volume maths, spacing 3/5/9, contact-frame squash, soft-material two-frame squash.
8. **Pixelblog 8 - Intro to Animation** — Raymond Schlitter (Slynyrd), https://www.slynyrd.com/blog/2018/8/19/pixelblog-8-intro-to-animation. Opened. Run cycle reduction 8-to-6-to-4 with 80/160 ms, 3-drawing Mega Man run, keys before inbetweens, orphan pixels in loops.
9. **Pixelblog 25 - Motion Cycles** — Raymond Schlitter, https://www.slynyrd.com/blog/2020/1/23/pixelblog-25-motion-cycles. Opened. Animate one body section at a time across all frames; not useful for blinks/holds.
10. **Looking At Pixels Part 1: Characters** — Niko Uusitalo, https://www.nikouusitalo.com/blog/looking-at-pixels-part-1-characters/. Opened. Game Boy 2-frame animation, mirrored frames, Pokemon Gen 2 4 beats from 2 sprites, 1px bike motion.
11. **How to Make Animated Pokemon Sprites** — Oripoke, https://oripoke.wordpress.com/2025/06/21/how-to-make-animated-pokemon-sprites/. Opened. B/W 50 ms ticks with 2-beat holds, 10 fps, common/rare loops, start/end on rest pose, speed changes with status.
12. **Pixel Art - Idle Cycle Animation Tutorial** — JIK-A-4, https://itch.io/blog/559673/pixel-art-idle-cycle-animation-tutorial. Opened. All-1px three-pose idle; no timing given.
13. **Game Development: Pixel Art Sub-Pixel Animation** — Brandon, Tiny Warrior Games, https://tinywarriorgames.com/2019/01/04/game-development-pixel-art-sub-pixel-animation/. Opened. Smear-two-positions technique and its limits.
14. **Subpixel Tween (Aseprite extension)** — ODD FERRY, https://oddferry.itch.io/subpixel-tween-aseprite-extension. Opened. Whole-pixel outline, 1/2, 1/3, 1/4 px shading shifts, no new colours.
15. **How to add a smear or squash and stretch frame in Aseprite** — mst_9, https://mst-9.itch.io/smear-squash-studio/devlog/1776794/how-to-add-a-smear-or-squash-and-stretch-frame-to-pixel-art-in-aseprite. Opened (promotional). Trail 1-24 px, dithered fade, no resizing.
16. **Smear frame** — Wikipedia, https://en.wikipedia.org/wiki/Smear_frame. Opened. Four smear types, 1-2 frame stretch, term origin in Williams.
17. **How Smear Frames Enhance Animation** — Gwenaelle Dupre, CGWire, https://blog.cg-wire.com/smear-frames/. Opened. Overuse warning, single-frame smears.
18. **How to Use Motion Blur or Smearing in Animation** — pokebattler, Clip Studio Tips, https://tips.clip-studio.com/en-us/articles/6170. Opened. Smear near top speed with ease around it; trail styles.
19. **Pixel Art Animation: Timing, Poses and Walk Cycles** — Dennis Postma, https://spritesheetgenerator.online/guides/pixel-art-animation. Opened. 12 fps default, holds, 1px landing squash, follow-through ~2 frames.
20. **A Beginner's Guide to Creating Pixel Art Animation** — NeatForge, https://neatforge.com/guides/beginners-guide-to-pixel-art-animation/. Opened. Spacing 1-2 then 3-4 px, fps choices, troubleshooting jerky vs lifeless.
21. **The secrets to good Pixel Art animation** — Pixel Overload (transcript page on sdxlturbo.ai), https://sdxlturbo.ai/blog-the-secrets-to-good-pixel-art-animation-animation-tutorial-41538. Opened (secondary transcript/summary). 12 fps on twos, exponential easing, overshoot, half-pixel idles.
22. **The Animator's Survival Kit** — Richard Williams (summary by sobrief; contents list by Peter Nagy-Galambosi), https://sobrief.com/books/the-animators-survival-kit and http://livlily.blogspot.com/2010/10/richard-williams-animators-survival-kit.html. Opened. Pendulum structure, contact poses, hold advice, chapter outline. Summaries only; I did not read the book.
23. **Pixel art animation (forum thread)** — Pixel Joint Forum, r1k and others, https://pixeljoint.com/forum/forum_posts.asp?TID=17301. Opened. Duplicate key frames to judge gap before inbetweening.
24. **Idle animation** — Wikipedia, https://en.wikipedia.org/wiki/Idle_animation. Opened. Purpose of idles; flagged as lacking citations.
25. **MiniBoss: Pixel Art Tutorials / The Art And Animation Of Celeste** — Pedro Medeiros (Saint11) and Amora Bettany, Game Anim, https://www.gameanim.com/2017/06/10/miniboss-pixel-art-tutorials/ and https://www.gameanim.com/2020/08/30/the-art-and-animation-of-celeste/. Opened but only landing pages with GIFs/talk teaser; no text content extracted.
26. **Saint11 tutorial index** — Pedro Medeiros, https://saint11.art/blog/pixel-art-tutorials/. Opened. Confirms 100-ish free GIF tutorials (RunCycleSimple, Squash, Jump...); GIFs not readable.

### Sources that failed or were thin
- Saint11 Patreon posts "Character Idle" and "<1 Pixel Movement" (patreon.com/saint11/..., patreon.com/posts/1-pixel-movement-7652033): HTTP 403; used only the search-snippet summary (UNVERIFIED).
- Saint11 tweets (x.com/saint11/status/...): seen in search only, not opened.
- Pixilart squash and stretch tutorial, Medium "12 Principles for Game Animation" (totter87): HTTP 403.
- Aseprite docs: animation and frame-duration pages opened but contain only UI how-to, no craft advice; Aseprite blog subpixel post not found.
- Game Developer Celeste article: not found. Hyper Light Drifter Kill Screen interview opened: no animation numbers. AdamCYounis: no page found via search.
- Kirby breakdowns and Tamagotchi animation specifics: searches returned nothing usable. UNVERIFIED / not covered. Wikipedia Tamagotchi page has no animation content.
- Slynyrd Pixelblog 8 duplicate URL variants returned 404; the working URL is above.
