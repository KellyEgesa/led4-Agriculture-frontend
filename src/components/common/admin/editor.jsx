import React from "react";
import Form from "../Form";
import Joi from "joi-browser";
import { getTopic, getModule } from "../../service/topic";
import { saveQuestion } from "../../service/questions";
import { toast } from "react-toastify";
import ReactLoad from "../../reactload";

class Editor extends Form {
  state = {
    topic: [],
    modules: [],
    data: {
      question: "",
      A: "",
      B: "",
      C: "",
      D: "",
      answer: "",
      description: "",
      modules: "",
    },
    errors: {},
  };
  schema = {
    question: Joi.string()
      .min(3)
      .required()
      .label("Question")
      .error(() => {
        return {
          message: "Enter a valid question",
        };
      }),
    A: Joi.string()
      .required()
      .label("A")
      .error(() => {
        return {
          message: "Enter a valid LastName",
        };
      }),
    B: Joi.string()
      .required()
      .label("A")
      .error(() => {
        return {
          message: "Enter a valid LastName",
        };
      }),
    C: Joi.string()
      .required()
      .label("A")
      .error(() => {
        return {
          message: "Enter a valid LastName",
        };
      }),
    D: Joi.string()
      .required()
      .label("A")
      .error(() => {
        return {
          message: "Enter a valid LastName",
        };
      }),
    answer: Joi.string()
      .min(1)
      .max(1)
      .required()
      .label("A")
      .error(() => {
        return {
          message: "Enter as either A, B, C or D",
        };
      }),
    description: Joi.string()
      .min(3)
      .required()
      .label("Question")
      .error(() => {
        return {
          message: "Enter a valid question",
        };
      }),
    modules: Joi.string().required(),
  };

  handleTopicSelect = async (topic) => {
    const { data: modules } = await getModule(topic._id);
    this.setState({ modules });
  };
  handleModuleSelect = async (topic) => {
    const data = { ...this.state.data };
    data["modules"] = topic._id;
    this.setState({ data, selectedModule: topic._id });
  };
  doSubmit = async () => {
    try {
      await saveQuestion(this.state.data);
      this.setState({
        data: {
          question: "",
          A: "",
          B: "",
          C: "",
          D: "",
          answer: "",
          description: "",
          modules: this.state.selectedModule,
        },
      });
      toast.success("Question Saved");
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error(ex.response.data);
    }
  };
  render() {
    return (
      <div>
        <div className="card rounded-lg p-4">
          <form onSubmit={this.handleSubmit}>
            <h4 className="text-center">ADD A QUESTION</h4>
            <label>Choose a topic:</label>
            <div className="jumbotron p-2 m-1">
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
            </div>
            <div className="jumbotron p-2 m-1">
              <label>Choose a module within the topic:</label>
              {this.state.modules.map((item) => (
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
            {this.renderInput("question", "Question:")}
            <div className="row">
              <div className="col">{this.renderInput("A", "A:")}</div>
              <div className="col">{this.renderInput("B", "B:")}</div>
            </div>
            <div className="row">
              <div className="col">{this.renderInput("C", "C:")}</div>
              <div className="col">{this.renderInput("D", "D:")}</div>
            </div>

            {this.renderInput("answer", "answer:")}
            {this.renderInput("description", "description:")}
            {this.renderButton("POST QUESTION")}
          </form>
        </div>
      </div>
    );
  }
}

export default Editor;
