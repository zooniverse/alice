import { shallow } from 'enzyme'
import React from 'react'
import Setup from './Setup'

describe('Component > Setup', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<Setup />);
    expect(wrapper).toBeDefined()
  })
})
