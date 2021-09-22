import { shallow } from 'enzyme'
import ResetButtonContainer from './ResetButtonContainer'

let wrapper

describe('Component > ResetButtonContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<ResetButtonContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
