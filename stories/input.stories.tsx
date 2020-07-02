import React from 'react';
import { Input } from 'piatto';
import { PropertySafetyOutlined, CheckCircleOutlined } from '@ant-design/icons';

import Phone from './component/phone';

import 'piatto/input/index.less';

export default {
  component: Input,
  title: 'Input',
};

export const Normal = () => {
  return (
    <Phone>
      <Input placeholder="base usage" />
      <Input
        defaultValue="default value"
        addonBefore={<PropertySafetyOutlined />}
        addonAfter={<CheckCircleOutlined />}
      />
      <Input block prefix="hello" suffix="world" />
      <Input allowClear placeholder="allow clear" />
      <Input.GetCode
        buttonText="Get Code"
        onGetCode={() => new Promise((resolve) => setTimeout(resolve, 1500))}
      />
    </Phone>
  );
};
