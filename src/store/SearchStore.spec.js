import { SearchStore } from './SearchStore'

let searchStore

describe('SearchStore', function () {
  beforeEach(function () {
    searchStore = SearchStore.create()
  })

  it('should exist', function () {
    expect(searchStore).toBeDefined()
  })
})
