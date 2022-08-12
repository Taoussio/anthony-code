import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';

import Home from './page/Home'
import Form1 from './page/Form1'
import Form2 from './page/Form2'
import Form3 from './page/Form3'
import SuccessPage from './page/SuccessPage'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route path="/success">
                <SuccessPage />
              </Route>
              <Route path="/monoligne">
                <Form1 />
              </Route>
              <Route path="/flottemobile">
                <Form2 />
              </Route>
              <Route path="/multiligne">
                <Form3 />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
