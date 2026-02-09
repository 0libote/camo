# UI Design System

**Camo** features a dark, modern, "gamer" aesthetic with high contrast and neon accents.

## Theme Configuration

### Colors
Defined in `tailwind.config.js` and `src/index.css`.
- **Backgrounds**:
    - Base: `#0f0f0f` (`--color-bg-base`)
    - Card: `#171717` (`--color-bg-card`)
    - Elevated: `#1f1f1f` (`--color-bg-elevated`)
- **Accent**:
    - Primary: `#3b82f6` (Blue) or `#ff6b00` (Orange - defined in tailwind config extend but css var uses blue. *Note: discrepancy observed, check usage*).
    - Success: `#22c55e`
- **Text**:
    - Primary: `#f5f5f5`
    - Secondary: `#a3a3a3`
    - Muted: `#737373`

### Typography
- **Headings**: `Chakra Petch` (Sans-serif, boxy, futuristic).
- **Body**: `Inter` (Clean, readable).

### Animations
Custom animations defined in `src/index.css`:
- `animate-fade-in`: Simple opacity transition.
- `animate-fade-in-up`: Opacity + Y-axis translation.
- `animate-scale-in`: Pop-in effect.
- `shimmer`: Loading state or highlight effect.

## Component Patterns

### Cards
Used Heavily (`WeaponCard`, `PrestigeCard`).
- Standard background: `bg-neutral-900` or `bg-card`.
- Borders: Subtle `border-neutral-800`.
- Hover effects: Scale up or border highlight.

### Grids
- Responsive grids using `grid-cols-X` classes.
- Gaps are typically `gap-4` or `gap-6`.

### Inputs / Modals
- Focus states trigger `outline-accent`.
- Modals use backdrops with blur.

## Rules for New UI
1.  **Dark Mode First**: The app is natively dark mode.
2.  **Contrast**: Ensure text is readable against dark backgrounds.
3.  **Feedback**: Use hover states and animations for interactivity.
4.  **Consistency**: Reuse `src/components` where possible instead of raw HTML.
