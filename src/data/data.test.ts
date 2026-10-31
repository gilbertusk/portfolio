import { describe, expect, it } from 'vitest'
import { certifications } from './about'
import { allProjects, getProject } from './projects'
import { alsoBuilt, featured } from './showcase'
import { toolGroups } from './stack'

describe('showcase data', () => {
  it('points every featured and also-built entry at a real project', () => {
    for (const { id } of [...featured, ...alsoBuilt]) {
      expect(() => getProject(id)).not.toThrow()
    }
  })

  it('shows each project in only one place', () => {
    const ids = [...featured, ...alsoBuilt].map((entry) => entry.id)

    expect(new Set(ids).size).toBe(ids.length)
  })

  it('keeps the featured grid symmetric', () => {
    expect(featured.length % 2).toBe(0)
  })

  it('fills whole rows of also-built tiles in both the 2- and 3-column grids', () => {
    expect(alsoBuilt.length % 6).toBe(0)
  })

  it('throws on an unknown project id', () => {
    expect(() => getProject('does-not-exist')).toThrow('Unknown project id')
  })
})

describe('project data', () => {
  it('gives every project a unique id', () => {
    const ids = allProjects.map((project) => project.id)

    expect(new Set(ids).size).toBe(ids.length)
  })

  it('only links to https URLs', () => {
    const hrefs = [
      ...allProjects.flatMap((project) => project.links.map((link) => link.href)),
      ...certifications.flatMap((cert) => (cert.href ? [cert.href] : [])),
    ]

    for (const href of hrefs) {
      expect(new URL(href).protocol).toBe('https:')
    }
  })

  it('never links a private project to its (404ing) source repo', () => {
    const privateProjects = allProjects.filter((project) => project.isPrivate)

    expect(privateProjects.length).toBeGreaterThan(0)
    for (const project of privateProjects) {
      expect(project.links.some((link) => link.kind === 'source')).toBe(false)
    }
  })

  it('gives project images alt text and real dimensions', () => {
    for (const { image } of allProjects) {
      if (!image) continue
      expect(image.alt.length).toBeGreaterThan(20)
      expect(image.width).toBeGreaterThan(0)
      expect(image.height).toBeGreaterThan(0)
    }
  })
})

describe('stack data', () => {
  it('lists each tool once across all groups', () => {
    const names = toolGroups.flatMap((group) => group.tools.map((tool) => tool.name))

    expect(new Set(names).size).toBe(names.length)
  })

  it('keeps every group non-empty', () => {
    for (const group of toolGroups) {
      expect(group.tools.length).toBeGreaterThan(0)
    }
  })
})
