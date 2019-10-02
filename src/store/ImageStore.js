import { types } from 'mobx-state-tree'

const STEP = 0.2;

const ImageStore = types.model('ImageStore', {
  scale: types.optional(types.number, 1)
}).actions(self => ({
  zoomIn() { self.scale += STEP },
  zoomOut() { self.scale -= STEP }
}))

export { ImageStore }
