import React, { Component } from "react";
import { getModule } from "../service/topic";
import ReactLoad from "../reactload";
import { userModule } from "../service/user";

class Module extends Component {
  state = {
    module: [],
    loaded: false,
  };

  async componentDidMount() {
    const { data: module } = await getModule(this.props.match.params.id);
    const { user } = this.props;
    const { data: userModules } = await userModule(user._id);
    this.setState({ module, loaded: true, userModules });
    this.validModules();
  }
  validModules = () => {
    const { userModules, module } = this.state;
    let validModule = [];
    for (let i = 0; i < module.length; i++) {
      for (let f = 0; f < userModules.module.length; f++) {
        if (module[i]._id === userModules.module[f].moduleid) {
          validModule.push(module[i]._id);
        }
      }
    }
    if (validModule.length === 0) {
      validModule.push(module[0]._id);
    } else {
      let lastItem = validModule[validModule.length - 1];
      for (let i = 0; i < module.length; i++) {
        if (module[i]._id === lastItem) {
          validModule.push(module[i + 1]._id);
        }
      }
    }
    this.setState({ validModule });
  };
  handleModuleSelect = (Module) => {
    this.props.history.push("/mainpage/" + Module._id);
    this.setState({ selectedModule: Module });
  };
  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    const { loaded, validModule } = this.state;

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
            {validModule &&
              this.state.module.map((items) => (
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
                      backgroundColor: validModule.includes(items._id)
                        ? "#333941"
                        : "#657181",
                      cursor: validModule.includes(items._id) ? "pointer" : "",
                    }}
                    onClick={
                      validModule.includes(items._id)
                        ? () => this.handleModuleSelect(items)
                        : null
                    }
                  >
                    <div className="card-head m-2 p-2 align-items-center d-flex justify-content-center">
                      <h5 style={{ color: "white" }}>
                        {items.number}. {items.heading}
                      </h5>
                    </div>
                    <div className="card-body align-items-center d-flex justify-content-center">
                      <p style={{ color: "white", fontSize: "85%" }}>
                        {items.description}
                      </p>
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
