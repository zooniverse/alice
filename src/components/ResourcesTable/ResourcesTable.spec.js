import { shallow } from 'enzyme'
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { DataTable } from 'grommet'
import { ResourcesTable } from './ResourcesTable'

let wrapper;
let html;
const onSelectionSpy = jest.fn()
const pushSpy = jest.fn()

const history = {
  location: { pathname: '/projects' },
  push: pushSpy
}

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
    id: '1',
    firstColumn: "First Item",
    secondColumn: "Second Item"
  },
  {
    id: '2',
    firstColumn: "First Item",
    secondColumn: "Second Item"
  }
]

describe('Component > ResourcesTable', function () {
  beforeEach(function() {
    wrapper = shallow(<ResourcesTable columns={COLUMNS} data={DATA} />)
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

describe('ResourcesTable functions', function () {
  beforeEach(function () {
    wrapper = shallow(<ResourcesTable columns={COLUMNS} data={DATA} history={history} />)
  })

  it('should push a link to the history object', function () {
    const mockEvent = {
      datum: { link: '/123' },
      target: { type: 'box' }
    }
    const table = wrapper.find(DataTable).first().props()
    table.onClickRow(mockEvent)
    expect(pushSpy).toHaveBeenCalledWith('/projects/123')
  })
})

describe('ResourcesTable onSelection prop', function () {
  beforeEach(function () {
    wrapper = shallow(<ResourcesTable columns={COLUMNS} data={DATA} onSelection={onSelectionSpy} />)
  })

  it('should call the onSelection prop', function () {
    const mockEvent = {
      datum: { link: '/123' },
      target: { type: 'box' }
    }
    const table = wrapper.find(DataTable).first().props()
    table.onClickRow(mockEvent)
    expect(onSelectionSpy).toHaveBeenCalledWith(mockEvent.datum)
  })
})
