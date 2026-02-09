# Missing Data Reporting Standard

This document defines the standard format for reporting missing assets and data in the `Agent/MissingData.md` file. AI Agents must strictly follow this structure when auditing the project.

## General Rules

1.  **File Location**: Always update `Agent/MissingData.md`.
2.  **Format**: Use Markdown Checklists `[ ]` for each item.
3.  **Grouping**: Group items by Weapon Class, then by Weapon Name.
4.  **Terminology**:
    -   Use **"Multiplayer Data"** (not "MP").
    -   Use **"Weapon Prestige Data"** (not "WP").
    -   Use **"Challenge"** (not "Check" or "Requirement") when referring to specific missing camo tasks.

## Template Structure

```markdown
# Missing Data Checklist

## [Weapon Class Name]
### [Weapon Name]
- [ ] Missing Image: `[Path to Image]`
- [ ] Missing Multiplayer Data: [Camo Name] Challenge
- [ ] Missing Weapon Prestige Data: [Prestige Level]
```

## Example

```markdown
# Missing Data Checklist

## Assault Rifles
### EGRT 17
- [ ] Missing Image: `weapons/Assault rifle/EGRT 17.webp`
- [ ] Missing Multiplayer Data: Diamondback Challenge
- [ ] Missing Weapon Prestige Data: Prestige 1
```

## Checklist Item Types

### 1. Missing Images
Format: `- [ ] Missing Image: `path/to/image.webp``
- Ensure the path matches the JSON reference in `src/data/mp/`.
- Verify strict case sensitivity if possible (Critical for Linux/Hosting).

### 2. Missing Multiplayer Data
Format: `- [ ] Missing Multiplayer Data: [Camo Name] Challenge`
- Used when a specific camo (e.g., Diamondback, Raptor) has an empty or placeholder requirement in the JSON.

### 3. Missing Weapon Prestige Data
Format: `- [ ] Missing Weapon Prestige Data: [Level]`
- Levels: `Prestige 1`, `Prestige 2`, `Master 250`.
- Used when the `src/data/wp/` JSON entry exists but lacks specific details (name, image, requirement).
