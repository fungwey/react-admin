import React, { Component } from "react";
// propTypes
import PropTypes from "prop-types";
import { Form, Input, Button, Select, InputNumber, Radio, message } from "antd";
// url
import requestUrl from "@api/requestUrl";
//  API
import { requestData } from "@api/common";

const { Option } = Select;

class FormCom extends Component {
  constructor(props) {
    super();
    this.state = {
      mesPreix: {
        Input: "请输入",
        InputNumber: "请输入",
        Radio: "请选择",
        Select: "请选择",
      },
      setFieldValue: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.formConfig.setFieldValue) {
      return {
        setFieldValue: props.formConfig.setFieldValue,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.setFieldValue &&
      this.state.setFieldValue !== prevState.setFieldValue
    ) {
      this.refs.form.setFieldsValue(this.state.setFieldValue);
    }
  }

  rules = (item) => {
    //   state
    const { mesPreix } = this.state;
    let rules = [];
    if (item.required) {
      rules.push({
        required: true,
        message: item.message || `${mesPreix[item.type] + item.label}`,
      });
    }
    if (item.rules && item.rules.length > 0) {
      rules = rules.concat(item.rules);
    }
    return rules;
  };

  /** input */
  inputElem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}
      >
        <Input style={item.style} placeholder={item.placeholder} />
      </Form.Item>
    );
  };

  /** InputNumber */
  inputNumberElem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}
      >
        <InputNumber
          min={item.min}
          max={item.max}
          style={item.style}
          placeholder={item.placeholder}
        />
      </Form.Item>
    );
  };

  /** select */
  selectElem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}
      >
        <Select style={item.style} placeholder={item.placeholder}>
          {item.options &&
            item.options.map((elem) => {
              return (
                <Option value={elem.value} key={elem.value}>
                  {elem.label}
                </Option>
              );
            })}
        </Select>
      </Form.Item>
    );
  };

  /** Radio */
  radioElem = (item) => {
    const rules = this.rules(item);
    return (
      <Form.Item
        label={item.label}
        name={item.name}
        key={item.name}
        rules={rules}
      >
        <Radio.Group>
          {item.options &&
            item.options.map((elem) => {
              return (
                <Radio value={elem.value} key={elem.value}>
                  {elem.label}
                </Radio>
              );
            })}
        </Radio.Group>
      </Form.Item>
    );
  };

  /** 初始化 */
  initFormItem = () => {
    const { formItem } = this.props;
    // 检测是否存在formItem
    if (!formItem || formItem.length === 0) {
      return false;
    }

    // 循环处理
    const formList = [];
    formItem.map((item) => {
      if (item.type === "Input") {
        formList.push(this.inputElem(item));
      }
      if (item.type === "Select") {
        formList.push(this.selectElem(item));
      }
      if (item.type === "InputNumber") {
        formList.push(this.inputNumberElem(item));
      }
      if (item.type === "Radio") {
        formList.push(this.radioElem(item));
      }
      return item;
    });
    return formList;
  };

  /**
   * 提交表单
   * 1.添加
   * 2.修改
   */
  onSubmit = (values) => {
    this.setState({
      loading: true,
    });
    // // 确定按钮执行添加和编辑
    // this.state.id ? this.onHandlerEdit(values) : this.onHandlerAdd(values);
    // this.props.onSubmit(values);
    const data = {
      url: requestUrl[this.props.formConfig.url],
      data: values,
    };
    requestData(data)
      .then((response) => {
        message.info(response.data.message);
        this.refs.form.resetFields();
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    return (
      <Form
        ref="form"
        {...this.state.formLayout}
        initialValues={this.props.formConfig.initValue}
        onFinish={this.onSubmit}
        {...this.props.formLayout}
      >
        {this.initFormItem()}
        <Form.Item>
          <Button
            loading={this.state.loading}
            htmlType="subject"
            type="primary"
          >
            确定
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
// 校验数据类型
FormCom.propTypes = {
  formConfig: PropTypes.object,
};
// 默认值
FormCom.defaultProps = {
  formConfig: {},
};

export default FormCom;
