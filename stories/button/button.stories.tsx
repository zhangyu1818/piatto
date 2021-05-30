import React from 'react'
import { Button, Space } from 'piatto'

import type { Meta, Story } from '@storybook/react'
import type { ButtonProps } from 'piatto/button'

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    loading: {
      control: { type: 'boolean' },
    },
    type: {
      options: ['primary', 'default', 'link'],
      control: { type: 'inline-radio' },
    },
    htmlType: {
      options: ['submit', 'button', 'reset'],
      control: { type: 'inline-radio' },
    },
    block: {
      control: { type: 'boolean' },
    },
    shape: {
      options: ['default', 'round'],
      control: { type: 'inline-radio' },
    },
  },
} as Meta

export const Basic: Story<ButtonProps> = (args) => (
  <Space direction="vertical">
    <Button {...args}>Button</Button>
    <Button {...args} type="default">
      Default Button
    </Button>
    <Button {...args} type="primary">
      Primary Button
    </Button>
    <Button {...args} type="link">
      Link Button
    </Button>
    <Button {...args} type="default" loading>
      Loading Button
    </Button>
    <Button {...args} type="primary" loading>
      Loading Button
    </Button>
    <Button {...args} type="link" loading>
      Loading Button
    </Button>
    <Button {...args} block>
      Block Button
    </Button>
    <Button {...args} shape="round">
      Round Button
    </Button>
    <Button {...args} block shape="round">
      Block Round Button
    </Button>
  </Space>
)
Basic.storyName = 'Button'
