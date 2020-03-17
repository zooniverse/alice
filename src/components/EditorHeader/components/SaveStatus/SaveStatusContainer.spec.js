import { shallow } from 'enzyme'
import React from 'react'
import SaveStatusContainer from './SaveStatusContainer'

let wrapper

describe('Component > SaveStatusContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<SaveStatusContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
