import { useState } from 'react'
import { App, Button, Card, Form, Input, Typography } from 'antd'
import {
  CONTACT_CHANNELS,
  CONTACT_DESCRIPTION,
  CONTACT_EYEBROW,
  CONTACT_SECTION_ID,
  CONTACT_SUBMIT_TEXT,
  CONTACT_TITLE,
} from './const'
import { sendTelegramMessage } from '../../../../api/telegram'
import { ContactChannelCard } from './ContactChannelCard'
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
  const { message: toast } = App.useApp()
  const gridClassName = getContactGridClassName()
  const [form] = Form.useForm<ContactFormValues>()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: ContactFormValues) => {
    try {
      setLoading(true)

      await sendTelegramMessage({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      })

      form.resetFields()
      toast.success('Message sent successfully')
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to send message. Please try again.'

      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id={CONTACT_SECTION_ID} className="contact-section">
      <div className="contact-shell">
        <div className={gridClassName}>
          <div>
            <Text className="contact-eyebrow">
              {CONTACT_EYEBROW}
            </Text>

            <Title level={2} className="contact-title">
              {CONTACT_TITLE}
            </Title>

            <Paragraph className="contact-description">
              {CONTACT_DESCRIPTION}
            </Paragraph>

            <div className="contact-list">
              {CONTACT_CHANNELS.map((channel) => (
                <ContactChannelCard key={channel.id} channel={channel} />
              ))}
            </div>
          </div>

          <Card className="contact-form-card" >
            <Form<ContactFormValues>
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Form.Item
                className="contact-field"
                label={
                  <span className="contact-field-label">
                    FULL NAME
                  </span>
                }
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your full name',
                  },
                  {
                    min: 2,
                    message: 'Name must be at least 2 characters',
                  },
                ]}
              >
                <Input
                  placeholder="Your Full Name"
                  className="contact-input"
                />
              </Form.Item>

              <Form.Item
                className="contact-field"
                label={
                  <span className="contact-field-label">
                    EMAIL ADDRESS
                  </span>
                }
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your email address',
                  },
                  {
                    type: 'email',
                    message: 'Please enter a valid email address',
                  },
                ]}
              >
                <Input
                  placeholder="name@example.com"
                  className="contact-input"
                />
              </Form.Item>

              <Form.Item
                className="contact-field"
                label={
                  <span className="contact-field-label">
                    MESSAGE
                  </span>
                }
                name="message"
                rules={[
                  {
                    required: true,
                    message: 'Please write your message',
                  },
                  {
                    min: 10,
                    message:
                      'Message must be at least 10 characters',
                  },
                ]}
              >
                <TextArea
                  rows={6}
                  placeholder="Tell me about your project..."
                  className="contact-textarea"
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                block
                className="contact-submit"
                loading={loading}
              >
                {CONTACT_SUBMIT_TEXT}
              </Button>
            </Form>
          </Card>
        </div>
      </div>
    </section>
  )
}