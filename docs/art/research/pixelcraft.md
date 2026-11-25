> **Raw research notes (unrefined).** Written 2026-11-25 by a research agent for the Clawd art KB: Tiny pixel-art craft (Pixeli, Saint11, Derek Yu, Slynyrd and others). Claims are paraphrased with sources; UNVERIFIED markers matter. The refined, cross-checked synthesis is in [../README.md](../README.md); where they disagree, trust the refined modules and [../references.md](../references.md).

# Tiny pixel-art craft (8-32 px): research notes for Clawd

Scope: how to make 8-32 px sprites read, why the rules work, where they get broken on purpose, and what it means for a ~16-24 px crab mascot drawn as SVG rects in a terminal band. Sources were opened and read unless marked otherwise. Claims I could not confirm are marked UNVERIFIED. Quotes are kept to short phrases.

---

## 0. The big picture (read this first)

1. **A tiny sprite is a budget, not a canvas.** Every pixel is a decision (Saint11 calls it a puzzle where every pixel carries meaning). You choose what to show and what to leave out; the viewer's brain finishes the rest (Slynyrd, Saint11).
2. **Shape first, value second, hue third.** If the flat silhouette does not read, shading cannot rescue it. If the greyscale version is muddy, no hue fixes it. Pixeli, Derek Yu and every beginner guide I read converge on this order.
3. **The test is 1x, squinted, glanced at, not zoomed.** Detail that looks good at 800% disappears at native size (Pixeli rule 14, Tsubu, Pixnote). Our band is seen at 1x-ish, in peripheral vision, next to a terminal. That is the hardest viewing condition.
4. **Motion changes the rules.** At small sizes a 1 px shift is a large fraction of the body, and moving pixels can say what a still cannot (Pixeli 14, Slynyrd 47, Medeiros podcast).
5. **Rules are defaults with reasons.** Know the reason, then break it where it earns something (Section 9).

---

## 1. Pixel economy: spending a tiny budget

### 1.1 Size as a budget (Pixeli: Core principles, Readability and scale)
- Pixeli's own worked example: at 16x16 a character gets roughly 3 px of head, 5 of torso, 4 of legs. No room for a nose. Decide what must be read at a glance (class, threat, facing) and spend there.
- Size ladder (Pixeli rule 00/14): **8 px** = one icon, one idea, silhouette plus one accent, one dark pixel can be an eye, no outline. **16 px** = a readable character, 2-3 colours per material, one focal detail, 4-8 colours total, 2-3 value steps. **32 px** = suggested face, separate armour pieces, 10-15 colours, 2-3 details. **48+** = the risk flips from lack of space to noise.
- Why it works: at this scale each extra cluster competes with the silhouette for attention. More detail does not add information, it dilutes the one signal that matters.

### 1.2 Choosing what to show (Saint11, "My Thoughts on Very Low Resolution")
- Low resolution forces selection. For Theo in Celeste he kept beard, hair, scarf and backpack (personality plus setting), tilted the torso back one pixel for a relaxed posture, and cut headphones, pockets and face detail.
- He broke his own "no dithering" habit on Theo's shirt because the texture said "hipster flannel." Detail survives when it carries meaning.
- Ambiguity is a feature: viewers complete the image. But random pixels are a bad idea, especially near the face; each pixel should mean something even if the artist cannot say exactly what.

### 1.3 Less detail can be more compelling (Slynyrd, Pixelblog 47 "Tiny Pixels")
- Raymond Schlitter argues that as artists improve they add detail until the pixels stop mattering and the work becomes digital illustration done through a pixel process. His antidote: self-imposed limits like "keep it tiny," and looking back at early work for the formula he lost.
- He re-did his 16x16 tile designs at 8x8 with little compromise, and his tiny hero (smaller than his usual 16x32 sprites) stays readable as human via shoulder pads and red hair. Identity is left to the viewer.
- Frame economy: each frame should move at least one pixel; a few frames carry a walk cycle; shifting one or two pixels can suggest a head turn.

