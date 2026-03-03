# RECRENT — Design System Master

**Aesthetic Direction:** Industrial Editorial · Monochrome Brutalist · Gaming Merch  
**Tone:** Raw, precise, confident. No decoration for decoration's sake — every element earns its place.  
**Unforgettable:** Sharp-edged typographic architecture on a warm dark field. The absence of color becomes the statement.

---

## 1. Color System

```css
/* ── CORE PALETTE ─────────────────────────────── */
--rc-bg:           #191516;   /* Warm dark — primary background          */
--rc-bg-elevated:  #1E1A1B;   /* Slightly elevated surfaces              */
--rc-bg-deep:      #141112;   /* Cart sidebars, overlays, modals         */
--rc-bg-invert:    #EAE2E6;   /* Inverted blocks (e.g. CTA accent area)  */

--rc-fg:           #EAE2E6;   /* Warm cream — primary text & icons       */
--rc-fg-secondary: rgba(234,226,230,0.55);  /* Secondary labels           */
--rc-fg-muted:     rgba(234,226,230,0.30);  /* Muted copy, placeholders   */
--rc-fg-subtle:    rgba(234,226,230,0.12);  /* Hairline decor, rule lines */
--rc-fg-ghost:     rgba(234,226,230,0.06);  /* Deep ghost elements        */

/* ── BORDERS ──────────────────────────────────── */
--rc-border:       rgba(234,226,230,0.07);  /* Default section borders    */
--rc-border-hover: rgba(234,226,230,0.25);  /* Hover state borders        */
--rc-border-strong: rgba(234,226,230,0.15); /* Emphasized borders         */

/* ── FUNCTIONAL ───────────────────────────────── */
--rc-overlay:      rgba(25,21,22,0.85);     /* Dark overlay on images     */
--rc-overlay-light: rgba(25,21,22,0.45);    /* Gradient fade-to-dark      */
```

### Usage principles
- **Monochromatic only.** No hue-based accent colors. Identity comes from contrast ratios and opacity.
- Warm dark (`#191516`) has a brownish tint — not pure black. Maintain this warmth.
- Cream (`#EAE2E6`) has a subtle pinkish warmth — not pure white. Preserve it.
- Never introduce blues, purples, or any saturated accent unless explicitly added to the system.

---

## 2. Typography

### Font Stack

| Role        | Font           | Weight       | Tracking        | Usage                              |
|-------------|----------------|--------------|-----------------|-------------------------------------|
| Display     | Manrope        | 900 (Black)  | `-0.03em`       | Hero H1, section titles             |
| Heading     | Manrope        | 700–800      | `-0.02em`       | Product titles, section subtitles   |
| UI Label    | JetBrains Mono | 400–700      | `0.15–0.35em`   | Nav items, tags, CTA text, captions |
| Body        | Manrope        | 400–500      | `0em`           | Descriptions, review text           |

### Scale (clamp-based, responsive)

```
H1 (Hero):      clamp(2.4rem, 5.2vw, 5.5rem)  — Manrope 900 leading-[0.88]
H2 (Section):   clamp(2rem, 4.5vw, 4rem)       — Manrope 900 leading-[0.9]
H3 (Card):      clamp(0.9rem, 2vw, 1.25rem)    — Manrope 700 leading-[1.2]
Label:          10–11px                          — JetBrains Mono uppercase tracking-[0.2–0.35em]
Body:           13–15px                          — Manrope 400 leading-[1.75]
Caption:        9–10px                           — JetBrains Mono uppercase tracking-[0.25em]
```

### Conventions
- H1 opacity split: main word `[#EAE2E6]`, ghost word `[#EAE2E6]/20`, underline accent `w-full h-[2px] bg-[#EAE2E6]/15`
- Section index labels: `─── 001 / Category` in JetBrains Mono, `text-[9px] tracking-[0.3em] text-[#EAE2E6]/25`
- All labels UPPERCASE
- Button text: JetBrains Mono, `text-[11px] tracking-[0.18em] uppercase font-bold`

---

## 3. Border Radius

```
ZERO. Always.
border-radius: 0 on everything.
```

This is the single most defining rule of the system. Sharp corners everywhere:
- Buttons: `0` (NOT rounded-md, rounded-sm — nothing)
- Cards: `0`
- Badges: `0`
- Input fields: `0`
- Modals, drawers: `0`
- Image containers: `0`
- Social icons: `0`
- Badge pills: `0`
- Cart items: `0`

*Only exception: if a 3rd-party component overrides and cannot be styled — document explicitly.*

---

## 4. Spacing System

### Container
```css
padding-inline: clamp(1.5rem, 4vw, 5rem);    /* px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 */
max-width: 1400px;
margin-inline: auto;
```

