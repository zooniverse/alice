import { shallow } from 'enzyme'
import React from 'react'
import SaveStatusContainer from './SaveStatusContainer'

describe('Component > SaveStatusContainer', function () {
  let wrapper

  beforeEach(function() {
    wrapper = shallow(<SaveStatusContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
