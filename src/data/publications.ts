export interface Publication {
  title: string
  /** English rendering of a title published in another language. */
  englishTitle?: string
  authors: string[]
  journal: string
  /** Volume, issue, and pages as the journal prints them. */
  issue: string
  year: string
  language: 'English' | 'Indonesian'
  result: { value: string; label: string }
  topics: string[]
  href: string
  pdfHref: string
  doi?: string
}

/** The name journals list Gilbertus under; highlighted in author lists. */
export const SELF_AUTHOR = 'Gilbertus Kristo Anugerah Adviandito'

// Newest first. Every figure comes from the paper's own abstract.
export const publications: Publication[] = [
  {
    title: 'Optimasi Kinerja Klasifikasi Motif Batik pada Arsitektur MobileNetV2 melalui Strategi Fine-Tuning',
    englishTitle: 'Optimizing batik motif classification on MobileNetV2 through fine-tuning',
    authors: [SELF_AUTHOR, 'Muhammad Ilham Afif', 'Agil Lantip Mahendra', 'Much Aziz Muslim'],
    journal: 'Jurnal Ilmiah Wahana Pendidikan',
    issue: 'Vol. 12 No. 6.D, pp. 199-213',
    year: '2026',
    language: 'Indonesian',
    result: { value: '99.85%', label: 'accuracy after fine-tuning, up from 94.00%' },
    topics: ['MobileNetV2', 'Transfer learning', 'Fine-grained classification'],
    href: 'https://jurnal.peneliti.net/index.php/JIWP/article/view/13391',
    pdfHref: 'https://jurnal.peneliti.net/index.php/JIWP/article/download/13391/10198',
  },
  {
    title: 'Implementation of Xception method for Early Detection of Plant Diseases',
    authors: [SELF_AUTHOR, 'Albertus Dwiyoga Widiantoro'],
    journal: 'SISFORMA',
    issue: 'Vol. 11 No. 2, pp. 199-207',
    year: '2024',
    language: 'English',
    result: { value: '97.63%', label: 'validation accuracy on 54,305 leaf images' },
    topics: ['Xception', 'Plant disease detection', 'Model comparison'],
    href: 'https://journal.unika.ac.id/index.php/sisforma/article/view/14741',
    pdfHref: 'https://journal.unika.ac.id/index.php/sisforma/article/download/14741/pdf',
    doi: '10.24167/sisforma.v11i2.14741',
  },
]
