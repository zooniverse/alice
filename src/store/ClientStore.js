import { types } from 'mobx-state-tree'
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

  setBearerToken: (token) => {
    self.tove.jwt(token)
  }
}))

export { ClientStore }
