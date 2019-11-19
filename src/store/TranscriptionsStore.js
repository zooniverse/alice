import { flow, getRoot, types } from 'mobx-state-tree'
import ASYNC_STATES from 'helpers/asyncStates'

const IDS = {
  ZOONIVERSE: 'ZOONIVERSE ID',
  EXTERNAL: 'EXTERNAL ID'
}

const Transcription = types.model('Transcription', {
  id: types.optional(types.string, ''),
  flaggedid: types.optional(types.boolean, false),
  group_id: types.optional(types.string, ''),
  status: types.optional(types.string, ''),
  subject_id: types.optional(types.number, 0),
  text: types.optional(types.frozen(), {}),
})

const TranscriptionsStore = types.model('TranscriptionsStore', {
  all: types.array(Transcription),
  asyncState: types.optional(types.string, ASYNC_STATES.IDLE),
  current: types.optional(Transcription, {}),
  error: types.optional(types.string, '')
}).actions(self => ({
  createTranscript: function createTranscript(transcription) {
    return Transcription.create({
      id: transcription.id,
      flagged: transcription.attributes.flagged,
      group_id: transcription.attributes.group_id,
      status: transcription.attributes.status,
      subject_id: transcription.attributes.subject_id,
      text: transcription.attributes.text
    })
  },

  fetchTranscriptions: flow (function * fetchTranscriptions() {
    self.asyncState = ASYNC_STATES.LOADING
    const client = getRoot(self).client.tove
    const groupName = getRoot(self).groups.current.display_name
    try {
      const response = yield client.get(`/transcriptions?filter[group_id_eq]=${groupName}`)
      const resources = JSON.parse(response.body)
      self.all = resources.data.map(transcription => self.createTranscript(transcription))
      self.asyncState = ASYNC_STATES.READY
    } catch (error) {
      console.warn(error);
      self.error = error.message
      self.asyncState = ASYNC_STATES.ERROR
    }
  }),

  fetchTranscriptionsByFilter: flow (function * fetchTranscriptionsById(args, group) {
    let query = ''
    const approvalFilters = ['unseen', 'inProgress', 'ready', 'approved']
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
      activeApprovalFilters.forEach(filter => query += `${filter},`)
    }

    if (activeAdditionalFilters.length > 0) {
      if (query.length > 0) query += '&'
      activeAdditionalFilters.forEach(filter => query += `filter[${filter}_eq]=true&`)
    }

    const client = getRoot(self).client.tove
    const modal = getRoot(self).modal
    try {
      const response = yield client.get(`/transcriptions?filter[group_id_eq]=${group}&`)
      const resources = JSON.parse(response.body)
      self.all = resources.data.map(transcription => self.createTranscript(transcription))
      self.asyncState = ASYNC_STATES.READY
    } catch (error) {
      console.warn(error);
      self.error = error.message
      self.asyncState = ASYNC_STATES.ERROR
    }
    modal.toggleModal('')
  }),

  fetchTranscriptionsById: flow (function * fetchTranscriptionsById(type, value, group) {
    type = type === IDS.ZOONIVERSE ? 'subject_id' : 'internal_id'
    const client = getRoot(self).client.tove
    const modal = getRoot(self).modal
    try {
      const response = yield client.get(`/transcriptions?filter[${type}_eq]=${value}&filter[group_id_eq]=${group}`)
      const resources = JSON.parse(response.body)
      self.all = resources.data.map(transcription => self.createTranscript(transcription))
      self.asyncState = ASYNC_STATES.READY
    } catch (error) {
      console.warn(error);
      self.error = error.message
      self.asyncState = ASYNC_STATES.ERROR
    }
    modal.toggleModal('')
  }),

  searchTranscriptions: function searchTranscriptions(args) {
    const group = getRoot(self).groups.title
    const idType = args.type === IDS.ZOONIVERSE || args.type === IDS.EXTERNAL
    const idValue = args.id && args.id.length > 0
    if (idType && idValue) {
      self.fetchTranscriptionsById(args.type, args.id, group)
    } else {
      self.fetchTranscriptionsByFilter(args, group)
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
  }
}))

export { TranscriptionsStore }
