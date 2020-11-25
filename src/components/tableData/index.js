import React, { Component, Fragment } from "react";
// propTypes
import PropTypes from "prop-types";

// antd
import { Modal, message } from "antd";
// api
import { TableList, TableDelete } from "@api/common";
// url
import requestUrl from "@api/requestUrl";

// Table basis component
import TableBasis from "./Table";
// 搜索组件
import FormSearch from "@c/formSearch";

class TableComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      // 请求参数
      pageNumber: 1,
      pageSize: 10,
      searchData: {},
      // 表格加载
      loadingTable: false,
      data: [],
      url: "",
      // 复选框数据
      checkboxValue: [],
      // 页码
      total: 0,
      // 确认弹窗
      modalVisible: false,
      modalConfirmLoading: false,
      id: "",
    };
  }
  componentDidMount() {
    this.loadData();
    this.props.onRef(this);
  }

  /** 获取列表数据 */
  loadData() {
    const { pageNumber, pageSize, searchData } = this.state;
    const requestData = {
      url: requestUrl[this.props.config.url],
      data: {
        pageNumber: pageNumber,
        pageSize: pageSize,
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
    console.log("searchData", searchData);
    this.setState({
      loadingTable: true,
    });
    TableList(requestData)
      .then((data) => {
        const responseData = data.data.data;
        if (responseData) {
          this.setState({
            data: responseData.data,
            total: responseData.total,
          });
        }
      })
      .finally(() => {
        this.setState({
          loadingTable: false,
        });
      });
  }

  search = (value) => {
    if (!value) {
      return false;
    }
    this.setState(
      {
        pageNumber: 1,
        pageSize: 10,
        searchData: value,
      },
      () => {
        this.loadData();
      }
    );
  };

  /** 复选框 */
  onSelectChange = (checkboxValue) => {
    console.log("checkboxValue changed: ", checkboxValue);
    this.setState({ checkboxValue });
  };

  /** 当前页码 */
  onChangeCurrentPage = (page, pageSize) => {
    console.log(page, pageSize);
    this.setState(
      {
        pageNumber: page,
      },
      () => {
        this.loadData();
      }
    );
  };

  /** pageSize 变化的回调 */
  onChangeSizePage = (value, num) => {
    this.setState(
      {
        pageNumber: value,
        pageSize: num,
      },
      () => {
        this.loadData();
      }
    );
  };

  /** 弹窗确定 */
  modalThen = () => {
    this.setState({
      confirmLoading: true,
    });
    const requestData = {
      url: requestUrl[this.props.config.delurl],
      data: {
        id: this.state.id,
      },
    };
    TableDelete(requestData).then((data) => {
      message.info(data.data.message);
      this.setState({
        modalVisible: false,
        id: "",
        confirmLoading: false,
        checkboxValue: [],
      });
      this.loadData();
    });
  };
  /** 弹窗取消 */
  hideModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  /** 批量删除 */
  onHandlerDelete(id) {
    if (!id) {
      if (this.state.checkboxValue.length === 0) {
        message.info("请选择需要删除的数据");
        return false;
      }
      id = this.state.checkboxValue.join(",");
    }

    this.setState({
      modalVisible: true,
      id,
    });
  }

  render() {
    const { data, loadingTable, total } = this.state;
    const { thead, checkbox, rowkey, formItem } = this.props.config;
    const rowSelection = {
      onChange: this.onSelectChange,
    };
    return (
      <Fragment>
        {/* 筛选 */}
        <FormSearch formItem={formItem} search={this.search} />
        {/* table UI 组件 */}
        <div className="table-wrap">
          <TableBasis
            columns={thead}
            dataSource={data}
            total={total}
            changePageCurrent={this.onChangeCurrentPage}
            ChangPageSize={this.onChangeSizePage}
            batchButton={true}
            handlerDelete={() => {
              this.onHandlerDelete();
            }}
            rowKey={rowkey || "id"}
            rowSelection={checkbox ? rowSelection : null}
            loading={loadingTable}
          />
        </div>

        {/* 确认弹窗 */}
        <Modal
          title="提示"
          visible={this.state.modalVisible}
          onOk={this.modalThen}
          onCancel={this.hideModal}
          confirmLoading={this.state.modalConfirmLoading}
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
// 校验数据类型
TableComponent.propTypes = {
  config: PropTypes.object,
};
// 默认值
TableComponent.defaultProps = {
  batchButton: false,
};

export default TableComponent;