### Section Rhythm
```
Section padding:  py-14 md:py-20 lg:py-24
Section gap:      gap-3 md:gap-4 (product grids)
Section header:   mb-8 md:mb-12
```

### Component Spacing
```
Card padding:     p-0 (images flush) + p-3 md:p-4 (content area)
Button:           px-7 py-4 (primary), px-5 py-3 (secondary)
Label top margin: mb-3 (before section H2)
Stats strip:      mt-8 lg:mt-10 pt-5 border-t
```

---

## 5. Border & Divider System

```
Default section border:  1px solid rgba(234,226,230,0.07)
Card ring:               1px solid rgba(234,226,230,0.10)
Hover border:            1px solid rgba(234,226,230,0.25)
Active/focus:            1px solid rgba(234,226,230,0.40)
Top accent (hero):       1px gradient from-transparent via-[#EAE2E6]/20 to-transparent
```

Borders are hairline dividers only. Never decorative boxes or thick outlines.

---

## 6. Elevation & Shadow

Shadows are NOT used in the traditional sense. Elevation is conveyed through:
- **Opacity layering** — darker bg for overlaid panels (`--rc-bg-deep`)
- **Border contrast** — slightly brighter border on elevated elements
- **Fill difference** — no box-shadow; background color difference only

```css
--shadow-none:  none;   /* All interactive components — no shadow */
```

*Only exception: `ring-1 ring-black/20` on product image containers for subtle depth.*

---

## 7. Motion & Animation

### Principles
- Animations feel **editorial and measured** — not bouncy or playful.
- Stagger entrance: `staggerChildren: 0.08s`
- Primary easing: `cubic-bezier(0.22, 1, 0.36, 1)` — fast out, ease in to rest
- Duration: entrance `0.5–0.7s`, micro `0.2s`, hover `0.2s`
- `prefers-reduced-motion`: all animations disabled

### Variants (standard)
```ts
fadeUp:  hidden: { opacity: 0, y: 28 } → show: { opacity: 1, y: 0, duration: 0.6 }
fadeIn:  hidden: { opacity: 0 }        → show: { opacity: 1, duration: 0.8 }
stagger: staggerChildren: 0.08
```

### Hover interactions
- **Images**: `scale-[1.02]` on product hero image (gentle zoom — ONLY for hero)
- **Cards**: NO scale. Opacity of overlay changes (0 → 1). Border opacity increases.
- **Buttons**: `opacity: 0.85` on hover — flat, not scale
- **Nav links**: opacity shift 45% → 90%

---

## 8. Component Patterns

### Button — Primary
```
bg-[#EAE2E6] text-[#191516]
font-jetbrains text-[11px] tracking-[0.18em] uppercase font-bold
px-7 py-4
hover:bg-[#EAE2E6]/85  transition-all duration-200
NO border-radius
```

### Button — Ghost (Secondary)
```
text-[#EAE2E6]/50 border border-[#EAE2E6]/15
font-jetbrains text-[11px] tracking-[0.18em] uppercase
px-7 py-4
hover:text-[#EAE2E6] hover:border-[#EAE2E6]/40  transition-colors duration-200
NO border-radius
```

### Button — Text Link
```
font-jetbrains text-[10px] tracking-[0.2em] uppercase
text-[#EAE2E6]/35 hover:text-[#EAE2E6]
border-b border-[#EAE2E6]/10 hover:border-[#EAE2E6]/40
pb-1  transition-colors duration-200
```

### Icon Button (Header actions)
```
w-9 h-9 flex items-center justify-center
bg-[#EAE2E6]/[0.07] hover:bg-[#EAE2E6]/15
transition-colors duration-200
NO rounded-full — sharp square
```

### Product Card (catalog)
```
Container: w-full flex flex-col cursor-pointer
Image:     aspect-[4/5] overflow-hidden NO rounded corners
Content:   pt-3 flex flex-col gap-1
Category:  font-jetbrains text-[9px] tracking-[0.25em] uppercase text-[#EAE2E6]/30
Title:     font-manrope font-bold text-[#EAE2E6] leading-[1.2]
Price:     font-manrope font-black text-[#EAE2E6]
Hover:     border opacity 0.07 → 0.20, image scale-[1.03] (only image, not card)
```

### Section Header
```
Index label: font-jetbrains text-[9px] tracking-[0.3em] uppercase text-[#EAE2E6]/25 mb-3
"─── 001 / Category"
H2:    font-manrope font-black leading-[0.9] tracking-tight clamp(2rem,4.5vw,4rem)
```

