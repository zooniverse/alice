import { types } from 'mobx-state-tree'

const ROTATION_STEP = 90;
const DEFAULT_SCALE = 1
const STEP = 0.1;
const MAX_STEP = 1.5;
const MIN_STEP = 0.2;

const ImageStore = types.model('ImageStore', {
  imageScale: types.optional(types.number, DEFAULT_SCALE),
  rotation: types.optional(types.number, 0),
  scale: types.optional(types.number, DEFAULT_SCALE),
  translateX: types.optional(types.number, 0),
  translateY: types.optional(types.number, 0)
}).actions(self => ({
  reset() {
    self.rotation = 0;
    self.scale = self.imageScale;
    self.translateX = 0;
    self.translateY = 0;
  },
  rotate() {
    self.rotation = self.rotation === 360 ? 0 : self.rotation + ROTATION_STEP
  },
  setScale(args) {
    const { clientHeight, clientWidth, naturalHeight, naturalWidth } = args || {}
    let bestFit = 1;
    if (clientHeight && clientWidth && naturalHeight && naturalWidth) {
      bestFit = Math.min(
        clientWidth / naturalWidth,
        clientHeight / naturalHeight
      )
    }
    self.imageScale = bestFit
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

export { ImageStore, DEFAULT_SCALE, STEP, MAX_STEP, MIN_STEP }
