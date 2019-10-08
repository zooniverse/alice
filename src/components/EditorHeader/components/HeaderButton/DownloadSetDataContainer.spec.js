import { shallow } from 'enzyme'
import React from 'react'
import DownloadSetDataContainer from './DownloadSetDataContainer'

let wrapper

describe('Component > DownloadSetDataContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<DownloadSetDataContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
