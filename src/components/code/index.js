import React, { Component } from "react";

// 导入antd
import { Button, message } from "antd";

// 导入API
import { GetCode } from "../../api/account";

class Code extends Component {
  constructor(props) {
    // 初始化props
    super(props);
    this.state = {
      username: props.username,
      module: props.module,
      button_text: "获取验证码",
      button_loading: false,
      button_disabled: false,
      timer: null,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      username: props.username,
    };
  }

  /**
   * 获取验证码
   */
  getCode = () => {
    if (!this.state.username) {
      message.warning("邮箱不能为空", 1);
      return;
    }
    this.setState({
      button_loading: true,
      button_text: "发送中",
    });
    const requestData = {
      username: this.state.username,
      module: this.state.module,
    };
    GetCode(requestData)
      .then((response) => {
        console.log(response);
        if (response.data.resCode !== 0) {
          message.warning(response.data.message, 1);
          this.setState({
            button_loading: false,
          });
        } else {
          this.countDowm();
          message.success(response.data.message, 0);
        }
      })
      .catch((error) => {
        console.log("error", error);
        this.setState({
          button_loading: false,
          button_text: "重新获取",
        });
      });
  };

  /**
   * 倒计时
   */
  countDowm = () => {
    let sec = 60;
    this.setState({
      button_loading: false,
      button_disabled: true,
      button_text: `${sec}S`,
      timer: setInterval(() => {
        if (sec <= 0) {
          clearInterval(this.state.timer);
          this.setState({
            button_loading: false,
            button_disabled: false,
            button_text: `重新获取`,
          });
        } else {
          this.setState({
            button_text: `${--sec}S`,
          });
        }
      }, 1000),
    });
  };

  // 销毁组件，卸载计时器
  componentWillUnmount() {
    this.state.timer && clearInterval(this.state.timer);
    this.setState({
      timer: null,
    });
  }

  render() {
    const { button_text, button_loading, button_disabled } = this.state;
    return (
      <Button
        type="danger"
        loading={button_loading}
        disabled={button_disabled}
        block
        onClick={this.getCode}
      >
        {button_text}
      </Button>
    );
  }
}

export default Code;
