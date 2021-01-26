const themes = {
  dark: {
    name: 'dark',
    primary: '#ffff50',
    shadow: '#aeb4ba',
    background: '#222',
    text: '#ccc',
    fontWeight: 300,
    letterSpacing: '-0.002rem',
    accent: '#999',
    panels: '#131d25',
    glass: '#cccd'
  },
  light: {
    name: 'light',
    primary: '#ffff50',
    shadow: '#aeb4ba',
    background: '#fff',
    text: '#333',
    fontWeight: 400,
    letterSpacing: 0,
    accent: '#eee',
    panels: 'papayawhip',
    glass: '#fafafada'
  }
}

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
    textAlign: 'center',
    fontWeight: theme.fontWeight
  }),
  indicatorSeparator: () => ({ width: 0 })
})

export default { themes, select }