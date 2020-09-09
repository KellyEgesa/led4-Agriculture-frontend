import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "../../service/config.json";
import { loadEModule } from "../../service/e-module";

class DeleteEresource extends Component {
  state = {
    resources: [
      "Emission Estimates",
      "Mitigation Options",
      "Policies",
      "Business Cases",
    ],
    emodules: [],
    showmodules: [],
    selectedTopic: "",
  };

  async componentDidMount() {
    const { data } = await loadEModule();
    const emodules = [...data];
    this.setState({ emodules });
  }
  handleModuleSelect(item) {
    this.setState({ selectedModule: item });
  }
  handleTopicSelect(item) {
    const showmodules = this.state.emodules.filter((m) => m.topic === item);
    this.setState({ showmodules });
  }
  handleDelete(item) {
    axios
      .get(apiUrl + "/pdf/delete/" + this.state.selectedModule.filename)
      .then((res) => {
        toast.success(res + " was deleted");
        axios.delete(apiUrl + "/emodule/" + item._id);
        toast.success(item + "was deleted").catch((error) => {
          toast.error(item + "wasnt deleted");
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        <div className="p-3">
          <h6 className="my-2 text-center">DELETE AN ERESOURCE</h6>
          <br />
          <label className="m-1">PICK A TOPIC</label>
          {this.state.resources.map((item) => (
            <div className="form-check" key={item}>
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value="option1"
                onClick={() => this.handleTopicSelect(item)}
              />
              <label className="form-check-label">{item}</label>
            </div>
          ))}
          <div className="jumbotron p-2 m-1">
            <label>Choose the resource to delete:</label>
            {this.state.showmodules.map((item) => (
              <div className="form-check" key={item._id}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="moduleRadios"
                  id="moduleRadios1"
                  value="option2"
                  onClick={() => this.handleModuleSelect(item)}
                />
                <label className="form-check-label">{item.heading}</label>
              </div>
            ))}
          </div>
          <div
            className="btn btn-danger m-2"
            onClick={() => this.handleDelete()}
          >
            DELETE A TOPIC
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DeleteEresource;
