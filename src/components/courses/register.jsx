import React, { Component } from "react";
import Register from "./registerForm";

class Registerform extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid d-flex justify-content-center" id="root1">
        <div className="card my-auto rounded-lg" style={{ width: "20rem" }}>
          <div className="card-body">
            <Register />
          </div>
        </div>
      </div>
    );
  }
}

export default Registerform;
