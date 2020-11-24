import React, { Component, Fragment } from "react";
// propTypes
import PropTypes from "prop-types";

// antd
import { Table, Row, Col, Button, Pagination } from "antd";

class TableBasis extends Component {
  render() {
    const {
      columns,
      dataSource,
      total,
      changePageCurrent,
      ChangPageSize,
      batchButton,
      handlerDelete,
      rowSelection,
      rowKey,
      loading,
    } = this.props;
    return (
      <Fragment>
        <Table
          columns={columns}
          dataSource={dataSource}
          bordered
          pagination={false}
          rowSelection={rowSelection}
          rowKey={rowKey}
          loading={loading}
        />
        <div className="spacing-30"></div>
        <Row>
          <Col span={2}>
            {batchButton && <Button onClick={handlerDelete}>批量删除</Button>}
          </Col>
          <Col span={22}>
            <Pagination
              onChange={changePageCurrent}
              onShowSizeChange={ChangPageSize}
              className="pull-right"
              total={total}
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
TableBasis.propTypes = {
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  total: PropTypes.number,
  changePageCurrent: PropTypes.func,
  ChangPageSize: PropTypes.func,
  batchButton: PropTypes.bool,
  handlerDelete: PropTypes.func,
  rowSelection: PropTypes.object,
  rowKey: PropTypes.string,
  loading: PropTypes.bool,
};
// 默认值
TableBasis.defaultProps = {
  columns: [],
  dataSource: [],
  total: 0,
  defaultCurrent: 1,
  batchButton: true,
  rowKey: "id",
};

export default TableBasis;
