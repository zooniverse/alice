import {
  ImageStore,
  DEFAULT_STEP,
  STEP,
  MAX_STEP,
  MIN_STEP
} from './ImageStore'

let imageStore;

describe('Model > ImageStore', function () {
  beforeEach(function() {
    imageStore = ImageStore.create()
  })

  it('should exist', function () {
    expect(ImageStore).toBeDefined()
  })

  describe('Actions > zoomIn', function () {
    it('should zoom in the image by the correct step', function() {
      imageStore.zoomIn()
      expect(imageStore.scale).toBe(DEFAULT_STEP + STEP)
    })

    it('should not allow zooming past the max step', function() {
      imageStore = ImageStore.create({ scale: MAX_STEP })
      imageStore.zoomIn()
      expect(imageStore.scale).toBe(MAX_STEP)
    })
  })

  describe('Actions > zoomOut', function () {
    it('should out the image by the correct step', function() {
      imageStore.zoomOut()
      expect(imageStore.scale).toBe(DEFAULT_STEP - STEP)
    })

    it('should not allow zooming out below the min step', function() {
      imageStore = ImageStore.create({ scale: MIN_STEP })
      imageStore.zoomOut()
      expect(imageStore.scale).toBe(MIN_STEP)
    })
  })

  describe('Actions > rotate', function () {
    it('should rotate the image by 90 degrees', function () {
      imageStore.rotate()
      expect(imageStore.rotation).toBe(90)
    })

    it('should not allow rotation past 360 degrees', function () {
      imageStore = ImageStore.create({ rotation: 360 })
      imageStore.rotate()
      expect(imageStore.rotation).toBe(0)
    })
  })

  describe('Actions > setTranslate', function () {
    it('should set the correct translation', function() {
      const pos = { x: 10, y: 15 }
      imageStore.setTranslate(pos)
      expect(imageStore.translateX).toBe(pos.x)
      expect(imageStore.translateY).toBe(pos.y)
    })
  })

  describe('Actions > reset', function () {
    it('should set values back to default', function() {
      imageStore.rotate()
      imageStore.zoomIn()
      imageStore.reset()
      expect(imageStore.rotation).toBe(0)
      expect(imageStore.scale).toBe(DEFAULT_STEP)
    })
  })
})
