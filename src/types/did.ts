export type DidTalkStatus = 'created' | 'started' | 'done' | 'error' | 'rejected'

export type DidMicrosoftProvider = {
  type: 'microsoft'
  voice_id: string
  language?: string
}

export type DidTextScript = {
  type: 'text'
  input: string
  subtitles?: boolean
  provider: DidMicrosoftProvider
  ssml?: boolean
}

export type CreateTalkBody = {
  source_url: string
  script: DidTextScript
}

export type DidTalk = {
  id: string
  status: DidTalkStatus
  result_url?: string
}

export type CreateTalkResponse = {
  id: string
  object: string
  created_by: string
  created_at: string
  status: DidTalkStatus
}

export type PollTalkOptions = {
  signal?: AbortSignal
  pollIntervalMs?: number
  maxWaitMs?: number
}
