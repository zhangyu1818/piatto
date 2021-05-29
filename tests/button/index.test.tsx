import React from 'react'
import { Button } from 'piatto'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mountTest from '../shared/mountTest'

describe('Button', () => {
  mountTest(Button)

  it('renders correctly', () => {
    expect(<Button>piatto</Button>).toMatchSnapshot()
  })

  it('should render empty button without errors', () => {
    const { baseElement } = render(
      <Button>
        {null}
        {undefined}
      </Button>
    )
    expect(baseElement).toMatchSnapshot()
  })

  it('should be clickable', () => {
    const onClickMock = jest.fn()
    const { getByLabelText } = render(<Button aria-label="Button" onClick={onClickMock} />)
    userEvent.click(getByLabelText('Button'))
    expect(onClickMock).toHaveBeenCalled()
  })

  it('should support to change loading', () => {
    const { baseElement, rerender } = render(<Button />)
    expect(baseElement.getElementsByClassName('piatto-button-loading').length).toBe(0)
    rerender(<Button loading />)
    expect(baseElement.getElementsByClassName('piatto-button-loading').length).toBe(1)
    rerender(<Button />)
    expect(baseElement.getElementsByClassName('piatto-button-loading').length).toBe(0)
  })

  it('should not clickable when button is loading', () => {
    const onClickMock = jest.fn()
    const { getByLabelText } = render(<Button aria-label="Button" loading onClick={onClickMock} />)
    userEvent.click(getByLabelText('Button'))
    expect(onClickMock).not.toHaveBeenCalled()
  })
})
