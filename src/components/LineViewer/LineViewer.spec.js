import { mount, shallow } from 'enzyme'
import * as React from 'react';
import { Button, CheckBox, Text, TextInput } from 'grommet'
import DeleteModal from './components/DeleteModal'
import { LineViewer } from './LineViewer'

const setConsensusTextSpy = jest.fn()
const setInputTextSpy = jest.fn()
const setItemSpy = jest.fn()
const transcriptionOptions = [
  {
    date: '',
    goldStandard: false,
    user: 'A_User',
    text: 'Testing'
  }
]
const reduction = {
  consensus_score: 0,
  consensus_text: 'Consensus Text',
  number_views: 0,
  setConsensusText: setConsensusTextSpy
}

jest
  .spyOn(React, 'useRef')
  .mockImplementation(() => { return { current: { value: 'Input Field' } }})

let wrapper = shallow(
  <LineViewer
    algorithmChoice={transcriptionOptions.length}
    consensusText='Original Consensus Text'
    inputText='Input Field'
    reduction={reduction}
    setInputText={setInputTextSpy}
    setItem={setItemSpy}
    transcriptionOptions={transcriptionOptions}
    typedChoice={transcriptionOptions.length + 1}
  />
)

describe('Component > LineViewer', function () {
  afterEach(() => jest.clearAllMocks());

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should handle algorithm selection', function () {
    const algorithmBox = wrapper.find(CheckBox).first()
    algorithmBox.props().onChange()
    expect(setItemSpy).toHaveBeenCalledWith(1)
  })

  it('should handle algorithm deselection', function () {
    wrapper.setProps({ selectedItem: 1 })
    const algorithmBox = wrapper.find(CheckBox).first()
    algorithmBox.props().onChange()
    expect(setItemSpy).toHaveBeenCalledWith(null)
  })

  it('should handle typed input selection', function () {
    const typedInputBox = wrapper.find(CheckBox).last()
    typedInputBox.props().onChange()
    expect(setItemSpy).toHaveBeenCalledWith(2)
  })

  it('should handle typed input deselection', function () {
    wrapper.setProps({ selectedItem: 2 })
    const typedInputBox = wrapper.find(CheckBox).last()
    typedInputBox.props().onChange()
    expect(setItemSpy).toHaveBeenCalledWith(null)
  })

  it('should show when a line has been edited', function () {
    const newReduction = Object.assign({}, reduction)
    newReduction.edited_consensus_text = 'Edited Consensus Text'
    const newWrapper = shallow(
      <LineViewer
        consensusText='Original Consensus Text'
        reduction={newReduction}
        setItem={setItemSpy}
        transcriptionOptions={transcriptionOptions}
      />
    )
    const textBox = newWrapper.find(Text).at(1)
    expect(textBox.props().children).toBe('Edited')
  })

  describe('with keyup event', function () {
    const map = {}
    const closeModalSpy = jest.fn()

    beforeEach(function () {
      window.addEventListener = jest.fn((evt, cb) => map[evt] = cb);
      mount(<LineViewer closeModal={closeModalSpy} />)
    })

    describe('and the escape key', function () {
      it('should close the modal', function () {
        map.keyup({ keyCode: 27 })
        expect(closeModalSpy).toHaveBeenCalled()
      })
    })

    describe('and not the escape key', function () {
      it('should not close the modal', function () {
        map.keyup({ keyCode: 20 })
        expect(closeModalSpy).not.toHaveBeenCalled()
      })
    })
  })

  describe('function replaceWithSelected', function () {
    it('should replace with a transcription', function () {
      wrapper.setProps({ selectedItem: 0 })
      wrapper.find(Button).at(2).props().onClick()
      expect(setConsensusTextSpy).toHaveBeenCalledWith('Testing', false, 'A_User')
    })

    it('should replace with a typed transcription', function () {
      wrapper.setProps({ selectedItem: 2 })
      wrapper.find(Button).at(2).props().onClick()
      expect(setConsensusTextSpy).toHaveBeenCalledWith('Input Field', false, '')
    })

    it('should replace with the algorithm', function () {
      wrapper.setProps({ selectedItem: 1 })
      wrapper.find(Button).at(2).props().onClick()
      expect(setConsensusTextSpy).toHaveBeenCalledWith(reduction.consensus_text, true, '')
    })
  })

  describe('text input box', function () {
    it('should be selected on text input', function () {
      const textInput = wrapper.find(TextInput).first()
      textInput.simulate('change', { target: { value: 'Hello' } })
      expect(setInputTextSpy).toHaveBeenCalledWith('Hello')
      expect(setItemSpy).toHaveBeenCalledWith(transcriptionOptions.length + 1)
    })

    it('should unselect on text deletion', function () {
      const textInput = wrapper.find(TextInput).first()
      textInput.simulate('change', { target: { value: 'Hello' } })
      textInput.simulate('change', { target: { value: '' } })
      expect(setItemSpy).toHaveBeenCalledWith(null)
    })

    it('should not select self if already selected', function () {
      wrapper.setProps({ selectedItem: transcriptionOptions.length + 1 })
      const textInput = wrapper.find(TextInput).first()
      textInput.simulate('change', { target: { value: 'Hello' } })
      expect(setItemSpy).not.toHaveBeenCalled()
    })
  })

  describe('with showDeleteModal true', function () {
    it('should show the DeleteModal', function () {
      wrapper = shallow(<LineViewer showDeleteModal />)
      const modal = wrapper.find(DeleteModal).first()
      expect(modal.length).toBe(1)
    })
  })
})
