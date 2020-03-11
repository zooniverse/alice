import { shallow } from 'enzyme'
import React from 'react'
import { Button } from 'grommet'
import FilmstripThumbnail from './FilmstripThumbnail'

const selectImage = jest.fn()
const setStateSpy = jest.fn()
let wrapper

describe('Component > FilmstripViewer', function () {
  beforeEach(function() {
    jest
      .spyOn(React, 'useState')
      .mockImplementation((init) => [init, setStateSpy])
    wrapper = shallow(
      <FilmstripThumbnail
        selectImage={selectImage}
        src={'www.testlocation.com'}
      />)
  })

  afterEach(() => jest.clearAllMocks());

  it('renders without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('calls the selectImage prop on click', function() {
    const button = wrapper.find(Button).first()
    button.simulate('click')
    expect(selectImage).toHaveBeenCalled()
  })

  it('changes the isHover state on blur', function() {
    const button = wrapper.find(Button).first()
    button.simulate('blur')
    expect(setStateSpy).toHaveBeenCalledWith(false)
  })

  it('changes the isHover state on mouse leave', function() {
    const button = wrapper.find(Button).first()
    button.simulate('mouseleave')
    expect(setStateSpy).toHaveBeenCalledWith(false)
  })

  it('changes the isHover state on mouse enter', function() {
    const button = wrapper.find(Button).first()
    button.simulate('mouseenter')
    expect(setStateSpy).toHaveBeenCalledWith(true)
  })

  it('changes the isHover state on focus', function() {
    const button = wrapper.find(Button).first()
    button.simulate('focus')
    expect(setStateSpy).toHaveBeenCalledWith(true)
  })
})
