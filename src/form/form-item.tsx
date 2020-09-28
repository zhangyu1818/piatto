import React, { HTMLAttributes } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import classNames from 'classnames';
import { RuleItem } from 'hook-form-async-validator';

import useConfig from '../hooks/useConfig';

export interface FormItemProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  children: React.ReactElement;
  rules?: RuleItem | RuleItem[];
}

const FormItem: React.FC<FormItemProps> = ({ name, children, className, rules, ...restProps }) => {
  const { getPrefixCls } = useConfig();
  const prefixCls = getPrefixCls('form-item');

  const { control, errors } = useFormContext();
  const error = errors[name];

  const classes = classNames(prefixCls, className, {
    [`${prefixCls}-error`]: error,
  });

  return (
    <div className={classes} {...restProps}>
      <Controller
        control={control}
        name={name}
        render={(props) => React.cloneElement(children, { ...props, name })}
        defaultValue=""
      />
      <p className={`${prefixCls}-explain`}>{error ?? ''}</p>
    </div>
  );
};

export default FormItem;
