import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import SVGLines, { G } from './SVGLines'

let wrapper

const lines = [
  { x1: 0, x2: 0, y1: 100, y2: 100, slope: 0 },
  { x1: 0, x2: 0, y1: 200, y2: 200, slope: 0 },
  { x1: 0, x2: 0, y1: 300, y2: 300, slope: 90 },
  { x1: 0, x2: 0, y1: 400, y2: 400, slope: 90 }
]

const rightToLeftLines = [
  { x1: 0, x2: 100, y1: 100, y2: 100, slope: 0 }
]

describe('Component > SVGLines', function () {
  beforeEach(function() {
    wrapper = shallow(<SVGLines activeSlope={90} lines={lines} />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should render clickable lines', function () {
    const tree = renderer.create(wrapper).toJSON()
    expect(tree).toHaveStyleRule('cursor', 'pointer')
  })

  it('only displays lines that match the activeSlope', function () {
    const lines = wrapper.find('g')
    expect(lines.length).toBe(2)
  })

  describe('extract line right to left', function () {
    it('should render', function () {
      wrapper = shallow(<SVGLines isExtract lines={rightToLeftLines} />);
      expect(wrapper.find('circle').length).toBe(2)
      // two lines to account for underlying transparent line that increases click area
      expect(wrapper.find('line').length).toBe(2)
    })
  })

  describe('extract lines', function () {
    it('should not render clickable lines', function () {
      wrapper = shallow(
        <SVGLines
          activeTranscriptionIndex={0}
          lines={lines}
          isExtract
          reductionIndex={0}
        />);
      const tree = renderer.create(wrapper).toJSON()
      expect(tree).toHaveStyleRule('cursor', 'inherit')
    })
  })

  describe('when inactive', function () {
    it('should hide the lines', function () {
      wrapper = shallow(
        <SVGLines
          activeTranscriptionIndex={0}
          lines={lines}
          reductionIndex={1}
        />);
      expect(wrapper).toEqual({})
    })
  })

  describe('onLineClick', function () {
    const onLineClickSpy = jest.fn()

    afterEach(() => jest.clearAllMocks());

    it('should trigger by default', function () {
      wrapper = shallow(<SVGLines onLineClick={onLineClickSpy} />)
      wrapper.find(G).first().props().onClick()
      expect(onLineClickSpy).toHaveBeenCalled()
    })

    it('should not trigger with approved transcription', function () {
      wrapper = shallow(<SVGLines isApproved onLineClick={onLineClickSpy} />)
      wrapper.find(G).first().props().onClick()
      expect(onLineClickSpy).not.toHaveBeenCalled()
    })
  })
})
