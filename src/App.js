import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Grommet } from 'grommet'
import './App.css'
import Home from './screens/Home'
import Projects from './screens/ProjectsIndex'
import { mergedTheme } from './theme'

function App() {
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
