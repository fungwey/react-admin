import React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
// 引用组件
import Login from "./views/login/Index";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route component={Login} exact path="/"></Route>
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
