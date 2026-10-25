import { describe, expect, it } from 'vitest'
import { certifications } from './about'
import { allProjects } from './projects'
import { toolGroups } from './stack'

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
