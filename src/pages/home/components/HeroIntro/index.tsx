import { DownloadOutlined, GithubOutlined, LinkedinOutlined } from '@ant-design/icons'
import ReactMarkdown from 'react-markdown'
import { useState, useMemo } from 'react'
import type { KeyboardEvent } from 'react'
import { generateGeminiResponse } from '../../../../services/geminiService';
import { cvData } from '../../../../data/cvData';
import {
  HERO_DESCRIPTION,
  HERO_FIRST_NAME,
  HERO_LAST_NAME,
  PRIMARY_CTA_TEXT,
  SECONDARY_CTA_TEXT,
} from './const'
import { getSocialLinks } from './utils'
import './style.css'
import { cvMarkdown } from '../../../../data/cvMarkdown';

const socialIconByKind = {
  github: <GithubOutlined />,
  linkedin: <LinkedinOutlined />,
  email: '@',
} as const

export function HeroIntro() {
  const socialLinks = getSocialLinks()
  const [geminiPrompt, setGeminiPrompt] = useState('')
  const [geminiAnswer, setGeminiAnswer] = useState('')
  const [isGeminiLoading, setIsGeminiLoading] = useState(false)
  const [geminiError, setGeminiError] = useState('')
  const [isCvVisible, setIsCvVisible] = useState(false)
  const [isInputVisible, setIsInputVisible] = useState(false)

  const cvContext = useMemo(() => {
    return JSON.stringify(cvData);
  }, []);

  const renderedAnswer = useMemo(() => {
    if (!geminiAnswer) return null;
    return <ReactMarkdown>{geminiAnswer}</ReactMarkdown>;
  }, [geminiAnswer]);

  const handleTalkClick = async () => {
    if (!isInputVisible) {
      setIsInputVisible(true);
      return;
    }

    if (isGeminiLoading) return;

    const currentPrompt = geminiPrompt.trim();
    if (!currentPrompt) return;

    setIsGeminiLoading(true);
    setGeminiError('');
    setGeminiPrompt('');

    try {
      const fullPrompt = `Context: ${cvContext}. Request: ${currentPrompt}`;
      const response = await generateGeminiResponse(fullPrompt);
      setGeminiAnswer(response);
    } catch (error: any) {
      setGeminiError(error.message);
    } finally {
      setIsGeminiLoading(false);
    }
  };

  const handlePromptKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !isGeminiLoading
    ) {
      event.preventDefault();
      void handleTalkClick();
    }
  }

  return (
    <div className="hero-content">
      <h1 className="hero-name">
        {HERO_FIRST_NAME}
        <br />
        {HERO_LAST_NAME}
      </h1>
      <p className="hero-description">{HERO_DESCRIPTION}</p>

      <div className="social-row">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.kind === 'github' ? '_blank' : undefined}
            rel={link.kind === 'github' ? 'noreferrer' : undefined}
            aria-label={link.label}
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
          {isCvVisible ? "Hide CV" : PRIMARY_CTA_TEXT}
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
          {isInputVisible ? 'Send' : SECONDARY_CTA_TEXT}
        </button>
      </div>

      {isInputVisible && (
        <div className="cta-row" style={{ animation: 'fadeIn 0.3s ease' }}>
          <textarea
            className="gemini-prompt-input"
            value={geminiPrompt}
            onChange={(event) => setGeminiPrompt(event.target.value)}
            onKeyDown={handlePromptKeyDown}
            placeholder="Write your prompt for Gemini..."
            rows={2}
            disabled={isGeminiLoading}
            autoFocus
          />
        </div>
      )}

      {isGeminiLoading ? <p className="gemini-state">Thinking...</p> : null}
      {geminiError ? <p className="gemini-error">{geminiError}</p> : null}
      {geminiAnswer ? (
        <div className="gemini-answer">
          {renderedAnswer}
        </div>
      ) : null}
    </div>
  )
}