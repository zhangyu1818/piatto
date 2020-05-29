import React from 'react';
import { Form, FormItem, Input, Button } from 'piatto';

import 'piatto/form/index.less';

export default {
  component: Form,
  title: 'Form',
};

export const Normal = () => (
  <Form
    onFinish={(values) => {
      // eslint-disable-next-line no-console
      console.log(values);
    }}
  >
    <FormItem name="username" rules={[{ required: true, message: 'place input your username' }]}>
      <Input placeholder="username" />
    </FormItem>
    <FormItem name="password" rules={[{ required: true, message: 'place input your password' }]}>
      <Input placeholder="password" />
    </FormItem>
    <Button htmlType="submit">Submit</Button>
  </Form>
);
