import { flow, getRoot, types } from 'mobx-state-tree'

const TYPES = {
  ZOONIVERSE: 'ZOONIVERSE ID',
  INTERNAL: 'INTERNAL ID'
}

const STATUS = {
  unseen: 0,
  ready: 1,
  approved: 2,
  in_progress: 3
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
    self.searchByArgs()
  },

  clearTag: function(tag) {
    self[tag] = false
    self.searchByArgs()
  },

  fetchTranscriptionsByFilter: flow(function * fetchTranscriptionsByFilter(group) {
    const transcriptions = getRoot(self).transcriptions
    transcriptions.reset()
    let query = ''
    const approvalFilters = ['unseen', 'in_progress', 'ready', 'approved']
    const additionalFilters = ['flagged', 'low_consensus']
    const activeApprovalFilters = []
    const activeAdditionalFilters = []

    Object.keys(self).forEach(key => {
      if (self[key]) {
        if (approvalFilters.includes(key)) activeApprovalFilters.push(key)
        if (additionalFilters.includes(key)) activeAdditionalFilters.push(key)
      }
    })

    if (activeApprovalFilters.length > 0) {
      query += 'filter[status_in]='
      activeApprovalFilters.forEach(filter => query += `${STATUS[filter]},`)
    }

    if (activeAdditionalFilters.length > 0) {
      if (query.length > 0) query += '&'
      activeAdditionalFilters.forEach(filter => query += `filter[${filter}_eq]=true&`)
    }

    yield transcriptions.retrieveTranscriptions(`/transcriptions?filter[group_id_eq]=${group}&${query}`)
  }),

  fetchTranscriptionsById: flow(function * fetchTranscriptionsById(group) {
    const transcriptions = getRoot(self).transcriptions
    transcriptions.reset()
    const searchType = self.type === TYPES.ZOONIVERSE ? 'subject_id' : 'internal_id'
    yield transcriptions.retrieveTranscriptions(`/transcriptions?filter[${searchType}_eq]=${self.id}&filter[group_id_eq]=${group}`)
  }),

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
    self.searchByArgs()
  },

  searchByArgs: function() {
    const group = getRoot(self).groups.title
    if (self.id.length > 0 && self.type.length > 0) {
      self.fetchTranscriptionsById(group)
    } else {
      self.fetchTranscriptionsByFilter(group)
    }
    getRoot(self).modal.toggleModal('')
  }
})).views(self => ({
  get active() {
    return self.approved || self.flagged || self.in_progress
    || self.low_consensus || self.ready || self.unseen
    || self.id.length > 0 || self.type.length > 0
  }
}))

export { TYPES, SearchStore }
