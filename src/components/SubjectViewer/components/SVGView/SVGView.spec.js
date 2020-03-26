import { shallow } from 'enzyme'
import React from 'react'
import SVGView from './SVGView'
import 'jest-styled-components'

const ref = React.createRef()
ref.current = { getBoundingClientRect: () => {
  return {
    height: 100,
    width: 100
  }
} }

describe('Component > SVGView', function () {
  it('should disable interaction', function () {
    console.log('LETS TEST THIS');
    const wrapper = shallow(<SVGView disabled url='www.test.com' />);
    expect(wrapper).toEqual({})
  })

  it('should render without crashing', function () {
    console.log('rendered');
    const wrapper = shallow(<SVGView disabled={false} ref={ref} url='www.test.com' />);
    expect(wrapper).toBeDefined()
  })
})
