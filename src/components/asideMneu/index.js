import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

// css

// 路由
import Router from "../../router/index";

// antd
import { Layout, Menu } from "antd";
import { UserOutlined, AppstoreOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;
const { Sider } = Layout;

class AsideMneu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: "",
      selectedKeys: [],
      openKeys: [],
    };
  }

  // 生命周期，在这里多了一层接口请求，并过滤路由
  componentDidMount() {
    // console.log(this.props);
    const pathname = this.props.location.pathname;
    const openKey = pathname.split("/").slice(0, 3).join("/");

    const menuHight = {
      selectedKeys: pathname,
      openKeys: [openKey],
    };
    this.selectMenuHight(menuHight);
  }

  // 选择菜单
  selectMenu = ({ item, key, keyPath, domEvent }) => {
    const menuHight = {
      selectedKeys: key,
      openKeys: keyPath,
    };
    this.selectMenuHight(menuHight);
  };

  // SubMenu 展开/关闭的回调
  openMenu = (openKeys) => {
    this.setState({
      openKeys: openKeys,
    });
  };

  // 菜单高光
  selectMenuHight = ({ selectedKeys, openKeys }) => {
    this.setState({
      selectedKeys: [selectedKeys],
      openKeys: openKeys,
    });
  };

  static getDerivedStateFromProps(props, state) {
    return {
      collapsed: props.collapsed,
    };
  }

  //   子级菜单处理
  renderSubMenu = ({ title, key, children }) => {
    return (
      <SubMenu key={key} icon={<AppstoreOutlined />} title={title}>
        {children &&
          children.map((item) => {
            return item.children && item.children.length > 0
              ? this.renderSubMenu(item)
              : this.renderMenu(item);
          })}
      </SubMenu>
    );
  };
  // 无子级菜单处理
  renderMenu = ({ title, key }) => {
    return (
      <Menu.Item key={key} icon={<UserOutlined />}>
        <Link to={key}>
          <span>{title}</span>
        </Link>
      </Menu.Item>
    );
  };

  render() {
    const { selectedKeys, openKeys } = this.state;
    return (
      <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
        <div className="logo" />
        <Menu
          onClick={this.selectMenu}
          onOpenChange={this.openMenu}
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
        >
          {Router &&
            Router.map((firstItem) => {
              return firstItem.children && firstItem.children.length > 0
                ? this.renderSubMenu(firstItem)
                : this.renderMenu(firstItem);
            })}
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(AsideMneu);
