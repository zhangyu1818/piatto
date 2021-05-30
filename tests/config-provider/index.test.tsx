import React from 'react'
import { render } from '@testing-library/react'
import { ConfigProvider } from 'piatto'
import { ConfigContext } from 'piatto/config-provider'
import mountTest from '../shared/mountTest'

describe('ConfigProvider', () => {
  mountTest(ConfigProvider)

  const GetPrefixCls = ({
    suffixCls,
    customClass,
  }: {
    suffixCls: string
    customClass?: string
  }) => {
    const { getPrefixCls } = React.useContext(ConfigContext)
    return <>{getPrefixCls(suffixCls, customClass)}</>
  }

  it('should call default function', () => {
    const { rerender, getByText } = render(<GetPrefixCls suffixCls="test" />)
    expect(getByText('piatto-test').textContent).toBe('piatto-test')
    rerender(<GetPrefixCls suffixCls="test" customClass="custom-cls-test" />)
    expect(getByText('custom-cls-test').textContent).toBe('custom-cls-test')
  })

  it('should call custom function', () => {
    const getPrefixCls = (suffixCls: string) => `${suffixCls}-custom-function-return`
    const { getByText } = render(
      <ConfigProvider value={{ getPrefixCls }}>
        <GetPrefixCls suffixCls="piatto" />
      </ConfigProvider>
    )
    expect(getByText('piatto-custom-function-return').textContent).toBe(
      'piatto-custom-function-return'
    )
  })
})
