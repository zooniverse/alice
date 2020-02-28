import { flow, types } from 'mobx-state-tree'
import { UndoManager } from 'mst-middlewares'
import { AggregationsStore } from './AggregationsStore'
import { AuthStore } from './AuthStore'
import { ClientStore } from './ClientStore'
import { EditorStore } from './EditorStore'
import { GroupsStore } from './GroupsStore'
import { ImageStore } from './ImageStore'
import { SearchStore } from './SearchStore'
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
  search: types.optional(SearchStore, () => SearchStore.create({})),
  subjects: types.optional(SubjectStore, () => SubjectStore.create({})),
  initialized: types.optional(types.boolean, false),
  projects: types.optional(ProjectsStore, () => ProjectsStore.create({})),
  modal: types.optional(ModalStore, () => ModalStore.create({})),
  transcriptions: types.optional(TranscriptionsStore, () => TranscriptionsStore.create({})),
  workflows: types.optional(WorkflowsStore, () => WorkflowsStore.create({})),
}).actions(self => {
  setUndoManager(self.transcriptions)

  const getResources = flow (function * getResources(params) {
    if (!!params.project && params.project !== self.projects.id) {
      yield self.projects.selectProject(params.project)
    } else if (!params.project) {
      self.projects.reset()
    }
    if (!!params.workflow && params.workflow !== self.workflows.id) {
      yield self.workflows.selectWorkflow(params.workflow)
    } else if (!params.workflow) {
      self.workflows.reset()
    }
    if (!!params.group && params.group !== self.groups.id) {
      self.groups.selectGroup(params.group)
    } else if (!params.group) {
      self.groups.reset()
    }
    if (!!params.subject && params.subject !== self.transcriptions.title) {
      yield self.transcriptions.selectTranscription(params.subject)
    } else if (!params.subject) {
      self.transcriptions.reset()
    }
  })

  const initialize = flow (function * initialize() {
    self.client.initialize()
    yield self.auth.checkCurrent()
    self.initialized = true;
  })

  return {
    getResources,
    initialize
  }
})

export let undoManager = {}
export const setUndoManager = targetStore => {
    undoManager = UndoManager.create({}, { targetStore })
}

export { AppStore }
