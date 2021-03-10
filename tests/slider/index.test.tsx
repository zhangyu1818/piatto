import React from 'react'
import { mount, render } from 'enzyme'
import mountTest from '../shared/mountTest'
import Slider from '../../src/slider'

describe('Input', () => {
  mountTest(Slider)

  it('should match snapshots', function() {
    const wrapper = render(<Slider min={0} max={100} step={1} value={50} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should render Slider with value correctly', () => {
    const wrapper = mount(<Slider min={0} max={100} step={1} value={50} />)
    expect(wrapper.state('value')).toBe(50)
    expect(wrapper.setProps({ value: 20 }))
    expect(wrapper.state('value')).toBe(20)
  })
})
