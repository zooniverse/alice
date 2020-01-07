import { shallow } from 'enzyme'
import React from 'react'
import MODALS from 'helpers/modals'
import MarkApprovedContainer from './MarkApprovedContainer'

let wrapper
const toggleModalSpy = jest.fn()
const updateApprovalSpy = jest.fn()
const contextValues = {
  modal: {
    toggleModal: toggleModalSpy
  },
  projects: {
    isOwner: false
  },
  transcriptions: {
    approved: true,
    readyForReview: false
  }
}

describe('Component > MarkApprovedContainer', function () {
  beforeEach(function() {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    wrapper = shallow(<MarkApprovedContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call the toggleModal method with child onClick', function() {
    wrapper.props().onChange()
    expect(toggleModalSpy).toHaveBeenCalledWith(MODALS.UNAPPROVED)
  })

  it('should updateApproval if the box is not checked', function() {
    const updatedContext = Object.assign({}, contextValues)
    updatedContext.projects.isOwner = false
    updatedContext.transcriptions.approved = false
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => updatedContext )
    wrapper = shallow(<MarkApprovedContainer />);
    wrapper.props().onChange()
    expect(updateApprovalSpy).toHaveBeenCalledWith(false)
  })
})
