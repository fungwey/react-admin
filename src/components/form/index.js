import React, { Component } from "react";
// propTypes
import PropTypes from "prop-types";
//  API
import { requestData } from "@api/common";
// url
import requestUrl from "@api/requestUrl";
// components
import SelectComponent from "@c/select";
// antd
import { Form, Input, Button, InputNumber, Radio, message } from "antd";

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
  // 规则
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
  // 规则
  validatorSelect = (rule, value) => {
    if (value || value[rule.field]) {
      return Promise.resolve();
    }
    return Promise.reject("选项不能为空!");
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
        rules={[...rules, { validator: this.validatorSelect }]}
      >
        <SelectComponent
          style={item.style}
          placeholder={item.placeholder}
          url={item.url}
          props={item.props}
          name={item.name}
          initValue={this.props.formConfig.setFieldValue}
        />
      </Form.Item>
    );
  };

  /** slotElem */
  slotElem = (item) => {
    const rules = this.rules(item);
    console.log("item", item);
    return (
      <Form.Item
        label={item.label}
        key={item.name}
        name={item.name}
        rules={[...rules]}
      >
        {this.props.children && Array.isArray(this.props.children)
          ? this.props.children.filter((elm) => item.slotName === elm.ref)
          : this.props.children}
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
    formItem.forEach((item) => {
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
      if (item.type === "Slot") {
        formList.push(this.slotElem(item));
      }
    });
    return formList;
  };
  formatData = (value) => {
    // 请求数据
    const requestData = JSON.parse(JSON.stringify(value));
    // 需要格式化 JOSN 对象的 key
    const { formatFormKey, editKey, setFieldValue } = this.props.formConfig;
    const keyValue = requestData[formatFormKey];
    // 如果是 JSON 对象
    if (Object.prototype.toString.call(keyValue) === "[object Object]") {
      requestData[formatFormKey] = keyValue[formatFormKey];
    }
    // 判断是否存在“编辑”状态指定的key
    if (editKey) {
      requestData[editKey] = setFieldValue[editKey];
    }
    return requestData;
  };
  /**
   * 提交表单
   * 1.添加
   * 2.修改
   */
  onSubmit = (values) => {
    console.log(values);
    this.setState({
      loading: true,
    });
    if (this.props.submit) {
      this.props.submit(values);
      return false;
    }
    /**
     * 参数为 JSON 对象时进行处理
     */
    const paramsData = this.formatData(values);
    const data = {
      url: requestUrl[this.props.formConfig.url],
      data: paramsData,
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
