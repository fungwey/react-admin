import React from "react";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";
import { Switch, Route, BrowserRouter } from "react-router-dom";
// 引用组件
import Login from "./views/login/Index";
import Index from "./views/index/Index";

// 私有组件方法
import PrivateRouter from "./components/privateRouter";

// store
import Store from "@/store/Index";
// Provider
import { Provider } from "react-redux";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={Store}>
        <ConfigProvider locale={zhCN}>
          <BrowserRouter>
            <Switch>
              <Route component={Login} exact path="/"></Route>
              <PrivateRouter component={Index} path="/index"></PrivateRouter>
            </Switch>
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    );
  }
}

export default App;
