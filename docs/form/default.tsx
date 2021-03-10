import React from 'react'
import { Form, Input, Button } from 'piatto'
import { UserOutlined, PhoneOutlined, CheckCircleOutlined } from '@ant-design/icons'

const DependenceInput = React.forwardRef((props, ref) => {
  const phone = Form.useWatch({ name: 'phone', defaultValue: '' })
  const isValid = /^\d{11}$/.test(phone)
  return (
    <Input.GetCode
      {...props}
      ref={ref}
      placeholder="验证码"
      addonBefore={<CheckCircleOutlined />}
      block
      buttonDisabled={!isValid}
      onGetCode={() => new Promise(resolve => setTimeout(resolve, 1500))}
    />
  )
})

export default () => (
  <Form
    onFinish={values => {
      // eslint-disable-next-line no-console
      console.log(values)
    }}
  >
    <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
      <Input placeholder="用户名" addonBefore={<UserOutlined />} block />
    </Form.Item>
    <Form.Item
      name="phone"
      rules={[
        { required: true, message: '请输入手机号' },
        { pattern: /^1\d{10}$/, message: '请输入正确的手机号' },
      ]}
    >
      <Input placeholder="手机号" addonBefore={<PhoneOutlined />} block />
    </Form.Item>
    <Form.Item name="code" rules={[{ required: true, message: '请输入验证码' }]}>
      <DependenceInput />
    </Form.Item>
    <Button htmlType="submit" type="primary" block shape="round">
      提交
    </Button>
    <p style={{ fontSize: '0.33rem', margin: '0.2rem' }}>
      如果手机号校验不通过，获取验证码按钮会disable
    </p>
  </Form>
)
