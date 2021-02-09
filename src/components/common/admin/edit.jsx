import React from "react";
import axios from "axios";
import { apiUrl } from "../../service/config.json";
import Form from ".././Form";
import { getTopic, getModule } from "../../service/topic";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import ReactLoad from "../../reactload";
import EditTopic from "./editTopic";

class Edit extends Form {
  state = {
    selectedFile: "",
    data: { description: "", heading: "", number: "" },
    errors: {},
    modules: [],
  };

  schema = {
    number: Joi.number()
      .label("Number")
      .error(() => {
        return {
          message: "Enter a valid Number",
        };
      }),
    description: Joi.string()
      .label("Description")
      .error(() => {
        return {
          message: "Enter a valid Description",
        };
      }),
    heading: Joi.string()
      .min(2)
      .max(200)
      .required()
      .label("Heading")
      .error(() => {
        return {
          message: "Enter a valid Heading",
        };
      }),
    topic: Joi.required(),
    url: Joi.string().required(),
    filename: Joi.string().required(),
    added: Joi.boolean().required(),
  };

  async componentDidMount() {
    const { data } = await getTopic();
    const topic = [...data];
    this.setState({ topic });
  }
  async handleTopicSelect(topic) {
    const { data } = await getModule(topic._id);
    const modules = [...data];
    this.setState({ modules });
  }
  handleModuleSelect(item) {
    this.setState({ selectedModule: item });
    this.setState({
      data: {
        description: item.description,
        heading: item.heading,
        number: item.number,
        added: item.added,
        url: item.url,
        filename: item.filename,
        topic: item.topic._id,
      },
    });
  }
  onChangeHandler = (event) => {
    const data = { ...this.state.data };
    data["added"] = true;
    this.setState({ data });
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };
  async handleDelete() {
    try {
      this.setState({ loaded: true });
      axios.get(apiUrl + "/pdf/delete/" + this.state.data.filename);
      const data = new FormData();
      data.append("file", this.state.selectedFile);
      await axios
        .post(apiUrl + "/pdf/upload", data, {})
        .then((res) => {
          const data = { ...this.state.data };
          data["url"] = apiUrl + "/pdf/load/" + res.data.trim();
          data["filename"] = res.data.trim();
          this.setState({ data });
          this.kumalizia();
        })
        .catch((error) => {
          toast.error("Module wasnt edited");
        });
    } catch (error) {
      toast.error("Module wasnt edited");
    }
  }
  async kumalizia() {
    const { data, selectedModule } = this.state;
    this.setState({ loaded: true });
    try {
      await axios
        .put(apiUrl + "/module/" + selectedModule._id, data)
        .then((res) => {
          toast.success("Edited the module");
        });

      this.setState({ loaded: false });
    } catch (ex) {
      toast.error("Module wasnt edited");
    }
  }
  doSubmit = async () => {
    if (this.state.selectedFile) {
      this.handleDelete();
    } else {
      this.kumalizia();
    }
  };
  render() {
    const { loaded, topic } = this.state;
    return (
      <div className="card rounded-lg p-3 m-2 p-flex">
        <h1 className="text-center">ADD PAGE</h1>
        <div className="row p-flex justify-content-center m-0">
          <div className="col-sm-5" style={{ width: "20rem" }}>
            <div className="form-group files m-2 ">
              <div className="card my-1 p-2">
                {loaded ? (
                  <div className="d-flex justify-content-center">
                    <ReactLoad type={"spokes"} color={"black"} />
                  </div>
                ) : (
                  <form onSubmit={this.handleSubmit}>
                    <h3 className="text-center">Edit a Module</h3>
                    <label>Choose The Topic</label>
                    <div>
                      {!topic ? (
                        <div className="d-flex justify-content-center">
                          <ReactLoad type={"bars"} color={"black"} />
                        </div>
                      ) : (
                        <div>
                          {topic.map((item) => (
                            <div className="form-check" key={item._id}>
                              <input
                                className="form-check-input"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios1"
                                value="option1"
                                onClick={() => this.handleTopicSelect(item)}
                              />
                              <label className="form-check-label">
                                {item.topic}
                              </label>
                            </div>
                          ))}
                          <div className="jumbotron p-2 m-1">
                            <label>
                              Choose a module within the topic to Edit:
                            </label>
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
                        </div>
                      )}
                      {this.renderInput("heading", "Heading:")}
                      {this.renderInput("description", "Description:")}
                      <div className="row">
                        <div className="col-sm-3">
                          {this.renderInput("number", "Number:", "number")}
                        </div>
                        <div className="col">
                          <label>Upload a module</label>
                          <input
                            ref={(el) => (this.myFormRef = el)}
                            type="file"
                            className="form-control"
                            onChange={this.onChangeHandler}
                          />
                        </div>
                      </div>

                      {this.renderButton("UPLOAD")}
                    </div>
                    <div></div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
