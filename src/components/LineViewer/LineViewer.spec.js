import { shallow } from 'enzyme'
import React from 'react'
import { Button, CheckBox, Text } from 'grommet'
import { LineViewer } from './LineViewer'

const setConsensusTextSpy = jest.fn()
const setItemSpy = jest.fn()
const transcriptionOptions = [
  {
    date: '',
    goldStandard: false,
    userName: 'Anonymous',
    text: 'Testing'
  }
]
const reduction = {
  consensus_score: 0,
  consensus_text: 'Consensus Text',
  number_views: 0,
  setConsensusText: setConsensusTextSpy
}

const wrapper = shallow(
  <LineViewer
    algorithmChoice={transcriptionOptions.length}
    inputText='Input Field'
    reduction={reduction}
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
        reduction={newReduction}
        setItem={setItemSpy}
        transcriptionOptions={transcriptionOptions}
      />
    )
    const textBox = newWrapper.find(Text).at(1)
    expect(textBox.props().children).toBe('Edited')
  })

  describe('function replaceWithSelected', function () {
    it('should replace with a transcription', function () {
      wrapper.setProps({ selectedItem: 0 })
      wrapper.find(Button).at(2).props().onClick()
      expect(setConsensusTextSpy).toHaveBeenCalledWith('Testing', false)
    })

    it('should replace with a typed transcription', function () {
      wrapper.setProps({ selectedItem: 2 })
      wrapper.find(Button).at(2).props().onClick()
      expect(setConsensusTextSpy).toHaveBeenCalledWith('Input Field', false)
    })

    it('should replace with the algorithm', function () {
      wrapper.setProps({ selectedItem: 1 })
      wrapper.find(Button).at(2).props().onClick()
      expect(setConsensusTextSpy).toHaveBeenCalledWith(reduction.consensus_text, true)
    })
  })
})
