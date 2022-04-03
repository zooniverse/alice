import { shallow } from 'enzyme'
import React from 'react'
import { Button } from 'grommet'
import SearchTag from './SearchTag'

describe('Component > SearchTag', function () {
  let wrapper
  const clearTagSpy = jest.fn()

  beforeEach(function() {
    wrapper = shallow(<SearchTag clearTag={clearTagSpy} />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should trigger the clearTag prop', function () {
    const closeBtn = wrapper.find(Button).first()
    closeBtn.props().onClick()
    expect(clearTagSpy).toHaveBeenCalled()
  })
})
