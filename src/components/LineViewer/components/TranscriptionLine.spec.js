import { shallow } from 'enzyme'
import React from 'react'
import { CheckBox } from 'grommet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import TranscriptionLine, { ItalicText } from './TranscriptionLine'

let wrapper

const gsTranscription = { goldStandard: true }
const index = 0
const setItemSpy = jest.fn()

describe('Component > TranscriptionLine', function () {
  beforeEach(function() {
    wrapper = shallow(
      <TranscriptionLine
        index={index}
        setItem={setItemSpy}
      />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should setItem to the correct index', function () {
    wrapper.find(CheckBox).first().props().onChange()
    expect(setItemSpy).toHaveBeenCalledWith(index)
  })

  it('should deselect the item', function () {
    wrapper.setProps({ selectedItem: 0 })
    wrapper.find(CheckBox).first().props().onChange()
    expect(setItemSpy).toHaveBeenCalledWith(null)
  })

  describe('Gold standard transcriptions', function () {
    beforeEach(function() {
      wrapper = shallow(<TranscriptionLine transcription={gsTranscription} />)
    })

    it('should show a gold standard star', function () {
      const icon = wrapper.find(FontAwesomeIcon).first()
      expect(icon.props().color).toBe('gold')
      expect(icon.props().icon).toBe(faStar)
    })

    it('should show gold standard text', function () {
      const text = wrapper.find(ItalicText).last()
      expect(text.props().children).toBe('Gold Standard')
    })
  })
})
