import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// antd
import { Form, Input, Button, Switch, message, Modal } from "antd";
// api
import { Delete, Status } from "@api/department";

// table组件
import TableComponent from "@c/tableData";
class DepartmentList extends Component {
  constructor() {
    super();
    this.state = {
      // 请求参数
      pageNumber: 1,
      pageSize: 10,
      keyWord: "",
      // 表格加载
      loadingTable: false,
      // 表头
      tableConfig: {
        url: "departmentList",
        checkbox: true,
        rowkey: "id",
        thead: [
          {
            title: "部门名称",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "人数",
            dataIndex: "number",
            key: "number",
          },
          {
            title: "禁启用",
            dataIndex: "status",
            key: "status",
            render: (text, rowData) => {
              return (
                <Switch
                  checkedChildren="启用"
                  unCheckedChildren="禁用"
                  defaultChecked={rowData.status === "1" ? true : false}
                  onChange={() => this.onHandlerSwitch(rowData)}
                  loading={rowData.id === this.state.id}
                />
              );
            },
          },
          {
            title: "操作",
            dataIndex: "operation",
            key: "operation",
            width: 215,
            render: (text, rowData) => {
              return (
                <div className="inline_button">
                  <Button type="primary">
                    <Link
                      to={{
                        pathname: "/index/department/add",
                        state: { id: rowData.id },
                      }}
                    >
                      编辑
                    </Link>
                  </Button>
                  <Button onClick={() => this.onHandlerDelete(rowData.id)}>
                    删除
                  </Button>
                </div>
              );
            },
          },
        ],
      },
      data: [],
      selectedRowKeys: [], // 复选框数据
      // 警告框
      visible: false,
      id: "",
      // 弹窗确定按钮
      confirmLoading: false,
    };
  }

  /** 搜索 */
  onFinish = (value) => {
    if (this.state.loadingTable) {
      return false;
    }
    this.setState({
      keyWord: value.name,
      pageNumber: 1,
      pageSize: 10,
    });
  };

  /** 删除 */
  onHandlerDelete(id) {
    if (!id) {
      if (this.state.selectedRowKeys.length === 0) {
        return false;
      }
      id = this.state.selectedRowKeys.join(",");
    }

    this.setState({
      visible: true,
      id,
    });
  }

  /** 禁启用 */
  onHandlerSwitch({ id, status }) {
    if (!id) {
      return false;
    }
    this.setState({ id: id });
    Status({ id: id, status: status === "1" ? false : true })
      .then((data) => {
        message.info(data.data.message);
        // this.setState({
        //   visible: false,
        //   id: "",
        //   confirmLoading: false,
        // });
      })
      .finally(() => {
        this.setState({
          id: "",
        });
      });
  }

  // 复选框
  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  // 弹窗确定
  modalThen = () => {
    this.setState({
      confirmLoading: true,
    });
    Delete({ id: this.state.id }).then((data) => {
      message.info(data.data.message);
      this.setState({
        visible: false,
        id: "",
        confirmLoading: false,
        selectedRowKeys: [],
      });
    });
  };
  // 弹窗取消
  hideModal = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <Fragment>
        <Form name="horizontal_login" layout="inline" onFinish={this.onFinish}>
          <Form.Item label="部门名称" name="name">
            <Input placeholder="部门名称" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>

        <TableComponent batchButton={true} config={this.state.tableConfig} />
        <Modal
          title="提示"
          visible={this.state.visible}
          onOk={this.modalThen}
          onCancel={this.hideModal}
          confirmLoading={this.state.confirmLoading}
          okText="确认"
          cancelText="取消"
        >
          <p>
            确定删除测信息？{" "}
            <span className="text-align color-red">删除后无法恢复。</span>
          </p>
        </Modal>
      </Fragment>
    );
  }
}

export default DepartmentList;
