const theme = {
  checkBox: {
    color: {
      light: 'white',
      dark: 'white'
    },

    toggle: {
      extend: ({ checked }) => `
        ${checked ? `background-color: #078F52;` : `background-color: #D8D8D8`}
        border-width: 1px;
      `
    }
  }
}

export default theme
