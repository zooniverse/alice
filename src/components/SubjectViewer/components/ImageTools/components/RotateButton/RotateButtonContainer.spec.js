import { shallow } from 'enzyme'
import RotateButtonContainer from './RotateButtonContainer'

let wrapper

describe('Component > RotateButtonContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<RotateButtonContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
