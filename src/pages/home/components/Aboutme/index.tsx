import { Card, Col, Row, Space, Typography } from 'antd'
import demonstrationImg from '../../../../assets/demonstration.png';
import styles from './styles.module.css'

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

export const AboutMe = () => (
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

