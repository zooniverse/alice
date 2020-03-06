import { getRoot, types } from 'mobx-state-tree'
import Frisbee from 'frisbee'
import { config } from 'config'

const ClientStore = types.model('ClientStore', {
  bearerToken: types.optional(types.string, ''),
  tove: types.optional(types.frozen({}), null)
}).actions(self => ({
  initialize: () => {
    self.tove = new Frisbee({
      baseURI: config.tove,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    })
  },

  downloadData: (isEntireGroup) => {
    const currentGroup = getRoot(self).groups.title
    const currentTranscription = getRoot(self).transcriptions.title
    const currentWorkflow = getRoot(self).workflows.id
    return isEntireGroup ? `/transcriptions/export_group?group_id=${currentGroup}&workflow_id=${currentWorkflow}`
      : `/transcriptions/${currentTranscription}/export`
  },

  setBearerToken: (token) => {
    self.tove.jwt(token)
  }
}))

export { ClientStore }
