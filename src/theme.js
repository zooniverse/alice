const theme = {
  global: {
    colors: {
      border: {
        light: 'light-5'
      },
      gray: '#979797',
      medGray: 'dark-5',
      sand: 'light-1'
    },
    input: {
      padding: '0'
    }
  },
  anchor: {
    color: '#005FFF',
    textDecoration: 'underline'
  },
  checkBox: {
    check: {
      radius: 0
    },
    size: '1em'
  },
  formField: {
    label: {
      margin: { "horizontal": "none" }
    }
  },
  heading: {
    weight: 300
  },
  table: {
    extend: props => `
      tr:nth-child(even) {
        background: #EEEEEE;
      }
      thead {
        text-transform: uppercase;
      }
      span {
        font-size: 0.8em;
      }
    `
  }
}

module.exports = theme;
