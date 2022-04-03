import { shallow } from 'enzyme'
import React from 'react'
import { Text } from 'grommet'
import ThumbnailBorder, { StyledBox } from './ThumbnailBorder'

describe('Component > FilmstripViewer', function () {
  let wrapper

  beforeEach(function() {
    wrapper = shallow(<ThumbnailBorder />)
  })

  it('renders without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should not show rotation degrees when none are available', function() {
    const degrees = wrapper.find(Text).length
    expect(degrees).toBe(0)
  })

  it('should show rotation degrees when available', function() {
    wrapper = shallow(<ThumbnailBorder rotationDegrees={90} />)
    const degrees = wrapper.find(Text).length
    expect(degrees).toBe(1)
  })

  describe('when hovered', function () {
    it('should set the correct border', function () {
      wrapper = shallow(<ThumbnailBorder isHover />)
      const box = wrapper.find(StyledBox).first()
      expect(box.props().border.size).toBe('medium')
    })
  })

  describe('when active', function () {
    it('should set the correct border', function () {
      wrapper = shallow(<ThumbnailBorder isActive />)
      const box = wrapper.find(StyledBox).first()
      expect(box.props().border.size).toBe('large')
    })
  })
})
