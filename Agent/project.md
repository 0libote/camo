# Project Overview

**Camo** is a web application designed to track weapon camo progression in a shooter game (likely referencing a specific franchise like COD). It allows users to visualize their progress towards mastery camos like "Shattered Gold", "Arclight", "Tempest", and "Singularity".

## Tech Stack

- **Framework**: React 19 (Hooks, Functional Components)
- **Build Tool**: Vite 7
- **Language**: TypeScript 5.9
- **Styling**: TailwindCSS 3.4 with custom configuration
- **State Management**: Local state & derived state from JSON data
- **Routing**: Client-side routing (likely standard React pattern, though simple app might use conditional rendering)

## Architecture

The project follows a component-based architecture with a separation of concerns between UI, Logic, and Data.

### Key Directories
- **`src/components/`**: Reusable UI elements (`CamoGrid`, `WeaponCard`, `ProgressBar`).
- **`src/data/`**: Static JSON files acting as the database.
    - **`manifests/`**: The source of truth for weapon definitions (Name, Image).
    - **`mp/`**: Multiplayer camo challenges and requirements.
    - **`wp/`**: Weapon Prestige info.
- **`src/logic/`**: Business logic for calculating unlock availability and progress.
    *   `progression.ts`: Contains the core rules for camo unlocks (e.g., "Arclight" requires "Shattered Gold" on specific number of weapons per class).

### Business Logic (`src/logic/progression.ts`)
The core logic revolves around checking if a camo is "locked", "available", or "completed".
- **Military**: Always available.
- **Special**: (Diamondback, Raptor, Mainframe) -> Unlocked when Military is done.
- **Shattered Gold**: Unlocked when all Specials are done.
- **Arclight**: Class-specific requirements (e.g., 6 ARs with Shattered Gold).
- **Tempest**: Global "Arclight" count (e.g., 30 weapons total).
- **Singularity**: Global "Tempest" count.

## Data Flow
1.  **Static Data**: Loaded from `src/data`.
2.  **User Progress**: Stored in local storage (implied, or state).
3.  **UI Rendering**: Components read Static Data + User Progress -> Logic -> Render Status.
