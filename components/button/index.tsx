/* eslint-disable react/button-has-type */
import * as React from 'react'
import { LoadingOutlined } from '@ant-design/icons'

import classNames from 'classnames'
import useConfig from '../hooks/useConfig'

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  loading?: boolean
  type?: 'primary' | 'default' | 'link'
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  block?: boolean
  shape?: 'default' | 'round'
}

const InternalButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {
  const { getPrefixCls } = useConfig()
  const {
    children,
    loading,
    className,
    block,
    type = 'default',
    htmlType = 'button',
    onClick,
    shape,
    ...restProps
  } = props
  const prefixCls = getPrefixCls('button')
  const classes = classNames(prefixCls, className, {
    [`${prefixCls}-${type}`]: type,
    [`${prefixCls}-loading`]: loading,
    [`${prefixCls}-block`]: block,
    [`${prefixCls}-${shape}`]: shape,
  })

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (loading) return
    if (onClick) onClick(e)
  }

  return (
    <button
      ref={ref as any}
      className={classes}
      type={htmlType}
      onClick={handleClick}
      {...restProps}
    >
      {loading && <LoadingOutlined className={`${prefixCls}-icon`} />}
      <span>{children}</span>
    </button>
  )
}

const Button = React.forwardRef(InternalButton)
Button.displayName = 'Button'

export default Button