### 1.4 What survives when you shrink (Pixeli rule 30 and 14)
- When redrawing smaller, keep silhouette, ground contacts and the biggest accessory; drop the rest. The face usually goes first. Redraw, never resize.
- Head must be at least 4 px tall to hold eyes plus mouth (Pixeli 30). If the maths says less, cut head count rather than shrink the face.
- Derek Yu on 32x32: outline may leave no room for shading; well-defined limbs may force a smaller head; he often favours chibi proportions and sketches with coloured shapes rather than outlines, because colour does more of the defining at this scale. Mario's eye and ear are each two pixels and his moustache exists partly so the nose stands out.

---

## 2. Silhouette

### 2.1 The flat-fill test (Pixeli 03, 36; spritegen; sprite-ai)
- Fill the sprite with one flat colour at 1x. If you cannot name the subject, change the shape. For a cast, fill all black and line them up; each must be distinguishable.
- Why: at 8-32 px there is almost no interior to carry identity, so the outline carries everything.

### 2.2 Common silhouette failures (Pixeli 03)
- **Perfect symmetry** reads like a statue. Break it (asymmetric arm, turned head, prop on one side).
- **Tangents**: outlines that just touch fuse into one blob. Overlap decisively or leave a gap.
- **Uniform limb width** reads as a stick figure.
- **Negative space** (1-3 px gaps between arm and torso, between legs) is part of the shape; vary it. A 1 px gap or a deliberate crossing prevents fusion (Pixeli 36). Minimum gap logic: parts closer than 1 px fuse (Pixeli 14).

### 2.3 Three different masses (Pixeli 36)
- Head, torso, legs should be distinct sizes (small, medium, large). A 32 px example: head 12, torso 8, legs 10. Equal steps look like a snowman. Push contrast until it looks wrong, then back off one step.
- Contours: make one edge of a limb a straight run of 3+ px and the opposite a stepped curve; all-parallel or all-curved edges blur together.

### 2.4 Shape language (Pixeli 36)
- Circles = friendly/safe, squares = sturdy, triangles = aggressive/fast, organic = natural/unpredictable. Apply one family to the whole silhouette and repeat in props. A villain in a friendly game can keep triangles with rounded vertices.

### 2.5 Proportions (Pixeli 30; Derek Yu; spritegen)
- Head height = canvas / head count, minimum 4 px. At 16 px: 2 heads = 8 px head, 3 = 5, 4 = 4. A 16x16 figure is already 2-3 heads whether planned or not, so choose deliberately.
- Cute levers (use 3+): head 40-60% of height, no neck, eyes below the head midline, short torso, under 4 heads, short tapering limbs (about 3 px at base, 2 at the end). Heavy levers: small head, barrel chest, big hands/feet.
- Heads do not scale with the canvas above ~24 px (6-8 px head stays), so extra height goes to torso/legs. Folk rule from a designer quoted in a roundup: smaller sprite, bigger head (the-pixel.art, via search snippet; UNVERIFIED, page returned 403).

### 2.6 Right angles and 45-degree diagonals (Saint11)
- Squares make horizontals/verticals crisp, so use many 90-degree corners. For points (swords, claws, arrowheads) rotate 45 degrees so a single pixel corner forms the tip.

---

## 3. Clusters vs jaggies (line quality)

### 3.1 Clusters, orphans, noise (Pixeli 11)
- Viewers read tiny sprites as a few shapes of colour, not pixels. Speckle, stray pixels, 2x2 clumps and parallel bands read as dirt or "a ruler laid along the outline" at 1x.
- Definitions: a cluster is same-colour pixels touching orthogonally (diagonal contact is weak). An orphan touches no same-colour pixel.
- Budgets: **8 px** every pixel can be its own cluster, 2-3 colours, no shade clusters, one value step plus an accent pixel. **16 px** 3 tones per material, every cluster at least 2 px except one highlight or eye, at most one orphan per object. **32 px** 3 tones + outline + highlight, 2-3 shade clusters per major part (more than ~3 per tone per part signals noise), texture only as repeated 2-3 px stamps.
- Allowed orphans: specular highlight, tiny eye, spark/star, an AA pixel hugging a longer run, last frame of a particle. Never near the face.
- Memorable line: clean shapes in 5 colours beat a noisy texture in 5 colours.
- Method: flat-fill base, add one shadow cluster on the side away from light, then one light cluster, stop and inspect; hunt orphans; hunt bands; preview at 1x and squint for a few big light/dark masses.

