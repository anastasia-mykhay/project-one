# Notes for Claude Code: portfolio hero and case study cards

The attached HTML file is a single-file design prototype (HTML, CSS and JS in one file). Build it into the real site and keep the look and behaviour exactly as it is. It is about 330 KB only because the screenshots are embedded as base64.

## 1. Do not change these (intentional)

- **Case card design.** The owner decided to keep the cards as they are. Do not restyle them. Square corners, ink text on a flat project colour: all intentional.
- **Screenshot sizes differ per case.** Miri is `height:460px`, RentFlow is `width:min(100%,500px)`, SeMA is `height:500px`. Studio has no image yet. Do not make them uniform. The owner will supply final, high-quality images.
- **Display headings use different styles.** Hero h1 is weight 200 with no letter-spacing. "Projects" and card titles are weight 300 with -.03em. The footer email is weight 300 and shrinks to 34px on phones. Each has its own fluid size scale. This is a deliberate hierarchy.
- **Small labels.** Meta and bars are 13px / .06em / regular. The `Question` and `Decision` labels are 14px / .08em / bold. Keep both.
- **Rail dot colour.** The inactive 01–04 dots are very faint on purpose.
- **Two breakpoints.** 820px (cards and rail go to the phone layout) and 979px (hero goes single column). Between them the hero is stacked while the cards are still in the desktop layout. Keep both.
- **Placeholder lines.** The Studio placeholder keeps its dashed border for now.

## 2. To do in the build

1. **Replace placeholders.** `[Name]`, `[Surname]`, `[email@address]`, the footer link `href="#"`, and the page title (currently "Hero and cases: one theme"). The owner will provide the real values.
2. **Add missing head tags.** There is no meta description, favicon or social preview image (`og:image`).
3. **Move the images out of the file.** Make them separate files with `width` and `height` set to avoid layout shift. Keep the alt text from the data. The per-image sizes currently live in inline `st` strings in the project data. Move them to CSS, keeping the same values.
4. **Studio card.** The dashed "in progress" box (`.ph`) and its text are hard-coded in the card template. Remove it when the real Studio image arrives. The real image takes the same 12px corner radius as the other screenshots (the placeholder already uses 12px).
5. **Footer link.** Turn it into a real `mailto:` link.

## 3. Sizing system (already in the prototype, keep it)

All circles come from one setting, so changing it updates everything.

| Setting | Value | Used for |
|---|---|---|
| `--dot-size` | 10px (`:root`) | Rail dots, footer dots, paragraph bullets, Question/Decision markers |
| `--ring-size` | dot + 8px | All rings |
| `--rail-h` / `--rail-w` | 44px / 64px | Rail button height (desktop step) and width (mobile step) |
| `--hero-gap` | 6px | Gap between hero dots |
| `--up-gap`, `--up-pad` | 10px, 4px | Footer "Back to top" dot stack |

- **Hero dots are the exception.** `#hero-dots` overrides the size with `--dot-size: clamp(7px, .49vw + 5px, 10px)` and recalculates `--ring-size`. It is 7px on phones and 10px from about 1000px up. A change to the global `--dot-size` does not affect them.
- **Ring distances are calculated**, not typed: hero step = dot + gap, rail step = `--rail-h`, footer = 3 × (dot + gap).
- **The footer ring assumes exactly 4 dots.** If a dot is added or removed, change the `3` in `.up-ring`'s transform.
- **The "Projects" heading dots are separate.** They are sized in `cap` units (`.32cap`, gap `.05cap`) so they scale with the heading, and `top:-.525cap` centres them on the capital height. No fallback is kept for browsers without `cap` support.

## 4. Class names (cleaned up, keep these)

| Where | Name |
|---|---|
| "Projects" heading dots | `.projects-dots`, `.projects-dots-grid` (animation `projects-dots-in`) |
| Hero dots and ring | `#hero-dots`, `.hero-dot`, `.hero-ring` |
| Side rail | `.rail-dot`, `.rail-ring` |
| Card markers | `.marker-hollow` (Question), `.marker-filled` (Decision) |
| "Back to top" | `.up-dots`, `.up-ring` |

## 5. Left alignment (keep)

The hero (top row, heading, bottom line and dots), the "Projects" title and dots, the 01–04 rail and the footer all start on the same left line. The gutter is `max(24px, calc((100% - 1232px) / 2))`. It must use `%`, not `vw`, because `vw` includes the scrollbar and shifts the hero a few pixels off the cards. Put it in one token and reuse it.

## 6. Still hard-coded (derive from variables if possible)

- `.p1` offset `translate(-30px, -80px)` on desktop.
- The `.sub` indent: `clamp(1.5em, calc(100% - 15.8em), 3em)`.
- Paragraph bullet position `left:2px`, and `.role i` margin `calc(11px - var(--dot-size) / 2)`.
- Mobile `.case{scroll-margin-top:69px}`. That is the 45px sticky rail (44px + 1px border) plus 24px. It should come from `--rail-h`. Without it, tapping 01–04 on a phone leaves the card's top under the bar.
- Card divider and placeholder lines use `rgba(32,32,32,.35/.5/.45)` instead of `--ink`, so they would not follow a colour change. The owner has not decided yet. Suggested: derive them from `--ink`.
- Hero ring offset and travel use the dot size and `--hero-gap`. Check them if you change the hero dot settings.

## 7. Behaviour to preserve

- **Hero dots** run a looping sequence, and the ring travels to each dot in turn.
- **"Projects" dots** spin in each time the heading scrolls into view. They reset only once the heading has fully left the screen, so they never disappear while the word is partly visible.
- **Cards** animate in (`.case.arm` to `.go`), with `--dy` calculated in JS for the Question to Decision drop.
- **Rail** ring follows the current card. The 01–04 labels show a hover state on devices with a mouse.
- **"Back to top"** ring moves on hover.
- **Reduced motion.** Everything animated is switched off and the JS exits early. Keep this.
- **Accessibility.** Decorative dots and rings are `aria-hidden`. The rail is a `nav` with an aria-label. Focus-visible styles exist on interactive items. Heading order is h1, h2, h3. Keep all of it.
- **Hero bottom bar on phones.** "Scroll down" stays on one line (`white-space:nowrap`) and sits next to its arrow.

## 8. Palette and type

- **Fonts:** Archivo from Google Fonts, weights 200, 300, 400, 700, plus italic 200.
- **Colours:** `--bg #fbf9f5`, `--ink #202020`, `--mute #5c574f`, `--line #d9d4c9`, `--dot #c9c3b6`. Hero dark variants: `--night-line #444`, `--night-mute #a8a8a8`, `--night-soft #c9c9c9`. Project colours: Miri `#d2a574`, RentFlow `#f0dc8c`, Studio `#b9c4a0`, SeMA `#c4785a`.

## 9. Check after the build

1. Hero, "Projects", rail and footer start on the same left edge, with and without a visible scrollbar.
2. Every ring sits exactly on its dot. Test by changing `--dot-size` to 8px and 14px.
3. On a phone, tapping 02 puts the whole card below the sticky bar.
4. The hero dot sequence runs, and the "Projects" dots replay each time you scroll back to the heading.
5. With reduced motion on, nothing animates and nothing stays hidden.
6. No horizontal scrolling between 320px and 1600px.
