import React from 'react';
import { Form, Input, Button } from 'piatto';
import { UserOutlined, PhoneOutlined, CheckCircleOutlined } from '@ant-design/icons';

const DependenceInput: React.FC = props => {
  const phone = Form.useWatch({ name: 'phone', defaultValue: '' });
  const isValid = /^\d{11}$/.test(phone);
  return (
    <Input.GetCode
      {...props}
      placeholder="code"
      addonBefore={<CheckCircleOutlined />}
      block
      buttonText="Get Code"
      buttonDisabled={!isValid}
      onGetCode={() => new Promise(resolve => setTimeout(resolve, 1500))}
    />
  );
};

export default () => (
  <Form
    onFinish={values => {
      // eslint-disable-next-line no-console
      console.log(values);
    }}
  >
    <Form.Item name="username" rules={[{ required: true, message: 'place input your username' }]}>
      <Input placeholder="username" addonBefore={<UserOutlined />} block />
    </Form.Item>
    <Form.Item
      name="phone"
      rules={[
        { required: true, message: 'place input your phone' },
        { pattern: /^1\d{10}$/, message: 'invalid number' },
      ]}
    >
      <Input placeholder="phone(11)" addonBefore={<PhoneOutlined />} block />
    </Form.Item>
    <Form.Item name="code" rules={[{ required: true, message: 'place input your code' }]}>
      <DependenceInput />
    </Form.Item>
    <Button htmlType="submit">Submit</Button>
    <p style={{ fontSize: '0.33rem', margin: 0 }}>
      if phone number is invalid, get code button will disabled
    </p>
  </Form>
);
