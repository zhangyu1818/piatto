import React, { InputHTMLAttributes, useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { CloseCircleFilled } from '@ant-design/icons';
import GetCodeInput from './get-code';
import useConfig from '../hooks/useConfig';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  block?: boolean;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  allowClear?: boolean;
}

type InputValueType = InputProps['value'];

const Input = (props: InputProps) => {
  const { getPrefixCls } = useConfig();
  const {
    value: propsValue,
    onChange: propsOnChange,
    className,
    block,
    prefix,
    suffix,
    addonBefore,
    addonAfter,
    defaultValue,
    type = 'text',
    allowClear,
    onFocus: propsOnFocus,
    onBlur: propsOnBlur,
    ...restProps
  } = props;
  const [inputValue, setInputValue] = useState<InputValueType>(defaultValue ?? '');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // implement getDerivedStateFromProps
  // https://reactjs.org/docs/hooks-faq.html#how-do-i-implement-getderivedstatefromprops
  if (propsValue !== undefined && propsValue !== inputValue) {
    setInputValue(propsValue);
  }

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (propsOnChange) {
      propsOnChange(e);
      return;
    }
    setInputValue(e.target.value);
  };

  /* --------------- onClick clear icon --------------- */

  const onRest: React.MouseEventHandler = (e) => {
    if (propsOnChange && inputRef.current) {
      const event = Object.create(e);
      event.target = inputRef.current;
      event.currentTarget = inputRef.current;
      const originInputValue = inputRef.current.value;
      inputRef.current.value = '';
      propsOnChange(event);
      inputRef.current.value = originInputValue;
    } else {
      setInputValue('');
    }
    // eslint-disable-next-line no-unused-expressions
    inputRef.current?.focus();
  };

  const prefixCls = getPrefixCls('input');
  const classes = classNames(prefixCls, className, {
    [`${prefixCls}-block`]: block,
    [`${prefixCls}-focus`]: focused,
  });

  /* -------------------- prefix -------------------- */

  const prefixNode = prefix ? <span className={`${prefixCls}-prefix`}>{prefix}</span> : null;
  const suffixNode = suffix ? <span className={`${prefixCls}-suffix`}>{suffix}</span> : null;

  /* -------------------- addon -------------------- */

  const addonBeforeNode = addonBefore ? (
    <span className={`${prefixCls}-addon-before`}>{addonBefore}</span>
  ) : null;
  const addonAfterNode = addonAfter ? (
    <span className={`${prefixCls}-addon-after`}>{addonAfter}</span>
  ) : null;

  /* ----------------- clear icon ----------------- */

  const closeIcon = allowClear ? (
    <span
      className={classNames(`${prefixCls}-clear-icon`, {
        [`${prefixCls}-clear-icon-hidden`]: !inputValue,
      })}
      onClick={onRest}
    >
      <CloseCircleFilled />
    </span>
  ) : null;

  /* -------------------- focus --------------------- */

  const focus = useCallback(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const onFocus: React.FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setFocused(true);
      if (propsOnFocus) propsOnFocus(e);
    },
    [propsOnFocus],
  );

  const onBlur: React.FocusEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setFocused(false);
      if (propsOnBlur) propsOnBlur(e);
    },
    [propsOnBlur],
  );

  /* -------------------- render -------------------- */

  return (
    <span className={classes} onClick={focus}>
      {addonBeforeNode}
      {prefixNode}
      <input
        ref={inputRef}
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
  );
};

Input.GetCode = GetCodeInput;

export default Input;
