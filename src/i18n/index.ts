import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import hy from './locales/hy.json'
import ru from './locales/ru.json'

export const SUPPORTED_LANGUAGES = ['hy', 'en', 'ru'] as const

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export const DEFAULT_LANGUAGE: SupportedLanguage = 'hy'

export const LANGUAGE_STORAGE_KEY = 'portfolio-language'

const isSupportedLanguage = (value: string | null): value is SupportedLanguage =>
  value !== null && SUPPORTED_LANGUAGES.includes(value as SupportedLanguage)

const getStoredLanguage = (): SupportedLanguage => {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE
  }

  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)

  if (isSupportedLanguage(stored)) {
    return stored
  }

  return DEFAULT_LANGUAGE
}

const updateDocumentLanguage = (language: SupportedLanguage) => {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.lang = language
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hy: { translation: hy },
    ru: { translation: ru },
  },
  lng: getStoredLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', (language) => {
  if (isSupportedLanguage(language)) {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    updateDocumentLanguage(language)
  }
})

updateDocumentLanguage(getStoredLanguage())

export default i18n
