const BORDER_MAP = {
  LEFT: [{ side: 'left'}, {side: 'horizontal' }],
  MIDDLE: [{ side: 'horizontal' }],
  RIGHT: [{ side: 'right'}, {side: 'horizontal' }],
  NONE: false
}

export function getPage(key) {
  const dotIndex = key.indexOf('.')
  return parseInt(key[dotIndex -1])
}

export function getSlopeLabel(key) {
  return parseInt(key[key.length - 1])
}

export function spotInGroup(slopes, index) {
  const currentPage = getPage(slopes[index])

  const samePageToLeft = index - 1 >= 0 && getPage(slopes[index - 1]) === currentPage
  const samePageToRight = index + 1 < slopes.length && getPage(slopes[index + 1]) === currentPage

  if (!samePageToLeft && samePageToRight) {
    return BORDER_MAP.LEFT
  } else if (samePageToLeft && samePageToRight) {
    return BORDER_MAP.MIDDLE
  } else if (samePageToLeft && !samePageToRight) {
    return BORDER_MAP.RIGHT
  }
  return BORDER_MAP.NONE
}

export function isolateGroups(slopeKeys) {
  let currentPage;
  let frameGroup = [];
  let slopeGroups = []

  slopeKeys.forEach((key, index) => {
    const keyPage = getPage(key)
    if (keyPage !== currentPage) {
      if (frameGroup.length > 0) {
        slopeGroups.push(frameGroup)
      }
      frameGroup = []
      currentPage = keyPage
    }
    frameGroup.push(key)
    if (index === slopeKeys.length - 1) {
      slopeGroups.push(frameGroup)
    }
  })
  return slopeGroups
}
