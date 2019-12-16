import { shallow } from 'enzyme'
import React from 'react'
import TranscriptionTableContainer from './TranscriptionTableContainer'

let wrapper
const toggleTranscriptionSpy = jest.fn()
const contextValues = {
  aggregations: {
    toggleTranscription: toggleTranscriptionSpy
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

  it('should call the toggleTranscription function', function () {
    wrapper.props().toggleTranscription()
    expect(toggleTranscriptionSpy).toHaveBeenCalled()
  })
})
