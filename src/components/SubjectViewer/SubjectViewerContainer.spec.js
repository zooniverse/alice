import { shallow } from 'enzyme'
import React from 'react'
import { Box } from 'grommet'
import SubjectViewerContainer from './SubjectViewerContainer'
import SubjectViewer from './SubjectViewer'
import ImageTools from './components/ImageTools'

let wrapper
const testContext = {
  aggregations: {
    showModal: false
  },
  subjects: {
    current: {
      locations: [{ image: 'www.fakelocation.com' }]
    },
    index: 0
  },
  image: {
    rotation: 0,
    scale: 1,
    translateX: 0,
    translateY: 0
  }
}

describe('Component > SubjectViewerContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<SubjectViewerContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should return an empty string without locations', function() {
    const viewer = wrapper.find(SubjectViewer).first()
    expect(viewer.props().src).toBe('')
  })

  describe('SubjectViewerContainer with showTools true', function() {
    beforeEach(function() {
      const useStateSpy = jest.spyOn(React, 'useState')
      useStateSpy.mockImplementation((init) => [true, jest.fn()])
      wrapper = shallow(<SubjectViewerContainer />)
    })

    it('should display ImageTools when state is set to true', function() {
      const tools = wrapper.find(ImageTools).length
      expect(tools).toBe(1)
    })
  })

  describe('SubjectViewerContainer with state context', function() {
    beforeEach(function() {
      jest.spyOn(React, 'useContext')
        .mockImplementation((context) => {  return testContext })
      wrapper = shallow(<SubjectViewerContainer />);
    })

    it('should return a src url when one exists', function() {
      const viewer = wrapper.find(SubjectViewer).first()
      expect(viewer.props().src).toBe('www.fakelocation.com')
    })
  })

  describe('SubjectViewerContainer mouse functions', function() {
    let setState

    beforeEach(function() {
      setState = jest.fn()
      const useStateSpy = jest.spyOn(React, 'useState')
      useStateSpy.mockImplementation((value) => [value, setState])
      wrapper = shallow(<SubjectViewerContainer />);
    })

    it('should set tools to true on mouse over', function() {
      const box = wrapper.find(Box).first()
      box.simulate('mouseover')
      expect(setState).toHaveBeenCalledWith(true)
    })

    it('should set tools to false on mouse leave', function() {
      const box = wrapper.find(Box).first()
      box.simulate('mouseleave')
      expect(setState).toHaveBeenCalledWith(false)
    })
  })

  describe('SubjectViewerContainer when disabled', function() {
    let setState;

    beforeEach(function() {
      const revisedContext = Object.assign({}, testContext)
      revisedContext.aggregations.showModal = true;
      setState = jest.fn();
      jest
        .spyOn(React, 'useState')
        .mockImplementation((value) => [value, setState])
      jest.spyOn(React, 'useContext')
        .mockImplementation((context) => {  return revisedContext })
      wrapper = shallow(<SubjectViewerContainer />);
    })

    it('should set tools to true on mouse over', function() {
      const box = wrapper.find(Box).first()
      box.simulate('mouseover')
      expect(setState).not.toHaveBeenCalled()
    })
  })
})
