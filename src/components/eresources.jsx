import React, { Component } from "react";

class Eresource extends Component {
  state = {
    resources: [
      "Emission Estimates",
      "Mitigation Options",
      "Policies",
      "Business Cases",
    ],
  };
  handlePage(items) {
    this.props.history.push("/eresource/" + items);
  }
  render() {
    return (
      <div className="container-fluid justify-content-center" id="root2">
        <div className="row p-flex justify-content-center" id="root">
          {this.state.resources.map((items) => (
            <div
              className="col-m"
              key="items"
              style={{ width: "20rem", height: "10rem" }}
            >
              <div
                className="card m-2"
                style={({ width: "3300rem" }, { borderColor: "black" })}
              >
                <div className="card-body">
                  <h5 className="card-title">{items}</h5>
                  <button
                    className="card-link btn btn-dark"
                    onClick={() => this.handlePage(items)}
                  >
                    OPEN
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Eresource;
