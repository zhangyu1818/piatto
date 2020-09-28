import React, { HTMLAttributes, useImperativeHandle, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import resolver, { Rules } from 'hook-form-async-validator';
import type {
  UseFormMethods,
  SubmitHandler,
  SubmitErrorHandler,
  FieldValues,
  DeepPartial,
  UnpackNestedValue,
} from 'react-hook-form/dist/types';

import devWarning from '../utils/dev-warning';

export interface FormProps extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  form?: UseFormMethods;
  onFinish?: SubmitHandler<FieldValues>;
  onError?: SubmitErrorHandler<FieldValues>;
  rules?: Rules;
  defaultValues?: Partial<UnpackNestedValue<DeepPartial<FieldValues>>>;
  children: React.ReactElement | React.ReactElement[];
}

const noop = () => {};

const InternalForm: React.ForwardRefRenderFunction<unknown, FormProps> = (
  {
    children,
    form: propsForm,
    onFinish = noop,
    onError,
    rules: propsRules,
    defaultValues,
    ...restProps
  },
  ref,
) => {
  devWarning(
    propsForm && (propsRules || defaultValues),
    `${propsRules ? 'rules' : ''} ${
      defaultValues ? 'defaultValues' : ''
    } is not valid when form is provided,please pass rules to your form instance`,
  );

  const formRules = useMemo(() => {
    const mergeRules = { ...propsRules } as Rules;
    React.Children.forEach<React.ReactElement>(children, (item) => {
      const { name, rules } = item.props;
      if (rules && name) mergeRules[name] = rules;
    });
    return mergeRules;
  }, [propsRules, children]);

  const form = useForm({
    mode: 'onTouched',
    resolver: resolver(formRules),
    defaultValues,
  });

  const formInstance = propsForm || form;

  useImperativeHandle(ref, () => formInstance);

  const { handleSubmit } = formInstance;

  return (
    <FormProvider {...formInstance}>
      <form {...restProps} onSubmit={handleSubmit(onFinish, onError)}>
        {children}
      </form>
    </FormProvider>
  );
};

const Form = React.forwardRef<UseFormMethods, FormProps>(InternalForm) as (
  props: React.PropsWithChildren<FormProps> & { ref?: React.Ref<UseFormMethods> },
) => React.ReactElement;

export type { UseFormMethods };
export default Form;
