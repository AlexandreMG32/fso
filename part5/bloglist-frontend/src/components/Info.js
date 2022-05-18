import React from "react";

const Info = ({ message, type }) => {
  let classes = "";
  if (type) {
    classes = `notification ${type}`;
  }

  return <div className={classes}>{message}</div>;
};

export default Info;
