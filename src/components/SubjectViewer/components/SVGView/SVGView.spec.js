import { shallow } from 'enzyme'
import React from 'react'
import SVGView, { G } from './SVGView'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

const rect = {
  height: 100,
  width: 100
}

const refValue = {
  current: {
    getBoundingClientRect: () => rect
  }
}

describe('Component > SVGView', function () {
  it('should disable interaction', function () {
    const wrapper = shallow(<SVGView disabled />);
    const Group = wrapper.find(G).first()
    const group = renderer.create(Group).toJSON()
    expect(group).toHaveStyleRule('cursor', 'default', {
      modifier: ':hover'
    })
  })

  it('should enable interaction', function () {
    const wrapper = shallow(<SVGView disabled={false} />);
    const Group = wrapper.find(G).first()
    const group = renderer.create(Group).toJSON()
    expect(group).toHaveStyleRule('cursor', 'move', {
      modifier: ':hover'
    })
  })

  it('should render without crashing', function () {
    jest
      .spyOn(React, 'useRef')
      .mockImplementation(() => refValue)
    const wrapper = shallow(<SVGView />);
    expect(wrapper).toBeDefined()
  })
})
