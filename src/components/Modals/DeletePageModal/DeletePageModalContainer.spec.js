import { shallow } from 'enzyme'
import React from 'react'
import DeletePageModalContainer from './DeletePageModalContainer'

describe('Component > DeletePageModalContainer', function () {
  let wrapper
  const deletePageSpy = jest.fn()
  const toggleModalSpy = jest.fn()
  const contextValues = {
    modal: {
      toggleModal: toggleModalSpy
    },
    transcriptions: {
      deletePage: deletePageSpy
    }
  }

  beforeEach(function () {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    wrapper = shallow(<DeletePageModalContainer />);
  })

  afterEach(() => jest.clearAllMocks());

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call toggleModal on child onClose', function () {
    wrapper.props().onClose()
    expect(toggleModalSpy).toHaveBeenCalledWith('')
  })

  it('should call deletePage when delete clicked', function () {
    wrapper.props().onDelete()
    expect(deletePageSpy).toHaveBeenCalled()
    expect(toggleModalSpy).toHaveBeenCalledWith('')
  })
})
