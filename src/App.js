import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './Home'
import Projects from './screens/ProjectsIndex'

function App() {
  return (
    <Router>
      <>
        <main>
          <Route path="/" exact component={Home} />
          <Route path="/projects" component={Projects} />
        </main>
      </>
    </Router>
  );
}

export default App;
