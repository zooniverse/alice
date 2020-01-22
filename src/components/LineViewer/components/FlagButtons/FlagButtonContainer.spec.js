import { shallow } from 'enzyme'
import React from 'react'
import FlagButtonContainer from './FlagButtonContainer'

let wrapper
const toggleCurrentFlagSpy = jest.fn()
const reduction = {
  toggleCurrentFlag: toggleCurrentFlagSpy
}

describe('Component > FlagButtonContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<FlagButtonContainer reduction={reduction} />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should set seen from the child component', function () {
    wrapper.props().setFlag()
    expect(toggleCurrentFlagSpy).toHaveBeenCalled()
  })
})
