import { types } from 'mobx-state-tree'

const ROTATION_STEP = 90;
const DEFAULT_STEP = 1
const STEP = 0.4;
const MAX_STEP = 2;
const MIN_STEP = 0.6;

const ImageStore = types.model('ImageStore', {
  rotation: types.optional(types.number, 0),
  scale: types.optional(types.number, 1),
  translateX: types.optional(types.number, 0),
  translateY: types.optional(types.number, 0)
}).actions(self => ({
  reset() {
    self.rotation = 0;
    self.scale = DEFAULT_STEP;
    self.translateX = 0;
    self.translateY = 0;
  },
  rotate() {
    self.rotation = self.rotation === 360 ? 0 : self.rotation + ROTATION_STEP
  },
  setScale({ clientHeight, clientWidth, naturalHeight, naturalWidth }) {
    let bestFit = 1;
    if (clientHeight && clientWidth && naturalHeight && naturalWidth) {
      bestFit = Math.min(
        clientWidth / naturalWidth,
        clientHeight / naturalHeight
      )
    }
    self.scale = bestFit
  },
  setTranslate(pos) {
    self.translateX += pos.x
    self.translateY += pos.y
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

export { ImageStore, DEFAULT_STEP, STEP, MAX_STEP, MIN_STEP }
