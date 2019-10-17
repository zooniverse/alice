import { types } from 'mobx-state-tree'
import { AuthStore } from './AuthStore'
import { EditorStore } from './EditorStore'
import { ImageStore } from './ImageStore'

const AppStore = types.model('AppStore', {
  initialised: types.optional(types.boolean, false),
  auth: types.optional(AuthStore, () => AuthStore.create({})),
  editor: types.optional(EditorStore, () => EditorStore.create({})),
  image: types.optional(ImageStore, () => ImageStore.create({}))
})

export { AppStore }
