import React, { Component, Fragment } from "react";

// 白名单
import { withRouter } from "react-router-dom";

// css
import "./index.scss";

// ANTD
import { Row, Col, Form, Input, Button, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  VerifiedOutlined,
} from "@ant-design/icons";

// 验证
import { validate_password, validate_email } from "../../utils/validate";

// API
import { Login, GetCode } from "../../api/account";

// 组件
import Code from "../../components/code/index";

// 方法
import { SETTOKEN, SETUSERNAME } from "../../utils/cookies";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      module: "login",
      code_button_disabled: true,
      code_button_loading: false,
      code_button_text: "获取验证码",
      loading: false,
    };
  }
  onFinish = (values) => {
    this.setState({
      loading: true,
    });
    Login(values)
      .then((response) => {
        console.log(response);
        if (response.data.resCode !== 0) {
          message.warning(response.data.message, 1);
        } else {
          message.success("登录成功", 1);
          SETTOKEN(response.data.data.token);
          SETUSERNAME(response.data.data.username);
          setTimeout(() => {
            this.props.history.push("/index");
          }, 1300);
        }
      })
      .catch((error) => {
        console.log(error, "error");
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
    console.log("Received values of form: ", values);
  };

  toggleForm = () => {
    this.props.switchForm("register");
  };

  /**
   * input 输入处理
   */
  inputChange = (e) => {
    let value = e.target.value;
    console.log(value);
    this.setState({
      username: value,
    });
  };

  /**
   * 获取验证码
   */
  getCode = () => {
    console.log("huoqu yanzhengma");
    if (!this.state.username) {
      message.warning("用户名不能为空", 1);
      return;
    }

    this.setState({
      code_button_loading: true,
      code_button_text: "发送中",
    });
    const requestData = { username: this.state.username, module: "login" };
    GetCode(requestData)
      .then((response) => {
        console.log(response);
        this.countDowm();
      })
      .catch((error) => {
        console.log("error", error);
        this.setState({
          code_button_loading: false,
          code_button_text: "重新获取",
        });
      });
  };

  render() {
    const { username, module, loading } = this.state;
    const _this = this;
    return (
      <Fragment>
        <div className="form-header">
          <div className="column">登录</div>
          <span onClick={this.toggleForm}>账号注册</span>
        </div>
        <div className="form-content">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "邮箱不能为空!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (validate_email(value)) {
                      _this.setState({
                        code_button_disabled: false,
                      });
                      return Promise.resolve();
                    }
                    return Promise.reject("邮箱格式不正确");
                  },
                }),
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="email"
                value={username}
                onChange={this.inputChange}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "密码不能为空!",
                },
                {
                  min: 6,
                  message: "不能少于6位",
                },
                {
                  max: 20,
                  message: "不能大于20位",
                },
                {
                  pattern: validate_password,
                  message: "请输入数字和字母",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Row gutter={13}>
              <Col className="gutter-row" span={16}>
                <Form.Item
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: "验证码不能为空!",
                    },
                    {
                      len: 6,
                      message: "请输入6位的验证码",
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <VerifiedOutlined className="site-form-item-icon" />
                    }
                    placeholder="Code"
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={8}>
                <Code username={username} module={module} />
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
                loading={loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(LoginForm);
