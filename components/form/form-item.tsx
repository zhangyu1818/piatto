import * as React from 'react'
import { useController } from 'react-hook-form'
import classNames from 'classnames'

import type { RuleItem } from 'hook-form-async-validator'

import useConfig from '../hooks/useConfig'

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  children: React.ReactElement
  rules?: RuleItem | RuleItem[]
}

const FormItem: React.FC<FormItemProps> = ({ name, children, className, rules, ...restProps }) => {
  const { getPrefixCls } = useConfig()
  const prefixCls = getPrefixCls('form-item')

  const { field, fieldState } = useController({
    name,
    defaultValue: '',
  })

  const { error } = fieldState

  const classes = classNames(prefixCls, className, {
    [`${prefixCls}-error`]: error,
  })

  return (
    <div className={classes}  {...restProps}>
      {React.cloneElement(children, { ...field, name })}
      <p className={`${prefixCls}-explain`}>{error ?? ''}</p>
    </div>
  )
}

export default FormItem
