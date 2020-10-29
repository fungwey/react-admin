import React, { Component } from "react";

// antd
import { Form, Input, Button, Radio, InputNumber, message } from "antd";

// api
import { DepartmentAdd } from "../../api/department";

class Add extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
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

  onSubmit = (values) => {
    this.setState({
      loading: true,
    });
    DepartmentAdd(values)
      .then((response) => {
        console.log(response);
        message.info(response.data.message, 1);
      })
      .catch((error) => {
        message.error(error.data.message);
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
