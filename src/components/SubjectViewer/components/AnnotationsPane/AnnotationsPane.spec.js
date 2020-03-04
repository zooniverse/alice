import { shallow } from 'enzyme'
import React from 'react'
import AnnotationsPane from './AnnotationsPane'
import SVGLines from './SVGLines'

let wrapper

const lines = [
  { x1: 0, x2: 0, y1: 10, y2: 10 },
  { x1: 0, x2: 0, y1: 0, y2: 10 }
]
const onLineClickSpy = jest.fn()

describe('Component > AnnotationsPane', function () {
  beforeEach(function() {
    wrapper = shallow(
      <AnnotationsPane
        extractLines={lines}
        reductionLines={lines}
        onLineClick={onLineClickSpy}
      />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should render the correct lines', function () {
    expect(wrapper.find(SVGLines).length).toBe(4)
  })

  it('should call the onLineClick function', function () {
    const reductionLines = wrapper.find(SVGLines).last()
    reductionLines.props().onLineClick()
    expect(onLineClickSpy).toHaveBeenCalled()
  })

  describe('without lines visible', function () {
    it('should not return lines', function () {
      wrapper = shallow(
        <AnnotationsPane
          linesVisible={false}
          reductionLines={lines}
        />)
      expect(wrapper.find(SVGLines).length).toBe(0)
    })
  })
})
