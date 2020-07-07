import { getRoot, types } from 'mobx-state-tree'
import STATUS from 'helpers/status'

const TYPES = {
  ZOONIVERSE: 'ZOONIVERSE ID',
  INTERNAL: 'INTERNAL ID'
}

const SORT_VALUES = [
  'flagged',
  'id',
  'internal_id',
  'low_consensus_lines',
  'status',
  'total_lines',
  'total_pages',
  'updated_at',
  'updated_by'
]

const SearchStore = types.model('SearchStore', {
  approved: types.optional(types.boolean, false),
  flagged: types.optional(types.boolean, false),
  id: types.optional(types.string, ''),
  internal_id: types.optional(types.string, ''),
  updated_at: types.optional(types.string, ''),
  updated_by: types.optional(types.string, ''),
  in_progress: types.optional(types.boolean, false),
  low_consensus: types.optional(types.boolean, false),
  low_consensus_lines: types.optional(types.number, 0),
  total_lines: types.optional(types.number, 0),
  total_page: types.optional(types.number, 0),
  ready: types.optional(types.boolean, false),
  sort_id: types.optional(types.number, 0),
  sort_internal_id: types.optional(types.number, 0),
  sort_low_consensus_lines: types.optional(types.number, 0),
  sort_total_lines: types.optional(types.number, 0),
  sort_total_pages: types.optional(types.number, 0),
  sort_updated_at: types.optional(types.number, 0),
  sort_updated_by: types.optional(types.number, 0),
  sort_flagged: types.optional(types.number, 0),
  sort_status: types.optional(types.number, 0),
  type: types.optional(types.string, ''),
  unseen: types.optional(types.boolean, false),
}).actions(self => ({
  clearIdTags: function() {
    self.id = ''
    self.type = ''
    getRoot(self).transcriptions.fetchTranscriptions()
  },

  clearTag: function(tag) {
    self[tag] = false
    getRoot(self).transcriptions.fetchTranscriptions()
  },

  fetchTranscriptionsByFilter: function fetchTranscriptionsByFilter() {
    const transcriptions = getRoot(self).transcriptions
    transcriptions.reset()
    let queries = []
    const approvalFilters = [STATUS.UNSEEN, STATUS.IN_PROGRESS, STATUS.READY, STATUS.APPROVED]
    const additionalFilters = [STATUS.FLAGGED, STATUS.LOW_CONSENSUS]
    const activeApprovalFilters = []
    const activeAdditionalFilters = []

    Object.keys(self).forEach(key => {
      if (self[key]) {
        if (approvalFilters.includes(key)) activeApprovalFilters.push(key)
        if (additionalFilters.includes(key)) activeAdditionalFilters.push(key)
      }
    })

    if (activeApprovalFilters.length > 0) {
      queries.push(`filter[status_in]=${activeApprovalFilters.join(',')}`)
    }

    if (activeAdditionalFilters.length > 0) {
      activeAdditionalFilters.forEach(filter => queries.push(`filter[${filter}_eq]=true`))
    }

    return queries.join('&')
  },

  fetchTranscriptionsById: function fetchTranscriptionsById() {
    const transcriptions = getRoot(self).transcriptions
    transcriptions.reset()
    const searchType = self.type === TYPES.ZOONIVERSE ? 'id' : 'internal_id'
    const filterType = self.type === TYPES.ZOONIVERSE ? '_eq' : '_cont'
    return `filter[${searchType}${filterType}]=${self.id}`
  },

  setArgs: function setArgs(args) {
    Object.keys(args).forEach(key => {
      if (self[key] !== undefined) {
        self[key] = args[key]
      }
    })
  },

  sort: function sort(property) {
    SORT_VALUES.forEach((value) => {
      if (property !== value) self[`sort_${value}`] = 0
    })

    self[`sort_${property}`] = (self[`sort_${property}`] + 1) % 3
    getRoot(self).transcriptions.fetchTranscriptions()
  },

  reset: function reset() {
    Object.keys(self).forEach(key => {
      const type = typeof self[key]
      if (type === 'string') self[key] = ''
      if (type === 'boolean') self[key] = false
    })
  },

  searchTranscriptions: function searchTranscriptions(args) {
    self.setArgs(args)
    getRoot(self).transcriptions.fetchTranscriptions()
  },

  getSearchQuery: function() {
    let query = ''
    if (self.id.length > 0 && self.type.length > 0) {
      query = self.fetchTranscriptionsById()
    } else {
      query = self.fetchTranscriptionsByFilter()
    }
    getRoot(self).modal.toggleModal('')
    return query.length > 0 ? `&${query}` : query
  },

  getSortQuery: function () {
    let query = ''
    SORT_VALUES.forEach(value => {
      switch (self[`sort_${value}`]) {
        case 1:
          query = `&sort=${value}`
          break;
        case 2:
          query = `&sort=-${value}`
          break;
        default:
          break
      }
    })
    return query
  }
})).views(self => ({
  get active() {
    return self.approved || self.flagged || self.in_progress
    || self.low_consensus || self.ready || self.unseen
    || self.id.length > 0 || self.type.length > 0
  }
}))

export { SearchStore, TYPES }
