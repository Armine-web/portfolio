import { ThunderboltOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { getVisualClassNames } from './utils'
import './style.css'

export function HeroVisual() {
  const { t } = useTranslation()
  const classNames = getVisualClassNames()

  return (
    <div className={classNames.root}>
      <div className={classNames.card}>
        <div className={classNames.chip}>
          <span className={classNames.icon}>
            <ThunderboltOutlined />
          </span>
          <div>
            <p>{t('heroVisual.experienceTitle')}</p>
            <strong>{t('heroVisual.experienceValue')}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}
