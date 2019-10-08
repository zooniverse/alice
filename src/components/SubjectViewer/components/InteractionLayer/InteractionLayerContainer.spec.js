import { shallow } from 'enzyme'
import React from 'react'
import InteractionLayerContainer from './InteractionLayerContainer'

let wrapper
let setState
let useStateSpy
let interactionLayer

let mockEvent = {
  clientX: 0,
  clientY: 0
}

let mockPosition = {
  x: mockEvent.clientX,
  y: mockEvent.clientY
}

describe('Component > InteractionLayerContainer', function () {
  beforeEach(function() {
    setState = jest.fn()
    useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState])
    wrapper = shallow(<InteractionLayerContainer />);
    interactionLayer = wrapper.find('InteractionLayer').first()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  describe('onMouseDown function', function() {
    beforeEach(function() {
      interactionLayer.props().onMouseDown(mockEvent)
    })

    it('should change isMoving when mouse down', function() {
      expect(setState).toHaveBeenCalledWith(true)
    })

    it('should change currentPosition when mouse down', function() {
      expect(setState).toHaveBeenCalledWith(mockPosition)
    })
  })

  describe('onMouseMove function', function() {
    it('should not execute without mouseDown', function() {
      interactionLayer.props().onMouseMove(mockEvent)
      expect(setState).not.toHaveBeenCalled()
    })

    describe('when isMoving set to true', function() {
      let activeWrapper
      let activeInteractionLayer
      let setTranslateSpy = jest.fn()
      let useContextSpy

      beforeEach(function() {
        useStateSpy = jest.spyOn(React, 'useState')
        useContextSpy = jest.spyOn(React, 'useContext')
        useContextSpy.mockImplementation(context => {
          return {
            image: { setTranslate: setTranslateSpy }
          }
        })
        useStateSpy.mockImplementation((init) => [true, setState])
        activeWrapper = shallow(<InteractionLayerContainer />);
        activeInteractionLayer = activeWrapper.find('InteractionLayer').first()
        activeInteractionLayer.props().onMouseMove(mockEvent)
      })

      it('should call the setCurrentPosition function', function() {
        expect(setState).toHaveBeenCalledWith(mockPosition)
      })

      it('should call the setTranslate function from the image store', function() {
        expect(setTranslateSpy).toHaveBeenCalled()
      })
    })
  })

  describe('onMouseUp function', function() {
    it('should change isMoving to false', function() {
      interactionLayer.props().onMouseUp(mockEvent)
      expect(setState).toHaveBeenCalledWith(false)
    })
  })
})
