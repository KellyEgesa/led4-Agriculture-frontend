import React, { Component } from "react";
import { loadEModule } from "./service/e-module";

class viewEresource extends Component {
  state = {
    module: [],
  };

  async componentDidMount() {
    const { data: modules } = await loadEModule();
    const module = modules.filter(
      (e) => e.topic === this.props.match.params.name
    );
    console.log(module);
    this.setState({ module });
  }
  openPdf(a) {
    window.open(a.url);
  }

  render() {
    return (
      <div className="container-fluid" id="root2">
        <h4 className="p-2" style={{ textAlign: "center" }}>
          {this.props.match.params.name}
        </h4>
        <div className="row m-2 d-flex justify-content-center">
          {this.state.module.map((items) => (
            <div
              className="col-sm-3 d-flex text-center m-0"
              key={items._id}
              style={{ height: "10rem", width: "10rem" }}
            >
              <div
                className="card m-2 p-2 card-block  rounded-lg w-yellow mx-auto"
                style={{
                  border: "0",
                  width: "100%",
                  backgroundColor: "#333941",
                  cursor: "pointer",
                }}
                onClick={() => this.openPdf(items)}
              >
                <div className="align-items-center my-auto">
                  <p style={{ color: "white", fontSize: "80%" }}>
                    {items.heading}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default viewEresource;
