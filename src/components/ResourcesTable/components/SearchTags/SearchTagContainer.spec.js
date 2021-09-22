import { shallow } from 'enzyme'
import * as React from 'react';
import SearchTagContainer from './SearchTagContainer'

let wrapper
const contextValues = {
  search: {
    approved: true,
    id: '1',
    type: 'ZOONIVERSE ID'
  }
}

describe('Component > SearchTagContainer', function () {
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
