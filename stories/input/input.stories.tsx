import React from 'react'
import { Input } from 'piatto'
import { UserOutlined, CheckCircleOutlined } from '@ant-design/icons'

import type { Meta, Story } from '@storybook/react'
import type { InputProps } from 'piatto/input'
import type { GetCodeInputProps } from 'piatto/input/get-code'

export default {
  title: 'Input',
  component: Input,
} as Meta

export const Basic: Story<InputProps> = (args) => (
  <div>
    <Input {...args} />
    <Input {...args} addonBefore={<UserOutlined />} addonAfter={<CheckCircleOutlined />} />
    <Input {...args} prefix="Amount:" suffix="$" allowClear />
  </div>
)

export const GetCode: Story<GetCodeInputProps> = (args) => (
  <div>
    <Input.GetCode {...args} />
  </div>
)
