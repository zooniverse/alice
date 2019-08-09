import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Projects from './screens/ProjectsIndex';
import { Grommet } from 'grommet';
import grommetTheme from './theme';

function App() {
  return (
    <Router>
      <>
        <main>
          <Grommet theme={grommetTheme}>
            <Route path="/" exact component={Home} />
            <Route path="/projects" component={Projects} />
          </Grommet>
        </main>
      </>
    </Router>
  );
}

export default App;
