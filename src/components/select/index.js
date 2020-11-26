import React, { Component } from "react";
// propTypes
import PropTypes from "prop-types";
// api
import { requestData } from "@api/common";
import requestUrl from "@api/requestUrl";
// antd
import { Select } from "antd";

const { Option } = Select;

class SelectComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      options: [],
      value: "",
    };
  }

  componentDidMount() {
    this.getSelectList();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let { value, name } = nextProps;
    if (!value) {
      return false;
    }
    // 判断是否是JSON对象
    if (Object.prototype.toString.call(value) === "[object Object]") {
      value = value[name]; // { parentId: "760" }
    }
    if (value !== prevState.value) {
      return {
        value: value,
      };
    }
    // 直接放在最后面
    return null;
  }

  getSelectList = () => {
    const url = this.props.url;
    const data = {
      url: requestUrl[url],
    };
    // 不存在url 停止调用接口
    if (!data.url) {
      return false;
    }
    // 接口
    requestData(data)
      .then((res) => {
        this.setState({
          options: res.data.data.data,
        });
      })
      .finally(() => {
        this.setState({
          loadingTable: false,
        });
      });
  };

  // antd 复杂组件要求
  onChange = (value) => {
    this.setState({
      value,
    });
    this.triggerChange(value);
  };

  triggerChange = (changedValue) => {
    const { onChange, name } = this.props;
    if (onChange) {
      onChange({
        [name]: changedValue,
        SelectComponent: true,
      });
    }
  };

  render() {
    const { options, value } = this.state;
    const { style, placeholder, props } = this.props;
    return (
      <Select
        style={style}
        placeholder={placeholder}
        onChange={this.onChange}
        value={value}
      >
        {options &&
          options.map((elem) => {
            return (
              <Option value={elem[props.value]} key={elem[props.value]}>
                {elem[props.label]}
              </Option>
            );
          })}
      </Select>
    );
  }
}
// 校验数据类型
SelectComponent.propTypes = {
  formConfig: PropTypes.object,
};
// 默认值
SelectComponent.defaultProps = {
  formConfig: {},
};

export default SelectComponent;
