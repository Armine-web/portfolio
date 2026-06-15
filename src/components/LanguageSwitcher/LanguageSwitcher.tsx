import { useCallback, useRef } from 'react'
import type { KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, type SupportedLanguage } from '../../i18n'
import { LANGUAGE_OPTIONS } from './const'
import './style.css'

const resolveCurrentLanguage = (language: string): SupportedLanguage =>
  SUPPORTED_LANGUAGES.includes(language as SupportedLanguage)
    ? (language as SupportedLanguage)
    : DEFAULT_LANGUAGE

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])

  const currentLanguage = resolveCurrentLanguage(i18n.language)
  const activeIndex = LANGUAGE_OPTIONS.findIndex((option) => option.code === currentLanguage)

  const handleSelect = useCallback(
    (language: SupportedLanguage) => {
      if (language !== currentLanguage) {
        void i18n.changeLanguage(language)
      }
    },
    [currentLanguage, i18n],
  )

  const focusOption = (index: number) => {
    buttonRefs.current[index]?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = LANGUAGE_OPTIONS.length - 1
    let nextIndex = index

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        nextIndex = index === 0 ? lastIndex : index - 1
        handleSelect(LANGUAGE_OPTIONS[nextIndex].code)
        focusOption(nextIndex)
        break
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        nextIndex = index === lastIndex ? 0 : index + 1
        handleSelect(LANGUAGE_OPTIONS[nextIndex].code)
        focusOption(nextIndex)
        break
      case 'Home':
        event.preventDefault()
        handleSelect(LANGUAGE_OPTIONS[0].code)
        focusOption(0)
        break
      case 'End':
        event.preventDefault()
        handleSelect(LANGUAGE_OPTIONS[lastIndex].code)
        focusOption(lastIndex)
        break
      default:
        break
    }
  }

  return (
    <div className="language-switcher" data-active-index={activeIndex}>
      <div
        className="language-switcher-track"
        role="radiogroup"
        aria-label={t('languageSwitcher.label')}
      >
        <span className="language-switcher-indicator" aria-hidden />

        {LANGUAGE_OPTIONS.map((option, index) => {
          const isActive = option.code === currentLanguage

          return (
            <button
              key={option.code}
              ref={(element) => {
                buttonRefs.current[index] = element
              }}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={t(`languageSwitcher.${option.code}`)}
              tabIndex={isActive ? 0 : -1}
              className={`language-switcher-option${isActive ? ' language-switcher-option--active' : ''}`}
              onClick={() => handleSelect(option.code)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <span className="language-switcher-flag" aria-hidden>
                {option.flag}
              </span>
              <span className="language-switcher-label">{option.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
