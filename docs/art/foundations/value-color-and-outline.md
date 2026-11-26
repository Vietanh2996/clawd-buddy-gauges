# Value, colour and outline

> **Read when:** choosing a palette, adding a highlight, deciding whether to outline, or checking that a sprite survives a light terminal theme. **Related:** [silhouette](silhouette-and-readability.md) · [clawd/engine-and-conventions](../clawd/engine-and-conventions.md)

*A lens, not a law: everything below is a default with a reason. Break it on purpose when you have a better idea, and say why.*

## The question

*What carries the shape: value, hue, or an edge, and does it still carry it on the background I don't control?*

## Why it works

- **Value beats hue.** The eye reads light-dark structure first. Pixeli's contrast ladder (8 px disc test): 0 value steps vanishes, 1 step is weak at 1x, 2+ steps read. Aim for at least two ramp steps between a body and the background directly behind it. A colour picker's brightness isn't perceived brightness (pure yellow and pure blue can share V=100 and look very different), so judge in greyscale at 100% (Tsubu).
- **Hue shifting avoids grey.** A "straight" ramp that only changes brightness looks flat and grey. Shadows pick up cooler or deeper hues, highlights warmer ones (Slynyrd, Pixelblog 1: roughly +20 degrees per step in a 9-swatch ramp, saturation peaking mid-ramp). At tiny sizes Pixeli compresses this to a hue travel of about 30-50 degrees across a whole 16 px ramp, no single step above ~20. Temperature contrast is cheaper than an extra value step at 16 px.
- **Few colours is a feature.** Per material 3 steps at tiny sizes (3-5 at larger). Whole sprite: ~4-6 colours at 16 px, 8-16 at 32 (Pixeli 20, Tsubu). Saint11 reports Neverway is mostly around 8 colours, and chooses constraints for artistic reasons (stop over-scoping, give the game an identity) while warning against going so tight you can't express anything.
- **Don't carry meaning by colour alone.** Add shape or motion, and prefer value or blue-yellow contrast over red-green (Pixeli 14). This matters for Clawd's error and cache-out states.
- **Outline choice is a budget decision.** Four styles: none, full dark, selective ("sel-out", only where the sprite meets the background), coloured (darker version of the fill). An outside outline grows the shape by 1 px; an inside outline recolours edge pixels. Below about 24 px, outline only the outer silhouette, and separate inner parts by colour (Pixeli 04, 30). Saint11: at extreme low resolution outlines are often the first thing to go; solid shapes with strong contrast work better.
- **Don't anti-alias the outer edge when the background is unknown.** Blended edge pixels look wrong on a different background (Derek Yu). A terminal band has exactly that problem.

## Look at it: Clawd's palette, measured

Contrast ratios computed for this KB from the engine's palette (WCAG relative-luminance formula; for graphics 3:1 is the usual bar):

| Pair | Ratio | Reading |
|---|---|---|
| body `#D97757` on the band tile `#1b1a19` | **5.57** | strong; the sprite owns dark themes |
| ink `#1C1B1A` (eyes) on body | **5.51** | the eyes are the highest-contrast pixels on the sprite, exactly where they should be |
| body on white | **3.12** | just clears 3:1, so Clawd survives a white terminal theme, but with no margin |
| body shade `#B4583A` on body | **1.53** | the engine uses this as the *whole-body colour* in the error moods (dimmed, smoking, rained on): state by tint, and subtle enough that it reads as "same crab, having a bad time" |
| tile `#1b1a19` on floor `#2c2a27` | 1.21 | the floor line is meant to be felt, not seen |

What this says: Clawd is a **no-outline, flat, two-value character**. The body relies on its orange (mid-luminance, strongly warm) against a dark ground; the face is a near-black cut-out. It is a design that works on dark and is *tolerable* on light. If Clawd is ever shown on light backgrounds a lot, the options are an inside outline in the `#B4583A` shade, a sel-out on the lit edges, or a rim; all of them are choices to weigh, not fixes to apply.

Palette indices also show a system: neutrals (`#FFFFFF`, `#8F8B84`, `#4B4844`, `#C8C3B9`) for props and bubbles, a handful of accent hues (blue `#6A9BCC`, green `#6FAE5A`, red `#E0524A`, yellow `#F2C14E`) for effects, a "small Clawd" tone `#E8A084` one step lighter and pinker than the body for crowd members, and extra tones for hats. Accents live on props and effects, never on the body; that keeps the body's hue as the identity constant.

## In practice

1. **Decide the palette before the sprite.** Count transparency in the budget; reuse swatches across unrelated objects but not touching ones; share the darkest ramp step between materials.
2. **One accent hue per state**, on the focal feature (eye, gem, flame, prop), covering at most 5-8% of pixels (Pixeli 20). Celeste's hair-as-gauge is the model: the biggest saturated mass carries the state. See [studies/celeste-hair-gauge](../studies/celeste-hair-gauge.md).
3. **Dark but not black, light but not white.** Tinted ends of the ramp (Pixeli 20). Pure black is for contact accents. Clawd's ink is `#1C1B1A`, a warm near-black, not `#000000`.
4. **Test on three backgrounds**: the dark tile, a white terminal, and a real screenshot crop. Re-test after any palette change.
5. **Dither and AA at 16 px**: usually skip them. Dither reads as noise below ~32 px except on large flat areas; AA only as a single deliberate pixel on a long diagonal and never on the outside edge.
6. **Animation raises the bar.** An outline pixel that exists for one frame reads as noise; keep silhouette continuous, and inner lines only where a part truly passes in front (Pixor).

## Tensions

- **Outline vs room to draw.** Outlines help against busy backgrounds and cost ~30% of a 16 px figure. The band background is flat and known-dark, which is why no outline works for Clawd; a light theme changes the equation.
- **Fewer colours vs expression.** Going too tight removes the range you need for states; an accent colour that exists only to signal state is usually worth its slot (Shovel Knight added a handful of "cheater" colours to the NES palette for exactly this kind of reason).
- **Hue shift vs identity.** A big hue shift enriches a ramp but can drift the brand colour. Clawd's shade is nearly same-hue; deeper hue shifts are an idea to try, not a gap.

## Ask yourself

- Take the colour out. Does it still read?
- If this sprite sat on white, where would it vanish first?
- Is this colour doing a job (identity, state, depth), or just there?
- Am I using colour *alone* to say "error"?

## Sources

[Pixeli 01, 04, 14, 20, 21, 30](https://pixeli.pebbly.space/knowledge) · [Slynyrd Pixelblog 1: Color Palettes](https://www.slynyrd.com/blog/2018/1/10/pixelblog-1-color-palettes) · [Derek Yu](https://www.derekyu.com/makegames/pixelart.html) · [Saint11: Very Low Resolution](https://saint11.art/blog/thoughts_on_low_resolution/) · [Pixnote: outlines](https://pixnote.net/en/learn/outlines/) · [Pixor: outline styles](https://pixor.art/learn/outlines/) · [Tsubu: palettes](https://tsubu.art/blog/pixel-art-color-palettes) · [Game Developer: Breaking the NES for Shovel Knight](https://www.gamedeveloper.com/design/breaking-the-nes-for-shovel-knight). Palette values from `crew-sprites.js`; ratios computed for this KB. The Celeste "12 colours" figure quoted by Pixeli is UNVERIFIED. [references](../references.md).
