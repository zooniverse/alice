import { flow, getRoot, types } from 'mobx-state-tree'
import apiClient from 'panoptes-client/lib/api-client.js';

const ProjectsStore = types.model('ProjectsStore', {
  index: types.array(types.frozen({})),
}).actions(self => ({
  getProjects: flow (function * get() {
    const client = getRoot(self).client.tove
    try {
      const response = yield client.get('/projects')
      const resources = JSON.parse(response.body)
      const ids = resources.data.map(project => project.id)
      self.index = yield apiClient.type('projects').get({ id: ids.toString(), cards: true })
    } catch (error) {
      console.warn(error);
    }
  })
}))

export { ProjectsStore }
