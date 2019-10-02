import { types } from 'mobx-state-tree'

const ROTATION_STEP = 90;
const STEP = 0.2;

const ImageStore = types.model('ImageStore', {
  rotation: types.optional(types.number, 0),
  scale: types.optional(types.number, 1)
}).actions(self => ({
  rotate() {
    self.rotation = self.rotation === 360 ? 0 : self.rotation + ROTATION_STEP
  },
  zoomIn() { self.scale += STEP },
  zoomOut() { self.scale -= STEP }
}))

export { ImageStore }
