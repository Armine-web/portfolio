import { sendContactMessage } from './index'

export type HireMeFormValues = {
  fullName: string
  email: string
  message: string
}

export const sendHireMeMessage = async (values: HireMeFormValues): Promise<void> => {
  await sendContactMessage({
    fullName: values.fullName,
    email: values.email,
    message: values.message,
  })
}
