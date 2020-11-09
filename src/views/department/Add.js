import React, { Component } from "react";

// antd
import { Form, Input, Button, Radio, InputNumber, message } from "antd";

// api
import { DepartmentAdd, Detail, DepartmentEdit } from "@api/department";

class Add extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      id: "",
      formConfig: {
        url: "departmentAdd",
        initValue: {
          number: 0,
          status: true,
        },
        setFieldValue: {},
      },
      formLayout: {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 18,
        },
      },
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.location.state) {
      return {
        id: props.location.state.id,
      };
    } else {
      return null;
    }
  }

  componentDidMount() {
    this.getDetailed();
  }

  getDetailed = () => {
    if (!this.props.location.state) {
      return false;
    }
    Detail({ id: this.state.id }).then((response) => {
      // this.setState({
      //   formConfig: {
      //     ...this.state.formConfig,
      //     setFieldValue: response.data.data,
      //   },
      // });
      this.refs.form.setFieldsValue(response.data.data);
    });
  };

  onSubmit = (values) => {
    this.setState({
      loading: true,
    });
    // 确定按钮执行添加和编辑
    this.state.id ? this.onHandlerEdit(values) : this.onHandlerAdd(values);
  };

  /** 添加信息 */
  onHandlerAdd = (values) => {
    DepartmentAdd(values)
      .then((response) => {
        console.log(response);
        message.info(response.data.message, 1);
      })
      .catch((error) => {
        console.log(error, "error");
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
        this.refs.form.resetFields();
      });
  };

  /** 编辑信息 */
  onHandlerEdit = (values) => {
    const requestData = values;
    requestData.id = this.state.id;
    DepartmentEdit(requestData)
      .then((response) => {
        console.log(response);
        message.info(response.data.message, 1);
      })
      .catch((error) => {
        console.log(error, "error");
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
        this.refs.form.resetFields();
      });
  };

  render() {
    return (
      <Form
        ref="form"
        {...this.state.formLayout}
        initialValues={{ status: true, number: 10 }}
        onFinish={this.onSubmit}
      >
        <Form.Item
          label="部门名称"
          name="name"
          rules={[{ required: true, message: "请输入部门名称!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="人员数量"
          name="number"
          rules={[{ required: true, message: "请输入人员数量!" }]}
        >
          <InputNumber min={1} max={200} />
        </Form.Item>
        <Form.Item name="status" label="禁启用">
          <Radio.Group>
            <Radio value={false}>禁用</Radio>
            <Radio value={true}>启用</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="描述" name="content">
          <Input.TextArea />
        </Form.Item>
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

export default Add;
