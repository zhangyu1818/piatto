import React from 'react'
import { Input } from 'piatto'
import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mountTest from '../shared/mountTest'
import { getInputValueByLabelText } from '../shared/queries'

describe('Input', () => {
  mountTest(Input)

  it('should support input', () => {
    const { getByLabelText } = render(<Input aria-label="Input" />)
    fireEvent.change(getByLabelText('Input'), { target: { value: 'test' } })
    expect(getInputValueByLabelText('Input')).toBe('test')
    fireEvent.change(getByLabelText('Input'), { target: { value: 'TEST' } })
    expect(getInputValueByLabelText('Input')).toBe('TEST')
  })

  it('should support max length', () => {
    const { getByLabelText } = render(<Input aria-label="Input" maxLength={5} />)
    expect(getByLabelText('Input')).toMatchSnapshot()
  })

  it('should support focus', () => {
    const { getByLabelText, baseElement } = render(<Input aria-label="Input" />)
    fireEvent.focus(getByLabelText('Input'))
    expect(baseElement.getElementsByClassName('piatto-input-focus').length).toBe(1)
    fireEvent.blur(getByLabelText('Input'))
    expect(baseElement.getElementsByClassName('piatto-input-focus').length).toBe(0)
  })

  it('should support default value', () => {
    render(<Input aria-label="Input" defaultValue="123" />)
    expect(getInputValueByLabelText('Input')).toBe('123')
  })

  it('should allow clear icon', () => {
    const { baseElement } = render(<Input aria-label="Input" defaultValue="321" allowClear />)
    userEvent.click(baseElement.getElementsByClassName('piatto-input-clear-icon')[0])
    expect(getInputValueByLabelText('Input')).toBe('')
  })

  it('should not show clear icon if default value is empty', () => {
    const { baseElement } = render(<Input allowClear defaultValue="" />)
    expect(baseElement.getElementsByClassName('piatto-input-clear-icon-hidden').length).toBe(1)
  })

  it('should support value be controlled', () => {
    let inputValue: string = ''
    const Demo = () => {
      const [value, setValue] = React.useState('')
      inputValue = value
      return (
        <Input value={value} onChange={({ target }) => setValue(target.value)} aria-label="Input" />
      )
    }
    const { getByLabelText } = render(<Demo />)
    fireEvent.change(getByLabelText('Input'), { target: { value: 'test' } })
    expect(getInputValueByLabelText('Input')).toBe('test')
    expect(inputValue).toBe('test')
  })

  it('should call onChange', () => {
    const onChangeMock = jest.fn()
    const { getByLabelText } = render(<Input aria-label="Input" onChange={onChangeMock} />)
    fireEvent.change(getByLabelText('Input'), { target: { value: 'test' } })
    expect(onChangeMock).toHaveBeenCalledTimes(1)
    expect(getInputValueByLabelText('Input')).toBe('test')
  })
})
