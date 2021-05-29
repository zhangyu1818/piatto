import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

import './styles/preview.less'

import 'piatto/styles/index.less'
import 'piatto/button/index.less'
import 'piatto/form/index.less'
import 'piatto/input/index.less'
import 'piatto/slider/index.less'

export const decorators = [
  (Story) => (
    <div style={{ margin: 16 }}>
      <Story />
    </div>
  ),
]

export const parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6',
  },
  layout: 'fullscreen',
  controls: {
    hideNoControlsWarning: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
