export type TagVariant = 'default' | 'ttrpg' | 'dev' | 'wip'

export interface ProjectTag {
  label: string
  variant?: TagVariant
}

export interface ProjectLink {
  label: string
  href: string
  external?: boolean
}

export interface Project {
  title: string
  description: string
  tags: ProjectTag[]
  links?: ProjectLink[]
}

export interface ProjectCategory {
  title: string
  projects: Project[]
}

export const projectCategories: ProjectCategory[] = [
  {
    title: 'Open Source',
    projects: [
      {
        title: 'go-fov',
        description: 'Field of view calculation library for grid-based games using recursive shadowcasting. Minimal API for roguelike developers.',
        tags: [{ label: 'Golang' }],
        links: [{ label: 'View on GitHub', href: 'https://github.com/norendren/go-fov', external: true }],
      },
    ],
  },
  {
    title: 'Dev Tools',
    projects: [
      {
        title: 'PDF Inspector',
        description: 'Development utility for finding PDF coordinate mappings. Used internally for form-filling features.',
        tags: [{ label: 'Dev Tool', variant: 'dev' }],
        links: [{ label: 'Open Inspector', href: '#/pdf-inspector' }],
      },
    ],
  },
  {
    title: 'TTRPG Tools',
    projects: [
      {
        title: 'Athia RPG Builder',
        description: 'Complete character creation tool for the Athia RPG. Build characters with guided wizards, automatic calculations, and export to PDF.',
        tags: [{ label: 'TTRPG', variant: 'ttrpg' }],
        links: [{ label: 'Launch Builder', href: '#/athia-rpg-builder' }],
      },
      {
        title: 'Athia Spell Crafter',
        description: 'Spell crafter and generator for the Athia RPG by Power Lunch Games.',
        tags: [
          { label: 'In Progress', variant: 'wip' },
          { label: 'TTRPG', variant: 'ttrpg' },
        ],
      },
    ],
  },
  {
    title: 'Games',
    projects: [
      {
        title: 'Rogue Dealer',
        description: '"7 Day Roguelike Challenge 2020" game entrant, built in pico8 and Lua, where you play as an interdimensional shopkeep travelling amongst well-known roguelike game universes attempting to make as much money as you can',
        tags: [{ label: 'Video Game'}],
        links: [
          { label: 'View on Itch.io', href: 'https://iceboxr.itch.io/rogue-dealer', external: true },
          { label: 'View on GitHub', href: 'https://github.com/norendren/rogueWars', external: true },
        ],
      },
    ],
  },
]
