import { shallow } from 'enzyme'
import React from 'react'
import TranscriptionTableContainer from './TranscriptionTableContainer'

let wrapper
const setActiveTranscriptionSpy = jest.fn()
const contextValues = {
  subjects: {
    index: 0
  },
  transcriptions: {
    current: {
      text: new Map()
    },
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
