export default function isEqual(a, b) {
  if (a instanceof Array && b instanceof Array) {
    if (a.length !== b.length)
      return false

    return a.every((val, i) => val === b[i])
  }
  return a === b
}
