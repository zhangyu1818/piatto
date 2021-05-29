import React from 'react'
import { Form, Input, Button } from 'piatto'
import { UserOutlined, PhoneOutlined, CheckCircleOutlined } from '@ant-design/icons'

import type { Meta, Story } from '@storybook/react'
import type { FormProps } from 'piatto/form/form'

export default {
  title: 'Form',
  component: Form,
} as Meta

const DependenceInput = React.forwardRef<HTMLInputElement>((props, ref) => {
  const phone = Form.useWatch({ name: 'phone', defaultValue: '' })
  const isValid = /^\d{11}$/.test(phone)
  return (
    <Input.GetCode
      {...props}
      ref={ref}
      buttonText="Get Code"
      placeholder="code"
      addonBefore={<CheckCircleOutlined />}
      block
      buttonDisabled={!isValid}
      onGetCode={() => new Promise((resolve) => setTimeout(resolve, 1500))}
    />
  )
})

export const Basic: Story<FormProps> = (args) => (
  <Form
    onFinish={(values) => {
      // eslint-disable-next-line no-console
      console.log(values)
    }}
    {...args}
  >
    <Form.Item name="username" rules={[{ required: true, message: 'this field is required' }]}>
      <Input placeholder="username" addonBefore={<UserOutlined />} block />
    </Form.Item>
    <Form.Item
      name="phone"
      rules={[
        { required: true, message: 'this field is required' },
        { pattern: /^1\d{10}$/, message: 'please input the correct phone number' },
      ]}
    >
      <Input placeholder="phone" addonBefore={<PhoneOutlined />} block />
    </Form.Item>
    <Form.Item name="code" rules={[{ required: true, message: 'this field is required' }]}>
      <DependenceInput />
    </Form.Item>
    <Button htmlType="submit" type="primary" block shape="round">
      Submit
    </Button>
  </Form>
)

Basic.storyName = 'Form'
