import { flow, getRoot, types } from 'mobx-state-tree'
import ASYNC_STATES from 'helpers/asyncStates'

const IDS = {
  ZOONIVERSE: 'ZOONIVERSE ID',
  EXTERNAL: 'EXTERNAL ID'
}

const STATUS = {
  unseen: 0,
  ready: 1,
  approved: 2,
  in_progress: 3
}

const Transcription = types.model('Transcription', {
  id: types.identifier,
  flaggedid: types.optional(types.boolean, false),
  group_id: types.optional(types.string, ''),
  status: types.optional(types.string, ''),
  text: types.optional(types.frozen(), {}),
})

const TranscriptionsStore = types.model('TranscriptionsStore', {
  all: types.map(Transcription),
  asyncState: types.optional(types.string, ASYNC_STATES.IDLE),
  current: types.safeReference(Transcription),
  error: types.optional(types.string, ''),
  page: types.optional(types.number, 0),
  totalPages: types.optional(types.number, 1)
}).actions(self => ({
  createTranscription: (transcription) => {
    return Transcription.create({
      id: transcription.id,
      flagged: transcription.attributes.flagged,
      group_id: transcription.attributes.group_id,
      status: transcription.attributes.status,
      text: transcription.attributes.text
    })
  },

  fetchTranscription: flow(function * fetchTranscription(id) {
    if (!id) return undefined
    self.asyncState = ASYNC_STATES.LOADING
    const client = getRoot(self).client.tove
    try {
      const response = yield client.get(`/transcriptions/${id}`)
      const resource = JSON.parse(response.body)
      self.asyncState = ASYNC_STATES.READY
      return self.createTranscription(resource.data)
    } catch (error) {
      console.warn(error);
      self.error = error.message
      self.asyncState = ASYNC_STATES.ERROR
    }
  }),

  fetchTranscriptions: flow (function * fetchTranscriptions(page = 0) {
    self.page = page
    const client = getRoot(self).client.tove
    const groupName = getRoot(self).groups.title
    if (!groupName) return
    self.asyncState = ASYNC_STATES.LOADING
    try {
      const response = yield client.get(`/transcriptions?filter[group_id_eq]=${groupName}&page[number]=${self.page + 1}`)
      const resources = JSON.parse(response.body)
      self.totalPages = resources.meta.pagination.last || resources.meta.pagination.current
      resources.data.forEach(transcription => self.all.put(self.createTranscription(transcription)))
      self.asyncState = ASYNC_STATES.READY
    } catch (error) {
      console.warn(error);
      self.error = error.message
      self.asyncState = ASYNC_STATES.ERROR
    }
  }),

  fetchTranscriptionsByFilter: flow(function * fetchTranscriptionsByFilter(args, group) {
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

    const client = getRoot(self).client.tove
    const modal = getRoot(self).modal
    try {
      const response = yield client.get(`/transcriptions?filter[group_id_eq]=${group}&${query}`)
      const resources = JSON.parse(response.body)
      resources.data.forEach(transcription => self.all.put(self.createTranscription(transcription)))
      self.asyncState = ASYNC_STATES.READY
    } catch (error) {
      console.warn(error);
      self.error = error.message
      self.asyncState = ASYNC_STATES.ERROR
    }
    modal.toggleModal('')
  }),

  fetchTranscriptionsById: flow(function * fetchTranscriptionsById(type, value, group) {
    type = type === IDS.ZOONIVERSE ? 'subject_id' : 'internal_id'
    const client = getRoot(self).client.tove
    const modal = getRoot(self).modal
    try {
      const response = yield client.get(`/transcriptions?filter[${type}_eq]=${value}&filter[group_id_eq]=${group}`)
      const resources = JSON.parse(response.body)
      resources.data.forEach(transcription => self.all.put(self.createTranscription(transcription)))
      self.asyncState = ASYNC_STATES.READY
    } catch (error) {
      console.warn(error);
      self.error = error.message
      self.asyncState = ASYNC_STATES.ERROR
    }
    modal.toggleModal('')
  }),

  reset: () => {
    self.selectTranscription(null)
    self.all.clear()
  },

  searchTranscriptions: function searchTranscriptions(args) {
    const group = getRoot(self).groups.title
    const idType = args.type === IDS.ZOONIVERSE || args.type === IDS.EXTERNAL
    const idValue = args.id && args.id.length > 0
    if (idType && idValue) {
      self.reset()
      self.fetchTranscriptionsById(args.type, args.id, group)
    } else {
      self.reset()
      self.fetchTranscriptionsByFilter(args, group)
    }
  },

  selectTranscription: flow(function * selectTranscription(id = null) {
    let transcription = self.all.get(id)
    if (!transcription) transcription = yield self.fetchTranscription(id)
    self.setTranscription(transcription)
    self.current = id || undefined
  }),

  setTranscription: (transcription) => {
    if (transcription) {
      try {
        self.all.put(transcription)
      } catch (error) {
        console.error(error)
      }
    }
  }
})).views(self => ({
  get approvedCount () {
    let count = 0;
    self.all.forEach(transcription => {
      if (transcription.status === 'approved') {
        count ++
      }
    })
    return count;
  },

  get title () {
    return (self.current && self.current.id) || ''
  }
}))

export { TranscriptionsStore, Transcription }
