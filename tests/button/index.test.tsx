import React from 'react'
import { mount, render } from 'enzyme'
import Button from '../../components/button'
import mountTest from '../shared/mountTest'

describe('Button', () => {
  mountTest(Button)

  it('renders correctly', () => {
    expect(<Button>piatto</Button>).toMatchSnapshot()
  })

  it('should render empty button without errors', () => {
    const wrapper = render(
      <Button>
        {null}
        {undefined}
      </Button>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should be clickable', () => {
    const onClickMock = jest.fn()
    const wrapper = mount(<Button onClick={onClickMock} />)
    wrapper.simulate('click')
    expect(onClickMock).toHaveBeenCalled()
  })

  it('should support to change loading', () => {
    const wrapper = mount(<Button />)
    expect(wrapper.find('.piatto-button-loading').length).toBe(0)
    wrapper.setProps({ loading: true })
    expect(wrapper.find('.piatto-button-loading').length).toBe(1)
    wrapper.setProps({ loading: false })
    expect(wrapper.find('.piatto-button-loading').length).toBe(0)
  })

  it('should not clickable when button is loading', () => {
    const onClickMock = jest.fn()
    const wrapper = mount(<Button loading onClick={onClickMock} />)
    wrapper.simulate('click')
    expect(onClickMock).not.toHaveBeenCalled()
  })
})
