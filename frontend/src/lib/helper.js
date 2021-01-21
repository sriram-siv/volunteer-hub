export const pick = (obj, props) => (
  props.reduce((res, prop) => ({ ...res, [prop]: obj[prop] }), {})
)

/**
 * Returns new array with value updated at specified index
 * @param {*} array
 * @param {*} index
 * @param {*} value
 */
export const update = (array, index, value) => (
  array.map((prev, i) => index === i ? value : prev)
)

export const selectMenu = str => ({ label: str, value: str })