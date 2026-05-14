import { useDidTalkingAvatar } from '../../../../../shared/hooks/useDidTalkingAvatar'
import { DEFAULT_TALK_SCRIPT, DID_AVATAR_IMAGE_URL } from '../../../../../services/didTalksConstants'

export const TalkingAvatar = () => {
  const {
    speechText,
    setSpeechText,
    videoUrl,
    phase,
    errorMessage,
    isBusy,
    generateVideo,
    cancelGeneration,
  } = useDidTalkingAvatar(DEFAULT_TALK_SCRIPT)

  const showVideo = Boolean(videoUrl) && phase === 'success'
  const canSubmit = speechText.trim().length >= 3 && !isBusy

  return (
    <div className="animate-fade-up mt-12 w-full border-t border-white/10 pt-10 opacity-0 [animation-delay:80ms]">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
        <div className="flex shrink-0 flex-col items-center gap-4 lg:w-[220px]">
          <div
            className={`relative rounded-full border-[5px] border-amber-900/75 bg-gradient-to-br from-amber-950/40 to-stone-950/80 p-1.5 shadow-lg shadow-black/40 transition-transform duration-500 ease-out ${isBusy ? 'animate-avatar-glow scale-[1.02]' : 'hover:scale-[1.03]'
              }`}
          >
            <div className="overflow-hidden rounded-full ring-2 ring-amber-700/30">
              {showVideo && videoUrl ? (
                <video
                  key={videoUrl}
                  src={videoUrl}
                  playsInline
                  autoPlay
                  onClick={(e) => {
                    const video = e.currentTarget

                    if (video.paused) {
                      void video.play()
                    } else {
                      video.pause()
                    }
                  }}
                  className="h-36 w-36 cursor-pointer object-cover md:h-44 md:w-44"
                >
                  Your browser does not support embedded video.
                </video>
              ) : (
                <img
                  src={DID_AVATAR_IMAGE_URL}
                  alt="Portrait used for the AI talking avatar"
                  className="h-36 w-36 object-cover md:h-44 md:w-44"
                  width={176}
                  height={176}
                  decoding="async"
                />
              )}
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-5">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-[#fdf5eb] md:text-xl">
              Hear about me from my avatar
            </h3>

          </div>

          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-amber-200/80">
              Speech script
            </span>
            <textarea
              value={speechText}
              onChange={(event) => setSpeechText(event.target.value)}
              rows={5}
              disabled={isBusy}
              placeholder="Write what you want the avatar to say…"
              className="w-full resize-y rounded-2xl border border-amber-900/45 bg-[#1f120c]/90 px-4 py-3 text-[0.95rem] leading-relaxed text-stone-100 shadow-inner shadow-black/20 outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-stone-500 focus:border-amber-700/60 focus:ring-2 focus:ring-amber-700/35 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void generateVideo()}
              disabled={!canSubmit}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-gradient-to-r from-amber-800 via-amber-900 to-amber-950 px-7 text-sm font-semibold text-amber-50 shadow-lg shadow-amber-950/40 transition-[transform,box-shadow,opacity] duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-900/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 disabled:pointer-events-none disabled:opacity-45"
            >
              {isBusy ? 'Rendering…' : 'Generate video'}
            </button>
            {isBusy ? (
              <button
                type="button"
                onClick={cancelGeneration}
                className="text-sm font-medium text-stone-400 underline-offset-4 transition-colors hover:text-stone-200 hover:underline"
              >
                Cancel
              </button>
            ) : null}
          </div>

          {isBusy ? (
            <div
              className="flex items-center gap-3 rounded-2xl border border-amber-900/35 bg-[#26150e]/80 px-4 py-3 text-sm text-stone-300"
              role="status"
              aria-live="polite"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500/60 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
              </span>
              <span>
                {phase === 'creating'
                  ? 'Submitting your script to D-ID…'
                  : 'Rendering your video — this can take up to a few minutes.'}
              </span>
            </div>
          ) : null}

          {errorMessage ? (
            <div
              className="rounded-2xl border border-red-900/50 bg-red-950/35 px-4 py-3 text-sm text-red-100/95"
              role="alert"
            >
              {errorMessage}
            </div>
          ) : null}


        </div>
      </div>
    </div>
  )
}
