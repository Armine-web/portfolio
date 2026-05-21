import { useState } from 'react'
import { App, Button, Form, Input, Modal } from 'antd'
import { sendHireMeMessage, type HireMeFormValues } from '../../../../../api/emailjs/hireMe'
import { HIRE_ME_MODAL_TITLE, HIRE_ME_SUBMIT_TEXT } from './const'

const { TextArea } = Input

type HireMeModalProps = {
  open: boolean
  onClose: () => void
}

export function HireMeModal({ open, onClose }: HireMeModalProps) {
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
      toast.success('Message sent successfully')
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={HIRE_ME_MODAL_TITLE}
      open={open}
      onCancel={handleClose}
      footer={null}
      destroyOnHidden
      maskClosable={!loading}
    >
      <Form<HireMeFormValues> form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[
            { required: true, message: 'Please enter your full name' },
            { min: 2, message: 'Name must be at least 2 characters' },
          ]}
        >
          <Input placeholder="John Doe" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email address' },
            { type: 'email', message: 'Please enter a valid email address' },
          ]}
        >
          <Input placeholder="john@example.com" />
        </Form.Item>

        <Form.Item
          label="Message"
          name="message"
          rules={[
            { required: true, message: 'Please write your message' },
            { min: 10, message: 'Message must be at least 10 characters' },
          ]}
        >
          <TextArea rows={5} placeholder="Tell me about your project..." />
        </Form.Item>

        <Button type="primary" htmlType="submit" block loading={loading}>
          {HIRE_ME_SUBMIT_TEXT}
        </Button>
      </Form>
    </Modal>
  )
}
