import React from "react";
import axios from "axios";
import { apiUrl } from "../../service/config.json";
import Form from ".././Form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import ReactLoad from "../../reactload";

class AddModule extends Form {
  state = {
    selectedFile: "",
    data: { description: "", heading: "", number: "" },
    errors: {},
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
      .max(40)
      .required()
      .label("Heading")
      .error(() => {
        return {
          message: "Enter a valid Heading",
        };
      }),
    topic: Joi.string().required(),
    added: Joi.boolean().required(),
  };

  onChangeHandler = (event) => {
    const data = { ...this.state.data };
    data["added"] = true;
    this.setState({ data });
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };

  onClickHandler = () => {
    this.setState({ loaded: true });
    this.myFormRef.value = "";
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    axios
      .post(apiUrl + "/pdf/upload", data, {})
      .then((res) => {
        const data = { ...this.state.data };
        data["url"] = apiUrl + "/pdf/load/" + res.data.trim();
        data["filename"] = res.data.trim();
        this.setState({ data });
        axios.post(apiUrl + "/module/", data);
        toast.success("Added a new module");

        this.setState({
          data: { description: "", heading: "" },
          selectedFile: "",
        });
        this.setState({ loaded: false });
      })
      .catch((error) => {
        toast.error("Module wasnt added");
      });
  };
  doSubmit = async () => {
    try {
      this.onClickHandler();
    } catch (ex) {
      //   if (ex.response && ex.response.status === 400)
      toast.error(ex);
    }
  };
  handleTopicSelect = (topic) => {
    const data = { ...this.state.data };
    data["topic"] = topic._id;
    this.setState({ data });
  };
  render() {
    const { loaded } = this.state;
    return (
      <div className="form-group files m-2">
        {loaded ? (
          <div className="d-flex justify-content-center">
            <ReactLoad type={"spokes"} color={"black"} />
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <h3 className="text-center">Add a Module</h3>
            <label>Choose The Topic</label>
            <div>
              {!this.props.topic ? (
                <div className="d-flex justify-content-center">
                  <ReactLoad type={"bars"} color={"black"} />
                </div>
              ) : (
                this.props.topic.map((item) => (
                  <div className="form-check" key={item._id}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios1"
                      value="option1"
                      onClick={() => this.handleTopicSelect(item)}
                    />
                    <label className="form-check-label">{item.topic}</label>
                  </div>
                ))
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
    );
  }
}

export default AddModule;
