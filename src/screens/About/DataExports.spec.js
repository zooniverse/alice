import { shallow } from 'enzyme'
import React from 'react'
import DataExports from './DataExports'

describe('Component > DataExports', function () {
  it('should render without crashing', function () {
    const wrapper = shallow(<DataExports />);
    expect(wrapper).toBeDefined()
  })
})
