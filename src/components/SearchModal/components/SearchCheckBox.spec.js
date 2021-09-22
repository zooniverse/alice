import { shallow } from 'enzyme'
import { SearchCheckBox } from './SearchCheckBox'

let wrapper;

describe('Component > SearchCheckBox', function () {
  beforeEach(function() {
    wrapper = shallow(<SearchCheckBox />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
