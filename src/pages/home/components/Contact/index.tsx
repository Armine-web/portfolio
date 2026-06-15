import { useState } from 'react'
import { App, Button, Card, Form, Input, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { CONTACT_CHANNELS, CONTACT_SECTION_ID } from './const'
import { sendTelegramMessage } from '../../../../api/telegram'
import { ContactChannelCard } from './ContactChannelCard'
import { getContactGridClassName } from './utils'
import { useValidationRules } from '../../../../shared/hooks/useValidationRules'
import './style.css'

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input

type ContactFormValues = {
  fullName: string
  email: string
  message: string
}

export function Contact() {
  const { t } = useTranslation()
  const validationRules = useValidationRules()
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
      toast.success(t('messages.sendSuccess'))
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : t('messages.sendFailed')

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
            <Text className="contact-eyebrow">{t('contact.eyebrow')}</Text>

            <Title level={2} className="contact-title">
              {t('contact.title')}
            </Title>

            <Paragraph className="contact-description">{t('contact.description')}</Paragraph>

            <div className="contact-list">
              {CONTACT_CHANNELS.map((channel) => (
                <ContactChannelCard key={channel.id} channel={channel} />
              ))}
            </div>
          </div>

          <Card className="contact-form-card">
            <Form<ContactFormValues> form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                className="contact-field"
                label={<span className="contact-field-label">{t('contact.fullNameLabel')}</span>}
                name="fullName"
                rules={validationRules.fullName}
              >
                <Input placeholder={t('contact.fullNamePlaceholder')} className="contact-input" />
              </Form.Item>

              <Form.Item
                className="contact-field"
                label={<span className="contact-field-label">{t('contact.emailLabel')}</span>}
                name="email"
                rules={validationRules.email}
              >
                <Input placeholder={t('contact.emailPlaceholder')} className="contact-input" />
              </Form.Item>

              <Form.Item
                className="contact-field"
                label={<span className="contact-field-label">{t('contact.messageLabel')}</span>}
                name="message"
                rules={validationRules.message}
              >
                <TextArea
                  rows={6}
                  placeholder={t('contact.messagePlaceholder')}
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
                {t('contact.submit')}
              </Button>
            </Form>
          </Card>
        </div>
      </div>
    </section>
  )
}
