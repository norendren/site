# Project Context Documentation

This folder contains all project documentation and context files used by Claude Code and developers.

## Quick Start for New Sessions

To load context at the start of a session, use:
```
/start
```

This slash command will automatically read all relevant context files.

## Files in This Folder

### Core Documentation
- **PROJECT_CONTEXT.md** - Main project overview, status, architecture, and design system
- **CHARACTER_DATA_ARCHITECTURE.md** - Data structure design philosophy and implementation approach
- **IMPLEMENTATION_SUMMARY.md** - Latest implementation details and changes

### Reference Documentation
- **ATHIA_SETUP.md** - Initial setup notes and game system overview
- **ATHIA_RACES_CLASSES.md** - Game content reference (races, classes, talents)
- **PDF_COORDINATE_TRACKING.md** - PDF field coordinate mappings for sheet generation

## Maintenance

When adding new features or making architectural decisions:
1. Update `PROJECT_CONTEXT.md` with the decision and rationale
2. Create an `IMPLEMENTATION_SUMMARY.md` entry if it's a significant feature
3. Update relevant reference docs as needed

## For Claude Code

These files should be read at session start to understand:
- Current project status and what's working
- Tech stack and architecture decisions
- Design system and styling guidelines
- Game rules and content structure
- Where to find key files and functions

The `.claude/commands/start.md` slash command references these files.
