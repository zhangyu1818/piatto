import * as React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import resolver from 'hook-form-async-validator'

import type {
  UseFormReturn,
  SubmitHandler,
  SubmitErrorHandler,
  DefaultValues,
} from 'react-hook-form/dist/types'
import type { Rules } from 'hook-form-async-validator'

import devWarning from '../utils/dev-warning'

export type FormValue = any
export type FormValues = Record<string, FormValue>

export interface FormProps<T extends FormValues = FormValues>
  extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onError' | 'defaultValue'> {
  form?: UseFormReturn<T>
  onFinish?: SubmitHandler<T>
  onError?: SubmitErrorHandler<T>
  rules?: Rules
  defaultValues?: DefaultValues<T>
  children: React.ReactElement | React.ReactElement[]
}

const noop = () => {}
function InternalForm<Values>(
  props: FormProps<Values>,
  ref: React.ForwardedRef<UseFormReturn<Values>>
) {
  const {
    children,
    form: propsForm,
    onFinish = noop,
    onError,
    rules: propsRules,
    defaultValues,
    ...restProps
  } = props

  devWarning(
    !(propsForm && (propsRules || defaultValues)),
    `${propsRules ? 'rules' : ''} ${
      defaultValues ? 'defaultValues' : ''
    } is not valid when form is provided,please pass rules and defaultValues to your form instance`
  )

  const formRules = React.useMemo(() => {
    const mergeRules = { ...propsRules } as Rules
    React.Children.forEach<React.ReactElement>(children, (item) => {
      const { name, rules } = item.props
      if (rules && name) mergeRules[name] = rules
    })
    return mergeRules
  }, [propsRules, children])

  const form = useForm<Values>({
    mode: 'onTouched',
    resolver: resolver(formRules),
    defaultValues,
  })

  const formInstance = propsForm || form

  React.useImperativeHandle(ref, () => formInstance)

  const { handleSubmit } = formInstance

  return (
    <FormProvider {...formInstance}>
      <form {...restProps} onSubmit={handleSubmit(onFinish, onError)}>
        {children}
      </form>
    </FormProvider>
  )
}

const Form = React.forwardRef<UseFormReturn, FormProps>(InternalForm) as <T>(
  props: FormProps<T> & { ref?: React.Ref<UseFormReturn<T>> }
) => React.ReactElement

export type { UseFormReturn }
export default Form
