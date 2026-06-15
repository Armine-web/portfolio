import i18n from '../../i18n'

export type TelegramMessageValues = {
  fullName: string
  email: string
  message: string
}

type TelegramSendMessageResponse = {
  ok: boolean
  description?: string
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const buildMessageText = (values: TelegramMessageValues): string => `
<b>Full Name:</b> ${escapeHtml(values.fullName)}
<b>Email:</b> ${escapeHtml(values.email)}
<b>Message:</b>
${escapeHtml(values.message)}
`.trim()

export const sendTelegramMessage = async (values: TelegramMessageValues): Promise<void> => {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN?.trim()
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID?.trim()

  if (!botToken || !chatId) {
    throw new Error(i18n.t('messages.telegramNotConfigured'))
  }

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildMessageText(values),
      parse_mode: 'HTML',
    }),
  })

  const data = (await response.json()) as TelegramSendMessageResponse

  if (!response.ok || !data.ok) {
    throw new Error(data.description ?? i18n.t('messages.telegramSendFailed'))
  }
}

export { getTelegramContactUrl } from './config'
