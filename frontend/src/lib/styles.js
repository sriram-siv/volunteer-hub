const themes = {
  dark: {
    name: 'dark',
    primary: '#ffff50',
    shadow: '#72787e',
    background: '#131d25',
    text: '#ccc',
    fontWeight: 300,
    letterSpacing: '0.015rem',
    accent: '#8695a3',
    panels: '#0b1014',
    glass: '#cccd'
  },
  light: {
    name: 'light',
    primary: '#ffff50',
    shadow: '#aeb4ba',
    background: '#dde8f6',
    text: '#333',
    fontWeight: 400,
    letterSpacing: 0,
    accent: 'lightyellow',
    panels: '#ffffff',
    glass: '#fafafada'
  }
}

const select = theme => ({
  control: styles => ({
    ...styles,
    backgroundColor: theme.panels,
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