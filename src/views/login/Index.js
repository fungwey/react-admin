import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
// css
import "./index.scss";
// 组件
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
// 方法
import { GETTOKEN } from "../../utils/cookies";

class login extends Component {
  constructor() {
    super();
    this.state = {
      formType: "login",
    };
  }

  switchForm = (value) => {
    console.log(value);
    this.setState({
      formType: value,
    });
  };

  render() {
    console.log(GETTOKEN());
    return (
      <Route
        render={(routeProps) =>
          GETTOKEN() ? (
            <Redirect to="/index" />
          ) : (
            <div className="form-wrap">
              <div>
                {this.state.formType === "login" ? (
                  <LoginForm switchForm={this.switchForm}></LoginForm>
                ) : (
                  <RegisterForm switchForm={this.switchForm}></RegisterForm>
                )}
              </div>
            </div>
          )
        }
      />
    );
  }
}

export default login;
