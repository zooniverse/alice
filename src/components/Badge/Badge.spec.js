import { shallow } from 'enzyme'
import React from 'react'
import { DropButton } from 'grommet'
import Badge, { DropLink, StyledBox } from './Badge'
import { BrowserRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

let wrapper
const setOpenSpy = jest.fn()

describe('Component > Badge', function () {
  it('should render without crashing', function () {
    wrapper = shallow(<Badge setOpen={setOpenSpy} />);
    expect(wrapper).toBeDefined()
  })

  describe('functions', function () {
    it('should open the drop', function () {
      const drop = wrapper.find(DropButton).first()
      drop.props().onOpen()
      expect(setOpenSpy).toHaveBeenCalledWith(true)
    })

    it('should close the drop', function () {
      wrapper = shallow(<Badge isOpen setOpen={setOpenSpy} />);
      const drop = wrapper.find(DropButton).first()
      drop.props().onClose()
      expect(setOpenSpy).toHaveBeenCalledWith(false)
    })
  })

  describe('DropLink', function () {
    it('should enable the component', function () {
      wrapper = shallow(
        <Router>
          <DropLink />
        </Router>)
      const tree = renderer.create(wrapper).toJSON()
      expect(tree).toHaveStyleRule('pointer-events', 'all')
    })

    it('should disable the component', function () {
      wrapper = shallow(
        <Router>
          <DropLink disabled />
        </Router>)
      const tree = renderer.create(wrapper).toJSON()
      expect(tree).toHaveStyleRule('pointer-events', 'none')
    })
  })

  describe('StyledBox', function () {
    it('should enable the component', function () {
      wrapper = shallow(<StyledBox />)
      const tree = renderer.create(wrapper).toJSON()
      expect(tree).toHaveStyleRule('background', 'inherit')
    })

    it('should disable the component', function () {
      wrapper = shallow(<StyledBox disabled />)
      const tree = renderer.create(wrapper).toJSON()
      expect(tree).toHaveStyleRule('background', '#D8D8D8')
    })
  })

  describe('onAbout page', function () {
    it('should render without crashing', function () {
      wrapper = shallow(<Badge onAbout />)
      expect(wrapper).toBeDefined()
    })
  })
})
