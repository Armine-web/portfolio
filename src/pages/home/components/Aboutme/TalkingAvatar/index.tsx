import { useTranslation } from 'react-i18next'
import { useDidTalkingAvatar } from '../../../../../shared/hooks/useDidTalkingAvatar'
import { DEFAULT_TALK_SCRIPT, DID_AVATAR_IMAGE_URL } from '../../../../../services/didTalksConstants'
import styles from './style.module.css'

export const TalkingAvatar = () => {
  const { t } = useTranslation()
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

  const frameClassName = isBusy
    ? `${styles.avatarFrame} ${styles.avatarFrameBusy}`
    : styles.avatarFrame

  return (
    <section className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.avatarColumn}>
          <div className={frameClassName}>
            <div className={styles.avatarInner}>
              {showVideo && videoUrl ? (
                <video
                  key={videoUrl}
                  src={videoUrl}
                  playsInline
                  autoPlay
                  onClick={(event) => {
                    const video = event.currentTarget
                    if (video.paused) {
                      void video.play()
                    } else {
                      video.pause()
                    }
                  }}
                  className={styles.avatarMedia}
                >
                  {t('talkingAvatar.videoUnsupported')}
                </video>
              ) : (
                <img
                  src={DID_AVATAR_IMAGE_URL}
                  alt={t('talkingAvatar.avatarAlt')}
                  className={styles.avatarMedia}
                  width={176}
                  height={176}
                  decoding="async"
                />
              )}
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div>
            <h3 className={styles.heading}>{t('talkingAvatar.heading')}</h3>
          </div>

          <label>
            <span className={styles.label}>{t('talkingAvatar.speechScriptLabel')}</span>
            <textarea
              value={speechText}
              onChange={(event) => setSpeechText(event.target.value)}
              rows={5}
              disabled={isBusy}
              placeholder={t('talkingAvatar.speechPlaceholder')}
              className={styles.textarea}
            />
          </label>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={() => void generateVideo()}
              disabled={!canSubmit}
              className={styles.primaryButton}
            >
              {isBusy ? t('talkingAvatar.rendering') : t('talkingAvatar.generateVideo')}
            </button>
            {isBusy ? (
              <button type="button" onClick={cancelGeneration} className={styles.cancelButton}>
                {t('talkingAvatar.cancel')}
              </button>
            ) : null}
          </div>

          {isBusy ? (
            <div className={styles.status} role="status" aria-live="polite">
              <span className={styles.statusDotWrap}>
                <span className={styles.statusDotPing} />
                <span className={styles.statusDot} />
              </span>
              <span>
                {phase === 'creating'
                  ? t('talkingAvatar.statusCreating')
                  : t('talkingAvatar.statusPolling')}
              </span>
            </div>
          ) : null}

          {errorMessage ? (
            <div className={styles.error} role="alert">
              {errorMessage}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
