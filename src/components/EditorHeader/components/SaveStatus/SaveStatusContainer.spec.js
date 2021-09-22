import { shallow } from 'enzyme'
import SaveStatusContainer from './SaveStatusContainer'

let wrapper

describe('Component > SaveStatusContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<SaveStatusContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