### 3.2 Jaggies and run lengths (Pixeli 04; Pixel Art Workshop; Derek Yu; ghostboy log; Pixel Logic via search snippet)
- A clean line has consistent runs (2,2,2,2 or 1,1,1 at 45 degrees). Runs like 3,2,4,1 are the jaggies. Curves should change run length by one at a time: a dome like 3,2,1,1,1,2,3 is smooth; 2,1,3,1,2 reads as a broken stair because the eye detects the jump as a corner (Pixel Art Workshop).
- Derek Yu: the jaggy is a single pixel or small group that breaks a line's consistency; they cannot be eliminated entirely, so minimise them while still conveying form.
- Doubles (two steps in the same direction at a corner) cause blocky lines or uneven thickness; sharp vs rounded corners (1 px vs 2 px) should be chosen and kept consistent (Pixeli 04; ghostboy). At 12 px, mixing sharp and rounded corners looks unstable.
- Pixel Logic (Michael Azzi) is the canonical book on this; I only saw snippets in search results (keep stairs regular, constant line weight, work pixel by pixel rather than trusting "pixel perfect" options). UNVERIFIED beyond that.
- Tension: ghostboy and Pixeli both note jaggies/doubles are not sins when they carry meaning (rough natural terrain, deliberate expression). On a tiny mascot, irregularity in a crab's rough shell edge can read as organic, but only if it is a choice.

### 3.3 Banding and pillow shading (Pixeli 11, 04; Derek Yu; spritegen)
- Banding = boundaries of equal length ending on the same row/column so the grid becomes visible. Fix: stagger breaks by 1 px, compress the transition into 1-2 px, dither the join, or split a long gradient into small clumps.
- Pillow shading = concentric rings following the outline, ignoring the light. Choose one light direction (top-left default), model the form, and end the shade abruptly at a terminator.
- Derek Yu's squint test: with eyes narrowed, the large clusters of light and dark should still read even if the detail is busy. He thinks of the figure as clay being sculpted.

---

## 4. Outlines

### 4.1 Four styles (Pixeli 04; Pixor; Pixnote)
- None, full dark, selective ("sel-out", outline only where the sprite meets the background, or tinted per region), coloured (outline = darker version of the fill it borders).
- Pixor's guidance on whether to outline: yes when the sprite must stand out against busy/similar backgrounds, when it is small (roughly 16-32 px tall), or when the look is bold/cartoon; skip for ground-level items. Common compromise: outline what the player acts on, leave scenery bare.
- Three kinds of line (Pixor): silhouette (darkest, most complete), inner lines (lighter, only where parts overlap), creases (usually omit; let shading do it).

### 4.2 Budget logic (Pixeli 04, 30)
- An outside outline grows the shape by 1 px; an inside outline recolours edge pixels and keeps size. When the sprite already fills its budget (normal at 16 px), prefer inside outlines.
- Below ~24 px outline only the outer silhouette and separate interior parts with colour; a full outline on every part makes a small figure stubby (Pixeli 30). A 1 px outline at 12 px wide is affordable but eats edge pixels (simplepixelart; tension noted there).
- Saint11: at very low resolutions outlines are often the first thing to go; solid shapes with strong colour contrast work better. He still likes outlines placed just outside a sprite to separate it from backgrounds.

