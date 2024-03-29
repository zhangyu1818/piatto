import React from 'react'
import ConfigContext from './context'

import type { ConfigContextProps } from './context'

export interface ConfigProviderProps {
  value: ConfigContextProps
}

const ConfigProvider: React.FC<ConfigProviderProps> = ({ children, value }) => (
  <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
)

export default ConfigProvider

export { ConfigContext }
