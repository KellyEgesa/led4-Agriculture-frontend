import React from "react";
import axios from "axios";
import { apiUrl } from "../../service/config.json";
import Form from ".././Form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import DeleteEresource from "./e-resourcedel";
import ReactLoad from "../../reactload";

class AddEresource extends Form {
  state = {
    selectedFile: null,
    data: { heading: "" },
    errors: {},
    resources: [
      "Emission Estimates",
      "Mitigation Options",
      "Policies",
      "Business Cases",
    ],
  };
  schema = {
    heading: Joi.string()
      .min(2)
      .max(240)
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
        axios.post(apiUrl + "/emodule/", data);
        toast.success("Added a new e-resource");
        this.setState({ loaded: false });
      })
      .catch((error) => {
        toast.error("Eresource wasnt added");
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
  handleResourceSelect = (topic) => {
    const data = { ...this.state.data };
    data["topic"] = topic;
    this.setState({ data });
  };
  render() {
    const { loaded } = this.state;
    return (
      <div className="card rounded-lg p-3 m-2 p-flex">
        <h1 className="text-center p-2">E-RESOURCES PAGE</h1>
        <div className="row p-flex justify-content-center">
          <div className="col- m-2 mxy-auto" style={{ width: "25rem" }}>
            <div className="card my-1">
              {loaded ? (
                <div
                  className="d-flex justify-content-center my-auto"
                  id="root"
                >
                  <ReactLoad type={"bars"} color={"black"} />
                </div>
              ) : (
                <div className="form-group files m-2">
                  <form onSubmit={this.handleSubmit}>
                    <h3 className="text-center">Add an Eresource</h3>
                    <label>Choose The Topic</label>
                    {this.state.resources.map((item) => (
                      <div className="form-check" key={item._id}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="exampleRadios"
                          id="exampleRadios1"
                          value="option1"
                          ref={(el) => (this.myFormRef = el)}
                          onClick={() => this.handleResourceSelect(item)}
                        />
                        <label className="form-check-label">{item}</label>
                      </div>
                    ))}
                    {this.renderInput("heading", "Heading:")}
                    <label>Upload the pdf</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={this.onChangeHandler}
                    />
                    {this.renderButton("UPLOAD")}
                  </form>
                </div>
              )}
            </div>
          </div>
          <div className="col- m-2 " style={{ width: "25rem" }}>
            <div className="card my-1">
              <DeleteEresource />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddEresource;
