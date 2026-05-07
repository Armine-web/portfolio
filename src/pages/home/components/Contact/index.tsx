import { Button, Card, Form, Input, Typography, message } from 'antd'
import {
  CONTACT_CHANNELS,
  CONTACT_DESCRIPTION,
  CONTACT_EYEBROW,
  CONTACT_SECTION_ID,
  CONTACT_SUBMIT_TEXT,
  CONTACT_TITLE,
} from './const'
import { getContactGridClassName } from './utils'
import './style.css'

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input

type ContactFormValues = {
  fullName: string
  email: string
  message: string
}

export function Contact() {
  const gridClassName = getContactGridClassName()
  const [form] = Form.useForm<ContactFormValues>()

  const handleSubmit = () => {
    message.success('Message sent successfully')
    form.resetFields()
  }

  return (
    <section id={CONTACT_SECTION_ID} className="contact-section">
      <div className="contact-shell">
        <div className={gridClassName}>
          <div>
            <Text className="contact-eyebrow">{CONTACT_EYEBROW}</Text>
            <Title level={2} className="contact-title">
              {CONTACT_TITLE}
            </Title>
            <Paragraph className="contact-description">{CONTACT_DESCRIPTION}</Paragraph>

            <div className="contact-list">
              {CONTACT_CHANNELS.map((channel) => {
                const Icon = channel.icon

                return (
                  <Card key={channel.id} className="contact-item" bordered={false}>
                    <span className="contact-item-icon">
                      <Icon />
                    </span>
                    <div>
                      <Text className="contact-item-label">{channel.label}</Text>
                      <Title level={5} className="contact-item-value">
                        {channel.value}
                      </Title>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          <Card className="contact-form-card" bordered={false}>
            <Form<ContactFormValues> form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                className="contact-field"
                label={<span className="contact-field-label">FULL NAME</span>}
                name="fullName"
                rules={[
                  { required: true, message: 'Please enter your full name' },
                  { min: 2, message: 'Name must be at least 2 characters' },
                ]}
              >
                <Input placeholder="John Doe" className="contact-input" />
              </Form.Item>

              <Form.Item
                className="contact-field"
                label={<span className="contact-field-label">EMAIL ADDRESS</span>}
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email address' },
                  { type: 'email', message: 'Please enter a valid email address' },
                ]}
              >
                <Input placeholder="john@example.com" className="contact-input" />
              </Form.Item>

              <Form.Item
                className="contact-field"
                label={<span className="contact-field-label">MESSAGE</span>}
                name="message"
                rules={[
                  { required: true, message: 'Please write your message' },
                  { min: 10, message: 'Message must be at least 10 characters' },
                ]}
              >
                <TextArea rows={6} placeholder="Tell me about your project..." className="contact-textarea" />
              </Form.Item>

              <Button type="primary" htmlType="submit" block className="contact-submit">
                {CONTACT_SUBMIT_TEXT}
              </Button>
            </Form>
          </Card>
        </div>
      </div>
    </section>
  )
}
