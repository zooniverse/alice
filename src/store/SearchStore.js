import { getRoot, types } from 'mobx-state-tree'

const TYPES = {
  ZOONIVERSE: 'ZOONIVERSE ID',
  INTERNAL: 'INTERNAL ID'
}

const FILTERS = {
  APPROVED: 'approved',
  FLAGGED: 'flagged',
  IN_PROGRESS: 'in_progress',
  LOW_CONSENSUS: 'low_consensus',
  READY: 'ready',
  UNSEEN: 'unseen'
}

const SearchStore = types.model('SearchStore', {
  approved: types.optional(types.boolean, false),
  flagged: types.optional(types.boolean, false),
  id: types.optional(types.string, ''),
  in_progress: types.optional(types.boolean, false),
  low_consensus: types.optional(types.boolean, false),
  ready: types.optional(types.boolean, false),
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
    const approvalFilters = [FILTERS.UNSEEN, FILTERS.IN_PROGRESS, FILTERS.READY, FILTERS.APPROVED]
    const additionalFilters = [FILTERS.FLAGGED, FILTERS.LOW_CONSENSUS]
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
    const searchType = self.type === TYPES.ZOONIVERSE ? 'subject_id' : 'internal_id'
    return `filter[${searchType}_eq]=${self.id}`
  },

  setArgs: function setArgs(args) {
    Object.keys(args).forEach(key => {
      if (self[key] !== undefined) {
        self[key] = args[key]
      }
    })
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
  }
})).views(self => ({
  get active() {
    return self.approved || self.flagged || self.in_progress
    || self.low_consensus || self.ready || self.unseen
    || self.id.length > 0 || self.type.length > 0
  }
}))

export { FILTERS, SearchStore, TYPES }
