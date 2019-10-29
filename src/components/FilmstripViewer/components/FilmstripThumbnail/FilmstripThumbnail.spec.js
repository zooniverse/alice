import { shallow } from 'enzyme'
import React from 'react'
import { Button } from 'grommet'
import FilmstripThumbnail from './FilmstripThumbnail'
import ThumbnailBorder from './ThumbnailBorder'

let selectImage
let wrapper

describe('Component > FilmstripViewer', function () {
  beforeEach(function() {
    selectImage = jest.fn()
    wrapper = shallow(
      <FilmstripThumbnail
        selectImage={selectImage}
        src={'www.testlocation.com'}
      />)
  })

  it('renders without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('calls the selectImage prop on click', function() {
    const button = wrapper.find(Button).first()
    button.simulate('click')
    expect(selectImage).toHaveBeenCalled()
  })

  it('should not render a border when not active', function() {
    const border = wrapper.find(ThumbnailBorder)
    expect(border.length).toBe(0)
  })

  describe('when isActive set to true', function() {
    it('should render a border around the subejct', function() {
      wrapper = shallow(
        <FilmstripThumbnail
          isActive
          src={'www.testlocation.com'}
        />)
      const border = wrapper.find(ThumbnailBorder)
      expect(border.length).toBe(1)
    })
  })
})
