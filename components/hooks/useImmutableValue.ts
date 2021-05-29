import * as React from 'react'

const useImmutableValue = <T>(value: T) => {
  const ref = React.useRef(value)
  return ref.current
}

export default useImmutableValue
