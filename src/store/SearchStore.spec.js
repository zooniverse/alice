import { AppStore } from './AppStore'

let searchStore
const fetchTranscriptionsSpy = jest.fn()

describe('SearchStore', function () {
  beforeEach(function () {
    const rootStore = AppStore.create()
    Object.defineProperty(
      rootStore.transcriptions, 'fetchTranscriptions',
      { writable: true, value: fetchTranscriptionsSpy }
    )
    searchStore = rootStore.search
  })

  afterEach(() => jest.clearAllMocks());

  it('should exist', function () {
    expect(searchStore).toBeDefined()
  })

  it('should searchTranscriptions and fetch by approved', function() {;
    searchStore.searchTranscriptions({ approved: true })
    expect(searchStore.approved).toBe(true)
    expect(fetchTranscriptionsSpy).toHaveBeenCalled()
    expect(searchStore.getSearchQuery()).toBe(`&filter[status_in]=approved`)
  })

  it('should searchTranscriptions and fetch by flagged', function() {;
    searchStore.searchTranscriptions({ flagged: true })
    expect(searchStore.flagged).toBe(true)
    expect(fetchTranscriptionsSpy).toHaveBeenCalled()
    expect(searchStore.getSearchQuery()).toBe(`&filter[flagged_eq]=true`)
  })

  it('should searchTranscriptions by an approval and additional filter', function () {
    searchStore.searchTranscriptions({ low_consensus: true, unseen: true })
    expect(searchStore.low_consensus).toBe(true)
    expect(searchStore.unseen).toBe(true)
    expect(fetchTranscriptionsSpy).toHaveBeenCalled()
    expect(searchStore.getSearchQuery()).toBe(`&filter[status_in]=unseen&filter[low_consensus_eq]=true`)
  })

  it('should searchTranscriptions and fetch by subject_id', function() {;
    searchStore.searchTranscriptions({ id: '1', type: 'ZOONIVERSE ID' })
    expect(searchStore.id).toBe('1')
    expect(searchStore.type).toBe('ZOONIVERSE ID')
    expect(fetchTranscriptionsSpy).toHaveBeenCalled()
    expect(searchStore.getSearchQuery()).toBe(`&filter[subject_id_eq]=1`)
  })

  it('should searchTranscriptions and fetch by internal_id', function() {;
    searchStore.searchTranscriptions({ id: '1', type: 'INTERNAL ID' })
    expect(searchStore.id).toBe('1')
    expect(searchStore.type).toBe('INTERNAL ID')
    expect(fetchTranscriptionsSpy).toHaveBeenCalled()
    expect(searchStore.getSearchQuery()).toBe(`&filter[internal_id_cont]=1`)
  })

  it('should reset args', function() {
    searchStore.searchTranscriptions({ approved: true })
    searchStore.reset()
    expect(searchStore.approved).toBe(false)
  })

  it('should recognize an active search', function() {
    searchStore.searchTranscriptions({ approved: true })
    expect(searchStore.active).toBe(true)
  })

  it('should recognize an inactive search', function() {
    expect(searchStore.active).toBe(false)
  })

  it('should clear id tags', function() {
    searchStore.searchTranscriptions({ id: '1', type: 'ZOONIVERSE ID' })
    searchStore.clearIdTags()
    expect(searchStore.id).toBe('')
    expect(searchStore.type).toBe('')
  })

  it('should clear a tag', function() {
    searchStore.searchTranscriptions({ approved: true })
    searchStore.clearTag('approved')
    expect(searchStore.approved).toBe(false)
  })

  it('should ignore an invalid argument', function() {
    const initialStore = Object.assign({}, searchStore)
    searchStore.searchTranscriptions({ foo: 'bar' })
    expect(initialStore).toStrictEqual(searchStore)
  })
})
