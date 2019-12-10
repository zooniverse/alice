import { shallow } from 'enzyme'
import React from 'react'
import AnnotationsPane from './AnnotationsPane'

let wrapper
const lines = [
  [{ x: 0, y: 0 }, { x: 10, y: 0 }],
  [{ x: 0, y: 0 }, { x: 0, y: 10 }]
]

describe('Component > AnnotationsPane', function () {
  beforeEach(function() {
    wrapper = shallow(<AnnotationsPane lines={lines} />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should render the correct lines', function () {
    const circles = wrapper.find('circle')
    const lines = wrapper.find('line')
    expect(circles.length).toBe(4)
    expect(lines.length).toBe(2)
  })
})
