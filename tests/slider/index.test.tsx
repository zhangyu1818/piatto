import React from 'react'
import { Slider } from 'piatto'
import { render } from '@testing-library/react'
import mountTest from '../shared/mountTest'

describe('Input', () => {
  mountTest(Slider)

  it('should match snapshots', function () {
    const { baseElement } = render(<Slider min={0} max={100} step={1} value={50} />)
    expect(baseElement).toMatchSnapshot()
  })
})
