import { mount, shallow } from 'enzyme'
import React from 'react'
import { DropButton } from 'grommet'
import { BrowserRouter as Router } from 'react-router-dom'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Badge, { DropLink, StyledAvatar, StyledBox } from './Badge'
import DefaultAvatar from '../../images/user.svg'

let wrapper
const setOpenSpy = jest.fn()

describe('Component > Badge', function () {
  it('should render without crashing', function () {
    wrapper = shallow(<Badge setOpen={setOpenSpy} />);
    expect(wrapper).toBeDefined()
  })

  describe('functions', function () {
    afterEach(() => jest.clearAllMocks());

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

  describe('with drop open', function () {
    afterEach(() => jest.clearAllMocks());

    it('should close the drop with about click', function () {
      wrapper = mount(
        <Router>
          <Badge isOpen setOpen={setOpenSpy} />
        </Router>);
      const aboutLink = wrapper.find(DropLink).first()
      aboutLink.simulate('click')
      expect(setOpenSpy).toHaveBeenCalledWith(false)
    })

    it('should close the drop with viewer click', function () {
      wrapper = mount(
        <Router>
          <Badge isOpen onAbout setOpen={setOpenSpy} />
        </Router>);
      const viewerLink = wrapper.find(DropLink).at(1)
      viewerLink.simulate('click')
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

  describe('src prop', function () {
    it('should pass to the image', function () {
      const src = 'www.zooniverse.com/anImage'
      wrapper = shallow(<Badge name='User' src={src} />);
      const image = wrapper.find(StyledAvatar).first()
      expect(image.props().alt).toBe('User Avatar')
      expect(image.props().src).toBe(src)
    })

    it('should fallback on the DefaultAvatar', function () {
      wrapper = shallow(<Badge />);
      const image = wrapper.find(StyledAvatar).first()
      expect(image.props().src).toBe(DefaultAvatar)
    })
  })

  describe('onAbout page', function () {
    it('should render without crashing', function () {
      wrapper = shallow(<Badge onAbout />)
      expect(wrapper).toBeDefined()
    })
  })
})
