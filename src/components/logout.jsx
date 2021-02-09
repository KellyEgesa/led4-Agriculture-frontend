import React, { Component } from "react";
import ReactLoad from "./reactload";
class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("token");
    window.location = "/";
  }
  render() {
    return (
      <div className="p-2" id="root2">
        <div className="d-flex justify-content-center my-auto" id="root">
          <ReactLoad type={"bars"} color={"black"} />
        </div>
      </div>
    );
  }
}

export default Logout;
