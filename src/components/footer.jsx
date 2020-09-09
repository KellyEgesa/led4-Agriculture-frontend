import React, { Component } from "react";
import {} from "react-scroll";
import { Navbar, Nav } from "react-bootstrap";

class NavFooter extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <div>
        <Navbar bg="dark" sticky="bottom">
          <Navbar>copyright</Navbar>
        </Navbar>
      </div>
    );
  }
}

export default NavFooter;
