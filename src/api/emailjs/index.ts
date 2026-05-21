import emailjs, { EmailJSResponseStatus } from '@emailjs/browser'

export type ContactMessagePayload = {
  fullName: string
  email: string
  message: string
}

let emailJsInitialized = false

const readEmailJsConfig = () => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim()
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim()
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim()
  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      'Email service is not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY.',
    )
  }

  return { serviceId, templateId, publicKey }
}

const ensureEmailJsInit = (publicKey: string) => {
  if (!emailJsInitialized) {
    emailjs.init({ publicKey })
    emailJsInitialized = true
  }
}

const toSendError = (error: unknown): Error => {
  if (error instanceof EmailJSResponseStatus) {
    return new Error(error.text || `Email failed (${error.status})`)
  }

  if (typeof error === 'string') {
    return new Error(error)
  }

  if (error instanceof Error) {
    return error
  }

  return new Error('Failed to send message. Please try again.')
}

const buildTemplateParams = (payload: ContactMessagePayload) => ({
  from_name: payload.fullName,
  reply_to: payload.email,
  message: payload.message,
  // Common EmailJS template aliases (ignored if unused in your template)
  name: payload.fullName,
  email: payload.email,
  from_email: payload.email,
  user_email: payload.email,
})

export const sendContactMessage = async (payload: ContactMessagePayload): Promise<void> => {
  const { serviceId, templateId, publicKey } = readEmailJsConfig()

  ensureEmailJsInit(publicKey)

  try {
    await emailjs.send(serviceId, templateId, buildTemplateParams(payload))
  } catch (error) {
    throw toSendError(error)
  }
}
