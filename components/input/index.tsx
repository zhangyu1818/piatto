import * as React from 'react'
import classNames from 'classnames'
import useDerivedValue from 'use-derived-value'
import { CloseCircleFilled } from '@ant-design/icons'
import GetCodeInput from './get-code'
import useConfig from '../hooks/useConfig'
import composeRef from '../utils/compose-ref'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  block?: boolean
  addonBefore?: React.ReactNode
  addonAfter?: React.ReactNode
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  allowClear?: boolean
}

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>> {
  GetCode: typeof GetCodeInput
}

type InputValueType = InputProps['value']

const InternalInput: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  props,
  forwardedRef
) => {
  const { getPrefixCls } = useConfig()
  const {
    onChange: propsOnChange,
    className,
    block,
    prefix,
    suffix,
    addonBefore,
    addonAfter,
    defaultValue = '',
    type = 'text',
    allowClear,
    onFocus: propsOnFocus,
    onBlur: propsOnBlur,
    ...restProps
  } = props
  const [inputValue, setInputValue] = useDerivedValue<InputValueType>(defaultValue, () =>
    'value' in props ? props.value : null
  )
  const [focused, setFocused] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (propsOnChange) {
      propsOnChange(e)
    } else {
      setInputValue(e.target.value)
    }
  }

  /* --------------- onClick clear icon --------------- */

  const onRest: React.MouseEventHandler = (e) => {
    if (propsOnChange && inputRef.current) {
      const event = Object.create(e)
      event.target = inputRef.current
      event.currentTarget = inputRef.current
      const originInputValue = inputRef.current.value
      inputRef.current.value = ''
      propsOnChange(event)
      inputRef.current.value = originInputValue
    } else {
      setInputValue('')
    }
    // eslint-disable-next-line no-unused-expressions
    inputRef.current?.focus()
  }

  const prefixCls = getPrefixCls('input')
  const classes = classNames(prefixCls, className, {
    [`${prefixCls}-block`]: block,
    [`${prefixCls}-focus`]: focused,
  })

  /* -------------------- prefix -------------------- */

  const prefixNode = prefix ? <span className={`${prefixCls}-prefix`}>{prefix}</span> : null
  const suffixNode = suffix ? <span className={`${prefixCls}-suffix`}>{suffix}</span> : null

  /* -------------------- addon -------------------- */

  const addonBeforeNode = addonBefore ? (
    <span className={`${prefixCls}-addon-before`}>{addonBefore}</span>
  ) : null
  const addonAfterNode = addonAfter ? (
    <span className={`${prefixCls}-addon-after`}>{addonAfter}</span>
  ) : null

  /* ----------------- clear icon ----------------- */

  const closeIcon = allowClear ? (
    <span
      className={classNames(`${prefixCls}-clear-icon`, {
        [`${prefixCls}-clear-icon-hidden`]: !inputValue,
      })}
      tabIndex={0}
      role="button"
      onClick={onRest}
    >
      <CloseCircleFilled />
    </span>
  ) : null

  /* -------------------- focus --------------------- */

  const focus = React.useCallback(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [])

  const onFocus: React.FocusEventHandler<HTMLInputElement> = React.useCallback(
    (e) => {
      setFocused(true)
      if (propsOnFocus) propsOnFocus(e)
    },
    [propsOnFocus]
  )

  const onBlur: React.FocusEventHandler<HTMLInputElement> = React.useCallback(
    (e) => {
      setFocused(false)
      if (propsOnBlur) propsOnBlur(e)
    },
    [propsOnBlur]
  )

  /* -------------------- render -------------------- */

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <span className={classes} onClick={focus}>
      {addonBeforeNode}
      {prefixNode}
      <input
        ref={composeRef(inputRef, forwardedRef)}
        value={inputValue}
        onChange={onChange}
        type={type}
        // IOS type number
        pattern={type === 'number' ? '[0-9]*' : undefined}
        onFocus={onFocus}
        onBlur={onBlur}
        {...restProps}
      />
      {closeIcon}
      {suffixNode}
      {addonAfterNode}
    </span>
  )
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(InternalInput) as CompoundedComponent

Input.GetCode = GetCodeInput

export default Input
