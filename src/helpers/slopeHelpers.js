export function getPage(key) {
  const dotIndex = key.indexOf('.')
  return parseInt(key[dotIndex -1])
}

export function getSlopeLabel(key) {
  return parseInt(key[key.length - 1])
}

export default function getSlopeGroups(slopeKeys) {
  const slopeGroups = []
  const example = ['frame0.0', 'frame0.1', 'frame1.0', 'frame2.0', 'frame2.1']

  let currentPage;
  let frameGroup;

  example.forEach(key => {
    const keyPage = getPage(key)

    if (keyPage !== currentPage) {
      frameGroup = []
      currentPage = keyPage
      frameGroup.push(key)
    }

    frameGroup.push(key)
  })
}
