import { getTelegramContactUrl } from '../../../../api/telegram'
import type { ContactChannel } from './const'

export function getContactGridClassName() {
  return 'contact-grid'
}

export function getMailtoHref(email: string): string {
  return `mailto:${email.trim()}`
}

export function getContactChannelHref(channel: ContactChannel): string {
  switch (channel.id) {
    case 'email':
      return getMailtoHref(channel.value)
    case 'whatsapp': {
      const digits = channel.value.replace(/\D/g, '')
      return `https://wa.me/${digits}`
    }
    case 'telegram':
      return getTelegramContactUrl()
    default:
      return '#'
  }
}

export function opensContactChannelInNewTab(channelId: string): boolean {
  return channelId === 'whatsapp' || channelId === 'telegram'
}
