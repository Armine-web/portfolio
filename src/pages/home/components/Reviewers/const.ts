export const REVIEWERS_SECTION_ID = 'testimonials'
export const REVIEWERS_EYEBROW = 'TESTIMONIALS'

export type ReviewerItem = {
  id: string
  avatar: string
  quote: string
  name: string
  role: string
}

export const REVIEWER_ITEMS: ReviewerItem[] = [
  {
    id: 'jonathan',
    avatar:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    quote:
      'Armine is a rare talent who understands the nuances of modern web design. She took our vision and delivered a frontend that was not only pixel-perfect but significantly faster than our previous implementation.',
    name: 'Jonathan Wright',
    role: 'CTO @ TECHPULSE GLOBAL',
  },
  {
    id: 'sophia',
    avatar:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80',
    quote:
      'Working with Armine was seamless. Communication was clear, execution was fast, and every detail matched our brand direction perfectly across devices.',
    name: 'Sophia Morgan',
    role: 'PRODUCT LEAD @ NOVASTACK',
  },
  {
    id: 'alex',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    quote:
      'Her engineering quality is outstanding. We saw immediate gains in performance and accessibility while preserving a polished and premium interface.',
    name: 'Alex Carter',
    role: 'FOUNDER @ LUMEN LABS',
  },
]
