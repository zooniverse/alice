import { shallow } from 'enzyme'
import React from 'react'
import FilmstripThumbnail from './FilmstripThumbnail'
import { Text } from 'grommet'

let wrapper;

describe('Component > FilmstripViewer', function () {
  beforeEach(function() {
    wrapper = shallow(<FilmstripThumbnail src={'www.testlocation.com'}/>)
  })

  it('renders without crashing', function () {})

  it('renders a border with rotation', function () {
    wrapper.setProps({ rotationDegrees: 90 })
    const degreePresence = wrapper.find(Text).first().render().text()
    expect(degreePresence).toContain(90)
  })
})
