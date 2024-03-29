import { shallow } from 'enzyme'
import React from 'react'
import MODALS from 'helpers/modals'
import MarkApprovedContainer from './MarkApprovedContainer'

describe('Component > MarkApprovedContainer', function () {
  let wrapper
  const toggleModalSpy = jest.fn()
  const updateApprovalSpy = jest.fn()
  const contextValues = {
    modal: {
      toggleModal: toggleModalSpy
    },
    projects: {
      isAdmin: false
    },
    transcriptions: {
      approved: true,
      readyForReview: false,
      updateApproval: updateApprovalSpy
    }
  }

  beforeEach(function() {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    wrapper = shallow(<MarkApprovedContainer />);
  })

  afterEach(() => jest.clearAllMocks());

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call the updateApproval method with child onClick', function() {
    wrapper.props().onChange()
    expect(updateApprovalSpy).toHaveBeenCalled()
  })

  describe('as researcher with approved transcription', function () {
    it('should toggle off the approval', function () {
      const updatedContext = Object.assign({}, contextValues)
      updatedContext.projects.isAdmin = true
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => updatedContext )
      wrapper = shallow(<MarkApprovedContainer />);
      wrapper.props().onChange()
      expect(toggleModalSpy).toHaveBeenCalledWith(MODALS.UNAPPROVED)
    })
  })

  describe('as researcher with unapproved transcription', function () {
    it('should toggle off the approval', function () {
      const updatedContext = Object.assign({}, contextValues)
      updatedContext.projects.isAdmin = true
      updatedContext.transcriptions.approved = false
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => updatedContext )
      wrapper = shallow(<MarkApprovedContainer />);
      wrapper.props().onChange()
      expect(updateApprovalSpy).toHaveBeenCalledWith(false)
    })
  })
})
