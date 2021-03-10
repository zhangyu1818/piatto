import { useContext } from 'react'
import { ConfigContext } from '../config-provider'

const useConfig = () => {
  const context = useContext(ConfigContext)
  return context
}

export default useConfig
