import { shallow } from 'enzyme'
import RotateButton from './RotateButton'

let wrapper

describe('Component > RotateButton', function () {
  beforeEach(function() {
    wrapper = shallow(<RotateButton />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
