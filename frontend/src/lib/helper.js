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

/** Takes an array of either strings of 2 item arrays
 * If item is a string - returns menu item with label 
 * and value equal to string. If array - returns menu
 * item with label of 1st item and value of 2nd.
 */
export const selectMenu = option => (
  typeof (option) === 'object'
    ? { label: option[0], value: option[1] }
    : { label: option, value: option }
)

export const actionKeyPressed = (event, targetName) => {

  const isContainer = event.target.getAttribute('name') === targetName
  const isActionKey = ['Enter', 'Space'].includes(event.code)

  return isActionKey && isContainer
}