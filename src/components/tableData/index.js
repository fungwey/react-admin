import React, { Component, Fragment } from "react";
// propTypes
import PropTypes from "prop-types";

// antd
import { Table, Pagination, Row, Col, Button, Modal, message } from "antd";
// api
import { TableList, TableDelete } from "@api/common";
// url
import requestUrl from "@api/requestUrl";

class TableComponent extends Component {
  constructor(props) {
    super();
    this.state = {
      // 请求参数
      pageNumber: 1,
      pageSize: 10,
      keyWord: "",
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
  }

  /** 获取列表数据 */
  loadData() {
    const { pageNumber, pageSize, keyWord } = this.state;
    const requestData = {
      url: requestUrl[this.props.config.url],
      data: {
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    };
    if (keyWord) {
      requestData.name = keyWord;
    }
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

  /** 复选框 */
  onSelectChange = (checkboxValue) => {
    console.log("checkboxValue changed: ", checkboxValue);
    this.setState({ checkboxValue });
  };

  /** 当前页码 */
  onChangeCurrentPage = (value) => {
    this.setState(
      {
        pageNumber: value,
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
    const { data, loadingTable } = this.state;
    const { thead, checkbox, rowkey } = this.props.config;
    const rowSelection = {
      onChange: this.onSelectChange,
    };
    return (
      <Fragment>
        {/* table 组件 */}
        <Table
          columns={thead}
          dataSource={data}
          rowKey={rowkey || "id"}
          rowSelection={checkbox ? rowSelection : null}
          loading={loadingTable}
          pagination={false}
        />
        <Row>
          <Col span={2}>
            {this.props.batchButton && (
              <Button
                onClick={() => {
                  this.onHandlerDelete();
                }}
              >
                批量删除
              </Button>
            )}
          </Col>
          <Col span={22}>
            <Pagination
              defaultCurrent={1}
              onChange={this.onChangeCurrentPage}
              onShowSizeChange={this.onChangeSizePage}
              className="pull-right"
              total={this.state.total}
              showSizeChanger
              showQuickJumper
              showTotal={(total) => `Total ${total} items`}
            />
          </Col>
        </Row>
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
