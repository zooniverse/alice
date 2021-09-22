import { shallow } from 'enzyme'
import Overlay from '../Overlay'
import AggregatedTranscriptions from './AggregatedTranscriptions'
import LineViewer from '../LineViewer'

describe('Component > AggregatedTranscriptions', function () {
  it('should render without crashing', function () {
    shallow(<AggregatedTranscriptions />);
  })

  it('should display an overlay when given prop', function () {
    const wrapper = shallow(<AggregatedTranscriptions showOverlay />)
    expect(wrapper.find(Overlay).length).toBe(1)
  })

  it('should display a LineViewer when given prop', function () {
    const wrapper = shallow(<AggregatedTranscriptions showTranscription />)
    expect(wrapper.find(LineViewer).length).toBe(1)
  })
})
