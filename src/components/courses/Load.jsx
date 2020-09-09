import React, { Component } from "react";
import { getTopic } from "../service/topic";
import ReactLoad from "../reactload";

class Load extends Component {
  state = {
    topics: [],
    loaded: false,
  };

  async componentDidMount() {
    const { data: topics } = await getTopic();
    this.setState({ topics, loaded: true });
  }
  handleTopicSelect = (Topic) => {
    this.props.history.push("/modules/" + Topic._id);
    this.setState({ selectedTopic: Topic });
  };

  render() {
    const { loaded } = this.state;
    return (
      <div className="p-2" id="root2">
        {!loaded ? (
          <div className="d-flex justify-content-center my-auto" id="root">
            <ReactLoad type={"bars"} color={"black"} />
          </div>
        ) : (
          <div></div>
        )}
        <div style={{ visibility: !loaded ? "hidden" : "visible" }}>
          <h4 className="p-2" style={{ textAlign: "center" }}>
            TOPICS :
          </h4>
          <div className="row mxy-auto d-flex justify-content-center">
            {this.state.topics.map((items) => (
              <div
                className="col-sm-3 text-center d-flex"
                key={items._id}
                style={{ height: "10rem", width: "10rem", cursor: "pointer" }}
                onClick={() => this.handleTopicSelect(items)}
              >
                <div
                  className="card m-2 card-block  rounded-lg w-yellow mx-auto"
                  style={{
                    border: "0",
                    width: "100%",
                    backgroundColor: "#E88E77",
                    color: "whitesmoke",
                  }}
                >
                  <div className="card-body align-items-center d-flex justify-content-center">
                    <h5>{items.topic}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Load;
