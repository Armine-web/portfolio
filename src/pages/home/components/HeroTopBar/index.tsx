import { AVAILABILITY_TEXT, HIRE_ME_TEXT } from './const'
import { getTopBarButtonType } from './utils'
import './style.css'

export function HeroTopBar() {
  return (
    <div className="top-bar">
      <span className="availability-pill">{AVAILABILITY_TEXT}</span>
      <button type={getTopBarButtonType()} className="hire-button">
        {HIRE_ME_TEXT}
      </button>
    </div>
  )
}
