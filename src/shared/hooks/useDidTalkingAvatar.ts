import { useCallback, useEffect, useRef, useState } from 'react'
import { isAxiosError, AxiosError } from 'axios'
import { createTalk, pollTalkUntilTerminal } from '../../services/didTalksApi'
import {
  DEFAULT_TALK_SCRIPT,
  DID_US_FEMALE_VOICE_ID,
  DID_AVATAR_IMAGE_URL,
} from '../../services/didTalksConstants'
import type { CreateTalkBody } from '../../types/did'

export type DidAvatarPhase = 'idle' | 'creating' | 'polling' | 'success' | 'error'

const buildTalkBody = (speechText: string): CreateTalkBody => ({
  source_url: DID_AVATAR_IMAGE_URL,
  script: {
    type: 'text',
    input: speechText.trim(),
    subtitles: false,
    ssml: false,
    provider: {
      type: 'microsoft',
      voice_id: DID_US_FEMALE_VOICE_ID,
      language: 'Armenian',
    },
  },
})

export const useDidTalkingAvatar = (initialScript: string = DEFAULT_TALK_SCRIPT) => {
  const [speechText, setSpeechText] = useState(initialScript)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [phase, setPhase] = useState<DidAvatarPhase>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    return () => {
      abortRef.current?.abort()
    }
  }, [])

  const generateVideo = useCallback(async () => {
    const trimmed = speechText.trim()
    if (trimmed.length < 3) {
      setErrorMessage('Please enter at least 3 characters (D-ID script minimum).')
      setPhase('error')
      return
    }

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setErrorMessage(null)
    setVideoUrl(null)
    setPhase('creating')

    try {
      const body = buildTalkBody(trimmed)
      const created = await createTalk(body, controller.signal)
      setPhase('polling')
      const url = await pollTalkUntilTerminal(created.id, { signal: controller.signal })
      setVideoUrl(url)
      setPhase('success')
    } catch (error) {
      const aborted =
        (error instanceof DOMException && error.name === 'AbortError') ||
        (isAxiosError(error) && error.code === AxiosError.ERR_CANCELED)
      if (aborted) {
        setPhase('idle')
        return
      }
      const message = error instanceof Error ? error.message : 'Something went wrong.'
      setErrorMessage(message)
      setPhase('error')
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null
      }
    }
  }, [speechText])

  const cancelGeneration = useCallback(() => {
    abortRef.current?.abort()
  }, [])

  const isBusy = phase === 'creating' || phase === 'polling'

  return {
    speechText,
    setSpeechText,
    videoUrl,
    phase,
    errorMessage,
    isBusy,
    generateVideo,
    cancelGeneration,
  }
}
