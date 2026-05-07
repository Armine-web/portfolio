import type { ComponentType } from 'react'
import { MailOutlined, WhatsAppOutlined, MessageOutlined } from '@ant-design/icons'

export const CONTACT_SECTION_ID = 'contact'
export const CONTACT_EYEBROW = 'CONTACT'
export const CONTACT_TITLE = 'Let’s Create Something Great'
export const CONTACT_DESCRIPTION =
  'Have a project in mind or just want to say hi? Feel free to reach out through any of these platforms.'
export const CONTACT_SUBMIT_TEXT = 'SEND MESSAGE'

export type ContactChannel = {
  id: string
  label: string
  value: string
  icon: ComponentType
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  { id: 'email', label: 'Email', value: 'armine.aghajanyan123@gmail.com', icon: MailOutlined },
  { id: 'whatsapp', label: 'WhatsApp', value: '+374 77474851', icon: WhatsAppOutlined },
  { id: 'messenger', label: 'Messenger', value: 'armine.agajanyan.3', icon: MessageOutlined },
]
