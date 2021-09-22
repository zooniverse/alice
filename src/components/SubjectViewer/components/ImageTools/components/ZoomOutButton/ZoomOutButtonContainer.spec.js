import { shallow } from 'enzyme'
import ZoomOutButtonContainer from './ZoomOutButtonContainer'

let wrapper

describe('Component > ZoomOutButtonContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<ZoomOutButtonContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
