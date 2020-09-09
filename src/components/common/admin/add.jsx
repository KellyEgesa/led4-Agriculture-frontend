import React, { Component } from "react";
import AddTopic from "../../trial";
import AddModule from "./addModule";
import Editor from "./editor";
import { getTopic, saveTopic } from "../../service/topic";
import { toast } from "react-toastify";

class Add extends Component {
  state = {};

  async componentDidMount() {
    const { data } = await getTopic();
    const topic = [...data];
    this.setState({ topic });
  }
  doSubmit = async (b) => {
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
    const { topic } = this.state;
    return (
      <div className="card rounded-lg p-3 m-2 p-flex">
        <h1 className="text-center">ADD PAGE</h1>
        <div className="row p-flex justify-content-center m-0">
          <div className="col-sm-5" style={{ width: "20rem" }}>
            <div className="card my-1">
              <AddTopic topic={topic} doSubmit={this.doSubmit} />
            </div>
            <div className="card my-1">
              <AddModule topic={topic} />
            </div>
          </div>
          <div
            className="col-md-5 my-1 p-0"
            style={{ width: "43rem", minHeight: "30rem" }}
          >
            <Editor topic={topic} />
          </div>
        </div>
      </div>
    );
  }
}

export default Add;
