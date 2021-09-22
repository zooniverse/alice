import { shallow } from 'enzyme'
import * as React from 'react';
import UnapproveModalContainer from './UnapproveModalContainer'

let wrapper
let toggleModalSpy = jest.fn()
let updateApprovalSpy = jest.fn()
const contextValues = {
  modal: {
    toggleModal: toggleModalSpy,
  },
  projects: {
    role: 'Researcher'
  },
  transcriptions: {
    updateApproval: updateApprovalSpy
  }
}

describe('Component > UnapproveModalContainer', function () {
  beforeAll(function () {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    wrapper = shallow(<UnapproveModalContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call toggleModal with child onClose prop', function () {
    wrapper.props().onClose()
    expect(toggleModalSpy).toHaveBeenCalledWith('')
  })

  it('should call updateApproval with child onUnapprove prop', function () {
    wrapper.props().onUnapprove()
    expect(updateApprovalSpy).toHaveBeenCalledWith(true)
    expect(toggleModalSpy).toHaveBeenCalledWith('')
  })
})
