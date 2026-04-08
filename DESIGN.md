# Design System: Editorial Neo-Brutalism

## 1. Overview & Creative North Star
The Creative North Star for this system is **"The Personal Manual."**

Inspired by the Ron Cobb "Semiotic Standard" from *Alien*, this system transforms a software development blog into an authoritative, high-output industrial archive. We are moving away from the "softness" of modern SaaS design. Instead, we embrace a high-contrast, high-impact aesthetic that uses raw geometry and aggressive structural lines to signal technical precision.

The design breaks the standard template look through **Intentional Structural Weight**. By utilizing a 4px black stroke as a primary design element rather than a secondary detail, the UI feels physical—like a schematic printed on heavy cardstock. We reject the "infinite" scroll feel in favor of a "modular panel" layout, where information is contained in bold, hard-shadowed blocks.

## 2. Colors & Surface Logic

### The Palette
The palette is grounded in a heritage cream and punctuated by "Industrial Warning" red and functional accents.

* **Background (`#fbfaee`):** Our primary canvas. It mimics aged paper or a vintage technical terminal.
* **Primary (`#b7102a`):** Used for critical actions and high-intensity brand moments.
* **Secondary (`#7d5800`):** Inspired by industrial caution yellow. Use for sub-navigation and highlighting.
* **Tertiary (`#2a674c`):** An organic green, used for "Success" states and technical stable-system indicators.
* **Neutral/Surface (`#1b1c15`):** The "Deep Black" used for all borders, shadows, and primary text.

### The "Industrial Boundary" Rule
Unlike traditional modern systems, we **do not** use 1px lines or subtle tonal shifts to separate content.
* **Rule:** All major containers must be bounded by a **3px or 4px solid black border** (`on_surface`).
* **Rule:** Sectioning within a page is achieved through high-contrast "Surface Blocking." For example, a code block should not fade into the background; it should be a hard-edged `surface_container_highest` block with a 4px black outline.

### Signature Textures
While Neo-Brutalism is often flat, we introduce "Editorial Polish" through:
* **The Technical Grain:** Hero sections may use a subtle, 2% noise texture to reinforce the physical manual feel.
* **High-Intensity Gradients:** For CTAs, use a subtle linear gradient from `primary` (`#b7102a`) to `primary_container` (`#db313f`) at a 45-degree angle. This adds a "backlit" effect common in 80s control panels.

## 3. Typography
The typography scale is designed to be loud and uncompromising, contrasting a geometric sans-serif with a high-readability utilitarian core.

* **Display & Headlines (Space Grotesk):** This is our "Heading" voice. It is eccentric and technical. Use `display-lg` for blog titles to dominate the viewport. All headlines should have a `letter-spacing` of `-0.02em` to feel dense and pressurized.
* **Body & Titles (Inter):** For the "Technical Content." Inter provides the legibility required for long-form software articles. Its neutral tone allows the bold headers to breathe without competing for attention.
* **Code (Monospace):** All code snippets must use a monospaced font (e.g., JetBrains Mono or Fira Code) set against `surface_container_highest` with a 3px border.

## 4. Elevation & Depth: Hard-Shadow Brutalism

We reject "Ambient Shadows." In this system, depth is a physical displacement.

* **The Hard-Shadow Principle:** Elements do not "glow"; they cast a solid shadow. Use the `on_surface` color at 100% opacity for shadows.
* **Shadow Offset:** 4px to 8px (x and y).
* **Blur:** 0px.
* **Nesting & Layering:** To create hierarchy without shadows (Tonal Layering), place a `surface_container_lowest` card inside a `surface_container_low` section. This creates a "recessed" or "inset" look similar to a physical control deck.
* **The "Ghost Border" Exception:** In extremely dense data environments (like a complex table), if a 4px border is too heavy, use the `outline_variant` at 20% opacity. This is the *only* place a thin line is permitted.

## 5. Components

### Buttons
* **Primary:** `primary` background, `on_primary` text, 4px black border, 4px black hard shadow. On hover, the shadow disappears (x:0, y:0) to simulate the button being physically pressed.
* **Secondary:** `surface` background, `on_surface` text, 4px black border, 4px black hard shadow.

### Cards
* Cards should have 0px border-radius (`roundedness: 0px`).
* Every card requires a 4px black border.
* For a "Featured Post," use a 12px hard shadow to make it pop off the grid.

### Input Fields
* Background: `surface_container_lowest`.
* Border: 3px solid black.
* Focus State: The border transitions to `primary` (`#b7102a`) with an 8px hard shadow.

### Code Blocks (Signature Component)
* Must include a "Terminal Header": a thin bar at the top containing the file name in `label-sm` and three minimalist circles (Red/Yellow/Green) to mimic a windowing system.
* Background: `surface_container_highest`.

## 6. Do's and Don'ts

### Do:
* **Embrace Asymmetry:** Align the blog sidebar to the left and give it a heavier border than the main content to create a visual "anchor."
* **Use Heavy Strokes:** If a layout feels "weak," increase the border weight.
* **Expose the Grid:** Let the structural lines be part of the art.

### Don't:
* **No Rounded Corners:** Ever. The system is built on `0px` radii to maintain its architectural integrity.
* **No Soft Blurs:** Shadows must be hard. Gradients must be intentional, not decorative "fuzz."
* **No Standard Icons:** Use minimalist, geometric icons with a consistent stroke weight that matches the typography (approx 2px-3px).

### Accessibility Note:
Because this system uses high-contrast black on cream/red, readability is naturally high. However, ensure that `primary` red text is never used for long-form body copy; reserve it for headlines and labels to prevent eye fatigue.```