import axios from 'axios'
import type { AxiosError } from 'axios'

type GeminiTextPart = {
  text: string
}

type GeminiContent = {
  parts: GeminiTextPart[]
}

type GeminiCandidate = {
  content?: GeminiContent
}

type GeminiGenerateContentResponse = {
  candidates?: GeminiCandidate[]
}

const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta'
const DEFAULT_MODEL = 'gemini-2.5-flash'
const FALLBACK_MODELS = ['gemini-1.5-flash', 'gemini-pro']
const MAX_429_RETRIES = 1

const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

const getRetryAfterSeconds = (error: AxiosError): number | null => {
  const retryAfterHeader = error.response?.headers?.['retry-after']

  if (!retryAfterHeader) {
    return null
  }

  const retryAfterValue = Array.isArray(retryAfterHeader)
    ? retryAfterHeader[0]
    : String(retryAfterHeader)
  const parsed = Number.parseInt(retryAfterValue, 10)

  if (Number.isNaN(parsed) || parsed <= 0) {
    return null
  }

  return parsed
}

export async function generateGeminiResponse(
  prompt: string,
  model: string = DEFAULT_MODEL
): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY is not set.')
  }

  const modelsToTry = [model, ...FALLBACK_MODELS.filter((candidate) => candidate !== model)]
  const unavailableModels: string[] = []

  for (const candidateModel of modelsToTry) {
    const url = `${GEMINI_BASE_URL}/models/${candidateModel}:generateContent?key=${apiKey}`
    let attempts = 0

    while (true) {
      try {
        const response = await axios.post<GeminiGenerateContentResponse>(url, {
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })

        const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text

        if (!text) {
          throw new Error('Gemini API returned an empty response.')
        }

        return text
      } catch (error) {
        const axiosError = error as AxiosError
        const status = axiosError.response?.status
        const responseData = axiosError.response?.data as
          | { error?: { message?: string } }
          | undefined
        const apiErrorMessage = responseData?.error?.message

        if (status === 429 && attempts < MAX_429_RETRIES) {
          const retryAfterSeconds = getRetryAfterSeconds(axiosError)
          if (!retryAfterSeconds) {
            break
          }

          attempts += 1
          await wait(retryAfterSeconds * 1000)
          continue
        }

        if (status === 429) {
          const retryAfterSeconds = getRetryAfterSeconds(axiosError)
          const retryHint = retryAfterSeconds ? ` Retry after ${retryAfterSeconds}s.` : ''
          throw new Error(
            `Gemini request limit reached (429). Please wait and try again.${retryHint}`
          )
        }

        if (status === 400 && apiErrorMessage?.includes('is not found')) {
          unavailableModels.push(candidateModel)
          break
        }

        throw error
      }
    }
  }

  throw new Error(
    `No supported Gemini model is available for v1beta generateContent. Tried: ${unavailableModels.join(', ')}.`
  )
}
