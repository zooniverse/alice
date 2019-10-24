import { shallow } from 'enzyme'
import React from 'react'
import MarkApprovedContainer from './MarkApprovedContainer'

let wrapper
let useStateSpy
const setState = jest.fn()
const toggleModalSpy = jest.fn()
const contextValues = {
  modal: {
    toggleModal: toggleModalSpy
  }
}

describe('Component > MarkApprovedContainer', function () {
  beforeEach(function() {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [false, setState])
    wrapper = shallow(<MarkApprovedContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call the toggleModal method with child onClick', function() {
    wrapper.props().onChange()
    expect(toggleModalSpy).toHaveBeenCalledWith('unapproved')
    expect(setState).toHaveBeenCalled()
  })
})
