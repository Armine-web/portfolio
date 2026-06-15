import { useState } from 'react'
import { App, Button, Form, Input, Modal } from 'antd'
import { useTranslation } from 'react-i18next'
import { sendHireMeMessage, type HireMeFormValues } from '../../../../../api/emailjs/hireMe'
import { useValidationRules } from '../../../../../shared/hooks/useValidationRules'

const { TextArea } = Input

type HireMeModalProps = {
  open: boolean
  onClose: () => void
}

export function HireMeModal({ open, onClose }: HireMeModalProps) {
  const { t } = useTranslation()
  const validationRules = useValidationRules()
  const { message: toast } = App.useApp()
  const [form] = Form.useForm<HireMeFormValues>()
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    if (!loading) {
      onClose()
    }
  }

  const handleSubmit = async (values: HireMeFormValues) => {
    try {
      setLoading(true)
      await sendHireMeMessage({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      })
      form.resetFields()
      onClose()
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
    <Modal
      title={t('hireMeModal.title')}
      open={open}
      onCancel={handleClose}
      footer={null}
      destroyOnHidden
      maskClosable={!loading}
    >
      <Form<HireMeFormValues> form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label={t('hireMeModal.fullNameLabel')}
          name="fullName"
          rules={validationRules.fullName}
        >
          <Input placeholder={t('hireMeModal.fullNamePlaceholder')} />
        </Form.Item>

        <Form.Item label={t('hireMeModal.emailLabel')} name="email" rules={validationRules.email}>
          <Input placeholder={t('hireMeModal.emailPlaceholder')} />
        </Form.Item>

        <Form.Item
          label={t('hireMeModal.messageLabel')}
          name="message"
          rules={validationRules.message}
        >
          <TextArea rows={5} placeholder={t('hireMeModal.messagePlaceholder')} />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={loading}>
          {t('hireMeModal.submit')}
        </Button>
      </Form>
    </Modal>
  )
}
