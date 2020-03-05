import merge from 'lodash/merge'
import zooTheme from '@zooniverse/grommet-theme'

const theme = {
  global: {
    colors: {
      border: {
        light: 'light-5'
      },
      gray: '#979797',
      placeholder: '#ACACAC'
    },
    input: {
      padding: '0'
    },
  },
  anchor: {
    color: '#0043B8',
    textDecoration: 'underline'
  },
  checkBox: {
    check: {
      radius: '0'
    },
    size: '1.35em',
    gap: 'xxsmall',
    toggle: {
      extend: props => `
      background-color: #D8D8D8;
      border-color: #979797;
      `,
      knob: {
        extend: ({ checked }) => `
        background-color: #FFFFFF;
        border: 1px solid #5C5C5C;
        height: 1em;
        width: 1em;
        ${checked ? `margin: 0.2em 0;` : `margin: 0.2em`}
        `
      }
    }
  },
  dataTable: {
    primary: {
      weight: 300
    }
  },
  formField: {
    label: {
      margin: { bottom: 'xsmall', horizontal: "none" }
    },
    margin: 'medium',
    extend: props => `
      div:first-child {
        border-bottom: none;
      }
    `
  },
  layer: {
    border: {
      radius: '10px'
    },
    overlay: {
      background: 'rgba(225, 225, 225, 0.75)'
    }
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

const mergedTheme = merge({}, zooTheme, theme)
export { mergedTheme, theme }
