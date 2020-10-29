import React, { Component } from "react";

// asideMenu
import AsideMenu from "../../../components/asideMneu/index";

class Aside extends Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: "" };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      collapsed: props.collapsed,
    };
  }

  render() {
    return <AsideMenu collapsed={this.state.collapsed}></AsideMenu>;
  }
}

export default Aside;
