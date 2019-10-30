import { types } from 'mobx-state-tree'
import { AuthStore } from './AuthStore'
import { ClientStore } from './ClientStore'
import { EditorStore } from './EditorStore'
import { ImageStore } from './ImageStore'
import { SubjectStore } from './SubjectStore'
import { ProjectsStore } from './ProjectsStore'

const AppStore = types.model('AppStore', {
  auth: types.optional(AuthStore, () => AuthStore.create({})),
  client: types.optional(ClientStore, () => ClientStore.create({})),
  editor: types.optional(EditorStore, () => EditorStore.create({})),
  image: types.optional(ImageStore, () => ImageStore.create({})),
  subject: types.optional(SubjectStore, () => SubjectStore.create({})),
  initialised: types.optional(types.boolean, false),
  projects: types.optional(ProjectsStore, () => ProjectsStore.create({})),
})

export { AppStore }
