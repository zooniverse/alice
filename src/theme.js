const theme = {
  global: {
    colors: {
      link: '#005FFF',
      gray: '#979797',
      medGray: '#5C5C5C',
      sand: '#EFF2F5'
    }
  },
  anchor: {
    textDecoration: 'underline'
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
      label div {
        border-radius: 0;
        border-color: 1px solid #979797;
        height: 1em;
        width: 1em;
      }
    `
  }
}

module.exports = theme;
