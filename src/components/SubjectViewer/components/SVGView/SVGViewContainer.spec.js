import { mount } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils'
import ASYNC_STATES from 'helpers/asyncStates'
import SVGViewContainer from './SVGViewContainer'
import SVGView from './SVGView'

describe('Component > SVGViewContainer', function () {
  let svg
  let wrapper
  const setScaleSpy = jest.fn()
  const setStateSpy = jest.fn()

  const contextValues = {
    editor: {
      linesVisible: true
    },
    image: {
      rotation: 0,
      scale: 1,
      setScale: setScaleSpy,
      translateX: 0,
      translateY: 0
    },
    subjects: {
      asyncState: ASYNC_STATES.READY,
      current: {
        locations: [{
          image: 'www.test.com'
      }]
      },
    },
    transcriptions: {
      current: null,
      extracts: [],
      index: 0
    }
  }

  class ValidImage {
    constructor () {
      this.naturalHeight = 200
      this.naturalWidth = 100
    }
  }

  const image = new ValidImage()

  beforeEach(async function () {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues)
    jest
      .spyOn(React, 'useState')
      .mockImplementation((init) => [image, setStateSpy])
    wrapper = mount(<SVGViewContainer />);
    await act(async () => {
      image.onload()
      wrapper.update();
    });
    svg = wrapper.find(SVGView).first();
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should find the image source', function () {
    const src = contextValues.subjects.current.locations[0].image
    expect(svg.props().url).toBe(src)
  })

  it('should set the transform', function () {
    const transform = `scale(${contextValues.image.scale}) translate(${contextValues.image.translateX}, ${contextValues.image.translateY}) rotate(${contextValues.image.rotation})`
    expect(svg.props().transform).toBe(transform)
  })

  it('should set the image size', function () {
    expect(svg.props().height.naturalHeight).toBe(200)
    expect(svg.props().width.naturalWidth).toBe(100)
  })
})
