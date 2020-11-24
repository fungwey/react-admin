import React, { Component, Fragment } from "react";
// propTypes
import PropTypes from "prop-types";

import { connect } from "react-redux";

// antd
import { Table } from "antd";

class TableBasis extends Component {
  render() {
    const { thead, rowkey } = this.props.config;
    return (
      <Fragment>
        <div className="spacing-30"></div>
        <Table columns={thead} dataSource={this.props.list} rowKey={rowkey} />
        {/* <Row>
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
        </Row> */}
      </Fragment>
    );
  }
}
// 校验数据类型
TableBasis.propTypes = {
  config: PropTypes.object,
  rowKey: PropTypes.string,
};
// 默认值
TableBasis.defaultProps = {
  config: {},
  rowKey: "id",
};

// 把store中的数据映射到这个组件变成props
const mapStateToProps = (state) => {
  // mapState 会将数据映射成this.props
  console.log("state", state);
  return {
    list: state.department.departmentList,
  };
};
export default connect(mapStateToProps, null)(TableBasis);
