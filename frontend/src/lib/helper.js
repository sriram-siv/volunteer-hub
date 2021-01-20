const pick = (obj, props) => (
  props.reduce((res, prop) => ({ ...res, [prop]: obj[prop] }), {})
)