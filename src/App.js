import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
// 引用组件
import Login from "./views/login/Index";
import Index from "./views/index/Index";

// 私有组件方法
import PrivateRouter from "./components/privateRouter";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route component={Login} exact path="/"></Route>
          <PrivateRouter component={Index} path="/index"></PrivateRouter>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
