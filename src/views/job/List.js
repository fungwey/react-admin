import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// antd
import { Button, Switch, message } from "antd";
// api
import { Status } from "@api/job";

// table组件
import TableComponent from "@c/tableData";

// store
import Store from "@/store/Index";
// action
import { addStatus, updateStatus } from "@/store/action/Config";

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
        url: "jobList",
        delurl: "jobDelete",
        checkbox: true,
        rowkey: "jobId",
        thead: [
          {
            title: "职位名称",
            dataIndex: "jobName",
            key: "jobName",
          },
          {
            title: "部门名称",
            dataIndex: "name",
            key: "name",
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
                  defaultChecked={status}
                  onChange={() => this.onHandlerSwitch(rowData)}
                  loading={rowData.jobId === this.state.jobId}
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
                        pathname: "/index/job/add",
                        state: { id: rowData.jobId },
                      }}
                    >
                      编辑
                    </Link>
                  </Button>
                  <Button onClick={() => this.delete(rowData.jobId)}>
                    删除
                  </Button>
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
        formItem: [
          {
            type: "Input",
            label: "职位名称",
            name: "name",
            placeholder: "请输入职位名称",
          },
          {
            type: "Select",
            label: "禁启用",
            name: "status",
            optionsKey: "status",
            placeholder: "请选择",
            style: {
              width: "100px",
            },
          },
        ],
      },
    };
  }

  /** 生命周期挂载完成 */
  componentDidMount() {
    Store.subscribe(() => {
      console.log("store发生改变", Store.getState());
    });
    Store.dispatch(
      addStatus({
        label: "所有",
        value: "all",
      })
    );
    Store.dispatch(updateStatus("aaaa", false));
  }

  // 获取子组件实例
  getChildRef = (ref) => {
    this.tableComponent = ref; // 存储子组件
  };

  /** 禁启用 */
  onHandlerSwitch({ jobId, status }) {
    if (!jobId) {
      return false;
    }
    this.setState({ id: jobId });
    Status({ id: jobId, status: !status })
      .then((data) => {
        message.info(data.data.message);
        // this.setState({
        //   visible: false,
        //   jobId: "",
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
  delete = (jobId) => {
    this.tableComponent.onHandlerDelete(jobId);
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
