import { DownloadOutlined, GithubOutlined, MessageOutlined } from '@ant-design/icons'
import {
  HERO_DESCRIPTION,
  HERO_FIRST_NAME,
  HERO_LAST_NAME,
  PRIMARY_CTA_TEXT,
  SECONDARY_CTA_TEXT,
} from './const'
import { getSocialLinks } from './utils'
import './style.css'

const socialIconByKind = {
  github: <GithubOutlined />,
  message: <MessageOutlined />,
  email: '@',
} as const

export function HeroIntro() {
  const socialLinks = getSocialLinks()

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
        <button type="button" className="primary-cta">
          {PRIMARY_CTA_TEXT} <DownloadOutlined />
        </button>
        <button type="button" className="secondary-cta">
          {SECONDARY_CTA_TEXT}
        </button>
      </div>
    </div>
  )
}
