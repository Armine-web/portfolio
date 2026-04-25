import { ThunderboltOutlined } from '@ant-design/icons'
import { EXPERIENCE_TITLE, EXPERIENCE_VALUE } from './const'
import { getVisualClassNames } from './utils'
import './style.css'

export function HeroVisual() {
  const classNames = getVisualClassNames()

  return (
    <div className={classNames.root}>
      <div className={classNames.card} >
      <div className={classNames.chip}>
        <span className={classNames.icon}>
          <ThunderboltOutlined />
        </span>
        <div>
          <p>{EXPERIENCE_TITLE}</p>
          <strong>{EXPERIENCE_VALUE}</strong>
        </div>
      </div>
    </div>
    </div>

  )
}
