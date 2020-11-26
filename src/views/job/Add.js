import React, { Component, Fragment } from "react";

// antd
import { message, Select } from "antd";

// api
import { Detail, JobEdit } from "@api/job";
//  API
import { requestData } from "@api/common";
// url
import requestUrl from "@api/requestUrl";

// 组件
import FormCom from "@c/form/index";

const { Option } = Select;

class Add extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      id: "",
      select: [],
      formConfig: {
        url: "jobAdd",
        initValue: { status: false },
        setFieldValue: {},
        editKey: "",
        formatFormKey: "parentId",
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
        // {
        //   type: "Select",
        //   label: "部门名称",
        //   name: "parentId",
        //   required: true,
        //   placeholder: "请输入选择部门",
        //   message: `部门不能为空啊啊啊!`,
        //   url: "getDepartmentList",
        //   props: {
        //     value: "id",
        //     label: "name",
        //   },
        //   style: {
        //     width: "150px",
        //   },
        // },
        {
          type: "Input",
          label: "职位名称",
          name: "jobName",
          required: true,
          message: `职位名称不能为空啊啊啊!`,
          placeholder: "请输入职位名称",
          style: {
            width: "300px",
          },
        },
        {
          type: "Slot",
          label: "部门名称",
          name: "parentId",
          required: true,
          slotName: "department",
          placeholder: "请输入选择部门",
          message: `部门不能为空啊啊啊!`,
          url: "getDepartmentList",
          style: {
            width: "150px",
          },
        },
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
          label: "描述",
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
    this.getSelectList();
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
          editKey: "jobId",
          url: "jobEdit",
          setFieldValue: response.data.data,
        },
      });
    });
  };

  getSelectList = () => {
    const url = "getDepartmentList";
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
          select: res.data.data.data,
        });
      })
      .finally(() => {
        this.setState({
          loadingTable: false,
        });
      });
  };

  /** 编辑信息 */
  onHandlerEdit = (values) => {
    const requestData = values;
    requestData.id = this.state.id;
    JobEdit(requestData)
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
    const { select } = this.state;
    return (
      <Fragment>
        <FormCom
          ref="form"
          formItem={this.state.formItem}
          formLayout={this.state.formLayout}
          formConfig={this.state.formConfig}
        >
          <Select ref="department" onChange={this.onChange}>
            {select &&
              select.map((elem) => {
                return (
                  <Option value={elem.id} key={elem.id}>
                    {elem.name}
                  </Option>
                );
              })}
          </Select>
        </FormCom>
      </Fragment>
    );
  }
}

export default Add;
