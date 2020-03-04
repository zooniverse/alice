import { mount, shallow } from 'enzyme'
import React from 'react'
import { Grommet } from 'grommet'
import LineViewerContainer from './LineViewerContainer'
import LineViewer from './LineViewer'

let wrapper

const setActiveTranscriptionSpy = jest.fn()
const currentTranscription = {
  text: new Map([
    ['frame0', [
      {
        consensus_score: 0,
        consensus_text: 'This text',
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
  projects: {
    isViewer: false
  },
  transcriptions: {
    activeTranscriptionIndex: 0,
    current: currentTranscription,
    index: 0,
    setActiveTranscription: setActiveTranscriptionSpy
  }
}

describe('Component > LineViewerContainer', function () {
  it('should render without crashing', function () {
    wrapper = shallow(<LineViewerContainer />);
    expect(wrapper).toBeDefined()
  })

  describe('useEffect hook', function () {
    it('should set the transcription options', function () {
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => contextValues )
      jest
        .spyOn(React, 'useEffect')
        .mockImplementation(f => f());
      wrapper = shallow(<LineViewerContainer />);
      expect(wrapper.props().transcriptionOptions.length).toBe(1)
    })
  })

  describe('localStore', function () {
    let lineViewer

    beforeEach(function () {
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => contextValues )
      jest
        .spyOn(React, 'useEffect')
        .mockImplementation(() => {});
      wrapper = mount(<LineViewerContainer />, {
        wrappingComponent: Grommet
      })
      lineViewer = wrapper.find(LineViewer).first()
    })

    it('should set the input text', function () {
      lineViewer.props().setInputText('Text')
      wrapper.update()
      expect(wrapper.find(LineViewer).first().props().inputText).toBe('Text')
    })

    it('should set the item', function () {
      lineViewer.props().setItem(1)
      wrapper.update()
      expect(wrapper.find(LineViewer).first().props().selectedItem).toBe(1)
    })

    it('should toggle the delete modal', function () {
      lineViewer.props().toggleDeleteModal()
      wrapper.update()
      expect(wrapper.find(LineViewer).first().props().showDeleteModal).toBe(true)
    })

    describe('when selecting a user annotation', function () {
      it('should clear the input text', function () {
        lineViewer.props().setInputText('Text')
        wrapper.update()
        wrapper.find(LineViewer).first().props().setItem(0)
        wrapper.update()
        expect(wrapper.find(LineViewer).first().props().inputText).toBe('')
      })
    })
  })
})
