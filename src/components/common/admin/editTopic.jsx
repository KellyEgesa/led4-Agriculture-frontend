import React from "react";
import Joi from "joi-browser";
import Form from "../Form";
import ReactLoad from "../../reactload";

class EditTopic extends Form {
  state = {
    data: {
      topic: "",
    },
    errors: {},
    loaded: false,
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

  async componentDidMount() {
    const { topic } = await this.props;
    this.setState({ topic, loaded: true });
  }

  doSubmit = () => {
    this.props.doSubmit(this.state.data);
    this.setState({
      data: {
        topic: "",
      },
    });
  };
  render() {
    const { loaded } = this.state;
    return (
      <div className="m-2">
        {!loaded ? (
          <div className="d-flex justify-content-center">
            <ReactLoad type={"spokes"} color={"black"} />
          </div>
        ) : (
          <div></div>
          //   topic.map((item) => (
          //     <li
          //       onClick={() => this.handleTopicSelect(item)}
          //       key={item._id}
          //       className={
          //         item === this.state.selectedTopic
          //           ? "list-group-item active"
          //           : "list-group-item"
          //       }
          //       style={{ cursor: "pointer" }}
          //     >
          //       {item.topic}
          //     </li>
          //   ))
        )}
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("topic", "Edit a topic:")}
          {this.renderButton("Edit Topic")}
        </form>
      </div>
    );
  }
}

export default EditTopic;
