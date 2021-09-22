import { shallow } from 'enzyme'
import Label from './Label'

let wrapper

describe('Component > Label', function () {
  beforeEach(function () {
    wrapper = shallow(<Label />)
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
