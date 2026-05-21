import { cvData } from '../../data/cvData'

const normalizeTelegramHandle = (value: string | undefined): string | undefined =>
  value?.trim().replace(/^@/, '')

/**
 * Browser-friendly link to open Telegram (contact card only).
 */
export const getTelegramContactUrl = (): string => {
  const handle =
    normalizeTelegramHandle(import.meta.env.VITE_TELEGRAM_BOT_USERNAME) ??
    normalizeTelegramHandle(import.meta.env.VITE_TELEGRAM_PUBLIC_USERNAME) ??
    normalizeTelegramHandle(cvData.contact.telegram)

  return handle ? `https://t.me/${handle}` : '#'
}
