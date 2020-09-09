import React, { Component } from "react";
import Add from "./common/admin/add";
import "./common/admin/Dashboard.css";

import Delete from "./common/admin/delete";
import Users from "./common/admin/users";
import AddEresource from "./common/admin/e-resources";
import Edit from "./common/admin/edit";

class Admin extends Component {
  state = {};

  handeClick(item) {
    this.setState({ selectedPage: item });
  }
  render() {
    const { selectedPage } = this.state;
    const { user } = this.props;
    return (
      <div id="root2">
        <div className="row" style={{ width: "100%" }}>
          <div
            className="col-2 p-2 m-2 nav jumbotron sticky-top flex-column"
            style={{ height: "100%" }}
          >
            <button
              type="button"
              className="btn btn-secondary m-2"
              onClick={() => this.handeClick("ADD")}
            >
              ADD (Topic, Module, Question)
            </button>

            <button
              type="button"
              className="btn btn-secondary m-2"
              onClick={() => this.handeClick("DELETE")}
            >
              DELETE (Topic, Module, Question)
            </button>

            <button
              type="button"
              className="btn btn-secondary m-2"
              onClick={() => this.handeClick("EDIT")}
            >
              EDIT (Topic, Module, Question)
            </button>

            <button
              type="button"
              className="btn btn-secondary m-2"
              onClick={() => this.handeClick("E-RESOURCES")}
            >
              E-RESOURCES (Add and Delete E-resources)
            </button>

            {user.isAdmin ? (
              <button
                type="button"
                className="btn btn-secondary m-2"
                onClick={() => this.handeClick("USERS")}
              >
                USERS (Manage Users)
              </button>
            ) : (
              <div></div>
            )}
          </div>

          <div className="col p-0">
            {selectedPage === "ADD" ? (
              <Add />
            ) : selectedPage === "DELETE" ? (
              <Delete />
            ) : selectedPage === "USERS" ? (
              <Users />
            ) : selectedPage === "EDIT" ? (
              <Edit />
            ) : selectedPage === "E-RESOURCES" ? (
              <AddEresource />
            ) : (
              <Add />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
