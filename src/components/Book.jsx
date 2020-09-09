import React, { Component } from "react";

class Booked extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid d-flex justify-content-center" id="root1">
        <div className="card my-auto rounded-lg" style={{ width: "40rem" }}>
          <div className="card-body">
            <div className="jumbotron text-center m-0">
              <h1 className="display-7">CHECK YOUR EMAIL</h1>
              <p className="lead">
                <strong>Please check your email</strong> and click on the link
                sent to your email to finish registering
              </p>
              <hr></hr>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Booked;
