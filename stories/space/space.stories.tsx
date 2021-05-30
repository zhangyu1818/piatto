import React from 'react'
import { Space, Button } from 'piatto'

import type { Meta, Story } from '@storybook/react'
import type { SpaceProps } from 'piatto/space'

export default {
  title: 'Space',
  component: Space,
  argTypes: {
    direction: {
      defaultValue: 'horizontal',
      options: ['vertical', 'horizontal'],
      control: { type: 'inline-radio' },
    },
    align: {
      options: ['start', 'center', 'end'],
      control: { type: 'inline-radio' },
    },
    size: {
      defaultValue: 'normal',
      options: ['small', 'normal', 'large'],
      control: { type: 'inline-radio' },
    },
  },
} as Meta

export const Basic: Story<SpaceProps> = (args) => (
  <Space {...args}>
    <Button>button</Button>
    <Button>button</Button>
    <Button>button</Button>
  </Space>
)
Basic.storyName = 'Space'
