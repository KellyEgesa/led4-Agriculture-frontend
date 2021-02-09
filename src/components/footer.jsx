import React, { Component } from "react";
import {} from "react-scroll";
import { Navbar } from "react-bootstrap";

class NavFooter extends Component {
  state = {};
  render() {
    var d = new Date();
    // page.currentYear = d.getFullYear();
    return (
      <div>
        <Navbar bg="dark">
          <Navbar style={{ color: "white" }}>
            Copyright Ⓒ {d.getFullYear()} LED4Agriculture. All Rights Reserved{" "}
          </Navbar>
        </Navbar>
      </div>
    );
  }
}

export default NavFooter;
