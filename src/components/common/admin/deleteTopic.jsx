import React, { Component } from "react";
import ReactLoad from "../../reactload";

class DeleteTopic extends Component {
  state = { topic: [] };

  handleTopicSelect = (topic) => {
    this.setState({ topicSelect: topic._id });
    this.setState({ selectedTopic: topic });
  };
  async handleDelete(item) {
    this.props.delete(item);
  }
  render() {
    return (
      <div className="p-3">
        <label>DELETE A TOPIC</label>
        {!this.props.topic ? (
          <div className="d-flex justify-content-center">
            <ReactLoad type={"bars"} color={"black"} />
          </div>
        ) : (
          <ul className="list-group">
            {this.props.topic.map((item) => (
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
        )}
        <div
          className="btn btn-danger m-2"
          onClick={() => this.handleDelete(this.state.selectedTopic)}
        >
          DELETE A TOPIC
        </div>
      </div>
    );
  }
}

export default DeleteTopic;
