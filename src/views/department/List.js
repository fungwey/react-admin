import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// antd
import { Button, Switch, message } from "antd";
// api
import { Status } from "@api/department";

// table组件
import TableComponent from "@c/tableData";
class DepartmentList extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      // 请求参数
      pageNumber: 1,
      pageSize: 10,
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
            render: (name, rowData) => {
              return <a href={rowData.id}>{name}</a>;
            },
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
            render: (status, rowData) => {
              return (
                <Switch
                  checkedChildren="启用"
                  unCheckedChildren="禁用"
                  defaultChecked={status === "1" ? true : false}
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
                  <Button onClick={() => this.delete(rowData.id)}>删除</Button>
                  {/* 
                    在父组件获取子组件的实例
                    1. 在子组件调用父组件方法，并把子组件实例传回给父组件。（已经存储了子组件的实例）
                    2. 通过实例调动子组件的方法。
                  */}
                </div>
              );
            },
          },
        ],
      },
    };
  }

  // 获取子组件实例
  getChildRef = (ref) => {
    console.log(ref);
    this.tableComponent = ref; // 存储子组件
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

  /** 删除 */
  delete = (id) => {
    this.tableComponent.onHandlerDelete(id);
  };

  render() {
    return (
      <Fragment>
        <TableComponent
          onRef={this.getChildRef}
          batchButton={true}
          config={this.state.tableConfig}
        />
      </Fragment>
    );
  }
}

export default DepartmentList;
