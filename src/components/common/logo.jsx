import React from "react";

const Logo = () => {
  return (
    <div
      className="badge badge-dark m-3 rounded-lg"
      style={({ width: "10rem" }, { fontSize: "20px" })}
    >
      <span style={{ color: "#36B7FC " }}>
        {" "}
        <b>LED4</b>
      </span>
      <b>Agriculture</b>
    </div>
  );
};

export default Logo;
