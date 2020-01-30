import { shallow } from 'enzyme'
import React from 'react'
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

  describe('extract line right to left', function () {
    it('should render', function () {
      wrapper = shallow(<SVGLines isExtract lines={rightToLeftLines} />);
      expect(wrapper.find('circle').length).toBe(2)
      expect(wrapper.find('line').length).toBe(1)
    })
  })
})
