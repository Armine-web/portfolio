/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY?: string
  readonly VITE_DID_API_KEY?: string
  readonly VITE_DID_API_BASE_URL?: string
  readonly VITE_EMAILJS_SERVICE_ID?: string
  readonly VITE_EMAILJS_TEMPLATE_ID?: string
  readonly VITE_EMAILJS_PUBLIC_KEY?: string
  readonly VITE_TELEGRAM_BOT_TOKEN?: string
  readonly VITE_TELEGRAM_CHAT_ID?: string
  readonly VITE_TELEGRAM_BOT_USERNAME?: string
  readonly VITE_TELEGRAM_PUBLIC_USERNAME?: string
}
