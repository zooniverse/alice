import { shallow } from 'enzyme'
import React from 'react'
import { Button } from 'grommet'
import SubjectLockedModal from './SubjectLockedModal'

describe('Component > SubjectLockedModal', function () {
  let wrapper
  let onBackSpy = jest.fn()

  beforeAll(function () {
    wrapper = shallow(<SubjectLockedModal onBack={onBackSpy} />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call the onBack function with button press', function () {
    const backButton = wrapper.find(Button).first()
    backButton.simulate('click')
    expect(onBackSpy).toHaveBeenCalled()
  })
})
