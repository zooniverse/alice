import { shallow } from 'enzyme'
import React from 'react'
import LineViewerContainer from './LineViewerContainer'

let wrapper

const setActiveTranscriptionSpy = jest.fn()
const currentTranscription = {
  text: new Map([
    ['frame0', [
      {
        clusters_text: [
          ['This, That'],
          ['text, text']
        ],
        gold_standard: [false, false]
      }
    ]]
  ])
}

const contextValues = {
  transcriptions: {
    activeTranscriptionIndex: 0,
    current: currentTranscription,
    index: 0,
    setActiveTranscription: setActiveTranscriptionSpy
  }
}

describe('Component > LineViewerContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<LineViewerContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  describe('useEffect hook', function () {
    it('should set the transcription options', function () {
      const setState = jest.fn()
      jest
        .spyOn(React, 'useState')
        .mockImplementation((val) => [val, setState])
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => contextValues )
      jest
        .spyOn(React, "useEffect")
        .mockImplementation(f => f());
      wrapper = shallow(<LineViewerContainer />);
      expect(setState).toHaveBeenCalled()
    })
  })

  describe('setItem function', function () {
    const setState = jest.fn()

    it('should set the correct item', function () {
      jest
        .spyOn(React, 'useState')
        .mockImplementation((val) => [val, setState])
      wrapper = shallow(<LineViewerContainer />);
      wrapper.props().setItem(1)
      expect(setState).toHaveBeenCalledWith(1)
    })
  })
})
