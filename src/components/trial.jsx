import React from "react";
import Form from "./common/Form";
import Joi from "joi-browser";
import { saveTopic } from "./service/topic";
import { toast } from "react-toastify";

class AddTopic extends Form {
  state = {
    data: {
      topic: "",
    },
    errors: {},
  };
  schema = {
    topic: Joi.string()
      .min(2)
      .max(20)
      .required()
      .label("Question")
      .error(() => {
        return {
          message: "Should be atleast 2 characters long",
        };
      }),
  };
  doSubmit = () => {
    this.props.doSubmit(this.state.data);
    this.setState({
      data: {
        topic: "",
      },
    });
  };
  doSubmit1 = async (b) => {
    try {
      await saveTopic(b).then((res) => {
        const ty = this.state.topic;
        this.setState({ topic: [...ty, res.data] });
      });
      toast.success("Topic Saved");
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error(ex.response.data);
    }
  };
  render() {
    return (
      <div className="m-2">
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("topic", "Add a topic:")}
          {this.renderButton("Add Topic")}
        </form>
      </div>
    );
  }
}

export default AddTopic;
