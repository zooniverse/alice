import { flow, types } from 'mobx-state-tree'
import { AggregationsStore } from './AggregationsStore'
import { AuthStore } from './AuthStore'
import { ClientStore } from './ClientStore'
import { EditorStore } from './EditorStore'
import { GroupsStore } from './GroupsStore'
import { ImageStore } from './ImageStore'
import { SubjectStore } from './SubjectStore'
import { ProjectsStore } from './ProjectsStore'
import { ModalStore } from './ModalStore'
import { TranscriptionsStore } from './TranscriptionsStore'
import { WorkflowsStore } from './WorkflowsStore'

const AppStore = types.model('AppStore', {
  aggregations: types.optional(AggregationsStore, () => AggregationsStore.create({})),
  auth: types.optional(AuthStore, () => AuthStore.create({})),
  client: types.optional(ClientStore, () => ClientStore.create({})),
  editor: types.optional(EditorStore, () => EditorStore.create({})),
  image: types.optional(ImageStore, () => ImageStore.create({})),
  groups: types.optional(GroupsStore, () => GroupsStore.create({})),
  subjects: types.optional(SubjectStore, () => SubjectStore.create({})),
  initialized: types.optional(types.boolean, false),
  projects: types.optional(ProjectsStore, () => ProjectsStore.create({})),
  modal: types.optional(ModalStore, () => ModalStore.create({})),
  transcriptions: types.optional(TranscriptionsStore, () => TranscriptionsStore.create({})),
  workflows: types.optional(WorkflowsStore, () => WorkflowsStore.create({})),
}).actions(self => ({
  initialize: flow (function * initialize() {
    self.client.initialize()
    yield self.auth.checkCurrent()
    self.initialized = true;
  })
}))

export { AppStore }
