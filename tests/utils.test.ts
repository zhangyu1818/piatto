import * as React from 'react'
import composeRef from '../components/utils/compose-ref'
import devWarning from '../components/utils/dev-warning'
import sleep from '../components/utils/sleep'

describe('Utils', () => {
  it('composeRef', () => {
    const ref = React.createRef<number>()
    const func = jest.fn()
    const composed = composeRef(ref, func)
    composed(1)
    expect(ref.current).toBe(1)
    expect(func).toBeCalledWith(1)
  })

  it('devWarning', () => {
    const spy = jest.spyOn(global.console, 'warn').mockImplementation()
    devWarning(false, 'test')
    expect(console.warn).not.toBeCalled()
    const prev = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'
    devWarning(true, 'test')
    expect(console.warn).not.toBeCalled()
    devWarning(false, 'test')
    expect(console.warn).toBeCalledWith('test')
    process.env.NODE_ENV = prev
    spy.mockRestore()
  })

  it('sleep', async () => {
    jest.useFakeTimers()
    let [, promise] = sleep(10000)
    const p = promise.then(() => 1)
    jest.runOnlyPendingTimers()
    const r = await p
    expect(r).toBe(1)
    jest.useRealTimers()
  })
})
