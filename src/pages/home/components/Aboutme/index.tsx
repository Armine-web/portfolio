import { useState } from 'react'
import { Card, Col, Row, Space, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import demonstrationImg from '../../../../assets/demonstration.png'
import styles from './styles.module.css'
import { DID_AVATAR_IMAGE_URL } from '../../../../services/didTalksConstants'
import avatarVideo from '../../../../assets/avatar.mp4'

const { Title, Text, Paragraph } = Typography

type StatItemProps = {
  value: string
  label: string
}

const StatCard = ({ value, label }: StatItemProps) => (
  <Card className={styles.statCard} bordered={false}>
    <Title level={3} className={styles.statValue}>
      {value}
    </Title>
    <Text className={styles.statLabel}>{label.toUpperCase()}</Text>
  </Card>
)

export const AboutMe = () => {
  const { t } = useTranslation()
  const showVideo = Boolean(avatarVideo)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.aboutContainer}>
        <Row gutter={[40, 28]} align="middle" className={styles.responsiveRow}>
          <Col xs={24} lg={12} className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              <img
                src={demonstrationImg}
                alt={t('about.imageAlt')}
                className={styles.mainImage}
              />
            </div>
          </Col>

          <Col xs={24} lg={12} className={styles.contentColumn}>
            <div className={styles.contentBox}>
              <div className={styles.inlineAvatar}>
                {showVideo ? (
                  <div className={styles.inlineAvatarVideoWrap}>
                    <video
                      src={avatarVideo}
                      playsInline
                      className={styles.inlineAvatarMedia}
                      onClick={(event) => {
                        const video = event.currentTarget

                        if (video.paused) {
                          void video.play()
                          setIsPlaying(true)
                        } else {
                          video.pause()
                          setIsPlaying(false)
                        }
                      }}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />

                    {!isPlaying && (
                      <div className={styles.inlineAvatarPlayOverlay}>
                        <div className={styles.inlineAvatarPlayButton}>
                          <svg viewBox="0 0 24 24" className={styles.inlineAvatarPlayIcon}>
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <img
                    src={DID_AVATAR_IMAGE_URL}
                    alt={t('about.avatarAlt')}
                    className={styles.inlineAvatarMedia}
                    width={100}
                    height={100}
                    decoding="async"
                  />
                )}
              </div>

              <Text className={styles.overline}>{t('about.overline')}</Text>
              <Title level={1} className={styles.mainTitle}>
                {t('about.titleLine1')}
                <br />
                {t('about.titleLine2')}
              </Title>
              <Paragraph className={styles.description}>{t('about.description')}</Paragraph>

              <Space size={16} className={styles.statsContainer} wrap>
                <StatCard
                  value={t('about.stats.experienceValue')}
                  label={t('about.stats.experienceLabel')}
                />
                <StatCard
                  value={t('about.stats.projectsValue')}
                  label={t('about.stats.projectsLabel')}
                />
                <StatCard
                  value={t('about.stats.clientsValue')}
                  label={t('about.stats.clientsLabel')}
                />
              </Space>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  )
}
