import React, { Component } from "react";
import { getModule } from "../service/topic";
import ReactLoad from "../reactload";

class Module extends Component {
  state = {
    module: [],
    loaded: false,
  };

  async componentDidMount() {
    const { data: module } = await getModule(this.props.match.params.id);
    this.setState({ module, loaded: true });
  }
  handleModuleSelect = (Module) => {
    this.props.history.push("/mainpage/" + Module._id);
    this.setState({ selectedModule: Module });
  };
  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    const { loaded } = this.state;
    return (
      <div className="container-fluid" id="root2">
        {!loaded ? (
          <div className="d-flex justify-content-center my-auto" id="root">
            <ReactLoad type={"bars"} color={"black"} />
          </div>
        ) : (
          <div></div>
        )}
        <div style={{ visibility: !loaded ? "hidden" : "visible" }}>
          <div className="p-2">
            <i
              className="fa fa-arrow-left active fa-lg"
              style={{ cursor: "pointer" }}
              onClick={() => this.goBack()}
            >
              {" "}
              GO BACK
            </i>
            <h4 className="p-2" style={{ textAlign: "center" }}>
              MODULES :
            </h4>
          </div>
          <div className="row m-2 d-flex justify-content-center">
            {this.state.module.map((items) => (
              <div
                className="col-sm-3 text-center d-flex"
                key={items._id}
                style={{ height: "10rem", width: "10rem" }}
              >
                <div
                  className="card m-2 card-block  rounded-lg w-yellow mx-auto"
                  style={{
                    border: "0",
                    width: "100%",
                    backgroundColor: "#E88E77",
                    cursor: "pointer",
                  }}
                  onClick={() => this.handleModuleSelect(items)}
                >
                  <div className="card-head m-2 p-2 align-items-center d-flex justify-content-center">
                    <h3>{items.heading}</h3>
                  </div>
                  <div className="card-body align-items-center d-flex justify-content-center">
                    <h5>{items.description}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Module;
