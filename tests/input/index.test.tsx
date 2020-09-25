import React from 'react';
import { mount } from 'enzyme';
import Input from '../../src/input';
import { Form, FormItem } from '../../src/form';
import mountTest from '../shared/mountTest';

describe('Input', () => {
  mountTest(Input);

  it('should support input', () => {
    const wrapper = mount(<Input />);
    wrapper.find('input').simulate('change', { target: { value: '123' } });
    expect(wrapper.find('input').getDOMNode().getAttribute('value')).toBe('123');
    wrapper.find('input').simulate('change', { target: { value: '321' } });
    expect(wrapper.find('input').getDOMNode().getAttribute('value')).toBe('321');
  });

  it('should support max length', () => {
    const wrapper = mount(<Input maxLength={5} />);
    expect(wrapper.find('input').getDOMNode()).toMatchSnapshot();
  });

  it('should support focus', () => {
    const wrapper = mount(<Input />);
    wrapper.find('input').simulate('focus');
    expect(wrapper.find('.piatto-input-focus').length).toBe(1);
    wrapper.find('input').simulate('blur');
    expect(wrapper.find('.piatto-input-focus').length).toBe(0);
  });

  it('should support default value', () => {
    const wrapper = mount(<Input defaultValue="123" />);
    expect(wrapper.find('input').getDOMNode().getAttribute('value')).toBe('123');
  });

  it('should not show clear icon if default value is empty', () => {
    const wrapper = mount(<Input defaultValue="" />);
    expect(wrapper.find('.piatto-input-clear-icon').length).toBe(0);
  });

  it('should allow clear icon', () => {
    const wrapper = mount(<Input defaultValue="321" allowClear />);
    wrapper.find('.piatto-input-clear-icon').simulate('click');
    expect(wrapper.find('input').getDOMNode().getAttribute('value')).toBe('');
  });

  it('should support value be controlled', () => {
    const wrapper = mount(
      <Form>
        <FormItem name="user">
          <Input />
        </FormItem>
      </Form>,
    );
    wrapper.find('input').simulate('change', { target: { value: '123' } });
    expect(wrapper.find('input').prop('value')).toBe('123');
  });

  it('should call onChange', () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(<Input onChange={onChangeMock} />);
    wrapper.find('input').simulate('change', { target: { value: '1234' } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(wrapper.find('input').getDOMNode().getAttribute('value')).toBe('1234');
  });
});
