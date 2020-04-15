import { shallow } from 'enzyme'
import React from 'react'
import Optics from './Optics'

describe('Component > Optics', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Optics />);
    expect(wrapper).toBeDefined()
  })
})
