import React, { Component } from "react";
import { getTopic, deleteTopic } from "../../service/topic";
import { toast } from "react-toastify";

class DeleteTopic extends Component {
  state = { topic: [] };
  async componentDidMount() {
    const { data } = await getTopic();
    const topic = [...data];
    this.setState({ topic });
  }
  handleTopicSelect = (topic) => {
    this.setState({ topicSelect: topic._id });
    this.setState({ selectedTopic: topic });
  };
  handleDelete = async () => {
    try {
      await deleteTopic(this.state.topicSelect);
      toast.success("Topic deleted successful");
    } catch (error) {
      toast.error(error);
    }
  };
  render() {
    return (
      <div className="p-3">
        <label>DELETE A TOPIC</label>
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
        <div className="btn btn-danger m-2" onClick={() => this.handleDelete()}>
          DELETE A TOPIC
        </div>
      </div>
    );
  }
}

export default DeleteTopic;
