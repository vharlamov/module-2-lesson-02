export default function isEqual(obj1, obj2) {
  const pos1 = Object.getOwnPropertyNames(obj1)
  const pos2 = Object.getOwnPropertyNames(obj2)

  if (pos1.length !== pos2.length) return false

  const length = pos1.length

  for (let i = 0; i < length; i++) {
    const bothObj = typeof pos1[i] === "object" && typeof pos2[i] === "object"

    if (!bothObj) {
      if (obj1[pos1[i]] !== obj2[pos2[i]]) {
        return false
      } else {
        continue
      }
    } else {
      isEqual(pos1[i], pos2[i])
    }
  }
  return true
}
