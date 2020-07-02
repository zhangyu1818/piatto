import React from 'react';
import { Form, FormItem, Input, Button } from 'piatto';
import { UserOutlined, PhoneOutlined, CheckCircleOutlined } from '@ant-design/icons';

import Phone from './component/phone';

import 'piatto/form/index.less';

export default {
  component: Form,
  title: 'Form',
};

export const Normal = () => (
  <Phone>
    <Form
      validateTrigger={['onBlur']}
      onFinish={(values) => {
        // eslint-disable-next-line no-console
        console.log(values);
      }}
    >
      <FormItem name="username" rules={[{ required: true, message: 'place input your username' }]}>
        <Input placeholder="username" addonBefore={<UserOutlined />} block />
      </FormItem>
      <FormItem
        validateTrigger={['onChange', 'onBlur']}
        name="phone"
        rules={[
          { required: true, message: 'place input your phone' },
          { pattern: /^1\d{10}$/, message: 'invalid number' },
        ]}
      >
        <Input placeholder="phone(11)" addonBefore={<PhoneOutlined />} block />
      </FormItem>
      <FormItem
        name="code"
        rules={[{ required: true, message: 'place input your code' }]}
        dependencies={['phone']}
      >
        {(control, _, context) => {
          const phone = context.getFieldValue('phone');
          const [error] = context.getFieldError('phone');
          console.log(error);
          const isValid = phone && !error;
          return (
            <Input.GetCode
              {...control}
              placeholder="code"
              addonBefore={<CheckCircleOutlined />}
              block
              buttonText="Get Code"
              buttonDisable={!isValid}
              onGetCode={() => new Promise((resolve) => setTimeout(resolve, 1500))}
            />
          );
        }}
      </FormItem>
      <Button htmlType="submit">Submit</Button>
      <p style={{ fontSize: '0.33rem', margin: 0 }}>
        if phone number is invalid, get code button will disabled
      </p>
    </Form>
  </Phone>
);
