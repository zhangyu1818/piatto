import * as React from 'react'
import { ConfigContext } from '../config-provider'

const useConfig = () => {
  const context = React.useContext(ConfigContext)
  return context
}

export default useConfig
