import { GithubOutlined, LinkedinOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Card, Col, ConfigProvider, Layout, Row, Space, Tag, Typography } from 'antd'

const { Header, Content, Footer } = Layout
const { Title, Paragraph, Text, Link } = Typography

const skills = ['React', 'TypeScript', 'Ant Design', 'Vite', 'PNPM']

const projects = [
  {
    title: 'Portfolio Website',
    description: 'Personal portfolio with case studies, blogs, and contact section.',
    stack: ['React', 'TypeScript', 'Antd'],
  },
  {
    title: 'Dashboard UI',
    description: 'Reusable admin dashboard UI kit with tables, charts, and forms.',
    stack: ['React', 'Antd', 'Vite'],
  },
  {
    title: 'E-commerce Frontend',
    description: 'Modern product pages with filtering, cart, and checkout flow.',
    stack: ['React', 'TypeScript', 'REST API'],
  },
]

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 10,
        },
      }}
    >
      <Layout className="app-layout">
        <Header className="site-header">
          <Text strong className="brand">
            Your Name
          </Text>
          <Space size="middle">
            <Link href="#projects">Projects</Link>
            <Link href="#skills">Skills</Link>
            <Link href="#contact">Contact</Link>
          </Space>
        </Header>

        <Content className="site-content">
          <section className="section hero-section">
            <Title>Frontend Developer Portfolio</Title>
            <Paragraph className="hero-text">
              I build clean, fast, and scalable web interfaces with React, TypeScript, and Ant
              Design.
            </Paragraph>
            <Space wrap>
              <Button type="primary" size="large" href="#projects">
                View Projects
              </Button>
              <Button size="large" href="#contact">
                Contact Me
              </Button>
            </Space>
          </section>

          <section id="projects" className="section">
            <Title level={2}>Projects</Title>
            <Row gutter={[16, 16]}>
              {projects.map((project) => (
                <Col key={project.title} xs={24} md={12} lg={8}>
                  <Card title={project.title} className="project-card">
                    <Paragraph>{project.description}</Paragraph>
                    <Space wrap>
                      {project.stack.map((item) => (
                        <Tag key={item}>{item}</Tag>
                      ))}
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>

          <section id="skills" className="section">
            <Title level={2}>Skills</Title>
            <Space wrap>
              {skills.map((skill) => (
                <Tag key={skill} color="blue">
                  {skill}
                </Tag>
              ))}
            </Space>
          </section>

          <section id="contact" className="section">
            <Title level={2}>Contact</Title>
            <Space size="large" wrap>
              <Button icon={<MailOutlined />} href="mailto:you@example.com">
                Email
              </Button>
              <Button icon={<GithubOutlined />} href="https://github.com/yourusername" target="_blank">
                GitHub
              </Button>
              <Button
                icon={<LinkedinOutlined />}
                href="https://linkedin.com/in/yourusername"
                target="_blank"
              >
                LinkedIn
              </Button>
            </Space>
          </section>
        </Content>

        <Footer className="site-footer">
          <Text type="secondary">© {new Date().getFullYear()} Your Name. All rights reserved.</Text>
        </Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default App
