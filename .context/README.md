# Project Context Documentation

This folder contains all project documentation used by Claude Code to understand the project state, architecture, and implementation history.

---

## Quick Start for New Sessions

To load context at the start of a session, use:
```
/start
```

This slash command (defined in `.claude/commands/start.md`) will automatically read all relevant context files.

---

## Files in This Folder

### 📘 Core Documentation

**PROJECT_CONTEXT.md** - Main project overview
- Current project status (what works, what's in progress, what's next)
- Complete design system and color palette
- Architecture overview and tech stack
- Key file locations and structure
- All architectural decisions with rationale
- Known issues and limitations

**IMPLEMENTATION_LOG.md** - Chronological implementation history
- Detailed log of all major features implemented
- What was built, when it was built, and how it works
- Technical details for each implementation phase
- Integration points and verification steps
- Reverse chronological order (newest first)

### 📚 Reference Documentation

**CHARACTER_DATA_ARCHITECTURE.md** - Data structure design philosophy
- Current vs. recommended state structure
- When to calculate derived values
- Recommended approach for phased implementation
- Examples and decision points

**ATHIA_RACES_CLASSES.md** - Game content reference
- All 7 playable races with page numbers
- All 4 classes with page numbers
- Great Houses and True Gods
- Quick reference for game content

**PDF_COORDINATE_TRACKING.md** - PDF coordinate mappings
- All field positions for PDF generation
- Coordinate system explanation (bottom-left origin)
- Workflow for finding coordinates
- Status tracking (verified vs. needs adjustment)

---

## File Organization Philosophy

### What Goes Where

**PROJECT_CONTEXT.md** should contain:
- High-level overview and current status
- Architectural decisions and rationale
- Design system and styling guidelines
- File structure and key locations
- Updated whenever major features are added

**IMPLEMENTATION_LOG.md** should contain:
- Detailed implementation notes for specific features
- Technical details and code examples
- Integration steps and verification
- Chronological record of changes
- Updated after completing each major feature

**Reference files** should contain:
- Static game content and rules
- Coordinate mappings
- Architecture guidance
- Updated only when game rules change or coordinates are adjusted

---

## Maintenance Guidelines

### When Adding New Features

1. **During Implementation**:
   - Track progress with TodoWrite tool
   - Make notes about decisions and challenges

2. **After Completing a Feature**:
   - Add detailed entry to **IMPLEMENTATION_LOG.md** (top of file, newest first)
   - Update "Current Status" section in **PROJECT_CONTEXT.md**
   - Move completed items from "What's Next" to "Recently Completed"
   - Update "Last Updated" date and focus statement
   - Update Key Files Map if new files were added

3. **When Making Architectural Decisions**:
   - Add to "Key Decisions Made" section in **PROJECT_CONTEXT.md**
   - Explain the decision, why it was made, and trade-offs
   - Include examples if helpful

4. **When Adjusting PDF Coordinates**:
   - Update **PDF_COORDINATE_TRACKING.md** with verified positions
   - Mark fields as ✓ Verified or ⚠ Needs adjustment

---

## For Claude Code

These files provide context about:
- ✅ Current project status and what's working
- ✅ Tech stack and architecture decisions
- ✅ Design system and styling guidelines (WCAG AA compliance)
- ✅ Game rules and content structure
- ✅ Where to find key files and functions
- ✅ Implementation history and lessons learned
- ✅ What's next on the roadmap

The `/start` command references these files for quick onboarding.

---

## Current File List

```
.context/
├── README.md                           # This file - index and guide
├── PROJECT_CONTEXT.md                  # Main project overview (read first)
├── IMPLEMENTATION_LOG.md               # Feature implementation history
├── CHARACTER_DATA_ARCHITECTURE.md      # Data structure design guidance
├── ATHIA_RACES_CLASSES.md              # Game content reference
└── PDF_COORDINATE_TRACKING.md          # PDF coordinate mappings
```

---

*Last updated: 2025-10-14*
