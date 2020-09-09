import React, { Component } from "react";
import Table from "./table";
import Like from "./icons";

class UserTable extends Component {
  columns = [
    { path: "firstname", label: "First Name" },
    { path: "lastname", label: "LastName" },
    { path: "email", label: "E-mail" },
    {
      label: "editor",
      key: "editor",
      content: (users) => (
        <Like liked={users.editor} onClick={() => this.props.onEditor(users)} />
      ),
    },
    {
      label: "Admin",
      key: "isAdmin",
      content: (users) => (
        <Like liked={users.isAdmin} onClick={() => this.props.onAdmin(users)} />
      ),
    },
    {
      key: "delete",
      content: (users) => (
        <button
          onClick={() => this.props.onDelete(users)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { users, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={users}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default UserTable;
