import React, { Component } from "react";

class Partners extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  open(a) {
    window.open(a);
  }
  render() {
    return (
      <div className="container-fluid justify-content-center p-5" id="what">
        <h2 className="m-4" style={{ textAlign: "center" }}>
          Our Partners
        </h2>
        <div className="row m-2 p-2">
          <div
            className="col-sm m-1 d-flex justify-content-center"
            onClick={() => this.open("http://www.valuechain.co.ke/")}
          >
            <img
              src={require("./pictures/valuechain.png")}
              alt="valuechain"
              style={{ height: "10rem", cursor: "pointer" }}
            />
          </div>
          <div
            className="col-sm m-1 d-flex justify-content-center"
            onClick={() => this.open("http://www.worldagroforestry.org/")}
          >
            <img
              src={require("./pictures/World_Agroforestry_Logo_01.png")}
              alt="worldagroforestry"
              href="worldagroforestry"
              style={{ height: "10rem", cursor: "pointer" }}
            />
          </div>
          <div
            className="col-sm m-1 d-flex justify-content-center"
            onClick={() => this.open("https://www.cgiar.org/")}
          >
            <img
              src="https://storage.googleapis.com/cgiarorg/2020/04/31aa2c3f-cgiar_ss.jpg"
              alt="cgiar"
              href="Consortium of International Agricultural Research Centers (cgiar)"
              style={{ height: "9rem", cursor: "pointer" }}
            />
          </div>
          <div
            className="col-sm m-1 d-flex justify-content-center"
            onClick={() => this.open("http://www.kilimo.go.ke/")}
          >
            <img
              src={require("./pictures/MOA.png")}
              alt="kilimo"
              href="Ministry of Agriculture Livestock and Fisheries Kilimo"
              style={{ width: "20rem", cursor: "pointer" }}
            />
          </div>
          <div
            className="col-sm m-1 d-flex justify-content-center"
            onClick={() => this.open("https://ciat.cgiar.org/")}
          >
            <img
              src="https://ciat.cgiar.org/wp-content/uploads/csm_Alliance_logo_710x590_magenta_c6cd8f588d.png"
              alt="ciat"
              href="International Center for Tropical Agriculture"
              style={{ height: "9rem", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Partners;
