import { shallow } from 'enzyme'
import React from 'react'
import { Menu } from 'grommet-icons'
import TranscriptionTableRow, { PointerBox, MoveBox } from './TranscriptionTableRow'
import mockData from './mockData'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

let wrapper;
let useStateSpy;
let setDragIDSpy = jest.fn();
let setDataSpy = jest.fn();
let setState = jest.fn();
let toggleTranscriptionSpy = jest.fn();
const preventDefaultSpy = jest.fn()
const stopPropagationSpy = jest.fn()
const mockEvent = { preventDefault: preventDefaultSpy, stopPropagation: stopPropagationSpy }

describe('Component > TranscriptionTable', function () {
  beforeEach(function() {
    useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState])
    wrapper = shallow(
      <TranscriptionTableRow
        data={mockData}
        dragID={1}
        index={0}
        setData={setDataSpy}
        setDragID={setDragIDSpy}
        toggleTranscription={toggleTranscriptionSpy}
      />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call setDragID on drag end', function () {
    wrapper.simulate('dragend')
    expect(setDragIDSpy).toHaveBeenCalledWith(null)
  })

  it('should call setHover on mouse enter', function () {
    wrapper.simulate('mouseenter')
    expect(setState).toHaveBeenCalledWith(true)
  })

  it('should call setHover on mouse leave', function () {
    wrapper.simulate('mouseleave')
    expect(setState).toHaveBeenCalledWith(false)
  })

  it('should call handleDragStart on dragStart', function () {
    wrapper.simulate('dragstart')
    expect(setState).toHaveBeenCalledWith(false)
    expect(setDragIDSpy).toHaveBeenCalledWith(0)
  })

  it('should call handleDragEnter on dragEnter', function () {
    wrapper.simulate('dragenter', mockEvent)
    expect(preventDefaultSpy).toHaveBeenCalled()
    expect(setDragIDSpy).toHaveBeenCalledWith(0)
    expect(setDataSpy).toHaveBeenCalled()
  })

  it('should call stopEvent on dragOver', function () {
    wrapper.simulate('dragover', mockEvent)
    expect(preventDefaultSpy).toHaveBeenCalled()
    expect(stopPropagationSpy).toHaveBeenCalled()
  })

  it('should call toggleTranscription on mouseUp', function () {
    const toggleBox = wrapper.find(PointerBox).first()
    toggleBox.simulate('mouseUp', mockEvent)
    expect(toggleTranscriptionSpy).toHaveBeenCalled()
  })

  it('should call stopEvent on child mouseUp', function () {
    const moveBox = wrapper.find(MoveBox).first()
    moveBox.simulate('mouseUp', mockEvent)
    expect(preventDefaultSpy).toHaveBeenCalled()
    expect(stopPropagationSpy).toHaveBeenCalled()
  })

  describe('should correctly style components on hover', function () {
    beforeEach(function () {
      jest
        .spyOn(React, 'useState')
        .mockImplementation((init) => [true, setState])
      wrapper = shallow(<TranscriptionTableRow />);
    })

    it('should style the component props', function () {
      expect(wrapper.props().elevation).toBe('small')
      expect(wrapper.props().round).toBe('xsmall')

      const hamburger = wrapper.find(Menu).first()
      expect(hamburger.props().color).toBe('black')
    })

    it('should use a hover icon', function () {
      const MoveableBox = wrapper.find(MoveBox).first();
      const tree = renderer.create(MoveableBox).toJSON()
      expect(tree).toHaveStyleRule('cursor', 'move')
      expect(tree).toHaveStyleRule('pointer-events', 'all')
    })
  })
})
