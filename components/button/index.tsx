/* eslint-disable react/button-has-type */
import React, { ButtonHTMLAttributes } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import classNames from 'classnames';
import useConfig from '../hooks/useConfig';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  loading?: boolean;
  type?: 'primary' | 'link';
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  block?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { getPrefixCls } = useConfig();
  const { children, loading, className, block, type = 'default', htmlType, ...restProps } = props;
  const prefixCls = getPrefixCls('button');
  const classes = classNames(prefixCls, className, {
    [`${prefixCls}-${type}`]: type,
    [`${prefixCls}-loading`]: loading,
    [`${prefixCls}-block`]: block,
  });
  return (
    <button className={classes} type={htmlType} {...restProps}>
      {loading && <LoadingOutlined className={`${prefixCls}-icon`} />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
