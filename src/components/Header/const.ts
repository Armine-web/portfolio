export type NavItemId = 'home' | 'work' | 'skills' | 'about' | 'contact'

export type NavItem = {
  id: NavItemId
  label: string
  href: string
}

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'home', label: 'HOME', href: '#home' },
  { id: 'work', label: 'WORK', href: '#work' },
  { id: 'skills', label: 'SKILLS', href: '#skills' },
  { id: 'about', label: 'ABOUT', href: '#about' },
  { id: 'contact', label: 'CONTACT', href: '#contact' },
]
