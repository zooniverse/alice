import { shallow } from 'enzyme'
import React from 'react'
import UnapproveModalContainer from './UnapproveModalContainer'

let wrapper
let toggleModalSpy = jest.fn()
const contextValues = {
  modal: {
    toggleModal: toggleModalSpy,
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
})
