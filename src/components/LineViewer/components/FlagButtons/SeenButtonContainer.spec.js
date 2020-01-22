import { shallow } from 'enzyme'
import React from 'react'
import SeenButtonContainer from './SeenButtonContainer'

let wrapper
const toggleCurrentSeenSpy = jest.fn()
const reduction = {
  toggleCurrentSeen: toggleCurrentSeenSpy
}

describe('Component > SeenButtonContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<SeenButtonContainer reduction={reduction} />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should set the flag on the child component', function () {
    wrapper.props().setFlag()
    expect(toggleCurrentSeenSpy).toHaveBeenCalled()
  })
})
