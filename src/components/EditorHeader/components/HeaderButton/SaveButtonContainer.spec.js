import { shallow } from 'enzyme'
import React from 'react'
import SaveButtonContainer from './SaveButtonContainer'

let wrapper

describe('Component > UndoButton', function () {
  beforeEach(function() {
    wrapper = shallow(<SaveButtonContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
