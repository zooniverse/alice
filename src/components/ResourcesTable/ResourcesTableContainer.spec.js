import { shallow } from 'enzyme'
import ResourcesTableContainer from './ResourcesTableContainer'

let wrapper

describe('Component > ResourcesTableContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<ResourcesTableContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
