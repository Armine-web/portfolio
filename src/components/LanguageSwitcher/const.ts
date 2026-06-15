import type { SupportedLanguage } from '../../i18n'

export type LanguageOption = {
  code: SupportedLanguage
  flag: string
  label: string
}

export const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
  { code: 'hy', flag: '🇦🇲', label: 'Հայ' },
  { code: 'en', flag: '🇬🇧', label: 'EN' },
  { code: 'ru', flag: '🇷🇺', label: 'RU' },
] as const
