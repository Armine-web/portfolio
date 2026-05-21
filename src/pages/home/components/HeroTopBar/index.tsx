import { useState } from 'react'
import { AVAILABILITY_TEXT, HIRE_ME_TEXT } from './const'
import { HireMeModal } from './HireMeModal'
import { getTopBarButtonType } from './utils'
import './style.css'

export function HeroTopBar() {
  const [hireModalOpen, setHireModalOpen] = useState(false)

  return (
    <>
      <div className="top-bar">
        <span className="availability-pill">{AVAILABILITY_TEXT}</span>
        <button
          type={getTopBarButtonType()}
          className="hire-button"
          onClick={() => setHireModalOpen(true)}
        >
          {HIRE_ME_TEXT}
        </button>
      </div>
      <HireMeModal open={hireModalOpen} onClose={() => setHireModalOpen(false)} />
    </>
  )
}
