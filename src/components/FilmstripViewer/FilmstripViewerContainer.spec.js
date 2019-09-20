import { shallow } from 'enzyme'
import React from 'react'
import FilmstripViewerContainer from './FilmstripViewerContainer'

let wrapper

describe('Component > FilmstripViewerContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<FilmstripViewerContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
