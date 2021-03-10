import React from 'react'
import ConfigContext, { ConfigContextProps } from './context'

export interface ConfigProviderProps {
  value: ConfigContextProps
}

const ConfigProvider: React.FC<ConfigProviderProps> = ({ children, value }) => {
  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
}

export default ConfigProvider

export { ConfigContext }
