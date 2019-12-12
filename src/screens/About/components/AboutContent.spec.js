import { shallow } from 'enzyme'
import React from 'react'
import { Button, Text } from 'grommet'
import AboutContent from './AboutContent'

let wrapper
const setModalSpy = jest.fn()
const title = 'A Title'

describe('Component > AboutContent', function () {
  it('should render without crashing', function () {
    wrapper = shallow(
      <AboutContent
        setModal={setModalSpy}
        title={title}
      />);
    expect(wrapper).toBeDefined()
  })

  it('should trigger the setModal prop', function () {
    wrapper.find(Button).first().props().onClick()
    expect(setModalSpy).toHaveBeenCalled()
  })

  it('should set the title', function () {
    const titleText = wrapper.find(Text).first().props().children
    expect(titleText).toBe(title)
  })
})
