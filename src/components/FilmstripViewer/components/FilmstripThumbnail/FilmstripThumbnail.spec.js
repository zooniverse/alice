import { shallow } from 'enzyme'
import React from 'react'
import FilmstripThumbnail from './FilmstripThumbnail'

let wrapper;

describe('Component > FilmstripViewer', function () {
  beforeEach(function() {
    wrapper = shallow(<FilmstripThumbnail src={'www.testlocation.com'}/>)
  })

  it('renders without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
