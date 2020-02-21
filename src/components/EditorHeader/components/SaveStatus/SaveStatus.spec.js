import { shallow } from 'enzyme'
import React from 'react'
import SaveStatus from './SaveStatus'

let wrapper

describe('Component > SaveStatus', function () {
  beforeEach(function() {
    wrapper = shallow(<SaveStatus />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
