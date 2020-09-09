import React from "react";

const Like = (props) => {
  let classes = "";
  if (!props.liked) {
    classes += "fa fa-plus";
  } else {
    classes += "fa fa-minus";
  }
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Like;
