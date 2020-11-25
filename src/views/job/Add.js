import React, { Component, Fragment } from "react";

// antd
import { message } from "antd";

// api
import { Detail, DepartmentEdit } from "@api/department";

// 组件
import FormCom from "@c/form/index";

class Add extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      id: "",
      formConfig: {
        url: "jobAdd",
        initValue: { status: false, number: 1 },
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
      formItem: [
        {
          type: "Input",
          label: "职位名称",
          name: "name",
          required: true,
          message: `职位名称不能为空啊啊啊!`,
          placeholder: "请输入职位名称",
          style: {
            width: "300px",
          },
        },
        {
          type: "InputNumber",
          label: "人员数量",
          name: "number",
          required: true,
          message: `人员数量不能为空!`,
          placeholder: "请输入人员数量",
          style: {
            width: "150px",
          },
          min: 1,
          max: 100,
        },
        // {
        //   type: "Select",
        //   label: "选择职位",
        //   name: "numbera",
        //   required: true,
        //   placeholder: "请输入选择职位",
        //   options: [
        //     {
        //       label: "研发部",
        //       value: "a",
        //     },
        //     {
        //       label: "技术部",
        //       value: "b",
        //     },
        //   ],
        //   style: {
        //     width: "150px",
        //   },
        // },
        {
          type: "Radio",
          label: "禁启用",
          name: "status",
          required: true,
          options: [
            {
              label: "禁用",
              value: false,
            },
            {
              label: "启用",
              value: true,
            },
          ],
        },
        {
          type: "Input",
          label: "介绍",
          name: "content",
          style: {
            width: "300px",
          },
        },
      ],
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
      response.data.data.id = this.state.id;
      this.setState({
        formConfig: {
          ...this.state.formConfig,
          setFieldValue: response.data.data,
        },
      });
    });
  };

  /** 编辑信息 */
  onHandlerEdit = (values) => {
    const requestData = values;
    requestData.id = this.state.id;
    DepartmentEdit(requestData)
      .then((response) => {
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
      <Fragment>
        <FormCom
          ref="form"
          formItem={this.state.formItem}
          formLayout={this.state.formLayout}
          formConfig={this.state.formConfig}
        />
      </Fragment>
    );
  }
}

export default Add;
