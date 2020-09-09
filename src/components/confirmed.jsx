import React, { Component } from "react";
import { toast } from "react-toastify";
import { confirmUser } from "./service/user";

class Confimed extends Component {
  state = { user: [] };
  async componentDidMount() {
    try {
      const { data: jwt } = await confirmUser(this.props.match.params.id);
      localStorage.setItem("token", jwt);
      this.setState({
        user: "valid",
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("invalid user");
        this.setState({ user: "Invalid User" });
      }
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
        this.setState({ user: ex.response.data });
      }
    }
  }
  handleconfirm() {
    window.location = "/load";
  }
  render() {
    const { user } = this.state;

    return (
      <div className="container-fluid d-flex justify-content-center" id="root1">
        <div className="card my-auto rounded-lg" style={{ width: "40rem" }}>
          <div className="card-body">
            {user === "valid" ? (
              <div className="jumbotron m-0 text-center">
                <h3 className="display-7">WELCOME TO LED4Agriculture</h3>{" "}
                <p>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      this.handleconfirm();
                    }}
                  >
                    PROCEED
                  </button>
                </p>
              </div>
            ) : user === "Invalid User" ? (
              <div className="jumbotron m-0 text-center">
                <h1 className="display-7">Invalid User</h1>{" "}
              </div>
            ) : (
              <div className="jumbotron m-0 text-center">
                <h1 className="display-7">Loading......</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Confimed;
