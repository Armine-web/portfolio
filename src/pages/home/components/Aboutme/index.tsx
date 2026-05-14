import { useState } from 'react'
import { Card, Col, Row, Space, Typography } from 'antd'
import demonstrationImg from '../../../../assets/demonstration.png'
import styles from './styles.module.css'
// import { TalkingAvatar } from './TalkingAvatar/index'
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
        <Row gutter={[40, 28]} align="middle">
          <Col xs={24} lg={12}>
            <div className={styles.imageWrapper}>
              <img
                src={demonstrationImg}
                alt="About Me Image"
                className={styles.mainImage}
              />
            </div>
          </Col>

          <Col xs={24} lg={12}>
            <div className={styles.contentBox}>

              <div className="static md:absolute md:-top-[8.5rem] md:-right-[1.5rem] overflow-hidden rounded-full ring-2 ring-amber-700/30 width-[100px] height-[100px] ">
                {showVideo ? (
                  <div className="relative w-">
                    <video
                      src={avatarVideo}
                      playsInline
                      className="h-26 w-26 cursor-pointer object-cover md:h-44 md:w-44"
                      onClick={(e) => {
                        const video = e.currentTarget

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
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
                          <svg viewBox="0 0 24 24" fill="white" className="ml-0.5 h-5 w-5">
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
                    className="h-36 w-36 object-cover md:h-44 md:w-44"
                    width={176}
                    height={176}
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
        {/* <TalkingAvatar /> */}
      </div>
    </section>
  )

}