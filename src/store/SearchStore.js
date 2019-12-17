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
  current: types.optional(types.string, ''),
}).actions(self => ({
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
    yield transcriptions.retrieveTranscriptions(`/transcriptions?filter[${type}_eq]=${value}&filter[group_id_eq]=${group}`)
  }),

  searchTranscriptions: function searchTranscriptions(args) {
    const group = getRoot(self).groups.title
    const idType = args.type === IDS.ZOONIVERSE || args.type === IDS.INTERNAL
    const idValue = args.id && args.id.length > 0
    if (idType && idValue) {
      self.fetchTranscriptionsById(args.type, args.id, group)
    } else {
      self.fetchTranscriptionsByFilter(args, group)
    }
    getRoot(self).modal.toggleModal('')
  },
}))

export { SearchStore }
