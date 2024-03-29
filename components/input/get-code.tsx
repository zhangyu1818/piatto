import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import Button from '../button'
import Input from '.'
import useConfig from '../hooks/useConfig'
import sleep from '../utils/sleep'

import type { InputProps } from '.'

export interface GetCodeInputProps extends Omit<InputProps, 'addonAfter'> {
  buttonText?: string
  time?: number
  buttonDisabled?: boolean
  onGetCode?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown | Promise<unknown>
}

const InternalGetCodeInput: React.ForwardRefRenderFunction<HTMLInputElement, GetCodeInputProps> = (
  props,
  ref
) => {
  const {
    buttonText = '获取验证码',
    time = 60,
    buttonDisabled,
    onGetCode,
    className,
    ...inputProps
  } = props
  const { getPrefixCls } = useConfig()
  // button loading
  const [loading, setLoading] = useState(false)
  // count
  const [count, setCount] = useState(time)
  // show count
  const [startCountDown, setStartCountDown] = useState(false)
  const timer = useRef(0)

  /* -------------------- class -------------------- */

  const prefixCls = getPrefixCls('get-code-input')
  const buttonCls = classNames(`${prefixCls}-button`, 'input-no-focus')
  const inputClasses = classNames(prefixCls, className)

  /* -------------------- effect -------------------- */

  const countdown = () => {
    setStartCountDown(true)
    if (timer.current) window.clearTimeout(timer.current)
    const [timerId, wait] = sleep(1000)
    timer.current = timerId
    wait.then(() => {
      setCount((prev) => {
        if (prev > 0) {
          countdown()
          return prev - 1
        }
        setStartCountDown(false)
        return time
      })
    })
  }

  const onClickButton: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    if (startCountDown) return
    if (onGetCode) {
      setLoading(true)
      Promise.resolve(onGetCode(e))
        .then(() => {
          countdown()
        })
        .finally(() => {
          setLoading(false)
        })
    } else countdown()
  }

  useEffect(
    () => () => {
      window.clearTimeout(timer.current)
    },
    []
  )

  return (
    <Input
      {...inputProps}
      ref={ref}
      className={inputClasses}
      addonAfter={
        <Button
          className={buttonCls}
          onClick={onClickButton}
          disabled={buttonDisabled}
          loading={loading}
          htmlType="button"
          type="link"
          aria-label="Get Code Button"
        >
          {loading ? null : startCountDown ? `${count}s` : buttonText}
        </Button>
      }
    />
  )
}

const GetCodeInput = React.forwardRef(InternalGetCodeInput)

export default GetCodeInput
