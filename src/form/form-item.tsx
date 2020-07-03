import React from 'react';
import classNames from 'classnames';
import { Field } from 'rc-field-form';
import { FieldProps } from 'rc-field-form/es/Field';
import useConfig from '../hooks/useConfig';

interface FormItemProps extends FieldProps {
  className?: string;
}

const FormItem: React.FC<FormItemProps> = ({ name, children, className, ...restProps }) => {
  const { getPrefixCls } = useConfig();
  const prefixCls = getPrefixCls('form-item');

  return (
    <Field name={name} {...restProps}>
      {(control, meta, form) => {
        const childrenNode =
          typeof children === 'function'
            ? children(control, meta, form)
            : React.cloneElement(children as React.ReactElement, { ...control });

        const [error] = meta.errors;

        const classes = classNames(prefixCls, className, {
          [`${prefixCls}-error`]: error,
        });

        return (
          <div className={classes}>
            {childrenNode}
            <p className={`${prefixCls}-explain`}>{error ?? ''}</p>
          </div>
        );
      }}
    </Field>
  );
};

export default FormItem;
