export type NavItemId = 'home' | 'work' | 'skills' | 'about' | 'contact'

export type NavItem = {
  id: NavItemId
  href: string
}

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'home', href: '#home' },
  { id: 'work', href: '#work' },
  { id: 'skills', href: '#skills' },
  { id: 'about', href: '#about' },
  { id: 'contact', href: '#contact' },
]
