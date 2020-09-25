import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import Input from '../../src/input';
import mountTest from '../shared/mountTest';

const { GetCode: GetCodeInput } = Input;

describe('Input Get Code', () => {
  mountTest(GetCodeInput);

  it('should support custom button text', () => {
    const wrapper = mount(<GetCodeInput buttonText="点击获取验证码" />);
    expect(wrapper.find('button').text()).toBe('点击获取验证码');
  });

  it('should support disable', () => {
    const onClickMock = jest.fn();
    const wrapper = mount(<GetCodeInput buttonDisabled onGetCode={onClickMock} />);
    wrapper.find('button').simulate('click');
    expect(onClickMock).not.toHaveBeenCalled();
  });

  it('should support Promise Function', async () => {
    const onClickMock = jest.fn().mockImplementation(() => Promise.resolve());
    const wrapper = mount(<GetCodeInput onGetCode={onClickMock} />);
    await act(async () => {
      await wrapper.find('button').simulate('click');
    });
    expect(onClickMock).toHaveBeenCalled();
  });
  // Todo: how to test count down
});
