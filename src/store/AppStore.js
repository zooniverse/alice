import { types } from 'mobx-state-tree'
import { AggregationsStore } from './AggregationsStore'
import { AuthStore } from './AuthStore'
import { EditorStore } from './EditorStore'
import { ImageStore } from './ImageStore'

const AppStore = types.model('AppStore', {
  aggregations: types.optional(AggregationsStore, () => AggregationsStore.create({})),
  auth: types.optional(AuthStore, () => AuthStore.create({})),
  editor: types.optional(EditorStore, () => EditorStore.create({})),
  initialised: types.optional(types.boolean, false),
  image: types.optional(ImageStore, () => ImageStore.create({}))
})

export { AppStore }
