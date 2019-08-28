import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import merge from 'lodash/merge'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import './App.css'
import Home from './screens/Home'
import Projects from './screens/ProjectsIndex'
import baseTheme from './theme'

function App() {
  const mergedTheme = merge({}, zooTheme, baseTheme)
  return (
    <Router>
      <>
        <main>
          <Grommet theme={mergedTheme}>
            <Route exact path="/" component={Home} />
            <Route path="/projects" component={Projects} />
          </Grommet>
        </main>
      </>
    </Router>
  );
}

export default App;
