# Data Structure

The application's data is split into three main categories within `src/data`.

## 1. Manifests (`src/data/manifests/*.json`)
**Purpose**: The absolute source of truth for the *existence* of valid items. If a weapon isn't here, it shouldn't exist in the app.
**Format**: Array of Objects.
```json
[
  {
    "name": "Weapon Name",
    "image": "path/to/image.webp"
  }
]
```

## 2. Multiplayer Data (`src/data/mp/*.json`)
**Purpose**: Defines progression requirements for Multiplayer camos.
**Format**: Array of Objects.
```json
[
  {
    "class": "Weapon Class Name",
    "name": "Weapon Name",
    "unlock_level": 0,
    "image": "path/to/image.webp",
    "camos": {
      "mp": {
        "CamoName": {
          "requirement": "Description string"
        }
      }
    }
  }
]
```

## 3. Weapon Prestige (`src/data/wp/*.json`)
**Purpose**: Defines Prestige Mastery camos.
**Format**: Object Dictionary (Key = Weapon Name).
```json
{
  "Weapon Name": {
    "prestige1": {
      "name": "Camo Name",
      "image": "path/to/image",
      "requirement": "Weapon Prestige 1"
    },
    // ... prestige2, master250, etc.
  }
}
```

## Maintenance Guide
When adding a new weapon:
1.  **Manifest**: Add name and image.
2.  **MP**: Add full object. Use `unlock_level: 0` if unknown.
3.  **WP**: Add key. Can be empty object `{}` if details are unknown.
