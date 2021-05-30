import React from 'react'
import { Input, Space } from 'piatto'
import { UserOutlined, CheckCircleOutlined } from '@ant-design/icons'

import type { Meta, Story } from '@storybook/react'
import type { InputProps } from 'piatto/input'
import type { GetCodeInputProps } from 'piatto/input/get-code'

export default {
  title: 'Input',
  component: Input,
  argTypes: {
    block: {
      control: { type: 'boolean' },
    },
    allowClear: {
      control: { type: 'boolean' },
    },
    addonBefore: {
      control: false,
    },
    addonAfter: {
      control: false,
    },
    prefix: {
      control: false,
    },
    suffix: {
      control: false,
    },
  },
} as Meta

const wait = (failed?: boolean) =>
  new Promise((resolve, reject) => {
    setTimeout(failed ? reject : resolve, 2000)
  })

export const Basic: Story<InputProps> = (args) => (
  <Space direction="vertical">
    <Input {...args} placeholder="Basic" />
    <Input {...args} placeholder="addonBefore" addonBefore={<UserOutlined />} />
    <Input {...args} placeholder="addonAfter" addonAfter={<CheckCircleOutlined />} />
    <Input {...args} placeholder="prefix, suffix" prefix="Amount:" suffix="$" />
    <Input
      {...args}
      addonBefore={<UserOutlined />}
      addonAfter={<CheckCircleOutlined />}
      prefix="prefix"
      suffix="suffix"
    />
  </Space>
)
Basic.storyName = 'Input'

export const GetCode: Story<GetCodeInputProps> = (args) => (
  <Space direction="vertical">
    <Input.GetCode {...args} />
    <Input.GetCode
      placeholder="extends Input props"
      {...args}
      addonBefore={<CheckCircleOutlined />}
    />
    <Input.GetCode
      placeholder="Promise.resolve"
      {...args}
      buttonText="resolve"
      onGetCode={() => wait()}
    />
    <Input.GetCode
      placeholder="Promise.reject"
      {...args}
      buttonText="reject"
      onGetCode={() => wait(true)}
    />
  </Space>
)

GetCode.argTypes = {
  buttonText: {
    defaultValue: '获取验证码',
    control: {
      type: 'text',
    },
  },
  time: {
    defaultValue: 60,
    control: {
      type: 'number',
    },
  },
  buttonDisabled: {
    control: {
      type: 'boolean',
    },
  },
  onGetCode: {
    control: false,
  },
}
