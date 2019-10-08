import React from 'react'
import { Router, Route } from 'react-router-dom'
import { Grommet } from 'grommet'
import AppContext from 'store'
import history from './history'
import './App.css'
import Home from './screens/Home'
import ProjectsIndex from './screens/ProjectsIndex'
import SubjectsIndex from './screens/SubjectsIndex'
import SubjectSetsIndex from './screens/SubjectSetsIndex'
import WorkflowsIndex from './screens/WorkflowsIndex'
import Editor from './screens/Editor'
import Header from './screens/Header'
import { mergedTheme } from './theme'
import {
  PROJECTS_PATH,
  WORKFLOWS_PATH,
  SUBJECT_SETS_PATH,
  SUBJECTS_PATH,
  EDIT_PATH
} from 'paths'

function App() {
  const store = React.useContext(AppContext)
  store.auth.checkCurrent()

  return (
    <Router history={history}>
      <>
        <main>
          <Grommet theme={mergedTheme}>
            <Route exact path="/" component={Home} />
            <Route path="/projects" component={Header}/>
            <Route exact path={PROJECTS_PATH} component={ProjectsIndex}/>
            <Route exact path={WORKFLOWS_PATH} component={WorkflowsIndex}/>
            <Route exact path={SUBJECT_SETS_PATH} component={SubjectSetsIndex}/>
            <Route exact path={SUBJECTS_PATH} component={SubjectsIndex}/>
            <Route exact path={EDIT_PATH} component={Editor}/>
          </Grommet>
        </main>
      </>
    </Router>
  );
}

export default App
