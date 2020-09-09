import React from "react";
import ReactLoading from "react-loading";

const ReactLoad = ({ type, color }) => (
  <ReactLoading
    type={type}
    color={color}
    height={"10%"}
    width={"10%"}
    className="my-auto"
  />
);

export default ReactLoad;
