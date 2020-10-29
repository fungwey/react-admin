import React from "react";
import { Route, Redirect } from "react-router-dom";

// 方法
import { GETTOKEN } from "../../utils/cookies";

const PrivateRouter = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        GETTOKEN() ? <Component {...routeProps} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRouter;
