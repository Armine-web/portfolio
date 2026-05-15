import { useState } from 'react'
import { Card, Col, Row, Space, Typography } from 'antd'
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
                alt="About Me Image"
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
                    alt="Portrait used for the AI talking avatar"
                    className={styles.inlineAvatarMedia}
                    width={100}
                    height={100}
                    decoding="async"
                  />
                )}
              </div>

              <Text className={styles.overline}>ABOUT ME</Text>
              <Title level={1} className={styles.mainTitle}>
                Bridging Code and
                <br />
                Digital Aesthetics
              </Title>
              <Paragraph className={styles.description}>
                I am a developer who believes that software should be as beautiful as it is
                functional. With a deep foundation in modern JavaScript frameworks, I build
                interfaces that prioritize the user&apos;s emotional connection to the brand.
              </Paragraph>

              <Space size={16} className={styles.statsContainer} wrap>
                <StatCard value="+3 yrs" label="Experience" />
                <StatCard value="60+" label="Projects" />
                <StatCard value="Worldwide" label="Clients" />
              </Space>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  )
}
