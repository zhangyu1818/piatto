import React from 'react'
import { Button } from 'piatto'

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

export const Basic: Story<ButtonProps> = (args) => <Button {...args}>Primary Button</Button>
Basic.storyName = 'Button'
