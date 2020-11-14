import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// antd
import { Form, Input, Button, Switch, message } from "antd";
// api
import { Status } from "@api/department";

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
        delurl: "departmentDelete",
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
      id: "",
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
      </Fragment>
    );
  }
}

export default DepartmentList;
