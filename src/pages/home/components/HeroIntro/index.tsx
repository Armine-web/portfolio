import { DownloadOutlined, GithubOutlined, LinkedinOutlined } from '@ant-design/icons'
import ReactMarkdown from 'react-markdown'
import { useState, useMemo } from 'react'
import type { KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { generateGeminiResponse } from '../../../../services/geminiService'
import { cvData } from '../../../../data/cvData'
import { getSocialLinks } from './utils'
import './style.css'
import { cvMarkdown } from '../../../../data/cvMarkdown'

const socialIconByKind = {
  github: <GithubOutlined />,
  linkedin: <LinkedinOutlined />,
  email: '@',
} as const

export function HeroIntro() {
  const { t } = useTranslation()
  const socialLinks = getSocialLinks()
  const [geminiPrompt, setGeminiPrompt] = useState('')
  const [geminiAnswer, setGeminiAnswer] = useState('')
  const [isGeminiLoading, setIsGeminiLoading] = useState(false)
  const [geminiError, setGeminiError] = useState('')
  const [isCvVisible, setIsCvVisible] = useState(false)
  const [isInputVisible, setIsInputVisible] = useState(false)

  const cvContext = useMemo(() => {
    return JSON.stringify(cvData)
  }, [])

  const renderedAnswer = useMemo(() => {
    if (!geminiAnswer) return null
    return <ReactMarkdown>{geminiAnswer}</ReactMarkdown>
  }, [geminiAnswer])

  const handleTalkClick = async () => {
    if (!isInputVisible) {
      setIsInputVisible(true)
      return
    }

    if (isGeminiLoading) return

    const currentPrompt = geminiPrompt.trim()
    if (!currentPrompt) return

    setIsGeminiLoading(true)
    setGeminiError('')
    setGeminiPrompt('')

    try {
      const fullPrompt = `Context: ${cvContext}. Request: ${currentPrompt}`
      const response = await generateGeminiResponse(fullPrompt)
      setGeminiAnswer(response)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('messages.sendFailed')
      setGeminiError(errorMessage)
    } finally {
      setIsGeminiLoading(false)
    }
  }

  const handlePromptKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey && !isGeminiLoading) {
      event.preventDefault()
      void handleTalkClick()
    }
  }

  return (
    <div className="hero-content">
      <h1 className="hero-name">
        {t('hero.firstName')}
        <br />
        {t('hero.lastName')}
      </h1>
      <p className="hero-description">{t('hero.description')}</p>

      <div className="social-row">
        {socialLinks.map((link) => (
          <a
            key={link.kind}
            href={link.href}
            target={link.kind === 'github' ? '_blank' : undefined}
            rel={link.kind === 'github' ? 'noreferrer' : undefined}
            aria-label={t(`hero.social.${link.kind}`)}
          >
            {socialIconByKind[link.kind]}
          </a>
        ))}
      </div>

      <div className="cta-row">
        <button
          type="button"
          className="primary-cta"
          onClick={() => setIsCvVisible(!isCvVisible)}
        >
          {isCvVisible ? t('hero.hideCv') : t('hero.showCv')}
        </button>
        {isCvVisible && (
          <div className="cv-container">
            <div className="cv-header-actions">
              <a
                href="/Armine_Aghajanyan_CV.pdf"
                download="Armine_Aghajanyan_CV.pdf"
                className="cv-download-link"
              >
                <DownloadOutlined />
              </a>
            </div>
            <ReactMarkdown>{cvMarkdown}</ReactMarkdown>
          </div>
        )}

        <button
          type="button"
          className="secondary-cta"
          onClick={handleTalkClick}
          disabled={isGeminiLoading}
        >
          {isInputVisible ? t('hero.send') : t('hero.letsTalk')}
        </button>
      </div>

      {isInputVisible && (
        <div className="cta-row gemini-prompt-row">
          <textarea
            className="gemini-prompt-input"
            value={geminiPrompt}
            onChange={(event) => setGeminiPrompt(event.target.value)}
            onKeyDown={handlePromptKeyDown}
            placeholder={t('hero.geminiPlaceholder')}
            rows={2}
            disabled={isGeminiLoading}
            autoFocus
          />
        </div>
      )}

      {isGeminiLoading ? <p className="gemini-state">{t('hero.thinking')}</p> : null}
      {geminiError ? <p className="gemini-error">{geminiError}</p> : null}
      {geminiAnswer ? <div className="gemini-answer">{renderedAnswer}</div> : null}
    </div>
  )
}
