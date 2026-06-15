import type { MouseEvent } from 'react'
import { Card, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import type { ContactChannel } from '../const'
import { getContactChannelHref, getContactChannelValue, opensContactChannelInNewTab } from '../utils'

const { Title, Text } = Typography

type ContactChannelCardProps = {
  channel: ContactChannel
}

export function ContactChannelCard({ channel }: ContactChannelCardProps) {
  const { t } = useTranslation()
  const Icon = channel.icon
  const label = t(`contact.channels.${channel.id}`)
  const value = getContactChannelValue(channel, t)
  const href = getContactChannelHref(channel)
  const isEmail = channel.id === 'email'
  const openInNewTab = opensContactChannelInNewTab(channel.id)

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isEmail) {
      return
    }

    event.preventDefault()
    window.location.href = href
  }

  return (
    <a
      href={href}
      className="contact-item-link"
      aria-label={t('contact.channelAria', { label, value })}
      onClick={handleClick}
      {...(openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <Card className="contact-item" bordered={false}>
        <span className="contact-item-icon">
          <Icon />
        </span>
        <div>
          <Text className="contact-item-label">{label}</Text>
          <Title level={5} className="contact-item-value">
            {value}
          </Title>
        </div>
      </Card>
    </a>
  )
}
