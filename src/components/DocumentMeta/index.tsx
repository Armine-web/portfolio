import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export function DocumentMeta() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.title = t('meta.title')

    let metaDescription = document.querySelector('meta[name="description"]')

    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.setAttribute('name', 'description')
      document.head.appendChild(metaDescription)
    }

    metaDescription.setAttribute('content', t('meta.description'))
  }, [t, i18n.language])

  return null
}
