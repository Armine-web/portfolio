import axios, { AxiosError, type AxiosInstance, isAxiosError } from 'axios'
import type {
  CreateTalkBody,
  CreateTalkResponse,
  DidTalk,
  PollTalkOptions,
} from '../types/did'

const DEFAULT_BASE_URL = 'https://api.d-id.com'
const DEFAULT_POLL_MS = 2000
const DEFAULT_MAX_WAIT_MS = 5 * 60 * 1000

let cachedClient: AxiosInstance | null = null

const wait = (ms: number, signal?: AbortSignal): Promise<void> =>
  new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => {
      cleanup()
      resolve()
    }, ms)

    const cleanup = (): void => {
      window.clearTimeout(timer)
      if (signal) {
        signal.removeEventListener('abort', onAbort)
      }
    }

    const onAbort = (): void => {
      cleanup()
      reject(new DOMException('Aborted', 'AbortError'))
    }

    if (signal) {
      if (signal.aborted) {
        onAbort()
        return
      }
      signal.addEventListener('abort', onAbort, { once: true })
    }
  })

const isCanceledRequest = (error: unknown): boolean => {
  if (error instanceof DOMException && error.name === 'AbortError') {
    return true
  }
  return isAxiosError(error) && error.code === AxiosError.ERR_CANCELED
}

const readDidApiKey = (): string => {
  const raw = import.meta.env.VITE_DID_API_KEY
  if (!raw || typeof raw !== 'string') {
    throw new Error('VITE_DID_API_KEY is not set. Add it to your .env file.')
  }
  const trimmed = raw.trim()
  if (!trimmed) {
    throw new Error('VITE_DID_API_KEY is empty.')
  }
  return trimmed
}

const getDidAxios = (): AxiosInstance => {
  if (cachedClient) {
    return cachedClient
  }

  const useDevProxy = import.meta.env.DEV
  const baseURL = useDevProxy
    ? '/api/d-id'
    : (import.meta.env.VITE_DID_API_BASE_URL?.toString().trim() || DEFAULT_BASE_URL)

  const key = readDidApiKey()

  cachedClient = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
    ...(useDevProxy
      ? {}
      : {
          auth: {
            username: key,
            password: '',
          },
        }),
  })

  return cachedClient
}

const extractDidErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    const data = error.response?.data as
      | { description?: string; kind?: string }
      | undefined
    if (data?.description) {
      return data.kind ? `${data.kind}: ${data.description}` : data.description
    }
    if (typeof error.message === 'string' && error.message) {
      return error.message
    }
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred.'
}

export const createTalk = async (
  body: CreateTalkBody,
  signal?: AbortSignal
): Promise<CreateTalkResponse> => {
  try {
    const client = getDidAxios()
    const { data } = await client.post<CreateTalkResponse>('/talks', body, { signal })
    return data
  } catch (error) {
    if (isCanceledRequest(error)) {
      throw error
    }
    throw new Error(extractDidErrorMessage(error))
  }
}

export const getTalk = async (id: string, signal?: AbortSignal): Promise<DidTalk> => {
  try {
    const client = getDidAxios()
    const { data } = await client.get<DidTalk>(`/talks/${encodeURIComponent(id)}`, { signal })
    return data
  } catch (error) {
    if (isCanceledRequest(error)) {
      throw error
    }
    throw new Error(extractDidErrorMessage(error))
  }
}

export const pollTalkUntilTerminal = async (
  id: string,
  options?: PollTalkOptions
): Promise<string> => {
  const pollIntervalMs = options?.pollIntervalMs ?? DEFAULT_POLL_MS
  const maxWaitMs = options?.maxWaitMs ?? DEFAULT_MAX_WAIT_MS
  const signal = options?.signal
  const deadline = Date.now() + maxWaitMs

  while (Date.now() < deadline) {
    const talk = await getTalk(id, signal)

    if (talk.status === 'done') {
      if (!talk.result_url) {
        throw new Error('Talk finished but no result URL was returned.')
      }
      return talk.result_url
    }

    if (talk.status === 'error' || talk.status === 'rejected') {
      throw new Error(
        `Video generation failed with status "${talk.status}". Please try different text or try again later.`
      )
    }

    await wait(pollIntervalMs, signal)
  }

  throw new Error(
    `Timed out after ${Math.round(maxWaitMs / 1000)}s while waiting for the video to finish.`
  )
}
