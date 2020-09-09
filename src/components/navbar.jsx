import React, { Component } from "react";
import {} from "react-scroll";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
class NavBar extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <div>
        <Navbar bg="dark" expand="lg">
          <Navbar.Brand>
            <Link className="navbar-brand" to="/" style={{ fontSize: "35px" }}>
              <span style={{ color: "#36B7FC " }}>
                {" "}
                <b>LED4</b>
              </span>
              <b style={{ color: "white" }}>Agriculture</b>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link
                className="nav-link"
                style={{ color: "white" }}
                to="/aboutus"
              >
                ABOUT US
              </Link>
              <Link
                className="nav-link"
                style={{ color: "white" }}
                to="/eresource"
              >
                E-RESOURCES
              </Link>
              <Link className="nav-link" style={{ color: "white" }} to="/login">
                COURSES
              </Link>
              <Link
                className="nav-link"
                style={{ color: "white" }}
                to="/partners"
              >
                PARTNERS
              </Link>
              <Link
                className="nav-link"
                style={{ color: "white" }}
                to="/contactus"
              >
                CONTACT US
              </Link>
              {user && (
                <Link
                  className="nav-link"
                  style={{ color: "white" }}
                  to="/logout"
                >
                  LOG OUT
                </Link>
              )}
              {user.editor && (
                <Link
                  className="nav-link"
                  style={{ color: "white" }}
                  to="/Dashboard"
                >
                  DASHBOARD
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
