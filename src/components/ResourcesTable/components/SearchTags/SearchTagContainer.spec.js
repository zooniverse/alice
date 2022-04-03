import { shallow } from 'enzyme'
import React from 'react'
import SearchTagContainer from './SearchTagContainer'

describe('Component > SearchTagContainer', function () {
  let wrapper
  const contextValues = {
    search: {
      approved: true,
      id: '1',
      type: 'ZOONIVERSE ID'
    }
  }

  beforeEach(function() {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    wrapper = shallow(<SearchTagContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
