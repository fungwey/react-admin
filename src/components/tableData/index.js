import React, { Component, Fragment } from "react";
// propTypes
import PropTypes from "prop-types";

// antd
import { Table, Pagination, Row, Col, Button } from "antd";
// api
import { TableList } from "@api/common";
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
      selectedRowKeys: [],
      // 页码
      total: 0,
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
  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
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

  render() {
    const { data, loadingTable } = this.state;
    const { thead, checkbox, rowkey } = this.props.config;
    const rowSelection = {
      onChange: this.onSelectChange,
    };
    return (
      <Fragment>
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
              current={1}
              defaultCurrent={1}
              hideOnSinglePage={true}
              onChange={this.onChangeCurrentPage}
              className="pull-right"
              total={this.state.total}
              showSizeChanger
              showQuickJumper
              showTotal={(total) => `Total ${total} items`}
            />
          </Col>
        </Row>
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
