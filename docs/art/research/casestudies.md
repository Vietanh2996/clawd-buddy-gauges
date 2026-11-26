> **Raw research notes (unrefined).** Written 2026-11-25 by a research agent for the Clawd art KB: Case studies of famous tiny sprites. Claims are paraphrased with sources; UNVERIFIED markers matter. The refined, cross-checked synthesis is in [../README.md](../README.md); where they disagree, trust the refined modules and [../references.md](../references.md).

# Case studies of famous tiny sprites: constraint, choices, sacrifices, what reads

Research notes for the Clawd pixel-art knowledge base. Method: live web search and page fetches (this session). Claims I could not confirm from an opened page are marked UNVERIFIED. Quotes are kept to short phrases; everything else is paraphrase. Where sources disagree, both versions are given.

## 0. Cross-cutting lessons (read this first)

1. **Constraints are the brief, not the obstacle.** Miyamoto's Mario, Kare's icons and Yacht Club's NES palette all show the same move: take the limit, ask "what is the cheapest sign that still carries the meaning?", and design only that.
2. **Spend pixels where the eye looks.** Faces and hands are where the information is. Mario's hat, moustache, overalls and white gloves are all "pixel purchases": hair, mouth, and arm motion get replaced by one cheap, high-contrast shape each.
3. **Identity lives in silhouette plus one signature colour or shape.** Kirby (a ball), Pac-Man (a disc with a wedge), Mega Man (blue), Madeline (a coloured hair mass), Mario (hat and moustache). If you squint and blur, who is it?
4. **State should be legible without reading detail.** Celeste's hair colour is a gauge. Pac-Man ghosts change colour when vulnerable. Happy Mac vs the failure icon is a face. A status mascot like Clawd should do the same: pose and one colour accent signal state.
5. **Few frames, strong poses.** Mario had three animation frames; Space Invaders two frames per alien; Sakurai warned that too many frames feels sluggish. Cheap animation plus clear timing beats rich animation that reads as mush.
6. **Contrast between adjacent parts makes motion legible.** Mario's arms contrast the torso (overalls over a different-coloured shirt) so running reads. Separation of limbs from body is a motion tool.
7. **Cute is engineered, not accidental.** Round shapes, big eyes, no angry expressions (Iwatani), simple shapes anyone can draw (Kirby), "simplified faces let viewers project themselves" (Kare commentary).
8. **Rules are broken on purpose, once the core reads.** Shovel Knight added "cheater" colours and removed flicker; Celeste draws the hair procedurally rather than as hand-drawn frames (UNVERIFIED, fan claim).

---

## 1. Mario (Donkey Kong, 1981): 16x16

**Constraint.** The original Mario sprite was a 16x16 pixel figure on arcade hardware. Miyamoto's account (Iwata Asks, New Super Mario Bros. Wii) is that a realistic, many-heads-tall human could not fit: stretch the body and almost nothing is left for the face.

**Choices, in his own reasoning (paraphrased):**
- **Hat**: hides hair, which is hard to draw and animate, and lets the eyes sit directly under the brim.
- **Moustache**: suggests nose and mouth together, saving pixels. Miyamoto's point is that a nose followed by a moustache makes it unclear whether you are seeing a mouth or a moustache, and that ambiguity is fine because it costs fewer pixels. A secondary account says the moustache also separates the nose from the rest of the face.
- **Overalls over a contrasting shirt**: the two colours make arm swing readable while he runs. Only about three animation frames were affordable.
- **White gloves**: hand motion is visible during jumps.
- **Big nose**: a consequence of the 16-pixel budget. Pauline's taller sprite uses a single pixel for her nose (secondary source, Thrilling Tales; the comparison is the blog author's observation).
- The carpenter job came afterwards, from the construction-site setting. The Italian identity: accounts conflict on whether it came before or after the moustache.

**What was sacrificed.** Realistic proportions, hair, visible mouth, expression range, and finger detail. Head-to-body ratio became chunky and childlike.

**What reads.** Colour blocking (red hat, blue overalls, skin face, white hands) turns four tiny regions into a readable person. Cartoon proportions are a feature.

