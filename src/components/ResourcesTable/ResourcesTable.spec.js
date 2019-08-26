import { shallow } from 'enzyme'
import React from 'react'
import ResourcesTable from './ResourcesTable'

let wrapper;
let html;

const COLUMNS = [
  {
    property: "firstColumn",
    header: "First Column"
  },
  {
    property: "secondColumn",
    header: "Second Column",
  },
]

const DATA = [
  {
    firstColumn: "First Item",
    secondColumn: "Second Item"
  },
  {
    firstColumn: "First Item",
    secondColumn: "Second Item"
  }
]

describe('Component > ResourcesTable', function () {
  beforeEach(function() {
    wrapper = shallow(<ResourcesTable columns={COLUMNS} data={DATA} />);
    html = wrapper.html()
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should render the correct columns', function () {
    expect(html).toContain(COLUMNS[0].header);
    expect(html).toContain(COLUMNS[1].header);
  })

  it('should render the correct data', function () {
    expect(html).toContain(DATA[0].firstColumn);
    expect(html).toContain(DATA[0].secondColumn);
    expect(html).toContain(DATA[1].firstColumn);
    expect(html).toContain(DATA[1].secondColumn);
  })
})
