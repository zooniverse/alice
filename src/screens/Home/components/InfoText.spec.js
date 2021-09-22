import { shallow } from 'enzyme'
import InfoText from './InfoText'

let wrapper

describe('Component > InfoText', function () {
  beforeEach(function () {
    wrapper = shallow(<InfoText />)
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
