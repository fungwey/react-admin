import React from "react";
import { Switch } from "react-router-dom";

// 私有组件方法
import PrivateRouter from "../privateRouter/index";

import Components from "./components";

class ContainerMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Switch>
        {Components.map((item) => {
          return (
            <PrivateRouter
              exact
              key={item.path}
              path={item.path}
              component={item.component}
            ></PrivateRouter>
          );
        })}
      </Switch>
    );
  }
}

export default ContainerMain;
