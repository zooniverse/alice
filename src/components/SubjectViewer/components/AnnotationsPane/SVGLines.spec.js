import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import SVGLines from './SVGLines'

let wrapper

const lines = [
  { x1: 0, x2: 0, y1: 100, y2: 100 }
]

const rightToLeftLines = [
  { x1: 0, x2: 100, y1: 100, y2: 100 }
]

describe('Component > SVGLines', function () {
  beforeEach(function() {
    wrapper = shallow(<SVGLines lines={lines} />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should render clickable lines', function () {
    const tree = renderer.create(wrapper).toJSON()
    expect(tree).toHaveStyleRule('cursor', 'pointer')
  })

  describe('extract line right to left', function () {
    it('should render', function () {
      wrapper = shallow(<SVGLines isExtract lines={rightToLeftLines} />);
      expect(wrapper.find('circle').length).toBe(2)
      expect(wrapper.find('line').length).toBe(1)
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
})
