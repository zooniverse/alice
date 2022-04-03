import { shallow } from 'enzyme'
import React from 'react'
import FlagButtonContainer from './FlagButtonContainer'

describe('Component > FlagButtonContainer', function () {
  let wrapper
  const toggleCurrentFlagSpy = jest.fn()
  const reduction = {
    toggleCurrentFlag: toggleCurrentFlagSpy
  }

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
