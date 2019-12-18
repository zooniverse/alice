import { flow, getRoot, types } from 'mobx-state-tree'

const IDS = {
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
  in_progress: types.optional(types.boolean, false),
  internal_id: types.optional(types.string, ''),
  low_consensus: types.optional(types.boolean, false),
  ready: types.optional(types.boolean, false),
  subject_id: types.optional(types.string, ''),
  unseen: types.optional(types.boolean, false),
}).actions(self => ({
  clearTag: function(tag) {
    const type = typeof self[tag];
    if (type === 'string') self[tag] = ''
    if (type === 'boolean') self[tag] = false
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

    Object.keys(self.args).forEach(key => {
      if (self.args[key]) {
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
    yield transcriptions.retrieveTranscriptions(`/transcriptions?filter[${self.idQuery.type}_eq]=${self.idQuery.id}&filter[group_id_eq]=${group}`)
  }),

  setArgs: function setArgs(args) {
    Object.keys(args).forEach(key => {
      if (self[key] !== undefined) {
        self[key] = args[key]
      }
    })
  },

  reset: function reset() {
    self.approved = false
    self.flagged = false
    self.in_progress = false
    self.internal_id = ''
    self.low_consensus = false
    self.ready = false
    self.subject_id = ''
    self.unseen = false
  },

  searchTranscriptions: function searchTranscriptions(args) {
    const typeExists = args.type === IDS.ZOONIVERSE || args.type === IDS.INTERNAL
    if (typeExists) {
      const type = args.type === IDS.ZOONIVERSE ? 'subject_id' : 'internal_id'
      args[type] = args.id
    }
    self.setArgs(args)
    self.searchByArgs()
  },

  searchByArgs: function() {
    const group = getRoot(self).groups.title
    if (self.idQuery.id) {
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
    || self.internal_id.length > 0 || self.subject_id.length > 0
  },

  get args() {
    const args = {}
    Object.keys(self).forEach(key => args[key] = self[key])
    return args
  },

  get idQuery() {
    const query = {}
    Object.keys(self).forEach(key => {
      const value = self[key]
      if (typeof value === 'string' && value.length > 0) {
        query.id = value
        query.type = key
      }
    })
    return query
  }
}))

export { SearchStore }
