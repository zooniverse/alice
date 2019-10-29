import { shallow } from 'enzyme'
import React from 'react'
import { Text } from 'grommet'
import ThumbnailBorder from './ThumbnailBorder'

let wrapper

describe('Component > FilmstripViewer', function () {
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
})
