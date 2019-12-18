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
  },

  fetchTranscriptionsByFilter: flow(function * fetchTranscriptionsByFilter(args, group) {
    const transcriptions = getRoot(self).transcriptions
    transcriptions.reset()
    let query = ''
    const approvalFilters = ['unseen', 'in_progress', 'ready', 'approved']
    const additionalFilters = ['flagged', 'low_consensus']
    const activeApprovalFilters = []
    const activeAdditionalFilters = []

    Object.keys(args).forEach(key => {
      if (args[key]) {
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

  fetchTranscriptionsById: flow(function * fetchTranscriptionsById(type, value, group) {
    const transcriptions = getRoot(self).transcriptions
    transcriptions.reset()
    type = type === IDS.ZOONIVERSE ? 'subject_id' : 'internal_id'
    self[type] = value
    yield transcriptions.retrieveTranscriptions(`/transcriptions?filter[${type}_eq]=${value}&filter[group_id_eq]=${group}`)
  }),

  mapArgs: function mapArgs(args) {
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
    const group = getRoot(self).groups.title
    const idType = args.type === IDS.ZOONIVERSE || args.type === IDS.INTERNAL
    const idValue = args.id && args.id.length > 0
    self.mapArgs(args)
    if (idType && idValue) {
      self.fetchTranscriptionsById(args.type, args.id, group)
    } else {
      self.fetchTranscriptionsByFilter(args, group)
    }
    getRoot(self).modal.toggleModal('')
  },
})).views(self => ({
  get active() {
    return self.approved || self.flagged || self.in_progress
    || self.low_consensus || self.ready || self.unseen
    || self.internal_id.length > 0 || self.subject_id.length > 0
  }
}))

export { SearchStore }
