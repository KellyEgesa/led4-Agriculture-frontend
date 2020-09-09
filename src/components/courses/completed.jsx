import React from "react";

const Completed = ({ score, moduleName, Topic }) => {
  return (
    <div className="container-fluid d-flex" id="root">
      <div className="jumbotron mxy-auto">
        <h1 className="display-4 text-center">COMPLETED</h1>
        <h3 className="display-4 text-center">{Topic}</h3>
        <h5 className="display-4 text-center">{moduleName}</h5>
        <p className="lead">
          You have completed this module. <br />
          Score: {score}
        </p>
        <hr className="my-4" />
      </div>
    </div>
  );
};

export default Completed;
