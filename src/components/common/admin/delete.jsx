import React, { Component } from "react";
import DeleteTopic from "./deleteTopic";
import DeleteModule from "./deleteModule";
import Question from "./deleteQuestion";
import { getTopic, deleteTopic } from "../../service/topic";
import { toast } from "react-toastify";

class Delete extends Component {
  state = { topic: "" };
  async componentDidMount() {
    const { data } = await getTopic();
    const topic = [...data];
    this.setState({ topic });
  }
  handleTopicDelete = async (item) => {
    const origTopic = this.state.topic;
    const topic = origTopic.filter((m) => m._id !== item._id);
    this.setState({ topic });
    try {
      await deleteTopic(item._id);
      toast.success("Topic deleted successful");
    } catch (error) {
      this.setState({ topic: origTopic });
      toast.error(error);
    }
  };

  render() {
    const { topic } = this.state;

    return (
      <div className="card rounded-lg p-3 m-2 p-flex">
        <h1 className="text-center p-2">DELETE PAGE</h1>
        <div className="row d-flex justify-content-center m-0">
          <div className="col- m-2" style={{ width: "20rem" }}>
            <div className="card rounded-lg my-1">
              <DeleteTopic topic={topic} delete={this.handleTopicDelete} />
            </div>
            <div className="card rounded-lg my-1">
              <DeleteModule topic={topic} />
            </div>
          </div>
          <div className="col my-1 p-0" style={{ width: "45rem" }}>
            <div className="card rounded-lg">
              <Question topic={topic} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Delete;
