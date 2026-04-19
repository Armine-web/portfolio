import type { NavItemId } from './const'

export const isNavItemActive = (activeId: NavItemId, itemId: NavItemId): boolean =>
  activeId === itemId

export const scrollToSection = (id: NavItemId): void => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
