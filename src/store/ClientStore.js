import { flow, getRoot, types } from 'mobx-state-tree'
import Frisbee from 'frisbee'
import { config } from 'config'
import download from 'downloadjs'
import auth from 'panoptes-client/lib/auth';

const ClientStore = types.model('ClientStore', {
  aggregator: types.optional(types.frozen({}), null),
  tove: types.optional(types.frozen({}), null),
  toveZip: types.optional(types.frozen({}), null)
}).actions(self => ({
  initialize: () => {
    self.aggregator = new Frisbee({
      baseURI: 'https://aggregation-caesar.zooniverse.org/reducers',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    })

    self.tove = new Frisbee({
      baseURI: config.tove,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    })
    self.toveZip = new Frisbee({
      baseURI: config.tove,
      headers: {
        'Accept': 'application/zip',
        'Content-Type': 'application/zip'
      },
      mode: 'cors',
      // This is necessary for the Frisbee api to convert the response to a blob
      // Otherwise, the response is always locked when trying to download the response stream
      raw: true
    })
  },

  downloadData: flow(function * downloadData(isEntireGroup) {
    const currentGroup = getRoot(self).groups.title
    const currentTranscription = getRoot(self).transcriptions.title
    const currentWorkflow = getRoot(self).workflows.id
    const query = isEntireGroup ? `/transcriptions/export_group?group_id=${currentGroup}&workflow_id=${currentWorkflow}`
      : `/transcriptions/${currentTranscription}/export`
    const filename = isEntireGroup ? `${currentGroup}_export` : `${currentTranscription}_export`

      try {
        yield self.toveZip.get(query).then(response => response.blob())
          .then(blob => download(blob, `${filename}.zip`))
      } catch (error) {
        console.log(error);
      }
  }),

  get: flow(function* get (request) {
    return yield auth.checkBearerToken().then((token) => {
      self.setBearerToken(token)
      return self.tove.get(request)
    })
  }),

  patch: flow(function* get (request, body) {
    return yield auth.checkBearerToken().then((token) => {
      self.setBearerToken(token)
      return self.tove.patch(request, body)
    })
  }),

  setBearerToken: (token) => {
    // If Token is null, we need to remove jwt tokens
    // If token is a string with a length, we need to set tokens
    if (token) {
      self.tove.jwt(token)
      self.toveZip.jwt(token)
    } else {
      self.tove.jwt()
      self.toveZip.jwt()
    }
  }
}))

export { ClientStore }
