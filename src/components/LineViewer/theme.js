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
    size: '0.5em',
    extend: props => `
      div {
        border: none
      }

      > div {
        background: white;
        border: 0.5px solid black;
      }
    `,
  },
  textInput: {
    container: {
      extend: props => `
        input {
          font-style: italic;
          padding: 0.4em;
        }
      `
    }
  }
}

export default theme