### 4.3 Colour of the line (Derek Yu; Pixnote; Pixeli 04, 20)
- Pure black gives a cartoonish look and harsh segmentation (Yu's example: muscles looking like separate pieces). Use the darkest tinted entry of each region. Pure black is reserved for contact accents (Pixeli 20).
- Sel-out recipe (Pixnote): lock the shape with a hard outline, carve the lit side (top/left) to a lighter body colour, keep the dark line on the shadow side where the sprite meets the background, optionally add a 1 px mid-tone.
- Derek Yu: avoid anti-aliasing the outer edge when the background is unknown, because blended pixels show against a different background. This matters directly for a band whose background is the terminal theme.

### 4.4 Outlines in motion (Pixor)
- A line that changes between frames flickers. Keep the silhouette continuous; inner lines only where a part truly passes in front; a line pixel that exists for one frame reads as noise.
- Dark outlines vanish on dark backgrounds: judge against the real background, not white. A lighter/coloured line, a lit-side sel-out, or a rim light helps (Pixor, Pixeli 14: test on dark, light and a real scene crop).

---

## 5. Limited palettes, ramps, hue shifting

### 5.1 How many colours (Pixeli 01, 20, 21; Tsubu; Sprite AI)
- Per material 3-5 steps (3 at tiny sizes). Whole sprite: 8 px 3-4 colours; 16 px 4-6 (max ~8); 32 px 8-16 (Pixeli 20). Tsubu agrees: 8x8/16x16 items 3-6, 16x16 characters 4-8, 32x32 8-16.
- Reference points quoted by Pixeli: NES Mario-class 3 colours plus transparency; SNES-class sprites 9-15; Celeste's Madeline 12 entries (UNVERIFIED: my own search found only a 9-colour fan extraction, so treat 12 as unconfirmed).
- Medeiros says Neverway is mostly ~8 colours and he squeezes variety from palette shifting. He picks constraints for artistic reasons: prevent over-scoping, do not be so tight you cannot express anything, and give the game an identity (podcast).
- Reduction ladder (Pixeli 21): a 24-colour sprite cut 24>20>15>10; it collapsed below ~10. Cut one step at a time and re-check. Heavy dither or a fifth shade on a 4-shade sprite means the palette lock is off.
- Count transparency in the budget; reuse a swatch on unrelated objects but never on touching ones (Pixeli 21). Share the darkest ramp step between materials to save slots (Pixeli 01; Tsubu).

### 5.2 Hue shifting (Slynyrd #1; Pixeli 20; Pixel Art Workshop; Tsubu; spritegen)
- A "straight ramp" that only changes brightness/saturation looks grey and flat (Slynyrd). Shadows pick up cool ambient tones; highlights pick up warm light (Workshop example: leaf green shadow moved from hue ~98 to ~145 reads richer than a plain darker green).
- Slynyrd's numbers: ramps of 9 swatches with about +20 degrees per step (his upper limit before it looks unbalanced); saturation peaks mid-ramp and never hits 0 or 100; brightness steps get smaller toward the bright end; a positive hue shift warms colours as they brighten.
- For tiny sprites Pixeli compresses this: 8 px ramps travel at most ~30 degrees; 16 px 30-50; 32 px 40-60; no single step over ~20 degrees; skin/wood 10-15 per step. Warm ramps lighten toward yellow and darken toward crimson/magenta; greens darken toward teal; blue skin shadows look sickly. Temperature contrast is cheaper than an extra value step at 16 px.
- Pixeli's end-of-ramp rule: darkest about value 12-18 tinted (not #000), lightest tinted near-white (not #fff). Small patches look greyer, so raise saturation 10-20 on 1-2 px details.
- Accent budget: one accent hue per sprite, at most ~5-8% of pixels, on the focal feature (eyes, gem, flame). Keep roughly 15% or less of pixels above saturation 70.

### 5.3 Value contrast beats hue (Pixeli 01, 14; Tsubu)
- Contrast ladder (Pixeli 14, 8 px disc test): 0 value steps vanishes; 1 step weak at 1x; 2+ steps read. Aim for at least two ramp steps between body and background directly behind it. Touching colours must be distinguishable at 1x.
- Tsubu: a picker's HSV value is not perceived brightness (pure yellow and pure blue can share V=100 and look very different), so judge at 100% and in greyscale. Colours closer than about deltaE 3 look identical (Pixeli).
- Derek Yu's two checks: flip horizontally to expose proportion/shading faults, and remove saturation to confirm shading still reads.
- Never carry meaning in colour alone (team/danger/selection); add shape or motion, and prefer value or blue-yellow contrast over red-green (Pixeli 14).

### 5.4 Dither and anti-aliasing at tiny sizes
- Pixeli 21: at 32 px and below dither reads as noise except on large flat areas; never dither a 16 px character; never place 2x1 dither pairs. Pixel Art Workshop: dithering originally simulated colours on restricted palettes; on modern displays it often just adds noise.
- AA: Pixnote advises avoiding AA at 16 px or smaller; where used, 1 px (2 max), long diagonals only, last, and never outward. Pixeli lists automatic/semi-transparent AA as a top "generated-art tell."
- Exception: Saint11 used dither on Theo's shirt; Derek Yu uses it for dirt-like large single-colour areas.

---

## 6. Faces and eyes at tiny size (Pixeli 33, 14; Derek Yu; Pixor)

- Eyes get their pixels before anything else. Eye size ladder by head height: 8 px head = 1x1 or none; 12 px = 1x2; 16 px = 2x2; 24 px = 3x3; 32 px = 5x4.
- Vertical 1x2 eye reads young/alert; horizontal 2x1 reads old/disinterested. One catch-light at upper-left of each pupil in the same place on both eyes gives cute/heroic; omit for villains/blank stares.
- A pupil dead centre on a front-facing head reads as a dead stare: shift it 1 px. One pixel of brow tilt carries most emotion (inner end down = anger, up = sadness). Break symmetry by one pixel or the face looks like a mask (exceptions: surprise, squeezed hurt eye).
- A 16 px face should have only ~3-5 interior pixels total (Pixeli 14). The eye strip should be the highest-contrast area on the head.
- Blinks: at 16 px and below use one frame of closed (80-100 ms); at 24+ use three (50/80/50 ms). Blink every 2-4 s on a period different from breathing. Closed lids slightly darker than skin; keep lid thickness constant.
- Pixor notes small eyes are drawn flat without their own outline in every outline style.
- Medeiros: a few pixels moving in an eye can flip the expression; "a two-pixel mouth cannot convey laughter as a still, but moving pixels can" (podcast, paraphrased).

---

## 7. Reading at 1x vs zoomed, canvas size, integer scale

- **Test order (Pixeli 14):** 1x, look away ~5 s, look back; then flat silhouette; greyscale; three backgrounds (dark, light, real scene crop); motion at game speed; UI safe zone. Run on the worst pose.
- **Zoom lies.** Pixnote shows AA previewed at 16x next to actual size to make the point that AA exists for actual-size blending, not zoomed prettiness. Tsubu: judging at 100% reveals problems that look fine at 800%.
- **Canvas size choices.** Beginner guides recommend 16x16 or 32x32 first because small canvases force clarity and finish faster (spritegen, ghostboy). ghostboy's method for choosing size: shrink the smallest important detail (usually the face) to the smallest size that still works, and build outward from that. Outlines and palettes consume pixels and may call for a bigger canvas; expressive characters need room for facial expression. Pixel Art Workshop suggests 32x32 for top-down RPG sprites, 64x64 fighters, 16x16 icons (editorial recommendation; not primary).
- **Integer scaling only, nearest neighbour.** Medeiros: Celeste's 320x180 canvas times 6 = 1920x1080 exactly; draw to a fixed game canvas then scale the whole canvas, not sprites (Saint11 "Consistency", "Scaling"). Non-integer scaling makes pixels uneven; shrinking pixel art usually ruins it, so redraw. Mixing pixel sizes ("mixels") breaks the visible-grid contract; if you must mix, keep separate areas, integer multiples, at most two resolutions (Saint11 Scaling; Pixel Art Workshop).
- **Motion amplification.** 1 px on a 20 px sprite is 5% of width, 1% on 100 px. Keep key frame differences at 2 px or more on the parts that matter (Pixeli 14). Pixeli 03: limb thickness drift of even 2 px across frames is obvious in motion.
- **Scale cast by role.** Hero ~24-32 px, minion/pet ~12-16 px (about half the hero), boss 64-128 (Pixeli 14). Size ratio is itself a readable cue.

---

## 8. Process: doodling, iteration, knowing when to stop

- **Pixeli's loop:** inspect, decide, draw in one batch, look (preview and ASCII/grid dump), fix, validate. Skipping the look step is the most common failure. Before drawing, fix five decisions: canvas size, palette, light direction, outline style, view (Pixeli 00).
- **Many small studies.** spritegen: volume of small sprites (coins, potions, slimes) builds skill; finishing is what drives improvement. Medeiros mocks up a full fake screenshot first and produces many variations of an enemy before a style emerges, treating mockups as a guide not a target (podcast).
- **Sketch with shapes.** Derek Yu sketches small sprites in coloured blobs; Pixeli: flat-fill each material, check silhouette, then shade.
- **Stop early.** Yu: pixel art attracts perfectionists because the grid invites endless fixing; step away and return with fresh eyes. Slynyrd: over-detailing is why the finish falls short of the sketch; stop before the image loses its mystery.
- **Accept failure and pick battles.** Medeiros restarted a full-body dragon at least five times, then drew just the fire breath and head, which was better. If the concept does not fit the budget, change what you depict.
- **Use the camera/memory.** Animation can rely on viewer memory (the water from a watering can never appears; the flower reacts). Things need to exist in people's minds, not in the image (Saint11).
- **Be honest in review.** Pixeli asks reviewers to say what was checked and state compromises (colour pushed far from intent, pose that could not fit) because hidden compromises cannot be fixed.

---

## 9. Where the advice is broken on purpose (tensions)

| Rule | When broken | Source |
|---|---|---|
| No dithering at small size | Dither on a shirt to signal "hipster" | Saint11 |
| Outline everything for readability | Drop outlines at extreme low res; solid shapes with strong colour | Saint11, Pixor |
| Selective outline | Fine on lit sides; fails on dark backgrounds, so full dark line or rim light | Pixor, Pixnote |
| No jaggies/doubles | Keep them when they convey rough nature or expression | ghostboy, Derek Yu |
| Avoid AA at 16 px | A single deliberate AA pixel can rescue a curve | Pixnote, spritegen |
| Symmetry reads as a statue | Surprise, squeezed hurt eye, mascots meant to feel stable | Pixeli 33 |
| 4-6 head proportions | Mascots: 1-3 heads, no neck (cute levers) | Pixeli 30 |
| Never mix resolutions | Celeste does, using separate "worlds" (pixel gameplay, hi-res UI) with quarantine | Saint11 Consistency |
| Keep orphans at zero | One spark/highlight/eye is allowed | Pixeli 11 |
| Fewer colours is better | Too tight a palette removes expression; hold some contrast and an accent | Medeiros podcast |
| Less detail | Totally unlit flat shapes can lose volume; some light usually helps | Saint11 |

---

## 10. Translation to a tiny crab (Clawd)

Assumptions: Clawd is blocky body, two claws, two eye dots, short legs, drawn as SVG rects, likely on a ~16-24 px grid, shown small in a terminal band over a dark or themed background. These are ideas, not requirements.

1. **Silhouette is the product.** The crab's identity is: wide flat body, two raised claws (negative space between claws and body), short stubby legs on the ground line. Fill it black at 1x: it should read as "crab" and, in every state, as a different shape (thinking = one claw raised to chin; typing = claws low and forward; celebrating = both claws up; sleeping = flattened, claws tucked). Pose changes should alter the silhouette, not just the interior.
2. **Mass ratio.** Give claws, body and legs three different sizes (e.g. at 16 wide: body 8 wide, claws 3x3 each, legs 1x2). Gap of exactly 1 px between claw and body so they never fuse; or overlap by a full pixel deliberately. Avoid tangents between claws and eyes.
3. **Eyes.** Two vertical 1x2 eyes (alert, young) or 1x1 dots, on the high-contrast eye strip of the head, 1 px off dead centre in gaze states. Blink = one frame, 80-100 ms, every 2-4 s on a period different from the breathing loop. One-pixel offsets for thinking (look up-left), sleeping (closed, darker line). Keep eye pixels the highest-contrast pixels on the sprite. Eyes can be drawn without an outline.
4. **Palette.** Total about 5-6 colours including outline: a body ramp of 3 steps (deep shadow, base, light) hue-shifted (shadow toward magenta/crimson, highlight toward warm orange/yellow, ~30-50 degrees total), one darkest tinted outline colour (not #000), one eye colour, one accent (e.g. a tiny status colour on the focal feature). Share the darkest ramp entry between body and outline, and between legs and claws.
5. **Outline.** Prefer an inside outline or a sel-out on the shadow side so the crab does not grow in width; verify against both a dark and light terminal theme. Because the background is unknown, do not rely on AA pixels on the outside edge (Derek Yu). Consider a 1 px lighter rim on the lit top-left claw edge for dark themes.
6. **Detail budget.** At ~16 px: one shadow cluster on the lower right of the body, one highlight pixel at the upper left of the shell, no texture. Anything else (shell speckles, claw serration) must be a repeated 2-3 px stamp or be dropped. At 24-32 px you can add 2-3 shade clusters and a small claw notch. Hunt orphans: allow only the highlight and eye pixels.
7. **Motion at tiny scale.** Every frame must move at least 1 px on the part that matters, and key differences 2 px on 16-20 px sprites (a 1 px shift is already 5%). Prefer 2-4 frames with uneven holds (roughly 80/80/120/80 ms) to many frames. Keep limb thickness and body volume constant across frames; squash no more than 1 px at 16 px. Do not let the outline pixel pattern change frame to frame.
8. **Props and state cues via the camera trick.** Let the viewer supply the missing object: a keyboard can be a 1 px line under the claws plus alternate claw dips; "thinking" can be one claw to the chin and a single sparkle orphan; "sleeping" can be a 2-frame breathing bob plus a tiny z that is the only orphan. Do not draw what motion and pose imply.
9. **Never colour alone.** Status states (error, cache out, done) should differ by pose/silhouette and not only hue; keep the value contrast check in greyscale and at 1x on three backgrounds.
10. **Test protocol before accepting a sprite or frame:** (a) flat-fill silhouette, (b) 1x glance for 5 s, (c) greyscale, (d) dark vs light terminal background, (e) horizontal flip, (f) filmstrip of the loop for volume drift, (g) integer scale only (2x/3x) with crisp-edges rendering in SVG (shape-rendering: crispEdges; no fractional coordinates).
11. **Sizing decision.** If the face and claws will not both read, enlarge the head/body share (cute levers: wide head-body, no neck, eyes low on the body, short legs) rather than adding pixels. A crab is naturally a 1-2 "head" character, so 4+ px of head is easy; the risk is claws that are too small to hold a pose, so give claws at least 2 px in the smallest dimension (Pixeli minimum feature size).

---

## Source list (title, author, URL, what I took)

Pixeli knowledge base (all opened; summaries via fetch tool):
1. **Pixeli knowledge index** (Pixeli / pebbly, aseprite-ai-artist rules). https://pixeli.pebbly.space/knowledge. Map of 62 rules, 14 skills, 4 agents, palettes.
2. **Core principles (rule 00)**. https://pixeli.pebbly.space/knowledge/rules/00-core-principles. Resolution-as-budget example, size ladder, generated-art tells, working loop.
3. **Silhouette and form (03)**. .../rules/03-silhouette-and-form. Flat-fill test, symmetry/tangent/limb-width failures, head counts, volume across frames.
4. **Outlines and edges (04)**. .../rules/04-outlines-and-edges. Four outline styles, inside vs outside budget, run lengths, doubles, banding.
5. **Clusters and noise (11)**. .../rules/11-clusters-and-noise. Cluster/orphan budgets per size, banding fixes, pillow shading.
6. **Readability and scale (14)**. .../rules/14-readability-and-scale. Test battery, contrast ladder, min feature size, motion amplification.
7. **Palette and colour (01), Colour for pixel art (20), Limited palettes (21)**. .../rules/01-..., 20-..., 21-.... Colour budgets, hue-travel by size, end-of-ramp rules, reduction ladder, dither limits.
8. **Proportions by size (30), Character design (36), Eyes and expressions (33), Small creatures (53), UI and icons (83)**. Head-count maths, three-mass rule, eye ladder, blink timing, crab/turtle part list, icon margins.

Other sources:
9. **Pixel Art Tutorial: Basics**, Derek Yu. https://www.derekyu.com/makegames/pixelart.html. Jaggies, selout, squint/flip/desaturate checks, 32x32 trade-offs, knowing when to stop.
10. **My Thoughts on Very Low Resolution**, Pedro Medeiros (Saint11). https://saint11.art/blog/thoughts_on_low_resolution/. Choose what to show, ambiguity, 90/45-degree lines, drop outlines, camera trick, accept failure.
11. **My Thoughts on Style Consistency**, Pedro Medeiros. https://saint11.art/blog/consistency/. Fixed game canvas, 320x180 x6, world consistency, colour consistency.
12. **Scaling Pixel Art**, Pedro Medeiros (14 Nov 2024). https://saint11.art/blog/scaling/. Integer scaling, nearest neighbour, avoid downscaling, mixing resolutions.
13. **Episode 252: Pedro Medeiros (Animation Industry Podcast)**, host Ibele, Apr 2024. https://www.fame.so/podcast-index/show/animation-industry-podcast/episode-252-celeste-art-director-pedro-medeiros-how-to-become-a-professional-pix. Fight constraints, ~8 colours, mockups, animation vs stills.
14. **Pixelblog 47 - Tiny Pixels**, Raymond Schlitter (Slynyrd). https://www.slynyrd.com/blog/2023/11/26/pixelblog-47-tiny-pixels. 8x8 tiles, implied detail, one-pixel-per-frame, stop before overworking.
15. **Pixelblog 1 - Color Palettes**, Raymond Schlitter. https://www.slynyrd.com/blog/2018/1/10/pixelblog-1-color-palettes. Ramps, +20 degree hue shift, saturation peak mid-ramp, straight-ramp warning.
16. **How to Do Pixel Art: Troubleshooting 5 Beginner Mistakes**, Pixel Art Workshop (no author named, 2026). https://pixelartworkshop.com/guides/troubleshoot-jaggies-mixels-pixel-art-basics. Run-length curve rule, mixels, hue-shift example. (The page contains an arithmetic slip on 160x90; treat resolution table as secondary.)
17. **Pixel Art Outlines and Anti-Aliasing, Selective Outline Guide**, Pixnote (no author, 2026). https://pixnote.net/en/learn/outlines/. Sel-out 4-step method, AA limits at 16 px.
18. **Pixel art outline styles**, Pixor (Frakassets). https://pixor.art/learn/outlines/. Silhouette/inner/crease lines, outline on small sprites, animation flicker, eye exception.
19. **How to create 16x16 pixel art sprites**, Sprite AI team (Oct 2026). https://www.sprite-ai.art/guides/how-to-create-16x16-pixel-art. 16x16 character (head 4-6, body 6-8, 1-2 px padding), palette counts. Promotional; internally inconsistent on palette size.
20. **12 Pixel Art Tips for Beginners**, SpriteGen. https://spritegen.io/tips/pixel-art-tips-for-beginners. Pillow shading, hue shifting, volume of practice. Promotional, no evidence.
21. **12x12 Pixel Art - 35 Sprites**, SimplePixelArt. https://simplepixelart.com/arts/size-12x12. 144 px canvas, one shadow tone, 1 px outline trade-off.
22. **Pixel art color palettes: how to choose colors that read**, Tsubu blog (Sept 2026). https://tsubu.art/blog/pixel-art-color-palettes. Palette counts by size, HSV vs perceived brightness, 100% judging.
23. **Learn Log #1 - Pixel Art Basics 1**, ghostboy-gamedev (Tumblr). https://www.tumblr.com/ghostboy-gamedev/613808331194335232/learn-log-1-pixel-art-basics-1. Choosing canvas size by smallest important detail, doubles/jaggies, 16 to 32 redraws vs scaling.

Seen only in search results (not opened): Pixel Logic (Michael Azzi) book via archive.org/ gumroad listings; Kenney Tiny series / Clint Bellanger Tiny Creatures (16x16, thick outlines, CC0) at opengameart/itch; Lospec tutorial listings (Dual Core Studio "Draw 16x16 Character", ilkkke "16x16 Pixel Art Tutorial", Medeiros "Shading", "1-Bit", "Walk Cycle"); AdamCYounis "Pixel Art Class - Character Sprite Build" (video, content not read); Brandon James Greer (1-bit and lines/curves videos, content not read).

## Sources that failed or gave nothing
- Pixel Grimoire (Medium) beginner pieces: HTTP 403.
- Distant Arcade "Brandon James Greer on Chrono Trigger-style sprites": HTTP 403.
- the-pixel.art character-design and hue-shifting articles: HTTP 403 (only search-snippet claims used, flagged UNVERIFIED).
- Lospec tutorial pages (MortMort "What Size To Make PixelArt", Dual Core 16x16, ilkkke): fetched only listing pages with no body; their content is not used.
- Saint11 tutorials index page: thumbnails only. No dedicated Kenney, AdamCYounis or Brandon James Greer text was obtainable.
