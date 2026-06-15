export const REVIEWERS_SECTION_ID = 'testimonials'

export type ReviewerItemId = 'jonathan' | 'sophia' | 'alex'

export type ReviewerItem = {
  id: ReviewerItemId
  avatar: string
  name: string
  role: string
}

export const REVIEWER_ITEMS: ReviewerItem[] = [
  {
    id: 'jonathan',
    avatar:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    name: 'Jonathan Wright',
    role: 'CTO @ TECHPULSE GLOBAL',
  },
  {
    id: 'sophia',
    avatar:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80',
    name: 'Sophia Morgan',
    role: 'PRODUCT LEAD @ NOVASTACK',
  },
  {
    id: 'alex',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    name: 'Alex Carter',
    role: 'FOUNDER @ LUMEN LABS',
  },
]
