import React from 'react';
import { Button } from 'piatto';

import Phone from './component/phone';

import 'piatto/button/index.less';

export default {
  component: Button,
  title: 'Button',
};

export const Normal = () => {
  return (
    <Phone>
      <Button>default</Button>
      <Button type="primary">primary</Button>
      <Button disabled>disabled</Button>
      <Button block>block</Button>
      <Button loading>default</Button>
      <Button type="link">link</Button>
    </Phone>
  );
};
