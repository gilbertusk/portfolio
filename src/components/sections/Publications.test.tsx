import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { SELF_AUTHOR, publications } from '../../data/publications'
import { Publications } from './Publications'

// Direct children only: each paper also holds a nested list of topics.
function papers(): HTMLElement[] {
  const list = screen.getByRole('list', { name: 'Journal articles' })
  return within(list)
    .getAllByRole('listitem')
    .filter((item) => item.parentElement === list)
}

describe('Publications', () => {
  it('lists every paper with its journal, result, and authors', () => {
    render(<Publications />)

    expect(screen.getByRole('heading', { level: 2 })).toHaveAccessibleName('Published research')
    const items = papers()
    expect(items).toHaveLength(publications.length)
    items.forEach((item, index) => {
      const paper = publications[index]
      expect(within(item).getByRole('heading', { level: 3 })).toHaveTextContent(paper.title)
      expect(item).toHaveTextContent(paper.journal)
      expect(item).toHaveTextContent(paper.result.value)
      for (const author of paper.authors) expect(item).toHaveTextContent(author)
    })
  })

  it('emphasizes Gilbertus in each author list', () => {
    render(<Publications />)

    for (const item of papers()) {
      expect(within(item).getByText(SELF_AUTHOR).tagName).toBe('STRONG')
    }
  })

  it('marks the Indonesian title language and gives an English rendering', () => {
    render(<Publications />)

    for (const paper of publications.filter((p) => p.language === 'Indonesian')) {
      expect(screen.getByRole('heading', { name: paper.title })).toHaveAttribute('lang', 'id')
      expect(screen.getByText(paper.englishTitle as string)).toBeInTheDocument()
    }
  })

  it('links each article page, PDF, and DOI safely in a new tab', () => {
    render(<Publications />)

    for (const paper of publications) {
      const links = [
        screen.getByRole('link', { name: `Read "${paper.title}" (opens in a new tab)` }),
        screen.getByRole('link', { name: `PDF of "${paper.title}" (opens in a new tab)` }),
      ]
      expect(links[0]).toHaveAttribute('href', paper.href)
      expect(links[1]).toHaveAttribute('href', paper.pdfHref)
      if (paper.doi) {
        const doi = screen.getByRole('link', { name: `DOI ${paper.doi} (opens in a new tab)` })
        expect(doi).toHaveAttribute('href', `https://doi.org/${paper.doi}`)
        links.push(doi)
      }
      for (const link of links) {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      }
    }
  })
})
