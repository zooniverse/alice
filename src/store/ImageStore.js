import { types } from 'mobx-state-tree'

const ROTATION_STEP = 90;
const STEP = 0.4;
const MAX_STEP = 2;
const MIN_STEP = 0.6;

const ImageStore = types.model('ImageStore', {
  rotation: types.optional(types.number, 0),
  scale: types.optional(types.number, 1)
}).actions(self => ({
  rotate() {
    self.rotation = self.rotation === 360 ? 0 : self.rotation + ROTATION_STEP
  },
  zoomIn() {
    if (self.scale < MAX_STEP)
      self.scale += STEP
  },
  zoomOut() {
    if (self.scale > MIN_STEP)
      self.scale -= STEP
  }
}))

export { ImageStore }