**Lesson for tiny characters.** For each human feature you cannot afford, find a one-shape stand-in (hat for hair, moustache for mouth). For motion, make limbs a different value or colour from the torso.

**Caveats.** A "retro-replay" article claims the moustache was a hardware trick, but I could not verify its attributions (it cites Game Informer and an interview with a TV host without reproducing text). I treat only the Iwata Asks interview as primary. Miyamoto's explanations differ between interviews (per Thrilling Tales).

Sources: Iwata Asks (nintendo.com, link below); Thrilling Tales of Old Video Games blog "Mario 101"; retro-replay.com (UNVERIFIED).

---

## 2. Pac-Man and the ghosts (Namco, 1980)

**Constraint.** Hardware sprites were 16x16 (Pac-Man Dossier, Appendix C lists eight hardware sprites), with a maze built on an 8-pixel tile grid. The Wikipedia ghost article says sprites could only show a limited number of colours, which partly explains the simple look (secondary).

**Pac-Man himself.** Iwatani says the idea came from a pizza with a slice missing (Wikipedia citing him); he also linked it to rounding the Japanese character for mouth. Yellow was chosen because it read as neither hero nor enemy. A disc with a wedge is the cheapest possible "character": the animation is only the wedge opening and closing, and the mouth wedge doubles as the direction indicator.

**Ghosts.**
- Colours (red, pink, cyan, orange) distinguish individuals; the Namco president reportedly wanted all red, so Iwatani surveyed early players and they favoured colours. Sources differ on the count (Game Developer says 50 players, unanimous; Wikipedia says 40-to-0), so quote the story, not the number.
- Iwatani avoided angry expressions to keep them cute, citing a Tom and Jerry dynamic, and said personalities mattered more than visuals.
- Behaviour: the Dossier (Jamey Pittman, Game Developer) explains four chase rules (target Pac-Man, four tiles ahead, a combo with Blinky, retreat when close). Players read personality from motion even though the sprites are nearly identical.
- **Direction of intent is carried by the eyes.** The ghost pupils shift toward the travel direction. Note: the Dossier page I fetched does NOT discuss eye direction; I am relying on general knowledge here, so treat the pupil-direction point as UNVERIFIED in a source sense, though it is easy to verify in any emulator.
- **Frightened state.** Ghosts turn dark blue and flash near the end; eaten ghosts shrink to just eyes that return to the pen. This is a strong example of reducing a character to its most essential feature (eyes) to say "defeated, going home."
- **Forced reversal** at mode changes is described by the Dossier as a visual cue that behaviour changed.

**What was sacrificed.** Facial expression, individual outline difference (all ghosts share one silhouette).

**Lesson.** One shared silhouette plus colour = family and individuals. Eyes alone can carry state and direction. A state change should be a clear, global change (colour flip, then flash as a warning).

Sources: The Pac-Man Dossier (Game Developer); GDC 2011 Iwatani talk write-up (Game Developer); Wikipedia Pac-Man (character) and Ghosts (Pac-Man).

---

## 3. Space Invaders (Taito, 1978)

**Constraint.** Black-and-white raster hardware with a slow processor. Nishikado first tried tanks, planes and ships but disliked how they moved and avoided shooting human figures; he moved to alien creatures inspired partly by H. G. Wells's octopus-like Martians, then designed squid and crab types (Wikipedia, citing Edge and other interviews; he reportedly favours the crab, per search summary of a Forbes interview, UNVERIFIED beyond that).

**Choices.**
- Two frames of animation per invader, made with a custom tool that let him tweak sprites on screen with a light pen (Wikipedia).
- Orange and green cellophane strips over the screen added colour to a monochrome display (Wikipedia). Colour was applied to zones, not sprites.
- Speed-up is a hardware accident kept as a feature: fewer aliens means the processor draws each frame faster, so the horde accelerates, and audio too. Nishikado kept it because it made the game more interesting.

**What reads.** Each type is a distinct silhouette (squid, crab, octopus) within a roughly 8-wide grid; a two-frame leg wiggle is enough to look alive. Group movement creates a "personality" for the whole mass.

