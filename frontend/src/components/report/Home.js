import React, { Component } from "react";

import Report from "./Report";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <p>This is the home page</p>
          </Route>

          <Route path="/join" component={Report} />
        </Switch>
      </Router>
    );
  }
}
