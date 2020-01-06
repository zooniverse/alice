import { shallow } from 'enzyme'
import React from 'react'
import { Button } from 'grommet'
import AboutModal from './AboutModal'

let wrapper
const closeModalSpy = jest.fn()

describe('Component > AboutModal', function () {
  it('should render without crashing', function () {
    wrapper = shallow(<AboutModal setModal={closeModalSpy} />);
    expect(wrapper).toBeDefined()
  })

  it('should close the modal when triggered', function () {
    const button = wrapper.find(Button).first()
    button.props().onClick()
    expect(closeModalSpy).toHaveBeenCalledWith(null)
  })
})
