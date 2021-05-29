import React from 'react'
import { Input } from 'piatto'
import { act, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mountTest from '../shared/mountTest'

const { GetCode: GetCodeInput } = Input

const buttonLabel = 'Get Code Button'

describe('Input Get Code', () => {
  mountTest(GetCodeInput)

  it('should support custom button text', () => {
    const { getByLabelText } = render(<GetCodeInput buttonText="点击获取验证码" />)
    expect(getByLabelText(buttonLabel).textContent).toBe('点击获取验证码')
  })

  it('should support disable', () => {
    const onClickMock = jest.fn()
    const { getByLabelText } = render(<GetCodeInput buttonDisabled onGetCode={onClickMock} />)
    userEvent.click(getByLabelText(buttonLabel))
    expect(onClickMock).not.toHaveBeenCalled()
  })

  it('should support Promise Function', async () => {
    const onClickMock = jest.fn().mockImplementation(() => Promise.resolve())
    const { getByLabelText } = render(<GetCodeInput onGetCode={onClickMock} />)
    userEvent.click(getByLabelText(buttonLabel))
    await waitFor(() => expect(onClickMock).toHaveBeenCalledTimes(1))
  })

  it('should support count down', async () => {
    jest.useFakeTimers()
    const { getByLabelText } = render(<GetCodeInput buttonText="test" />)
    userEvent.click(getByLabelText(buttonLabel))
    await act(async () => {
      expect(getByLabelText(buttonLabel).textContent).toBe('60s')
      for (let i = 0; i < 30; i++) {
        jest.runAllTimers()
        await Promise.resolve()
      }
      expect(getByLabelText(buttonLabel).textContent).toBe('30s')
      for (let i = 0; i < 30; i++) {
        jest.runAllTimers()
        await Promise.resolve()
      }
      expect(getByLabelText(buttonLabel).textContent).toBe('0s')
      jest.runAllTimers()
      await Promise.resolve()
      expect(getByLabelText(buttonLabel).textContent).toBe('test')
    })
  })
})
