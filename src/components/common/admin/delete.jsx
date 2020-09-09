import React from "react";
import DeleteTopic from "./deleteTopic";
import DeleteModule from "./deleteModule";
import Question from "./deleteQuestion";

const Delete = () => {
  return (
    <div className="card rounded-lg p-3 m-2 p-flex">
      <h1 className="text-center p-2">DELETE PAGE</h1>
      <div className="row d-flex justify-content-center m-0">
        <div className="col- m-2" style={{ width: "20rem" }}>
          <div className="card rounded-lg my-1">
            <DeleteTopic />
          </div>
          <div className="card rounded-lg my-1">
            <DeleteModule />
          </div>
        </div>
        <div className="col my-1 p-0" style={{ width: "45rem" }}>
          <div className="card rounded-lg">
            <Question />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete;
