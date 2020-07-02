import React from 'react';
import { mount } from 'enzyme';
import ConfigProvider, { ConfigContext } from '../../config-provider';
import mountTest from '../../../tests/shared/mountTest';

describe('ConfigProvider', () => {
  mountTest(ConfigProvider);

  const GetPrefixCls = ({
    suffixCls,
    customClass,
  }: {
    suffixCls: string;
    customClass?: string;
  }) => {
    const { getPrefixCls } = React.useContext(ConfigContext);
    return <>{getPrefixCls(suffixCls, customClass)}</>;
  };

  it('should call default function', () => {
    const wrapper = mount(<GetPrefixCls suffixCls="test" />);
    expect(wrapper.text()).toBe('piatto-test');
    wrapper.setProps({ customClass: 'custom-cls-test' });
    expect(wrapper.text()).toBe('custom-cls-test');
  });

  it('should call custom function', () => {
    const getPrefixCls = (suffixCls: string) => `${suffixCls}-custom-function-return`;
    const wrapper = mount(
      <ConfigProvider value={{ getPrefixCls }}>
        <GetPrefixCls suffixCls="piatto" />
      </ConfigProvider>,
    );
    expect(wrapper.text()).toBe('piatto-custom-function-return');
  });
});
