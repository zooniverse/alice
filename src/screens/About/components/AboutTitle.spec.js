import { shallow } from 'enzyme'
import React from 'react'
import AboutTitle from './AboutTitle'

describe('Component > AboutTitle', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<AboutTitle />);
    expect(wrapper).toBeDefined()
  })
})
