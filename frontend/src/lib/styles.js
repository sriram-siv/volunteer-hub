const select = theme => ({
  control: styles => ({
    ...styles,
    backgroundColor: theme.background,
    borderRadius: '2px',
    borderColor: theme.shadow,
    height: 'calc(2rem)'
  }),
  singleValue: styles => ({
    ...styles,
    color: theme.text,
    fontWeight: theme.fontWeight,
    letterSpacing: theme.letterSpacing,
    left: '50%',
    transform: 'translate(calc(-50% + 1rem), -50%)'
  }),
  menu: styles => ({
    ...styles,
    backgroundColor: theme.background,
    color: theme.text,
    borderRadius: '2px',
    textAlign: 'center'
  }),
  indicatorSeparator: () => ({ width: 0 })
})

export default { select }