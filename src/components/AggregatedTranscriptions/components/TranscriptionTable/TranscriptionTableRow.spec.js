import { shallow } from 'enzyme'
import React from 'react'
import { Text } from 'grommet'
import { Menu } from 'grommet-icons'
import TranscriptionTableRow, { PointerBox, MoveBox } from './TranscriptionTableRow'
import mockData from './mockData'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

describe.skip('Component > TranscriptionTableRow', function () {
  let pointerBox;
  let wrapper;
  let useStateSpy;

  const preventDefaultSpy = jest.fn();
  let setActiveTranscriptionSpy = jest.fn();
  let setDragIDSpy = jest.fn();
  let moveDataSpy = jest.fn();
  let setState = jest.fn();
  let setTextObjectSpy = jest.fn();
  const stopPropagationSpy = jest.fn();

  const mockEvent = { preventDefault: preventDefaultSpy, stopPropagation: stopPropagationSpy }

  beforeEach(function() {
    useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init) => [init, setState])
    wrapper = shallow(
      <TranscriptionTableRow
        data={mockData}
        dragID={1}
        index={0}
        setActiveTranscription={setActiveTranscriptionSpy}
        moveData={moveDataSpy}
        setDragID={setDragIDSpy}
        setTextObject={setTextObjectSpy}
      />);
    pointerBox = wrapper.find(PointerBox).first()
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call setDragID on drag end', function () {
    pointerBox.simulate('dragend')
    expect(setTextObjectSpy).toHaveBeenCalledWith(mockData)
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
    pointerBox.simulate('dragstart')
    expect(setState).toHaveBeenCalledWith(false)
    expect(setDragIDSpy).toHaveBeenCalledWith(0)
  })

  it('should call handleDragEnter on dragEnter', function () {
    pointerBox.simulate('dragenter', mockEvent)
    expect(preventDefaultSpy).toHaveBeenCalled()
    expect(setDragIDSpy).toHaveBeenCalledWith(0)
    expect(moveDataSpy).toHaveBeenCalled()
  })

  it('should call stopEvent on dragOver', function () {
    pointerBox.simulate('dragover', mockEvent)
    expect(preventDefaultSpy).toHaveBeenCalled()
    expect(stopPropagationSpy).toHaveBeenCalled()
  })

  it('should call setActiveTranscription on mouseUp', function () {
    const toggleBox = wrapper.find(PointerBox).first()
    toggleBox.simulate('mouseUp', mockEvent)
    expect(setActiveTranscriptionSpy).toHaveBeenCalled()
  })

  it('should call stopEvent on child mouseUp', function () {
    const moveBox = wrapper.find(MoveBox).first()
    moveBox.simulate('mouseUp', mockEvent)
    expect(preventDefaultSpy).toHaveBeenCalled()
    expect(stopPropagationSpy).toHaveBeenCalled()
  })

  it('should display the correct PointerBox', function () {
    const Pointer = wrapper.find(PointerBox).first()
    const group = renderer.create(Pointer).toJSON()
    expect(group).toHaveStyleRule('cursor', 'default')
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

    it('should display the correct PointerBox when hovered', function () {
      const Pointer = wrapper.find(PointerBox).first()
      const group = renderer.create(Pointer).toJSON()
      expect(group).toHaveStyleRule('cursor', 'pointer')
    })
  })

  describe('Final Text component', function () {
    it('should display Edited with edited consensus text', function () {
      const datum = { edited_consensus_text: 'New Text' }
      const wrapper = shallow(<TranscriptionTableRow datum={datum}/>)
      const textBox = wrapper.find(Text).last()
      expect(textBox.props().children).toBe('Edited')
    })
  })
})
