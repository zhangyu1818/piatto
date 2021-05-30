import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { Form } from 'piatto'
import mountTest from '../shared/mountTest'
import { getInputValueByLabelText } from '../shared/queries'
import userEvent from '@testing-library/user-event'

describe('Form', () => {
  mountTest(() => (
    <Form>
      <Form.Item name="test">
        <input />
      </Form.Item>
    </Form>
  ))

  it('should match snapshot', () => {
    const { baseElement } = render(
      <Form>
        <Form.Item name="test">
          <input />
        </Form.Item>
      </Form>
    )
    expect(baseElement).toMatchSnapshot()
  })

  it('should support defaultValues', () => {
    render(
      <Form defaultValues={{ test: 'test', test1: 'test1' }}>
        <Form.Item name="test">
          <input aria-label="Input" />
        </Form.Item>
        <Form.Item name="test1">
          <input aria-label="Input1" />
        </Form.Item>
      </Form>
    )
    expect(getInputValueByLabelText('Input')).toBe('test')
    expect(getInputValueByLabelText('Input1')).toBe('test1')
  })

  it('should not support rules and default if form instance is provider', () => {
    const Demo = () => {
      const form = Form.useForm()
      return (
        <Form
          form={form}
          rules={{
            test: [{ required: true }],
          }}
          defaultValues={{ test: 'test' }}
        >
          <Form.Item name="test">
            <input aria-label="Input" />
          </Form.Item>
        </Form>
      )
    }
    const preEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'
    const spy = jest.spyOn(global.console, 'warn').mockImplementation()
    render(<Demo />)
    expect(console.warn).toHaveBeenCalledTimes(1)
    expect(getInputValueByLabelText('Input')).toBe('')
    process.env.NODE_ENV = preEnv
    spy.mockRestore()
  })

  it('should support rules', async () => {
    const fn = jest.fn()
    const { getByLabelText, getByText } = render(
      <Form
        rules={{
          test: { required: true, message: 'test is required' },
        }}
        onFinish={fn}
      >
        <Form.Item name="test">
          <input aria-label="Input" />
        </Form.Item>
        <Form.Item name="test1" rules={{ required: true, message: 'test1 is required' }}>
          <input aria-label="Input1" />
        </Form.Item>
        <button aria-label="Submit" type="submit" />
      </Form>
    )
    await waitFor(() => {
      userEvent.click(getByLabelText('Submit'))
    })

    expect(fn).not.toBeCalled()
    expect(getByText('test is required')).toBeTruthy()
    expect(getByText('test1 is required')).toBeTruthy()
  })
})
