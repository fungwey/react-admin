import React, { Component } from "react";

// layout组件
import Aside from "./components/aside";
import ContainerMain from "../../components/containerMain/index";

// css
import "./index.scss";

// antd
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
const { Header, Content } = Layout;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout className="layout_wrap">
        <Aside collapsed={this.state.collapsed}></Aside>
        <Layout className="site-layout">
          <Header className="layout_header" style={{ padding: 0 }}>
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle,
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 30,
            }}
          >
            <ContainerMain />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Index;
