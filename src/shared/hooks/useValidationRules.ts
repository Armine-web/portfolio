import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export function useValidationRules() {
  const { t } = useTranslation()

  return useMemo(
    () => ({
      fullName: [
        { required: true, message: t('validation.fullNameRequired') },
        { min: 2, message: t('validation.fullNameMin') },
      ],
      email: [
        { required: true, message: t('validation.emailRequired') },
        { type: 'email' as const, message: t('validation.emailInvalid') },
      ],
      message: [
        { required: true, message: t('validation.messageRequired') },
        { min: 10, message: t('validation.messageMin') },
      ],
    }),
    [t],
  )
}
