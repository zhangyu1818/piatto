import { renderHook } from '@testing-library/react-hooks'
import useConfig from '../components/hooks/useConfig'
import useImmutableValue from '../components/hooks/useImmutableValue'

describe('Hooks', () => {
  it('useConfig', () => {
    const { result } = renderHook(() => useConfig())
    expect(result.current.getPrefixCls('test')).toBe('piatto-test')
    expect(result.current.getPrefixCls('test', 'custom')).toBe('custom')
  })

  it('useImmutableValue', () => {
    const func = () => {}
    const { result } = renderHook(() => useImmutableValue(func))
    expect(result.current).toBe(func)
  })
})
