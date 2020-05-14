import { shallow } from 'enzyme'
import React from 'react'
import GettingStarted from './GettingStarted'

describe('Component > GettingStarted', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<GettingStarted />);
    expect(wrapper).toBeDefined()
  })
})
