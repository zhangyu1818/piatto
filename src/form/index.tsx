import { useForm, useFormContext, useWatch } from 'react-hook-form'
import InternalForm from './form'
import FormItem from './form-item'

type InternalFormType = typeof InternalForm

interface FormComponent extends InternalFormType {
  Item: typeof FormItem
  useForm: typeof useForm
  useFormContext: typeof useFormContext
  useWatch: typeof useWatch
}

const Form = InternalForm as FormComponent

Form.Item = FormItem
Form.useForm = useForm
Form.useFormContext = useFormContext
Form.useWatch = useWatch

export default Form
