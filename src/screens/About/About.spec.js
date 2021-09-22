import { shallow } from 'enzyme'
import * as React from 'react';
import About from './About'

let wrapper
let setState = jest.fn()
const modal = {
  caption: 'This Image',
  image: 'image.png'
}

describe('Component > About', function () {
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
