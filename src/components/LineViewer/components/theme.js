const theme = {
  checkBox: {
    check: {
      radius: '0'
    },
    color: 'black',
    hover: {
      border: {
        color: {
          dark: 'black',
          light: 'black'
        }
      }
    },
    icon: {
      extend: {
        background: 'black',
      }
    },
    size: '0.75em',
    extend: props => `
      div {
        background: white;
        border: 1px solid black;
      }
    `,
  }
}

export default theme
