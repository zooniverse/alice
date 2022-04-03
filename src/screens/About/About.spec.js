import { shallow } from 'enzyme'
import React from 'react'
import About from './About'

describe('Component > About', function () {
  let wrapper
  let setState = jest.fn()
  const modal = {
    caption: 'This Image',
    image: 'image.png'
  }

  beforeEach(function () {
    jest
      .spyOn(React, 'useState')
      .mockImplementation((init) => [modal, setState])
    wrapper = shallow(<About />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
