import { shallow } from 'enzyme'
import React from 'react'
import MoreButtonContainer from './MoreButtonContainer'

let wrapper

describe('Component > UndoButton', function () {
  beforeEach(function() {
    wrapper = shallow(<MoreButtonContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