**Lesson.** Two well-chosen frames are enough. Tempo is character: a faster loop = more urgency. A constraint-driven artefact (speed-up) can become the main expressive device.

Sources: Wikipedia Space Invaders; Medium (Clive Thompson) and Time Extension pages returned 403 and could not be read; CBR page failed. Pixel dimensions (e.g. 8x8 or 11x8) are not given in any source I opened: UNVERIFIED.

---

## 4. NES hardware and Mega Man (Capcom, 1987)

**NES constraints** (Wikipedia, Nintendo Entertainment System): up to 64 sprites, each sprite tile using at most 3 colours plus transparency, about 25 colours on screen chosen from roughly 54 usable. (The 8-sprites-per-scanline limit, which causes flicker, is documented in Game Developer's Shovel Knight piece, below.)

**Mega Man choices.**
- Blue was chosen because, in the NES palette, blue offered the most shades, which the team used to add detail (Wikipedia).
- Inafune, on a six-person team, designed the characters and then did the dot work himself; he could not get the chibi style he wanted at NES resolution.
- Crouching was cut because it made projectile heights harder to judge; the eight robot masters were reduced to six for schedule reasons.
- Anime-style animation was the target, such as the hand turning into an arm cannon.
- Kitamura made the original static sprite (Wikipedia, Akira Kitamura entry in search results).
- The helmet/outline are not covered in the sources I opened.

**Mega Man-style layering** (as described in the Shovel Knight article): Capcom overlaid multiple sprites so a character can show more than 3 colours.

**Lesson.** Gameplay readability (projectile height) outranked a move (crouch). A single hue family gives you the most value steps; choose the palette hue by how many ramp steps you get.

Sources: Wikipedia Mega Man (video game); Wikipedia NES; Game Developer "Breaking the NES for Shovel Knight".

---

## 5. Shovel Knight (Yacht Club Games, 2014): the NES rulebook, deliberately bent

From the Game Developer breakdown:
- **Kept**: mostly the NES palette; 16x16 background tiles; vertical resolution; sprites with 4-5 colours plus transparency (up from the NES's 3, using Mega Man-style layering); limits on object and particle counts so the screen stays clear; flashing sprites for invincibility rather than alpha fade.
- **Broke**: added a few cheater colours (dark purple, deep red, beige, light brown); no sprite flicker, which the NES showed beyond 8 sprites on one line; separate palettes for enemy variants and damage effects with palette cycling in a shader; 5-6 parallax layers; screen widened to 16:9.
- **Art choice**: overly detailed sprites were simplified for readability and easy animation (King Knight).
- Yacht Club's own blog (Mina the Hollower post) says the NES palette lacked smooth dark-to-light ramps, causing awkward contrast, yet the team found the limits freeing. Readability advice on that page (saturated sprites against muted backgrounds, segmenting sprites so key parts read) was written about Mina, not Shovel Knight.

**Lesson.** The audience feels "NES" from silhouettes, palette restraint, and chunky animation, not from literal compliance. Pick which rules carry the look (palette, tile grid) and drop the ones that hurt play (flicker). For Clawd: keep a small fixed palette but allow one extra accent colour if it improves state reading.

---

## 6. Game Boy: four shades, 8x8 tiles, and Link's Awakening, Kirby, Pokemon

**Hardware** (Wikipedia Game Boy; "Sheep It Up!" postmortem on Game Developer): 160x144 screen, 4 shades; backgrounds can use all 4, sprites get 3 visible shades plus transparency; up to 40 sprites onscreen, at most 10 per scanline; built from 8x8 tiles with 256 unique tile slots in VRAM, so reuse matters; a 16x16 character is typically two 8x16 sprites. Tricks: switching a sprite's palette per frame makes a blink or flash; overlapping two sprites with different palettes gives a 4-colour look (a Wario Land coin example in the article).

**Kirby (HAL, 1992).**
- Started as a placeholder blob sprite for another protagonist; Sakurai kept it. Iwata liked that anyone could draw it. Pink was Sakurai's intent; Miyamoto thought yellow; on the original Game Boy he looks white because of grayscale (Wikipedia, Kirby).
- A later Kirby developer interview (shmuplations, Nightmare in Dream Land) records Sakurai warning that too many frames make animation sluggish, after the artist drew lots of frames to compensate for skill. Takeaway: fewer, punchier frames; "make the movement better."
- Pixel size of the original Kirby sprite: UNVERIFIED.

**Link's Awakening (1993).** Began as an after-hours effort to port A Link to the Past to Game Boy; Tezuka said building a similar game on weaker hardware was a satisfying challenge (Wikipedia; Game Informer). Tone came from Twin Peaks-style small-town charm and a team of fans making what they wanted. Specific sprite sizes and art decisions: not found in sources I could open (UNVERIFIED). Lesson at the system level: tone and personality (silly NPCs, Mario/Kirby cameos) did the work that graphics could not.

**Pokemon (Game Freak, 1996).** Wikipedia's Pokemon entries say the designs started as in-team pixel sprites drawn with a single colour identity per creature to suit Super Game Boy limits; Ken Sugimori redrew and unified them, partly to fix problems, while trying to keep the original artists' feel. Atsuko Nishida did Pikachu and others. Bulbapedia (blocked, 403) is reported by search summary to say most Super Game Boy palettes were shared, so human characters all used the same light pink and dark purple (secondary, UNVERIFIED). Takeaway: **one colour identity per creature**, and a unifying hand (Sugimori) to make a roster feel like one world. The Cutting Room Floor sprite page returned irrelevant content with embedded instructions aimed at AI agents; I ignored them and did not use that page.

**Lesson for Clawd.** Treat shades as a value ladder: dark outline, mid body, light highlight, plus transparency. Palette swaps and per-frame palette changes are cheap state signals (blink, flash).

---

## 7. Celeste: Madeline's hair as a gauge (Maddy Makes Games, 2018)

- Origin: PICO-8 prototype made in three days in August 2015 by Maddy Thorson and Noel Berry (Wikipedia). The team said pixel art conveys information more clearly to the player.
- **Hair colour = dash count**: red for one dash, pink for two, white during a dash, cyan when none remain (Celeste wiki, celeste.ink). Dash lasts 15 frames, with 3 freeze frames (same wiki), the kind of hit-pause that gives weight.
- Madeline also sweats when stamina is low and her hair blows in wind (MIT admissions blog, via search summary).
- Fan commentary on The Spriters Resource claims the hair is generated procedurally as a chain of circles over a bald base sprite: UNVERIFIED, not from the developers. Pedro Medeiros ("saint11") gave a talk on the art and animation (Game Anim lists it; I could not retrieve its contents).

**Why it works.** Hair is the largest, most mobile, most saturated mass on a small character, and it sits in the player's focal area. Using it for state means the player never looks at a HUD. A colour change is readable at 8-16 px; a drawn change would not be.

**Lesson for Clawd.** The shell or claws are Clawd's hair: the largest saturated mass. Use shell tint (or claw tint) for session state (thinking, cache out, done), and secondary motion (a trailing sway) for life.

---

## 8. Stardew Valley, Undertale, Terraria, Habbo, early Sims

These are weaker on primary sources, so claims are limited.

- **Stardew Valley (ConcernedApe, 2016).** One person did all pixel art in Paint.NET; he says his early colour sense was weak, the early art looks washed out, he redid assets repeatedly (an habit he warns against), and he plans 16x16 tiles for his next game to keep workload manageable (mentalnerd interview). A DualShockers summary says he drew four expressions per NPC, scrapped them, then did six or seven iterations of portraits (UNVERIFIED, secondary). Lesson: tiny overworld sprites stay legible because the portrait carries the emotion; keep the sprite a clean icon.
- **Undertale (Toby Fox, Temmie Chang, 2015).** Fox said people attach to simply drawn characters more than detailed ones (Wikipedia). Chang made many sprites; Fox often edited faces or eyes (Alphys's eyes made cuter; Monster Kid looked "really pissed off", so he edited it; Toriel's overworld sprites needed many revisions; per the Art Book listing). Lesson: iterate on the eyes first, since they set the emotion; a small edit to the eyes changes personality.
- **Terraria (Re-Logic).** Sources opened only say 16-bit-style sprites; I could not find sprite-grid or design-process claims: UNVERIFIED. Skip as a case study except as an example of a sprite-heavy game that stays readable via strong silhouettes and tile grid.
- **Habbo (Sulake).** Search results say isometric pixel art let a large 3D-looking world run in a browser (Engadget summary, secondary). Sulka Haro's Game Developer interview is about social design; it says tools for players to create clothing mattered more than hand-designed characters. Lesson: tiny avatars gain identity from swappable parts (clothes, colour), a cheap way to get variety. Wikipedia and Game Developer pages gave no art details.
- **The Sims (1999).** Wikipedia only confirms a dimetric 2D sprite projection; nothing more on art. UNVERIFIED beyond that.

---

## 9. Susan Kare: Macintosh icons and the Happy Mac

**Constraint.** Monochrome bitmap, one bit per pixel, a 32x32 icon canvas (1,024 squares), no anti-aliasing. Sources disagree on 16x16 vs 32x32 for some icons; the 32x32 grid is the better-supported figure for icons, and 16x16 for the Command symbol (Blake Crosley page) and some smaller glyphs.

**Process.** Sketch on graph paper (a grid notebook, one box per pixel), originally convert to hex by hand, then Andy Hertzfeld built an icon editor (mac-history, Blake Crosley). She calls the work minimal pointillism (mac-history). Fonts: Chicago on a 9x7-ish grid (sources give 9x7 or 7x9) with only horizontal, vertical and 45-degree strokes to avoid jaggies; proportional spacing for legibility.

**Philosophy.**
- Success test: an icon works if you can tell someone what it is once and they do not forget it (Wikipedia, paraphrasing her).
- Traffic-sign clarity: simple symbols with few extra details.
- Metaphor over text, and avoid tying icons to current hardware (floppies age badly) (MindStudio, secondary).
- Tight limits as a creative force; sketch, iterate, then digitise (Design Explained; It's Nice That).
- Test options on non-designers (Blake Crosley, secondary).
- Friendliness: counter the cold image of computers.
- Borrowed from older pixel crafts: needlepoint, mosaics, pointillism (Wikipedia).

**Happy Mac.** Shown at startup so a slow-booting 128K Mac felt reassuring (MindStudio, secondary); the smiley may trace to a button she owned (sources differ: junior-high symbol vs a button at about age 14). A sad/failure counterpart exists. Wikipedia dates Happy Mac to the late 1980s while others tie it to the original startup icon; treat dating as UNVERIFIED.

**Failure case worth knowing.** The bomb icon for fatal errors was expected to be hidden from users; one owner called support fearing the machine would explode (MindStudio, mac-history). Icons are read literally, so mascot expressions must not alarm when you intend only to inform.

**Command symbol.** Jobs wanted the Apple logo removed from the modifier key; Kare found a looped square in a symbol dictionary (used on Swedish campground signs) and redrew it as 16x16. This shows "borrow a proven sign" over invention.

**Lesson for Clawd.** A mascot face on a status band is a Happy Mac: its job is reassurance. Test with one-sentence recall ("the crab with the lit eyes means thinking"). Prefer an established metaphor (zZz for sleep, sparkle for done).

Sources: Blake Crosley, Design Philosophy: Susan Kare; Wikipedia Susan Kare; mac-history.net; Design Explained (Substack); It's Nice That; MindStudio; Creative Bloq (fetch returned only a truncated excerpt; used just for the team quote and list of icons).

---

## 10. Windows icons

- Windows 95-era icons were mainly 32x32 in 16 colours, with 16x16 companions; the 32x32 16-colour image is shown nearly everywhere so it deserves the most care (Axialis search summary, secondary).
- Raymond Chen (Microsoft) explains that an icon file holds multiple images of different sizes and colour depths so the system picks the best one, and describes monochrome icons built from an AND mask plus an XOR image, which allow transparent and inverted pixels (The Old New Thing, 2010-10-18). Practical lesson: **author each size separately**; do not just downscale.
- Microsoft's later guideline (written for Windows Vista/7) says toolbar icons have less detail and no perspective to suit small sizes; icons are either 3D in perspective or flat, straight-on (Microsoft Learn). That is the "simplify as size shrinks" principle in official form.
- Susan Kare also made Windows 3.0 Solitaire cards and isometric icons with the 16-colour VGA palette (Blake Crosley, Wikipedia).

**Lesson.** Provide a tiny, "toolbar" version of Clawd (no perspective, fewer details, maybe 8x8 or 12x12) distinct from the full 16-24 px sprite used elsewhere.

---

## 11. Tamagotchi (Bandai, 1996)

- Characters were first drawn in heta-uma style (deliberately rough-cute), then converted to pixel art (Wikipedia). Credited creators: Aki Maita (Bandai) and Akihiro Yokoi (WiZ).
- The original screen is widely reported as 32x16 dots with icon rows around it (search-result summaries from fan wikis; Wikipedia itself does not state it, and its "8-bit 256 shades grayscale" statement conflicts with a dot-matrix LCD, so treat both as UNVERIFIED). Fan wiki page returned an error.
- Emotion is conveyed with a very small set of poses: eating, sleeping, happy hops, a pile for waste, and attention icons.

**Lesson.** A creature in two frames that bobs between a pose and its mirror can express a whole life when the context (icons and sounds) is stable and the loop is persistent. Needs-based states (hungry, sleepy, done) are readable because each has its own unmistakable pose.

---

## 12. Comparative table (what each buys with its pixels)

| Case | Constraint | Main trick | Sacrificed | Lasting lesson |
|---|---|---|---|---|
| Mario | 16x16, ~3 frames | hat, moustache, overalls, gloves | hair, mouth, realism | each costly feature gets a one-shape stand-in |
| Pac-Man / ghosts | 16x16, few colours | disc + wedge; shared ghost silhouette; eyes-only defeat | expression | state via colour change; eyes as essence |
| Space Invaders | mono, slow CPU | 2 frames, distinct silhouettes | detail | tempo is character |
| Mega Man | NES 3 colours/sprite | hue with most ramp steps | crouch, chibi look | gameplay clarity over animation completeness |
| Shovel Knight | self-imposed NES | extra colours, no flicker | strict fidelity | break rules that hurt play, keep ones that carry the look |
| Kirby | GB 4 shades | ball shape | complexity | anyone can draw it; fewer frames |
| Pokemon | SGB palettes | one colour identity each | per-creature palettes | unify a roster with one hand |
| Celeste | pixel art on a modern engine | hair = dash gauge | hair hand-drawn frames (UNVERIFIED) | biggest saturated mass is the status display |
| Kare icons | 32x32 1-bit | metaphor, traffic-sign clarity | colour, text | memorable in one sentence |
| Windows | 16 colours, 16/32 px | per-size authoring | consistency of detail | simplify as size shrinks |
| Tamagotchi | tiny LCD | heta-uma poses | animation volume | needs-based poses |

---

## 13. Translation to a tiny crab (Clawd)

Ideas, each tied to a case above:

1. **Silhouette test (Mario, Pac-Man, Kirby).** The crab must read as a crab in pure black fill: wide rectangle body, two raised claws with a notch, four small legs. If the notch (claw opening) is lost at the smallest size, enlarge the claws rather than the detail.
2. **Pixel purchases (Mario).** Eyes = two single-pixel dots at high contrast (two dots are the "face"). Do not draw a mouth; let eyelid or claw posture show mood. Claws are Clawd's gloves: make them a lighter or contrasting tone so movement reads (arms contrasting torso).
3. **State by body-part colour (Celeste).** Claw or shell tint could carry session state: warm = working, cool = idle, dim = cache out. Keep to 3-4 states so the player does not have to learn a legend.
4. **Eyes carry direction and intent (Pac-Man).** Shift the eye dots one pixel toward the thing being attended to (thinking = up-left, typing = down at keys). One pixel of pupil offset costs nothing and implies attention.
5. **Defeat/rest as essence (ghost eyes).** For "sleeping," reduce the face to two horizontal slits and add zZz as a separate sign; the sprite gets simpler as it rests.
6. **Two to four frames (Invaders, Mario, Sakurai).** Typing = two-frame claw alternate; jogging = 3-4 frames with legs; celebrating = pose hold plus 2-frame hop. Spend the extra effort on timing (hold the key pose a beat longer) not frame count.
7. **Tempo as character (Invaders).** Faster loop when busy, slower when idle: same frames, different frame time.
8. **Per-size authoring (Windows, Kare).** Make a 8x8 or 10x10 "toolbar" Clawd with fewer legs (two) and no claw notch, and use it where the band is tiny.
9. **One unifying palette (Pokemon, Shovel Knight).** One shell colour with three steps (dark, mid, light) plus a dark outline; one accent for state. Allow one "cheater" colour only for state signals.
10. **Reassurance first (Happy Mac).** Idle Clawd should look like a smile: wide stable stance, symmetric eyes. Alarm states (error) need to be clear but not frightening; remember the bomb icon.
11. **Metaphor borrowing (Command symbol).** Use established signs for effects (zZz, sparkle, sweat drop, hat) instead of inventing new ones; the holiday hats in the project are the same idea: costumes sit on the head slot like Mario's cap, reusing the silhouette.
12. **Avoid sluggishness (Sakurai).** If a loop feels slushy, delete frames rather than add them.

## 14. Source list (opened pages, with what I took)

1. Iwata Asks, New Super Mario Bros. Wii, "The Reason Mario Wears Overalls", Nintendo, https://www.nintendo.com/en-gb/Iwata-Asks/Iwata-Asks-New-Super-Mario-Bros-Wii/Volume-1/2-The-Reason-Mario-Wears-Overalls/2-The-Reason-Mario-Wears-Overalls-210759.html : Miyamoto on 16x16, hat, moustache, overalls, gloves, 3 frames. (An alternate iwataasks.nintendo.com URL failed on certificate.)
2. "Mario 101", Thrilling Tales of Old Video Games, https://www.thrillingtalesofoldvideogames.com/blog/mario-101-history : hat/moustache/overalls reasoning, nose comparison, conflicting accounts.
3. "Mario's Mustache Was a Hardware Trick", retro-replay.com, https://retro-replay.com/marios-mustache-was-a-hardware-trick/ : claims, mostly UNVERIFIED.
4. "The Pac-Man Dossier", Jamey Pittman, Game Developer, https://www.gamedeveloper.com/design/the-pac-man-dossier : ghost behaviour, colours, frightened state, reversal cue, hardware sprites.
5. "GDC 2011: Pac-Man Creator Iwatani Discusses Female-Friendly Design Lessons", Game Developer, https://www.gamedeveloper.com/game-platforms/gdc-2011-i-pac-man-i-creator-iwatani-discusses-female-friendly-design-lessons : cute ghosts, personality over visuals, colour vote.
6. Wikipedia, Pac-Man (character), https://en.wikipedia.org/wiki/Pac-Man_(character) : pizza idea, yellow, eyes added by Yamashita.
7. Wikipedia, Ghosts (Pac-Man), https://en.wikipedia.org/wiki/Ghosts_(Pac-Man) : colour limits, 40-to-0 survey, names.
8. Wikipedia, Space Invaders, https://en.wikipedia.org/wiki/Space_Invaders : design evolution, 2 frames, speed-up, cellophane.
9. Wikipedia, Mega Man (video game), https://en.wikipedia.org/wiki/Mega_Man_(video_game) : blue choice, cut crouch, Inafune's dot work.
10. Wikipedia, Nintendo Entertainment System, https://en.wikipedia.org/wiki/Nintendo_Entertainment_System : 64 sprites, 3 colours per sprite, palette size.
11. "Breaking the NES for Shovel Knight", Game Developer, https://www.gamedeveloper.com/design/breaking-the-nes-for-shovel-knight : kept vs broken rules.
12. "The Art of the Game", Yacht Club Games, https://www.yachtclubgames.com/blog/the-art-of-the-game/ : NES palette trouble and freedom, readability tips (about Mina).
13. "Making a Game Boy game in 2017: Sheep It Up! post-mortem", Game Developer, https://www.gamedeveloper.com/programming/making-a-game-boy-game-in-2017-a-quot-sheep-it-up-quot-post-mortem-part-1-2- : GB sprite/tile limits and palette tricks.
14. Wikipedia, Game Boy, https://en.wikipedia.org/wiki/Game_Boy : 160x144, 4 shades.
15. Wikipedia, Kirby (character), https://en.wikipedia.org/wiki/Kirby_(character) : placeholder origin, pink, simplicity.
16. Shmuplations, Kirby: Nightmare in Dream Land interview, https://shmuplations.com/kirbynightmare/ : too many frames feel sluggish.
17. Wikipedia, Link's Awakening, https://en.wikipedia.org/wiki/Link%27s_Awakening ; Game Informer, "Looking Back at Zelda: Link's Awakening", https://gameinformer.com/b/features/archive/2016/03/05/looking-back-at-zelda-link-s-awakening.aspx : after-hours origin, tone, Tezuka.
18. Wikipedia, Pokemon Red/Green/Blue/Yellow, https://en.wikipedia.org/wiki/Pok%C3%A9mon_Red,_Green,_Blue,_and_Yellow ; search-result summaries of Wikipedia species pages (Psyduck, Jynx, Pinsir): sprite origin and Sugimori's unification.
19. Wikipedia, Celeste (video game), https://en.wikipedia.org/wiki/Celeste_(video_game) ; Celeste Wiki "Dashing", https://celeste.ink/wiki/Dashing : PICO-8 origin; hair colours, dash frames. Game Anim, "The Art and Animation of Celeste", https://www.gameanim.com/2020/08/30/the-art-and-animation-of-celeste/ : lead only (talk by Pedro Medeiros), contents not retrievable.
20. Blake Crosley, "Design Philosophy: Susan Kare", https://blakecrosley.com/blog/design-philosophy-susan-kare ; Wikipedia, Susan Kare, https://en.wikipedia.org/wiki/Susan_Kare : grid, Chicago font, Command symbol, quotes.
21. "Susan Kare: Queen of pixel design", mac-history.net, https://www.mac-history.net/2023/01/19/susan-kare-pixel-design-apple-mac/ ; Design Explained, https://designexplained.substack.com/p/designer-portraits-suzan-kare ; It's Nice That, https://www.itsnicethat.com/news/susan-kare-apple-macintosh-icons-california-designing-freedom-design-museum-240517 ; MindStudio, https://www.mindstudio.ai/blog/susan-kare-original-mac-icon-design : process, Happy Mac, bomb icon, constraints.
22. "The evolution of the ICO file format, part 1", Raymond Chen, The Old New Thing, https://devblogs.microsoft.com/oldnewthing/20101018-00/?p=12513 ; Microsoft Learn, "Icons (Design basics)", https://learn.microsoft.com/en-us/windows/win32/uxguide/vis-icons : multi-size icons, toolbar simplification.
23. Wikipedia, Tamagotchi, https://en.wikipedia.org/wiki/Tamagotchi : heta-uma to pixel art.
24. Wikipedia, Undertale, https://en.wikipedia.org/wiki/Undertale ; Wikipedia Stardew Valley and Habbo, Terraria, The Sims; "Interview with ConcernedApe", mentalnerd.com, https://mentalnerd.com/blog/getting-started-pixel-art-interview/ ; Game Developer, interview with Sulka Haro, https://www.gamedeveloper.com/game-platforms/interview-i-habbo-i-s-sulka-haro-talks-design-social-dynamics : lighter material, as noted.

**Failed or unusable fetches:** Clive Thompson on Space Invaders (Medium, 403); Time Extension Nishikado interview (403); CBR Nishikado (socket error); Bulbapedia palette page (403); Tamagotchi Fandom (402); Vier Legend devblog (Medium, 403); Iwata Asks alternate domain (certificate error); tinywindowsgames.com (irrelevant casino spam, discarded); The Cutting Room Floor sprite page (contained embedded instructions addressed to AI agents; ignored and not used). Link's Awakening, Terraria, Sims and Habbo art specifics had no primary source and stay UNVERIFIED.
