import { shallow } from 'enzyme'
import React from 'react'
import SVGView from './SVGView'
import 'jest-styled-components'

describe('Component > SVGView', function () {
  const ref = React.createRef()
  ref.current = { getBoundingClientRect: () => {
    return {
      height: 100,
      width: 100
    }
  } }

  const setTranslateSpy = jest.fn()
  const mockEvent = {
    preventDefault: () => {}
  }

  afterEach(() => jest.clearAllMocks());

  describe('when disabled', function () {
    it('should disable interaction', function () {
      const wrapper = shallow(<SVGView disabled ref={ref} url='www.test.com' />);
      expect(wrapper).toEqual({})
    })

    it('should render without crashing', function () {
      const wrapper = shallow(<SVGView disabled={false} ref={ref} url='www.test.com' />);
      expect(wrapper).toBeDefined()
    })
  })

  describe('without a url', function () {
    it('should render an empty component', function () {
      const wrapper = shallow(<SVGView disabled={false} ref={ref} url='' />);
      expect(wrapper).toEqual({})
    })
  })

  describe('without a ref', function () {
    it('should render an empty component', function () {
      const wrapper = shallow(<SVGView disabled={false} url='' />);
      expect(wrapper).toEqual({})
    })
  })

  describe('Functions > SVGView', function () {
    const initialPos = {
      clientX: 0,
      clientY: 0,
      preventDefault: () => {}
    }
    const movePos = {
      clientX: 10,
      clientY: 10,
      preventDefault: () => {}
    }

    let wrapper
    let setStateSpy = jest.fn()

    beforeEach(function () {
      wrapper = shallow(
        <SVGView
          disabled={false}
          image={{
            scale: 0.5,
            setTranslate: setTranslateSpy
          }}
          ref={ref}
          url='www.test.com'
        />);
    })

    describe('onMouseMove', function () {
      describe('after onMouseDown', function () {
        it('should move the svg', function () {
          wrapper.props().onMouseDown(initialPos)
          wrapper.props().onMouseMove(movePos)
          expect(setTranslateSpy).toHaveBeenCalledWith({
            x: 20,
            y: 20
          })
        })
      })

      describe('without onMouseDown', function () {
        it('should not move the SVG', function () {
          wrapper.props().onMouseMove(movePos)
          expect(setTranslateSpy).not.toHaveBeenCalled()
        })
      })

      describe('after onMouseLeave', function () {
        it('should not move the svg', function () {
          wrapper.props().onMouseDown(initialPos)
          wrapper.props().onMouseLeave(mockEvent)
          wrapper.props().onMouseMove(movePos)
          expect(setTranslateSpy).not.toHaveBeenCalled()
        })
      })

      describe('after onMouseUp', function () {
        it('should not move the svg', function () {
          wrapper.props().onMouseDown(initialPos)
          wrapper.props().onMouseUp(mockEvent)
          wrapper.props().onMouseMove(movePos)
          expect(setTranslateSpy).not.toHaveBeenCalled()
        })
      })
    })
  })
})
