import React, { Component } from "react";
import { Link } from "react-scroll";
import { Link as Link1 } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
class NavBar extends Component {
  state = { show: 1 };
  componentDidMount() {
    let href = window.location.pathname;
    if (href !== "/") {
      this.dontShow();
    }
  }
  show() {
    this.setState({ show: 1 });
  }
  dontShow() {
    this.setState({ show: 0 });
  }
  render() {
    const { user } = this.props;
    const { show } = this.state;
    return (
      <div>
        <Navbar bg="dark" expand="lg">
          <Navbar.Brand>
            <Link1
              className="navbar-brand"
              to="/"
              style={{ fontSize: "35px" }}
              onClick={() => this.show()}
            >
              <h1 style={{ fontSize: "80%" }}>
                <span style={{ color: "#36B7FC " }}>
                  {" "}
                  <b>LED4</b>
                </span>
                <b style={{ color: "white" }}>Agriculture</b>
              </h1>
            </Link1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {show === 1 && (
                <Link
                  activeClass="active"
                  to="section-1"
                  spy={true}
                  smooth={true}
                  duration={1000}
                  className="nav-link"
                  style={{ color: "white", cursor: "pointer" }}
                >
                  ABOUT US
                </Link>
              )}
              <Link1
                className="nav-link"
                style={{ color: "white" }}
                to="/eresource"
                onClick={() => this.dontShow()}
              >
                E-RESOURCES
              </Link1>
              <Link1
                className="nav-link"
                style={{ color: "white" }}
                to="/login"
                onClick={() => this.dontShow()}
              >
                COURSES
              </Link1>
              {show === 1 && (
                <Link
                  activeClass="active"
                  to="section-2"
                  spy={true}
                  smooth={true}
                  duration={1000}
                  className="nav-link"
                  style={{ color: "white", cursor: "pointer" }}
                >
                  PARTNERS
                </Link>
              )}
              {show === 1 && (
                <Link
                  activeClass="active"
                  to="section-3"
                  spy={true}
                  smooth={true}
                  duration={1000}
                  className="nav-link"
                  style={{ color: "white", cursor: "pointer" }}
                >
                  CONTACT US
                </Link>
              )}
              {user && (
                <Link1
                  className="nav-link"
                  style={{ color: "white" }}
                  to="/logout"
                >
                  LOG OUT
                </Link1>
              )}
              {user.editor && (
                <Link1
                  className="nav-link"
                  style={{ color: "white" }}
                  onClick={() => this.dontShow()}
                  to="/Dashboard"
                >
                  DASHBOARD
                </Link1>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
