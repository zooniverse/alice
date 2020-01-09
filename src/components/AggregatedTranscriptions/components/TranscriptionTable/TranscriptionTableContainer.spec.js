import { shallow } from 'enzyme'
import React from 'react'
import TranscriptionTableContainer from './TranscriptionTableContainer'

let wrapper
const setActiveTranscriptionSpy = jest.fn()
const contextValues = {
  aggregations: {
    setActiveTranscription: setActiveTranscriptionSpy
  }
}

describe('Component > TranscriptionTableContainer', function () {
  beforeEach(function() {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    wrapper = shallow(<TranscriptionTableContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call the setActiveTranscription function', function () {
    wrapper.props().setActiveTranscription()
    expect(setActiveTranscriptionSpy).toHaveBeenCalled()
  })
})
