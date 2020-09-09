import React, { Component } from "react";
import { getTopic, getModule } from "../../service/topic";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "../../service/config.json";

class DeleteModule extends Component {
  state = { topic: [], modules: [], selectedTopic: "" };

  async componentDidMount() {
    const { data } = await getTopic();
    const topic = [...data];
    this.setState({ topic });
  }
  async handleTopicSelect(item) {
    const { data } = await getModule(item._id);
    const modules = [...data];
    this.setState({ selectedTopic: item, modules });
  }
  handleModuleSelect(item) {
    this.setState({ selectedModule: item });
  }
  handleDelete(item) {
    const origModules = this.state.modules;
    const modules = origModules.filter((m) => m._id !== item._id);
    this.setState({ modules });
    try {
      axios.get(apiUrl + "/pdf/delete/" + item.filename).then((res) => {
        try {
          axios.delete(apiUrl + "/module/" + item._id);
          toast.success(item.heading + " was deleted");
        } catch (error) {
          toast.error(item + "wasnt deleted");
        }
      });
    } catch (error) {
      this.setState({ modules: origModules });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="p-3">
          <h6 className="my-2 text-center">DELETE A MODULE</h6>
          <br />
          <label className="m-1">PICK A TOPIC</label>
          <ul className="list-group">
            {this.state.topic.map((item) => (
              <li
                onClick={() => this.handleTopicSelect(item)}
                key={item._id}
                className={
                  item === this.state.selectedTopic
                    ? "list-group-item active"
                    : "list-group-item"
                }
                style={{ cursor: "pointer" }}
              >
                {item.topic}
              </li>
            ))}
          </ul>

          <div className="jumbotron p-2 m-1">
            <label>Choose a module within the topic to delete:</label>
            <ul className="list-group">
              {this.state.modules.map((item) => (
                <li
                  onClick={() => this.handleModuleSelect(item)}
                  key={item._id}
                  className={
                    item === this.state.selectedModule
                      ? "list-group-item active"
                      : "list-group-item"
                  }
                  style={{ cursor: "pointer" }}
                >
                  {item.heading}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="btn btn-danger m-2"
            onClick={() => this.handleDelete(this.state.selectedModule)}
          >
            DELETE A TOPIC
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DeleteModule;
