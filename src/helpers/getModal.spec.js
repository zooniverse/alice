import { shallow } from 'enzyme'
import getModal from './getModal'
import MODALS from './modals'

describe('Helper > getModal', function () {
  it('should return a valid component', function () {
    Object.values(MODALS).forEach(modal => {
      const Component = getModal(modal)
      const rendered = shallow(<Component />)
      expect(rendered).toBeDefined()
    })
  })

  it('should return null without a valid component', function () {
    expect(getModal('unknown')).toBe(null)
  })
})
