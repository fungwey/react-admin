import React, { Component, Fragment } from "react";
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
import { Register } from "../../api/account";

// 组件
import Code from "../../components/code/index";

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      module: "register",
    };
  }
  onFinish = (values) => {
    delete values.password1;
    Register(values)
      .then((response) => {
        console.log(response);
        if (response.data.resCode !== 0) {
          message.warning(response.data.message, 1);
        } else {
          message.success(response.data.message);
          this.toggleForm();
        }
      })
      .catch((error) => {
        console.log(error, "error");
      });
    console.log("Received values of form: ", values);
  };

  toggleForm = () => {
    this.props.switchForm("login");
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

  render() {
    const { username, module } = this.state;
    const _this = this;
    return (
      <Fragment>
        <div className="form-header">
          <div className="column">注册</div>
          <span onClick={this.toggleForm}>账号登录</span>
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
                onChange={this.inputChange}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="邮箱"
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
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item
              name="password1"
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
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject("您输入的两个密码不匹配!");
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="再次输入密码"
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
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Fragment>
    );
  }
}

export default RegisterForm;
