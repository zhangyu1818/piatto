// copy form https://github.com/ant-design/ant-design/blob/master/tests/shared/mountTest.tsx

import React from 'react'
import { mount } from 'enzyme'

export default function mountTest(Component: React.ComponentType) {
  describe(`mount and unmount`, () => {
    it(`component could be updated and unmounted without errors`, () => {
      const wrapper = mount(<Component />)
      expect(() => {
        wrapper.setProps({})
        wrapper.unmount()
      }).not.toThrow()
    })
  })
}
