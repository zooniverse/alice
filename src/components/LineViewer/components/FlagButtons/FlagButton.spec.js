import { shallow } from 'enzyme'
import React from 'react'
import { Button, Drop } from 'grommet'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import FlagButton, { StyledFontAwesomeIcon } from './FlagButton'

let wrapper
const onShowFlagSpy = jest.fn()

describe('Component > FlagButton', function () {
  beforeEach(function () {
    wrapper = shallow(<FlagButton onShowFlag={onShowFlagSpy} />)
  })

  afterEach(() => jest.clearAllMocks());

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should show flag on mouseover', function () {
    wrapper.find(Button).first().simulate('mouseover')
    expect(onShowFlagSpy).toHaveBeenCalledWith(true)
  })

  it('should hide flag on mouseout', function () {
    wrapper.find(Button).first().simulate('mouseout')
    expect(onShowFlagSpy).toHaveBeenCalledWith(false)
  })

  it('should show the drop component', function () {
    wrapper = shallow(<FlagButton showFlag />)
    expect(wrapper.find(Drop).length).toBe(1)
  })

  it('should not dim the component', function () {
    wrapper = shallow(<FlagButton showFlag tag />)
    const icon = wrapper.find(StyledFontAwesomeIcon).first()

    const tree = renderer.create(icon).toJSON()
    expect(tree).toHaveStyleRule('opacity', '1')
  })

  describe('when a viewer', function () {
    it('should not trigger onShowFlag', function () {
      wrapper = shallow(<FlagButton disabled onShowFlag={onShowFlagSpy} />)
      wrapper.find(Button).first().simulate('mouseover')
      expect(onShowFlagSpy).not.toHaveBeenCalled()
    })
  })
})
