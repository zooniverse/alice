import { shallow } from 'enzyme'
import React from 'react'
import DBScan from './DBScan'

describe('Component > DBScan', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<DBScan />);
    expect(wrapper).toBeDefined()
  })
})
