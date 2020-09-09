import React, { Component } from "react";

class Whatwedo extends Component {
  state = {};
  render() {
    return (
      <div
        className="container-fluid justify-content-center p-5 mx-auto"
        id="what"
      >
        <h2 style={{ textAlign: "center" }}>ABOUT US</h2>
        <div className="row ">
          <div className="col-sm mxy-2 d-flex justify-content-center">
            <img
              src={require("./pictures/49743463652_3a1f25c813_k.jpg")}
              alt="First slide"
              style={{ height: "20rem", width: "20rem" }}
            />
          </div>
          <div className="col-sm mx-4 my-4">
            <div className="h-100">
              <h5 className="container-fluid row container p-2 d-flex justify-content-center">
                About us
              </h5>
              <p className="container-fluid row container p-2 d-flex text-center">
                We share information and tools to help decision makers invest in
                increasing resillience to climate change and reducing
                agricultural greenhouse gases (GHG) Emission. <br /> We work
                together with other partners to translate Climate Smart
                Agriculture (CSA) policies to local actions.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Whatwedo;
