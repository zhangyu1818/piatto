import React from 'react'
import { Slider } from 'piatto'

import type { Meta, Story } from '@storybook/react'
import type { SliderProps } from 'piatto/slider'

export default {
  title: 'Slider',
  component: Slider,
} as Meta

export const Basic: Story<SliderProps> = (args) => <Slider {...args} min={10} max={100} step={1} />
