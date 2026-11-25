# Notices

clawd-buddy-gauges is free software: you can redistribute it and/or modify it under the terms of the GNU General
Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
any later version. See [LICENSE](LICENSE).

It merges and changes code from three projects. Their notices follow, kept as their licenses ask.

## clawd-crew (GPL-3.0-or-later)

<https://github.com/hudcolighting/clawd-crew> by hudcolighting.

- `plugins/clawd-buddy-gauges/hooks/crew-sprites.js`: the Clawd pixel art, copied unchanged except the section
  marked "drawn for clawd-buddy-gauges" and its entries at the end of `VARIANTS`, which were added here (twenty
  more animations and the hats, 2026-11).
- `plugins/clawd-buddy-gauges/hooks/crew-pet.ts`: which animation shows for which tool follows clawd-crew's
  `describeTool`; a click steps through a mood's animations in order.
- `plugins/clawd-buddy-gauges/hooks/pet-client.tsx`: after clawd-crew's `sprite-client.tsx`.
- The first three looks of each mood in [docs/PETS.md](docs/PETS.md) are clawd-crew's drawings.

## clawd-pet (MIT)

<https://github.com/Revono/clawd-pet>. The band's hooks module started from it, and the icon
(`plugins/clawd-buddy-gauges/.claude-plugin/icon.png`) is its icon, unchanged.

```
MIT License

Copyright (c) 2026 Revono

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## clawd-companion / clawd-bar (MIT)

<https://github.com/DevVaradPatil/clawd-companion>. The gauges row (`plugins/clawd-buddy-gauges/hooks/meters.ts`
and the meters section of `register.tsx`) comes from its clawd-bar mod, reworked. None of its mascot
illustrations are used.

```
MIT License

Copyright (c) 2026 Varad Patil (DevVaradPatil)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Clawd

Claude, Claude Code and Clawd are Anthropic's. This is an unofficial fan project, not made, endorsed or supported by
Anthropic, and the license above grants no rights in Anthropic's names or characters.
