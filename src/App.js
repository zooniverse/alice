import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Grommet } from 'grommet'
import './App.css'
import Home from './screens/Home'
import ProjectsIndex from './screens/ProjectsIndex'
import Editor from './screens/Editor'
import Header from './screens/Header'
import { mergedTheme } from './theme'

function App() {
  return (
    <Router>
      <>
        <main>
          <Grommet theme={mergedTheme}>
            <Route exact path="/" component={Home} />
            <Route path="/projects" component={Header}/>
            <Route exact path="/projects" component={ProjectsIndex}/>
            <Route exact path="/projects/editor" component={Editor}/>
          </Grommet>
        </main>
      </>
    </Router>
  );
}

export default App;
