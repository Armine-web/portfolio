import type { ComponentType } from 'react'
import { MailOutlined, WhatsAppOutlined, MessageOutlined } from '@ant-design/icons'

export const CONTACT_SECTION_ID = 'contact'

export type ContactChannelId = 'email' | 'whatsapp' | 'telegram'

export type ContactChannel = {
  id: ContactChannelId
  value: string
  icon: ComponentType
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  { id: 'email', value: 'armine.aghajanyan123@gmail.com', icon: MailOutlined },
  { id: 'whatsapp', value: '+374 77474851', icon: WhatsAppOutlined },
  { id: 'telegram', value: '', icon: MessageOutlined },
]
