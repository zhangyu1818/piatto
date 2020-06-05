import React from 'react';
import { Form, FormItem, Input, Button } from 'piatto';
import { UserOutlined, PhoneOutlined, CheckCircleOutlined } from 'piatto/icon';

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
        name="phone"
        rules={[
          { required: true, message: 'place input your phone' },
          { pattern: /^1\d{10}$/, message: 'invalid number' },
        ]}
      >
        <Input placeholder="phone" addonBefore={<PhoneOutlined />} block />
      </FormItem>
      <FormItem
        name="code"
        rules={[{ required: true, message: 'place input your code' }]}
        dependencies={['phone']}
      >
        {(control, _, context) => {
          const phone = context.getFieldValue('phone');
          const [error] = context.getFieldError('phone');
          const isValid = phone && !error;
          return (
            <Input
              placeholder="code"
              {...control}
              addonBefore={<CheckCircleOutlined />}
              addonAfter={
                <button tabIndex={-1} disabled={!isValid} type="button">
                  get code
                </button>
              }
              block
            />
          );
        }}
      </FormItem>
      <Button htmlType="submit">Submit</Button>
      <p style={{ fontSize: '0.25rem', margin: 0 }}>
        if phone number is invalid, get code button will disabled
      </p>
    </Form>
  </Phone>
);
