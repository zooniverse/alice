import { shallow } from 'enzyme'
import React from 'react'
import FilmstripThumbnail, { StyledButton } from './FilmstripThumbnail'

const preventDefaultSpy = jest.fn()
const rearrangePagesSpy = jest.fn()
const setHoveredIndexSpy = jest.fn()
const setSlopeValues = jest.fn()
const selectImage = jest.fn()
const setStateSpy = jest.fn()
const slopeValues = ['frame0', 'frame1', 'frame2']
const stopPropagationSpy = jest.fn()
const mockEvent = { preventDefault: preventDefaultSpy, stopPropagation: stopPropagationSpy }

let button
let wrapper

describe('Component > FilmstripViewer', function () {
  beforeEach(function() {
    jest
      .spyOn(React, 'useState')
      .mockImplementation((init) => [init, setStateSpy])
    wrapper = shallow(
      <FilmstripThumbnail
        rearrangePages={rearrangePagesSpy}
        setSlopeValues={setSlopeValues}
        slopeValues={slopeValues}
        setHoveredIndex={setHoveredIndexSpy}
        selectImage={selectImage}
        src={'www.testlocation.com'}
      />)
      button = wrapper.find(StyledButton).first()
  })

  afterEach(() => jest.clearAllMocks());

  it('renders without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('calls the selectImage prop on click', function() {
    button.simulate('click')
    expect(selectImage).toHaveBeenCalled()
  })

  it('changes the isHover state on blur', function() {
    button.simulate('blur')
    expect(setStateSpy).toHaveBeenCalledWith(false)
  })

  it('changes the isHover state on mouse leave', function() {
    button.simulate('mouseleave')
    expect(setStateSpy).toHaveBeenCalledWith(false)
  })

  it('changes the isHover state on mouse enter', function() {
    button.simulate('mouseenter')
    expect(setStateSpy).toHaveBeenCalledWith(true)
  })

  it('changes the isHover state on focus', function() {
    button.simulate('focus')
    expect(setStateSpy).toHaveBeenCalledWith(true)
  })

  it('should perform a drag end', function () {
    button.simulate('dragend')
    expect(setHoveredIndexSpy).toHaveBeenCalledWith(null)
    expect(rearrangePagesSpy).toHaveBeenCalled()
  })

  it('should perform a drag enter', function () {
    button.simulate('dragenter', mockEvent)
    expect(setHoveredIndexSpy).toHaveBeenCalledWith(0)
    expect(setSlopeValues).toHaveBeenCalled()
  })

  it('should perform a drag over', function () {
    button.simulate('dragover', mockEvent)
    expect(preventDefaultSpy).toHaveBeenCalled()
    expect(stopPropagationSpy).toHaveBeenCalled()
  })

  it('should perform a drag start', function () {
    button.simulate('dragstart')
    expect(setHoveredIndexSpy).toHaveBeenCalledWith(0)
  })
})
