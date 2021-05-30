import React from 'react'
import { Space } from 'piatto'
import { render } from '@testing-library/react'
import mountTest from '../shared/mountTest'

describe('Space', () => {
  mountTest(() => (
    <Space>
      <button>1</button>
      <button>2</button>
      <button>3</button>
    </Space>
  ))

  it('should match snapshot', () => {
    const { baseElement } = render(
      <Space>
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </Space>
    )
    expect(baseElement).toMatchSnapshot()
  })

  it('should has gap and gap can change', () => {
    const { baseElement, rerender } = render(
      <Space>
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </Space>
    )
    expect(baseElement.getElementsByClassName('piatto-space-gap-normal').length).toBe(1)
    rerender(
      <Space size="large">
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </Space>
    )
    expect(baseElement.getElementsByClassName('piatto-space-gap-large').length).toBe(1)
  })

  it('should change direction', () => {
    const { baseElement, rerender } = render(
      <Space>
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </Space>
    )
    rerender(
      <Space direction="vertical">
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </Space>
    )
    expect(baseElement.getElementsByClassName('piatto-space-vertical').length).toBe(1)
  })
})
