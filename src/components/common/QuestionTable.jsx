import React, { Component } from "react";
import Table from "./table";

class QuestionTable extends Component {
  columns = [
    { path: "question", label: "Question" },
    {
      key: "delete",
      content: (question) => (
        <button
          onClick={() => this.props.onDelete(question)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { question, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={question}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default QuestionTable;
