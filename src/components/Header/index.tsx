import {
  AppstoreOutlined,
  CodeOutlined,
  HomeOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NAV_ITEMS, type NavItemId } from './const'
import { isNavItemActive, scrollToSection } from './utils'
import './style.css'

const NAV_ICONS: Record<
  NavItemId,
  typeof HomeOutlined | typeof AppstoreOutlined | typeof CodeOutlined | typeof UserOutlined | typeof MailOutlined
> = {
  home: HomeOutlined,
  work: AppstoreOutlined,
  skills: CodeOutlined,
  about: UserOutlined,
  contact: MailOutlined,
}

export function Header() {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState<NavItemId>('home')

  const handleSelect = (id: NavItemId) => {
    setActiveId(id)
    scrollToSection(id)
  }

  return (
    <div className="header-dock">
      <div className="header-dock-panel">
        <nav className="floating-nav" aria-label={t('nav.ariaLabel')}>
          <ul className="floating-nav-bar">
            {NAV_ITEMS.map((item) => {
              const active = isNavItemActive(activeId, item.id)
              const Icon = NAV_ICONS[item.id]

              return (
                <li key={item.id} className="floating-nav-item">
                  <button
                    type="button"
                    className={`nav-item${active ? ' nav-item--active' : ''}`}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => handleSelect(item.id)}
                  >
                    <span className="nav-item-inner">
                      <span className="nav-icon" aria-hidden>
                        <Icon />
                      </span>
                      <span className="nav-label">{t(`nav.${item.id}`)}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}
