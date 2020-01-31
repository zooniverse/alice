import { shallow } from 'enzyme'
import React from 'react'
import SearchModalContainer from './SearchModalContainer'

let wrapper;
const searchTranscriptionsSpy = jest.fn()
const toggleModalSpy = jest.fn()
const contextValues = {
  modal: {
    toggleModal: toggleModalSpy
  },
  search: {
    searchTranscriptions: searchTranscriptionsSpy
  }
}

describe('Component > SearchModalContainer', function () {
  beforeEach(function() {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation((context) => contextValues)
    wrapper = shallow(<SearchModalContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should trigger the onClose prop', function () {
    wrapper.props().onClose()
    expect(toggleModalSpy).toHaveBeenCalled()
  })

  it('should trigger the onSubmit prop', function () {
    wrapper.props().onSubmit()
    expect(searchTranscriptionsSpy).toHaveBeenCalled()
  })
})
