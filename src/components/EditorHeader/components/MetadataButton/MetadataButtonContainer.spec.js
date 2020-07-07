import { shallow } from 'enzyme'
import React from 'react'
import STATUS from 'helpers/status'
import MetadataButtonContainer from './MetadataButtonContainer'

let wrapper
const contextValues = {
  aggregations: {
    showModal: false
  },
  subjects: {
    current: {
      id: '1',
      metadata: {}
    }
  },
  transcriptions: {
    current: {
      status: STATUS.APPROVED
    }
  }
}

describe('Component > MetadataButtonContainer', function () {
  beforeEach(function() {
    jest.spyOn(React, 'useContext').mockImplementation((context) => contextValues)
    wrapper = shallow(<MetadataButtonContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
