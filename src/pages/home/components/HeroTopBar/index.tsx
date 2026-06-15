import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '../../../../components/LanguageSwitcher'
import { HireMeModal } from './HireMeModal'
import { getTopBarButtonType } from './utils'
import './style.css'

export function HeroTopBar() {
  const { t } = useTranslation()
  const [hireModalOpen, setHireModalOpen] = useState(false)

  return (
    <>
      <div className="top-bar">
        <LanguageSwitcher />
        <div className="top-bar-actions">
          <span className="availability-pill">{t('heroTopBar.availability')}</span>
          <button
            type={getTopBarButtonType()}
            className="hire-button"
            onClick={() => setHireModalOpen(true)}
          >
            {t('heroTopBar.hireMe')}
          </button>
        </div>
      </div>
      <HireMeModal open={hireModalOpen} onClose={() => setHireModalOpen(false)} />
    </>
  )
}
