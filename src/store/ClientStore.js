import { types } from 'mobx-state-tree'
import Frisbee from 'frisbee'

const ClientStore = types.model('ClientStore', {
  tove: types.optional(types.frozen({}), null)
}).actions(self => ({
  initialize: () => {
    self.tove = new Frisbee({
      baseURI: 'https://tove-staging.zooniverse.org',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    })
  }
}))

export { ClientStore }
