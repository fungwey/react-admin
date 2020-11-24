import React, { Component } from "react";
// url
import requestUrl from "@api/requestUrl";
// api
import { TableList } from "@api/common";
// propTypes
import PropTypes from "prop-types";
// antd
import { Form, Input, Button, Select, InputNumber, Radio } from "antd";
// connect
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// action
import { addDepartmentList } from "@/store/action/Department";

const { Option } = Select;

class FormSearch extends Component {
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

  componentDidMount() {
    this.onSubmit();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.formConfig && props.formConfig.setFieldValue) {
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
        item.options = this.props.config[item.optionsKey];
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

  search = (params) => {
    const searchData = params.searchData;
    // 处理业务逻辑
    const requestData = {
      url: requestUrl[params.url],
      data: {
        pageNumber: 1,
        pageSize: 10,
      },
    };
    if (
      JSON.stringify(searchData) !== "{}" &&
      Object.keys(searchData).length !== 0
    ) {
      for (const key in searchData) {
        if (searchData[key] !== undefined && searchData[key] !== "") {
          requestData.data[key] = searchData[key];
        }
      }
    }
    console.log(searchData);
    // this.setState({
    //   loadingTable: true,
    // });
    TableList(requestData)
      .then((data) => {
        const responseData = data.data.data;
        console.log(responseData);
        this.props.action.list(responseData);
      })
      .finally(() => {
        // this.setState({
        //   loadingTable: false,
        // });
      });
  };

  /**
   * 提交表单
   * 1.添加
   * 2.修改
   */
  onSubmit = (values) => {
    const searchData = {};
    for (const key in values) {
      if (values[key] !== undefined && values[key] !== "") {
        searchData[key] = values[key];
      }
    }

    this.search({
      url: "departmentList",
      searchData,
    });
  };

  render() {
    return (
      <Form
        layout="inline"
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
            搜索
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
// 校验数据类型
FormSearch.propTypes = {
  formConfig: PropTypes.object,
};
// 默认值
FormSearch.defaultProps = {
  formConfig: {},
};
const mapStateToProps = (state) => ({
  config: state.config,
});
const mapDispatchToPRops = (dispatch) => {
  return {
    // listData: bindActionCreators(addDepartmentList, dispatch),
    action: bindActionCreators(
      {
        list: addDepartmentList,
      },
      dispatch
    ),
  };
};
export default connect(mapStateToProps, mapDispatchToPRops)(FormSearch);