### Ticker Strip
```
py-3 border-b border-[#EAE2E6]/[0.07]
font-jetbrains text-[9px] tracking-[0.35em] uppercase text-[#EAE2E6]/20
animation: ticker 28s linear infinite
```

### Price Tag (hero overlay)
```
bg-[#191516] border border-[#EAE2E6]/20
px-4 py-2
font-jetbrains text-[11px] tracking-[0.12em] text-[#EAE2E6]
NO border-radius
```

### Footer
```
Border: border-t border-[#EAE2E6]/[0.07]
Headings: font-manrope font-bold text-[#EAE2E6]
Links: font-jetbrains text-[11px] tracking-[0.12em] text-[#EAE2E6]/40 hover:text-[#EAE2E6]/80
Social icons: w-8 h-8, bg-[#EAE2E6]/[0.05] border border-[#EAE2E6]/[0.08]
              hover: bg-[#EAE2E6]/[0.12] border-[#EAE2E6]/20
              NO rounded-lg — 0 radius
```

---

## 9. Page Structure (Home)

```
[Header 68px]
  ├── Logo (left): RECRENT — Manrope Black
  ├── Nav (center): JetBrains Mono labels
  └── Actions (right): icon buttons — SQUARE

[Hero Section — full-height split]
  ├── Left: Editorial copy block
  │    ├── Index label: ─── 001 / Gaming Merch
  │    ├── H1: three-line display (solid / ghost / underlined)
  │    ├── Sub-copy: JetBrains Mono 13px
  │    ├── CTAs: primary + ghost buttons
  │    └── Stats strip: value/label pairs
  └── Right: Featured product image (flush, no padding)
       ├── Product name overlay (top-left)
       ├── Image (object-cover, scale hover)
       └── Price tag (bottom-right)

[Ticker strip]

[Хиты — Popular Products Grid]
  ├── Section header (index + H2 + "View all" link)
  └── 2×4 → 4×4 product grid

[Новинки — New Arrivals Grid]
  └── Same structure

[Отзывы — Reviews Section]

[Footer]

[Bottom Navigation — mobile only]
```

---

## 10. Hero Aesthetic — The Reference

The hero section defines the entire system. Preserve these exact rules:

1. **Dark split layout**: text left (flex 1), image right (44–42vw on large)
2. **H1 opacity play**: word 1 solid, word 2 ghost `/20`, word 3 underlined (2px at `/15`)
3. **No background image on the hero panel** — the product image IS the visual
4. **Border separators** — horizontal and vertical hairlines only
5. **Price tag**: absolute-positioned square chip, bottom-right of image
6. **Stats strip**: 3 metrics separated by spacing (not dividers), below CTAs
7. **Index label**: always precedes the H2/H1 with `─── NNN / Category` pattern

---

## 11. Anti-Patterns (Never Do)

- ❌ `rounded-*` on any component (except explicitly documented exceptions)
- ❌ `box-shadow` with color tints (shadows are black/transparent only)
- ❌ Saturated accent colors (blue, purple, green, red as brand colors)
- ❌ `Inter` as primary font — not in Recrent system
- ❌ Cards bouncing/scaling on hover (layout shift, breaks editorial feel)
- ❌ Gradient backgrounds on hero (image is the visual)
- ❌ Emoji or colorful icons (monochrome SVG only)
- ❌ Light mode — system is dark-only
- ❌ `rounded-full` on icon buttons
- ❌ Colored text (only opacity-based typography hierarchy)
- ❌ Decorative borders thicker than 1px
- ❌ Background glassmorphism blur (not in this system)

---

## 12. CSS Variables (Tailwind v4 / globals.css)

```css
:root {
  --rc-bg:           #191516;
  --rc-bg-elevated:  #1E1A1B;
  --rc-bg-deep:      #141112;
  --rc-bg-invert:    #EAE2E6;

  --rc-fg:           #EAE2E6;
  --rc-fg-secondary: rgba(234, 226, 230, 0.55);
  --rc-fg-muted:     rgba(234, 226, 230, 0.30);
  --rc-fg-subtle:    rgba(234, 226, 230, 0.12);
  --rc-fg-ghost:     rgba(234, 226, 230, 0.06);

  --rc-border:       rgba(234, 226, 230, 0.07);
  --rc-border-hover: rgba(234, 226, 230, 0.25);
  --rc-border-strong: rgba(234, 226, 230, 0.15);

  --rc-overlay:      rgba(25, 21, 22, 0.85);
  --rc-overlay-light: rgba(25, 21, 22, 0.45);
}
```

---

*Design system version: 1.0 — March 2026*  
*Scope: All pages of recrentshop.ru*  
*Maintained by: Sensoria Lab*
